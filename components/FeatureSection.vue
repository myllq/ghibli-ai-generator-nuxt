<template>
  <div class="py-8 md:py-12 border-b border-gray-100 last:border-0">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
      <!-- Image -->
      <div
        :class="`relative h-[250px] md:h-[400px] rounded-lg overflow-hidden shadow-lg ${isReversed ? 'order-first' : 'order-first lg:order-last'}`"
      >
        <img :src="image || '/placeholder.svg'" :alt="alt" class="absolute inset-0 w-full h-full object-cover" />
      </div>

      <!-- Text Content -->
      <div :class="isReversed ? 'order-last' : 'order-last lg:order-first'">
        <h3 class="text-xl md:text-2xl lg:text-3xl font-bold text-[#3d405b] mb-3 md:mb-4">{{ title }}</h3>
        <p class="text-base md:text-lg text-gray-600 leading-relaxed mb-4 md:mb-6">{{ description }}</p>
        <button class="bg-[#e07a5f] hover:bg-[#d8603f] text-white px-4 py-2 rounded-md w-full sm:w-auto" @click="$emit('button-click')">
          Generate Ghibli Art Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  isReversed: {
    type: Boolean,
    default: false
  }
});

defineEmits(['button-click']);
</script>