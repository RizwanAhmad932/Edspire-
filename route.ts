import { type NextRequest, NextResponse } from "next/server"

// Mock Gemini API integration
export async function POST(request: NextRequest) {
  try {
    const { subject, difficulty, count, prompt } = await request.json()

    // In a real implementation, you would call the actual Gemini API here
    // For now, we'll return mock data that simulates AI-generated questions

    const mockQuestions = generateMockQuestions(subject, difficulty, count)

    return NextResponse.json({
      questions: mockQuestions,
      success: true,
    })
  } catch (error) {
    console.error("Error in Gemini API:", error)
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 })
  }
}

function generateMockQuestions(subject: string, difficulty: string, count: number) {
  const questionTemplates = {
    Physics: [
      {
        question: "What is the speed of light in vacuum?",
        options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"],
        correctAnswer: 0,
        explanation:
          "The speed of light in vacuum is approximately 3 × 10⁸ m/s, which is a fundamental constant in physics.",
      },
      {
        question: "Which of the following is a vector quantity?",
        options: ["Speed", "Distance", "Velocity", "Time"],
        correctAnswer: 2,
        explanation:
          "Velocity is a vector quantity as it has both magnitude and direction, unlike speed which is scalar.",
      },
      {
        question: "What is Newton's second law of motion?",
        options: ["F = ma", "F = mv", "F = m/a", "F = a/m"],
        correctAnswer: 0,
        explanation: "Newton's second law states that Force equals mass times acceleration (F = ma).",
      },
    ],
    Chemistry: [
      {
        question: "What is the atomic number of Carbon?",
        options: ["4", "6", "8", "12"],
        correctAnswer: 1,
        explanation: "Carbon has 6 protons in its nucleus, making its atomic number 6.",
      },
      {
        question: "Which gas is produced when acids react with metals?",
        options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"],
        correctAnswer: 2,
        explanation: "When acids react with metals, hydrogen gas is typically produced along with a salt.",
      },
    ],
    Mathematics: [
      {
        question: "What is the derivative of x²?",
        options: ["x", "2x", "x²", "2x²"],
        correctAnswer: 1,
        explanation: "Using the power rule, d/dx(x²) = 2x¹ = 2x.",
      },
      {
        question: "What is the value of sin(90°)?",
        options: ["0", "1", "√2/2", "√3/2"],
        correctAnswer: 1,
        explanation: "sin(90°) = 1, which is a fundamental trigonometric value.",
      },
    ],
    Biology: [
      {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
        correctAnswer: 1,
        explanation:
          "Mitochondria are called the powerhouse of the cell because they produce ATP through cellular respiration.",
      },
      {
        question: "Which process converts light energy into chemical energy?",
        options: ["Respiration", "Photosynthesis", "Digestion", "Excretion"],
        correctAnswer: 1,
        explanation: "Photosynthesis converts light energy into chemical energy in the form of glucose.",
      },
    ],
  }

  const templates = questionTemplates[subject] || questionTemplates.Physics
  const questions = []

  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length]
    questions.push({
      id: `ai_${subject.toLowerCase()}_${Date.now()}_${i}`,
      ...template,
      difficulty,
      subject,
    })
  }

  return questions
}
