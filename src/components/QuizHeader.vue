<script setup>
import ProgressHeader from "./ProgressHeader.vue"

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    questionStatus: {
        type: String,
        required: true
    },
    barPercentage: {
        type: String,
        required: true
    },
    timer: {
        type: Number,
        required: false
    }
})
</script>

<template>
    <header class="mb-8">
        <!-- Title -->
        <h2 class="text-2xl font-bold text-gray-800 mb-2">
            {{ title }}
        </h2>
        <!-- Top info row -->
        <div class="flex justify-between items-center mb-2">
            <span class="text-sm text-gray-500">
                Question {{ questionStatus }}
            </span>
            <span v-if="timer !== undefined" class="text-sm font-semibold text-red-500">
                ⏱ {{ timer }}s
            </span>
        </div>
        <!-- Progress bar -->
        <ProgressHeader :questionStatus="questionStatus" :barPercentage="barPercentage" />

    </header>
</template>