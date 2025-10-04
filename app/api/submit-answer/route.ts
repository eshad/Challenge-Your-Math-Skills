import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { supabase } from '@/lib/supabaseClient'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { session_id, user_answer } = await request.json()

    if (!session_id || user_answer === undefined || user_answer === null) {
      return NextResponse.json(
        { error: 'Missing required fields: session_id and user_answer' },
        { status: 400 }
      )
    }

    const { data: session, error: sessionError } = await supabase
      .from('math_problem_sessions')
      .select('*')
      .eq('id', session_id)
      .single()

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    const userAnswerNum = parseFloat(user_answer)
    const finalAnswerNum = parseFloat(session.final_answer)

    const tolerance = 0.01
    const isCorrect = Math.abs(userAnswerNum - finalAnswerNum) < tolerance

    const feedbackPrompt = `
You are a helpful Primary 5 math tutor. A student just answered a math problem.

Problem: ${session.problem_text}
Correct answer: ${session.final_answer}
Student's answer: ${user_answer}
Result: ${isCorrect ? 'CORRECT' : 'INCORRECT'}

Provide personalized, encouraging feedback in 2-3 sentences. 
- If correct: Praise them and briefly explain why the answer is right.
- If incorrect: Gently correct them, show the right answer, and give a hint about the method.

Keep it friendly and age-appropriate for a 10-11 year old.
`

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    const result = await model.generateContent(feedbackPrompt)
    const response = await result.response
    const feedback = response.text()

    const { data: submission, error: submissionError } = await supabase
      .from('math_problem_submissions')
      .insert({
        session_id,
        user_answer: userAnswerNum,
        is_correct: isCorrect,
        feedback,
      })
      .select()
      .single()

    if (submissionError) {
      console.error('Database error:', submissionError)
      throw submissionError
    }

    return NextResponse.json({
      ...submission,
      correct_answer: session.final_answer,
    })
  } catch (error: any) {
    console.error('Error submitting answer:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to submit answer' },
      { status: 500 }
    )
  }
}
