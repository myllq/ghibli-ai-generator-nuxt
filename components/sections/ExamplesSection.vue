<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="example in data.examples" 
        :key="example.id" 
        class="rounded-lg overflow-hidden shadow-lg bg-white"
      >
        <div class="h-64 relative">
          <img
            :src="example.image"
            :alt="example.alt"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-[#3d405b]">{{ example.title }}</h3>
          <p class="text-sm text-gray-500">{{ example.description }}</p>
        </div>
      </div>
    </div>
    <div class="text-center mt-6 md:mt-10">
      <button
        class="bg-[#81b29a] hover:bg-[#6a9d87] text-white px-4 py-2 rounded-md w-full sm:w-auto"
        @click="$emit('generate-click')"
      >
        Generate Your Ghibli Art Now
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
});

defineEmits(['generate-click']);
</script> 