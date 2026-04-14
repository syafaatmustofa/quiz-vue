<script setup>
const props = defineProps({
	questionStatus: {
		type: String,
		required: true
	},
	barPercentage: {
		type: String,
		required: true
	}
})
</script>

<template>
	<header class="mb-6">
		<div class="flex justify-between items-center mb-2">
			<h4 class="text-lg font-semibold text-gray-700">
				Question {{ props.questionStatus }}
			</h4>
			<span class="text-sm text-gray-400">
				{{ props.barPercentage }}
			</span>
		</div>
		<div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
			<div class="h-full bg-green-400 transition-all duration-300" :style="{ width: props.barPercentage }"></div>
		</div>
	</header>
</template>