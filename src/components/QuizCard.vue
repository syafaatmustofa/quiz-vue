<script setup>
import { useRouter } from "vue-router"

// Using useRouter to navigate to the quiz page when the card is clicked
const router = useRouter()
const props = defineProps({
    quiz: {
        type: Object,
        required: true
    }
})

// Function to navigate to the quiz page
function goToQuiz() {
    router.push(`/quiz/${props.quiz.id}`)
}
</script>

<template>
    <!-- Quiz Card -->
    <div @click="goToQuiz"
        class="w-[260px] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer bg-white">
        <img :src="props.quiz.img" :alt="props.quiz.title" class="w-full h-[180px] object-cover" />
        <div class="p-4">
            <h2 class="text-lg font-semibold text-gray-800">
                {{ props.quiz.title }}
            </h2>
            <p class="text-sm text-gray-500 mt-1">
                {{ props.quiz.questions.length }} Questions
            </p>
        </div>
    </div>
</template>