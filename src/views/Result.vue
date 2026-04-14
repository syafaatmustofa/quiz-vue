<script setup>
import { useRoute, useRouter } from "vue-router"
import QuizResult from "@/components/QuizResult.vue"

const route = useRoute()
const router = useRouter()

const quizQuestionsLength = Number(route.query.total)
const numberOfCorrectAnswers = Number(route.query.correct)
const categoryId = Number(route.query.category)

/*
 Guard:
 Jika user membuka /result langsung tanpa data
 redirect kembali ke home
*/
if (
    !quizQuestionsLength ||
    !numberOfCorrectAnswers && numberOfCorrectAnswers !== 0 ||
    !categoryId
) {
    router.replace("/")
}
</script>

<template>
    <QuizResult :quizQuestionsLength="quizQuestionsLength" :numberOfCorrectAnswer="numberOfCorrectAnswers"
        :categoryId="categoryId" />
</template>