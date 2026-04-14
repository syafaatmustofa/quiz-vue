import localQuizzes from "@/data/questions.json"

const API_URL = "https://opentdb.com/api.php?amount=5&type=multiple"

function transformTriviaData(apiData) {
    return apiData.map((item, index) => {
        const answers = [
            ...item.incorrect_answers.map((ans, i) => ({
                id: i,
                label: String.fromCharCode(65 + i),
                text: ans,
                correct: false,
            })),
            {
                id: 99,
                label: String.fromCharCode(65 + item.incorrect_answers.length),
                text: item.correct_answer,
                correct: true,
            },
        ]
        return {
            id: index,
            text: item.question,
            answers: shuffleArray(answers),
        }
    })
}

function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5)
}

export async function getQuizQuestions(categoryId) {
    try {
        const response = await fetch(API_URL)
        if (!response.ok) {
            throw new Error("API failed")
        }
        const data = await response.json()
        return transformTriviaData(data.results)
    } catch (error) {
        console.warn("Fallback to local JSON")
        const quiz = localQuizzes.find(q => q.id === categoryId)
        return quiz.questions
    }
}