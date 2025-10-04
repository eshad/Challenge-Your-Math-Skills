import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { supabase } from '@/lib/supabaseClient'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

const SYLLABUS_CONTEXT = `
You are generating math word problems for Primary 5 students in Singapore following the official syllabus.

Topics include:
- Whole Numbers (up to 10 million, four operations, order of operations)
- Fractions (division as fractions, adding/subtracting mixed numbers, multiplying fractions)
- Decimals (multiply/divide by 10, 100, 1000, measurement conversions)
- Percentage (finding %, discount, GST, interest)
- Rate (rate per unit)
- Area & Volume (triangle, composite figures, cube/cuboid, volume of liquid)
- Geometry (angles, properties of shapes)

Generate a creative word problem with a real-world context that Primary 5 students can relate to.
The problem should test one of the topics above.
Provide ONLY a JSON response with this exact structure:
{
  "problem_text": "the word problem text",
  "final_answer": numerical_answer_only
}

Do not include any markdown, explanation, or additional text. Only return valid JSON.
`

export async function GET() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const result = await model.generateContent(SYLLABUS_CONTEXT)
    const response = await result.response
    const text = response.text()

    let problemData
    try {
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim()
      problemData = JSON.parse(cleanedText)
    } catch (parseError) {
      console.error('Failed to parse AI response:', text)
      throw new Error('Invalid AI response format')
    }

    if (!problemData.problem_text || typeof problemData.final_answer !== 'number') {
      throw new Error('AI response missing required fields')
    }

    const { data: session, error: dbError } = await supabase
      .from('math_problem_sessions')
      .insert({
        problem_text: problemData.problem_text,
        final_answer: problemData.final_answer,
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw dbError
    }

    return NextResponse.json(session)
  } catch (error: any) {
    console.error('Error generating problem:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate problem' },
      { status: 500 }
    )
  }
}
