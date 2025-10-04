'use client'

import { useState } from 'react'

interface MathProblem {
  problem_text: string
  final_answer: number
}

export default function Home() {
  const [problem, setProblem] = useState<MathProblem | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showProblem, setShowProblem] = useState(false)

  const generateProblem = async () => {
    setIsLoading(true)
    setFeedback('')
    setUserAnswer('')
    setIsCorrect(null)
    setShowProblem(false)
    
    try {
      const response = await fetch('/api/generate-problem')
      if (!response.ok) throw new Error('Failed to generate problem')
      
      const data = await response.json()
      setProblem({
        problem_text: data.problem_text,
        final_answer: data.final_answer
      })
      setSessionId(data.id)
      setTimeout(() => setShowProblem(true), 100)
    } catch (error) {
      console.error('Error generating problem:', error)
      alert('Failed to generate problem. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const submitAnswer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!sessionId || !userAnswer) return
    
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/submit-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          user_answer: parseFloat(userAnswer),
        }),
      })
      
      if (!response.ok) throw new Error('Failed to submit answer')
      
      const data = await response.json()
      setFeedback(data.feedback)
      setIsCorrect(data.is_correct)
    } catch (error) {
      console.error('Error submitting answer:', error)
      alert('Failed to submit answer. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzYzNjZmMSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-4000"></div>
      
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-200/50 sticky top-0 z-50 animate-slide-down">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <span className="text-white text-3xl animate-wiggle">🧮</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Primary 5 Math Practice
                </h1>
                <p className="text-xs text-gray-600 font-medium">✨ AI-Powered Learning</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-shadow duration-300">
              <span className="animate-pulse">✨</span>
              <span>Singapore Math Syllabus</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl relative z-10">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 animate-slide-up">
            Challenge Your Math Skills! 🚀
          </h2>
          <p className="text-gray-700 text-base sm:text-lg font-medium max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.1s'}}>
            Practice Primary 5 math problems powered by AI. Get instant feedback and improve your skills every day!
          </p>
        </div>

        <div className="mb-8 animate-bounce-in">
          <button
            onClick={generateProblem}
            disabled={isLoading}
            className="group relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-2xl hover:shadow-purple-500/50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            <div className="relative flex items-center justify-center space-x-3">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-lg">Generating Your Problem...</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-3xl group-hover:animate-wiggle">🎲</span>
                  <span className="text-lg sm:text-xl">Generate New Problem</span>
                  <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">✨</span>
                </>
              )}
            </div>
          </button>
        </div>

        {problem && showProblem && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-10 mb-8 border-2 border-purple-200 transform animate-slide-up hover:shadow-purple-300/50 transition-shadow duration-300">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg animate-bounce-in">
                <span className="text-3xl">📝</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                  Problem
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">NEW</span>
                </h3>
                <p className="text-sm text-gray-600 font-medium">Read carefully and solve step by step</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 mb-8 border-2 border-purple-200 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-300 rounded-full filter blur-3xl opacity-20"></div>
              <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-medium relative z-10">
                {problem.problem_text}
              </p>
            </div>
            
            <form onSubmit={submitAnswer} className="space-y-6">
              <div className="relative">
                <label htmlFor="answer" className="block text-base font-bold text-gray-800 mb-3 flex items-center space-x-2">
                  <span className="text-2xl">✏️</span>
                  <span>Your Answer</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    id="answer"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-full px-6 py-4 border-3 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-400 focus:border-purple-500 transition-all duration-200 text-xl font-bold bg-white/80 backdrop-blur-sm placeholder-gray-400 hover:border-purple-400"
                    placeholder="Type your answer here..."
                    required
                    disabled={isLoading}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl opacity-50">
                    🤔
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                  <span>💡</span>
                  <span className="font-medium">Tip: You can use decimals (e.g., 1.5) or whole numbers</span>
                </p>
              </div>
              
              <button
                type="submit"
                disabled={!userAnswer || isLoading}
                className="group relative w-full bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 hover:from-green-600 hover:via-emerald-700 hover:to-teal-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-2xl hover:shadow-green-500/50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                <div className="relative flex items-center justify-center space-x-3">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-lg">Checking Answer...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl group-hover:scale-125 transition-transform">✓</span>
                      <span className="text-lg sm:text-xl">Submit Answer</span>
                      <span className="text-2xl group-hover:rotate-12 transition-transform">🎯</span>
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>
        )}

        {feedback && (
          <div className={`rounded-3xl shadow-2xl p-6 sm:p-10 border-3 transition-all duration-500 animate-bounce-in transform hover:scale-[1.02] ${
            isCorrect 
              ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-green-400' 
              : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-amber-400'
          }`}>
            <div className="flex items-start space-x-4 mb-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-xl animate-bounce-in ${
                isCorrect ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-amber-400 to-orange-500'
              }`}>
                {isCorrect ? '🎉' : '💪'}
              </div>
              <div className="flex-1">
                <h3 className={`text-2xl sm:text-3xl font-extrabold mb-2 ${
                  isCorrect ? 'text-green-800' : 'text-amber-800'
                }`}>
                  {isCorrect ? 'Excellent Work! 🌟' : 'Keep Trying! 🚀'}
                </h3>
                <p className="text-base text-gray-700 font-medium">
                  {isCorrect ? 'You got it absolutely right!' : "Every mistake is a step closer to mastery!"}
                </p>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-inner border-2 border-white/50">
              <p className="text-gray-800 leading-relaxed text-base sm:text-lg font-medium">{feedback}</p>
            </div>

            {isCorrect && (
              <div className="mt-6 flex justify-center animate-slide-up">
                <button
                  onClick={generateProblem}
                  className="group bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 text-purple-700 font-bold py-3 px-8 rounded-xl border-3 border-purple-300 hover:border-purple-400 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="text-2xl group-hover:animate-wiggle">🚀</span>
                  <span className="text-lg">Try Another Problem</span>
                  <span className="text-xl group-hover:rotate-180 transition-transform duration-500">→</span>
                </button>
              </div>
            )}
          </div>
        )}

        {!problem && !isLoading && (
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-10 sm:p-16 text-center border-2 border-purple-200 shadow-xl animate-fade-in">
            <div className="text-8xl mb-6 animate-bounce-in">🎯</div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Ready to Start?</h3>
            <p className="text-gray-600 text-lg font-medium max-w-md mx-auto">Click the button above to generate your first math problem and begin your learning journey!</p>
            <div className="mt-8 flex justify-center gap-4 text-4xl">
              <span className="animate-bounce" style={{animationDelay: '0s'}}>📚</span>
              <span className="animate-bounce" style={{animationDelay: '0.1s'}}>✏️</span>
              <span className="animate-bounce" style={{animationDelay: '0.2s'}}>🧠</span>
              <span className="animate-bounce" style={{animationDelay: '0.3s'}}>⭐</span>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-16 pb-10 text-center relative z-10 animate-fade-in">
        <div className="inline-block bg-white/80 backdrop-blur-md px-8 py-4 rounded-full shadow-lg border border-purple-200">
          <p className="text-gray-700 font-medium flex items-center gap-2">
            Made with <span className="text-red-500 animate-pulse text-xl">❤️</span> for Primary 5 Students
          </p>
        </div>
      </footer>
    </div>
  )
}
