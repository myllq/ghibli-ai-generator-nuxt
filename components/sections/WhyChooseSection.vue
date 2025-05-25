<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div v-for="(section, index) in data.sections" :key="index" class="bg-[#f8f5f0] p-8 rounded-lg shadow-md">
      <h3 class="text-2xl font-semibold text-[#3d405b] mb-4">{{ section.title }}</h3>
      <ul class="space-y-4">
        <li v-for="(item, itemIndex) in section.items" :key="itemIndex" class="flex items-start">
          <div 
            class="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold mr-3"
            :class="section.checkColor"
          >
            ✓
          </div>
          <p>{{ item }}</p>
        </li>
      </ul>
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
</script> 