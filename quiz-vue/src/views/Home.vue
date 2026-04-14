<script setup>
import { ref, computed } from "vue"
import QuizCard from "@/components/QuizCard.vue"
import quizes from "@/data/questions.json"

const search = ref("")

const filteredQuizzes = computed(() =>
    quizes.filter(quiz =>
        quiz.title.toLowerCase().includes(search.value.toLowerCase())
    )
)

function getLastScore(categoryId) {
    return localStorage.getItem(`quiz-score-${categoryId}`)
}
</script>

<template>
    <div class="max-w-6xl mx-auto px-4">
        <!-- Header -->
        <header class="flex items-center justify-between mt-10 mb-6">
            <h1 class="text-3xl font-bold">
                Quiz Categories
            </h1>
            <input v-model.trim="search" placeholder="Search category..."
                class="px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </header>
        <!-- Categories -->
        <section class="flex flex-wrap gap-6">
            <div v-for="quiz in filteredQuizzes" :key="quiz.id" class="relative">
                <QuizCard :quiz="quiz" />
                <!-- Last Score Badge -->
                <span v-if="getLastScore(quiz.id)"
                    class="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Last: {{ getLastScore(quiz.id) }}%
                </span>
            </div>
        </section>
    </div>
</template>