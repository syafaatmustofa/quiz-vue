<script setup>
const emit = defineEmits(["selectOption"])
const props = defineProps({
    question: {
        type: Object,
        required: true
    }
})
// untuk mengirimkan opsi yang dipilih ke komponen induk (Home.vue) ketika pengguna memilih sebuah opsi
function emitSelectedOption(option) {
    emit("selectOption", option)
}
</script>

<template>
    <!-- Quiz Content -->
    <section class="mt-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">
            {{ props.question.text }}
        </h1>
        <div class="space-y-4">
            <div v-for="option in props.question.answers" :key="option.id" @click="emitSelectedOption(option)"
                tabindex="0" @keyup.enter="emitSelectedOption(option)"
                class="flex items-center rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group">
                <div class="w-12 h-12 flex items-center justify-center bg-blue-400 text-white font-bold">
                    {{ option.label }}
                </div>
                <div class="flex-1 px-4 py-3 bg-gray-100 group-hover:bg-gray-200 transition">
                    {{ option.text }}
                </div>
            </div>
        </div>
    </section>
</template>