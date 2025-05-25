<template>
  <div class="w-full">
    <div v-for="(faq, index) in data.items" :key="index" class="border-b border-gray-200">
      <button 
        class="flex justify-between items-center w-full py-4 text-left text-sm md:text-base font-medium text-[#3d405b]"
        @click="toggleAccordion(index)"
      >
        {{ faq.question }}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          class="h-4 w-4 transition-transform"
          :class="{ 'rotate-180': openIndex === index }"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div 
        class="overflow-hidden transition-all duration-300 ease-in-out"
        :style="{ maxHeight: openIndex === index ? '1000px' : '0px', opacity: openIndex === index ? 1 : 0 }"
      >
        <div class="pb-4 text-sm md:text-base text-gray-600">
          {{ faq.answer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const openIndex = ref(null);

const toggleAccordion = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>