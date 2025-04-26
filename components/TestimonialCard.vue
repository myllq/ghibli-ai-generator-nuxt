<template>
  <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
    <div class="flex items-center mb-3 md:mb-4">
      <div
        class="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl mr-3 md:mr-4"
        :style="{ backgroundColor: bgColor }"
      >
        {{ initial }}
      </div>
      <div>
        <h4 class="font-semibold text-[#3d405b]">{{ name }}</h4>
        <div class="flex">
          <svg 
            v-for="i in 5" 
            :key="i"
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            :fill="i <= rating ? '#f2cc8f' : 'none'" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            :class="`h-3 w-3 md:h-4 md:w-4 ${i <= rating ? 'text-[#f2cc8f]' : 'text-gray-300'}`"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
      </div>
    </div>
    <p class="text-sm md:text-base text-gray-600 italic">"{{ text }}"</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

// Extract first letter of the name
const initial = computed(() => props.name.charAt(0));

// Generate a consistent color based on the name
const colors = ["#e07a5f", "#81b29a", "#f2cc8f", "#3d405b"];
const bgColor = computed(() => {
  const colorIndex = props.name.charCodeAt(0) % colors.length;
  return colors[colorIndex];
});
</script>