<template>
  <div class="w-full max-w-6xl mx-auto">
    <!-- <div class="grid w-full max-w-md mx-auto grid-cols-2 mb-6 md:mb-8 border rounded-lg overflow-hidden">
      <button 
        class="py-2 px-4 text-center transition-colors text-sm sm:text-base"
        :class="activeTab === 'image' ? 'bg-[#e07a5f] text-white' : 'bg-gray-100 hover:bg-gray-200'"
        @click="activeTab = 'image'"
      >
        Ghibli Image Generator
      </button>
      <button 
        class="py-2 px-4 text-center transition-colors text-sm sm:text-base"
        :class="activeTab === 'video' ? 'bg-[#e07a5f] text-white' : 'bg-gray-100 hover:bg-gray-200'"
        @click="activeTab = 'video'"
      >
        Ghibli Video Generator
      </button> 
    </div> -->

    <div v-if="activeTab === 'image'" class="space-y-8">
      <GhibliImageGenerator />
    </div>

    <div v-if="activeTab === 'video'" class="space-y-8">
      <GhibliVideoGenerator />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import GhibliImageGenerator from './GhibliImageGenerator.vue';
import GhibliVideoGenerator from './GhibliVideoGenerator.vue';

const activeTab = ref('image');
const slideInterval = ref(null);

onMounted(() => {
  // 设置3秒的轮播间隔
  slideInterval.value = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length;
  }, 3000); // 从5000改为3000毫秒
});

onUnmounted(() => {
  if (slideInterval.value) {
    clearInterval(slideInterval.value);
  }
});
</script>