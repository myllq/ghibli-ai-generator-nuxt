<template>
  <div class="relative w-full">
    <!-- Main Slider -->
    <div class="relative w-full h-[500px] rounded-lg overflow-hidden shadow-xl">
      <div
        v-for="(item, index) in carouselItems"
        :key="item.id"
        :class="`absolute inset-0 transition-opacity duration-500 ${
          index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
        }`"
      >
        <div
          ref="containerRef"
          class="relative w-full h-full overflow-hidden cursor-ew-resize"
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp"
          @mousemove="handleMouseMove"
          @touchstart="handleMouseDown"
          @touchend="handleMouseUp"
          @touchmove="handleTouchMove"
          @mouseenter="pauseAutoPlay"
          @mouseleave="resumeAutoPlay"
        >
          <!-- After Image (Full width) -->
          <div class="absolute inset-0 w-full h-full">
            <img 
              :src="item.afterImage || '/placeholder.svg'" 
              :alt="item.afterAlt" 
              class="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <!-- Before Image (Left side) with clip-path -->
          <div
            class="absolute inset-0 w-full h-full"
            :style="{
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
            }"
          >
            <img 
              :src="item.beforeImage || '/placeholder.svg'" 
              :alt="item.beforeAlt" 
              class="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <!-- Slider Line -->
          <div class="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" :style="{ left: `${sliderPosition}%` }">
            <!-- Slider Handle -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
              <div class="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-gray-600">
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-gray-600">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Labels -->
          <div class="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 text-sm rounded">Before</div>
          <div class="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 text-sm rounded">After</div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <button
        class="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10 flex items-center justify-center"
        @click="prevSlide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span class="sr-only">Previous</span>
      </button>

      <button
        class="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10 flex items-center justify-center"
        @click="nextSlide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
        <span class="sr-only">Next</span>
      </button>
    </div>

    <!-- Dot Navigation -->
    <div class="flex justify-center gap-2 mt-4">
      <button
        v-for="(_, index) in carouselItems"
        :key="index"
        @click="goToSlide(index)"
        :class="`w-3 h-3 rounded-full transition-all ${
          index === activeIndex ? 'bg-[#e07a5f]' : 'bg-gray-300 hover:bg-gray-400'
        }`"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const carouselItems = [
  {
    id: 1,
    beforeImage: "/images/ghibli-image1-before.jpg",
    afterImage: "/images/ghibli-image1-after.webp",
    beforeAlt: "Original Titanic scene",
    afterAlt: "Ghibli style Titanic scene",
  },
  {
    id: 2,
    beforeImage: "/images/ghibli-image2-before.jpg",
    afterImage: "/images/ghibli-image2-after.webp",
    beforeAlt: "Original rally scene",
    afterAlt: "Ghibli style rally scene",
  },
  {
    id: 3,
    beforeImage: "/images/ghibli-image3-before.webp",
    afterImage: "/images/ghibli-image3-after.webp",
    beforeAlt: "Original lakeside scene",
    afterAlt: "Ghibli style lakeside scene",
  },
];

const activeIndex = ref(0);
const sliderPosition = ref(50);
const containerRef = ref(null);
const isDragging = ref(false);
let autoPlayInterval = null;

const nextSlide = () => {
  activeIndex.value = activeIndex.value === carouselItems.length - 1 ? 0 : activeIndex.value + 1;
};

const prevSlide = () => {
  activeIndex.value = activeIndex.value === 0 ? carouselItems.length - 1 : activeIndex.value - 1;
};

const goToSlide = (index) => {
  activeIndex.value = index;
};

const handleMouseDown = () => {
  isDragging.value = true;
};

const handleMouseUp = () => {
  isDragging.value = false;
};

const handleMouseMove = (e) => {
  if (!isDragging.value || !containerRef.value) return;

  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  sliderPosition.value = Math.min(Math.max(x, 0), 100);
};

const handleTouchMove = (e) => {
  if (!containerRef.value) return;

  const rect = e.currentTarget.getBoundingClientRect();
  const touch = e.touches[0];
  const x = ((touch.clientX - rect.left) / rect.width) * 100;
  sliderPosition.value = Math.min(Math.max(x, 0), 100);
  e.preventDefault();
};

// Auto play functionality
const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    nextSlide();
  }, 3000);
};

// Pause auto play on hover
const pauseAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
};

// Resume auto play on mouse leave
const resumeAutoPlay = () => {
  pauseAutoPlay();
  startAutoPlay();
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
});
</script>

<style scoped>
.translate-x-1\/2 {
  transform: translateX(-50%);
}
.translate-y-1\/2 {
  transform: translateY(-50%);
}
.-translate-x-1\/2 {
  transform: translateX(-50%);
}
.-translate-y-1\/2 {
  transform: translateY(-50%);
}
</style>