<script setup>
import { computed, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const props = defineProps({
    quizQuestionsLength: {
        type: Number,
        required: true
    },
    numberOfCorrectAnswer: {
        type: Number,
        required: true
    },
    categoryId: {
        type: Number,
        required: true
    }
})

const percentage = computed(() =>
    Math.round(
        (props.numberOfCorrectAnswer / props.quizQuestionsLength) * 100
    )
)

onMounted(() => {
    localStorage.setItem(
        `quiz-score-${props.categoryId}`,
        percentage.value
    )
})

function retryQuiz() {
    router.push(`/quiz/${props.categoryId}`)
}

function goHome() {
    router.push("/")
}
</script>

<template>
    <section class="min-h-screen flex flex-col items-center justify-center text-center">
        <p class="text-lg text-gray-500 mb-2">
            Your Score
        </p>
        <h1 class="text-6xl font-bold text-blue-500 mb-4 animate-fade-in">
            {{ numberOfCorrectAnswer }}/{{ quizQuestionsLength }}
        </h1>
        <p class="text-gray-600 mb-8">
            {{ percentage }}% correct answers
        </p>
        <div class="flex gap-4">
            <button @click="retryQuiz" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Retry Quiz
            </button>
            <button @click="goHome" class="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                Back to Home
            </button>
        </div>
    </section>
</template>