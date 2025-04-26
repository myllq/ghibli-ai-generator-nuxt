<template>
  <div class="w-full max-w-6xl mx-auto">
    <div class="grid w-full max-w-md mx-auto grid-cols-2 mb-6 md:mb-8 border rounded-lg overflow-hidden">
      <button 
        class="py-2 px-4 text-center transition-colors"
        :class="activeTab === 'image' ? 'bg-[#e07a5f] text-white' : 'bg-gray-100 hover:bg-gray-200'"
        @click="activeTab = 'image'"
      >
        Ghibli Image Generator
      </button>
      <button 
        class="py-2 px-4 text-center transition-colors"
        :class="activeTab === 'video' ? 'bg-[#e07a5f] text-white' : 'bg-gray-100 hover:bg-gray-200'"
        @click="activeTab = 'video'"
      >
        Ghibli Video Generator
      </button>
    </div>

    <div v-if="activeTab === 'image'" class="space-y-8">
      <GhibliImageGenerator />
    </div>

    <div v-if="activeTab === 'video'" class="space-y-8">
      <GhibliVideoGenerator />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import GhibliImageGenerator from './GhibliImageGenerator.vue';
import GhibliVideoGenerator from './GhibliVideoGenerator.vue';

const activeTab = ref('image');
</script>