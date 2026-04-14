<script setup>
import QuizHeader from "@/components/QuizHeader.vue"
import QuizContent from "@/components/QuizContent.vue"

import { ref, computed, onMounted, onUnmounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getQuizQuestions } from "@/services/quizService"

const route = useRoute()
const router = useRouter()

const quizId = Number(route.params.id)

const currentQuestionIndex = ref(0)
const numberOfCorrectAnswer = ref(0)

const timePerQuestion = 15
const timer = ref(timePerQuestion)

const questions = ref([])
const isLoading = ref(true)

let interval = null

onMounted(async () => {
    questions.value = await getQuizQuestions(quizId)
    isLoading.value = false
    startTimer()
})
// Computed properties to display the current question status and progress bar percentage
const questionStatus = computed(() =>
    `${currentQuestionIndex.value + 1} / ${questions.value.length}`
)

const barPercentage = computed(() =>
    `${((currentQuestionIndex.value + 1) / questions.value.length) * 100}%`
)
// Move to the next question, or finish the quiz if it's the last question
function nextQuestion() {
    const isLastQuestion =
        currentQuestionIndex.value === questions.value.length - 1

    if (isLastQuestion) {
        finishQuiz()
        return
    }

    currentQuestionIndex.value++
    resetTimer()
}
// Handle the selection of an option, update the score if correct, and move to the next question
function onSelectOption(option) {
    if (option.correct) {
        numberOfCorrectAnswer.value++
    }

    nextQuestion()
}
// Navigate to the result page with the quiz results as query parameters
function finishQuiz() {
    clearInterval(interval)

    router.push(
        `/result?total=${questions.value.length}&correct=${numberOfCorrectAnswer.value}&category=${quizId}`
    )
}
// Start the timer for the current question
function startTimer() {
    interval = setInterval(() => {
        if (timer.value === 0) {
            nextQuestion()
            return
        }

        timer.value--
    }, 1000)
}
// Reset the timer for the next question
function resetTimer() {
    clearInterval(interval)
    timer.value = timePerQuestion
    startTimer()
}
// Clear the timer interval when the component is unmounted to prevent memory leaks
onUnmounted(() => {
    clearInterval(interval)
})
</script>

<template>
    <div class="max-w-3xl mx-auto px-4 py-10">
        <QuizHeader title="Quiz" :questionStatus="questionStatus" :barPercentage="barPercentage" :timer="timer" />
        <div v-if="isLoading" class="text-center mt-20 text-gray-500">
            Loading questions...
        </div>
        <QuizContent v-else :question="questions[currentQuestionIndex]" @selectOption="onSelectOption" />
    </div>
</template>