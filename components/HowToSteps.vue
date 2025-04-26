<template>
  <div class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
    <!-- Left side: Steps - now takes 7 columns instead of 6 -->
    <div class="md:col-span-7 space-y-4 md:space-y-6 bg-[#f8f5f0]/50 p-4 md:p-6 rounded-lg">
      <h3 class="text-xl md:text-2xl font-semibold text-[#3d405b] mb-4">Follow These Simple Steps</h3>
      <div v-for="step in steps" :key="step.number" class="flex items-start gap-3 md:gap-4">
        <!-- Step Number Circle -->
        <div
          class="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white"
          :style="{ backgroundColor: step.color }"
        >
          <component :is="step.icon" />
        </div>

        <!-- Content -->
        <div class="flex-grow">
          <h4 class="text-base md:text-lg font-semibold mb-1 flex items-center">
            <span class="mr-2">Step {{ step.number }}:</span>
            {{ step.title }}
          </h4>
          <p class="text-sm md:text-base text-gray-600">{{ step.description }}</p>
        </div>
      </div>
    </div>

    <!-- Right side: How-to image - now takes 5 columns and has adjusted height -->
    <div class="md:col-span-5 relative h-[500px] md:h-[600px] rounded-lg overflow-hidden shadow-lg border border-gray-100">
      <img
        src="/images/how-to-generate-ghibli-art.png"
        alt="How to use Ghibli AI Generator"
        class="absolute inset-0 w-full h-full object-contain"
      />
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue';

// Create icon components
const Upload = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '20',
  height: '20',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  class: 'h-5 w-5 md:h-6 md:w-6'
}, [
  h('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
  h('polyline', { points: '17 8 12 3 7 8' }),
  h('line', { x1: '12', y1: '3', x2: '12', y2: '15' })
]);

const Wand2 = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '20',
  height: '20',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  class: 'h-5 w-5 md:h-6 md:w-6'
}, [
  h('path', { d: 'M15 4V2' }),
  h('path', { d: 'M15 16v-2' }),
  h('path', { d: 'M8 9h2' }),
  h('path', { d: 'M20 9h2' }),
  h('path', { d: 'M17.8 11.8 19 13' }),
  h('path', { d: 'M15 9h0' }),
  h('path', { d: 'M17.8 6.2 19 5' }),
  h('path', { d: 'M3 21l9-9' }),
  h('path', { d: 'M12.2 6.2 11 5' })
]);

const ArrowRight = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '20',
  height: '20',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  class: 'h-5 w-5 md:h-6 md:w-6'
}, [
  h('path', { d: 'M5 12h14' }),
  h('path', { d: 'm12 5 7 7-7 7' })
]);

const Download = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '20',
  height: '20',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  class: 'h-5 w-5 md:h-6 md:w-6'
}, [
  h('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
  h('polyline', { points: '7 10 12 15 17 10' }),
  h('line', { x1: '12', y1: '15', x2: '12', y2: '3' })
]);

const steps = [
  {
    number: 1,
    title: "Upload Your Image",
    description: "Click the upload button or drag and drop your photo into the designated area.",
    icon: Upload,
    color: "#f2cc8f",
  },
  {
    number: 2,
    title: "Enter Your Prompt",
    description: "Describe the style or elements you want in your Ghibli transformation.",
    icon: Wand2,
    color: "#81b29a",
  },
  {
    number: 3,
    title: "Select Options",
    description: "Choose your preferred aspect ratio and other generation settings.",
    icon: ArrowRight,
    color: "#e07a5f",
  },
  {
    number: 4,
    title: "Download Your Creation",
    description: "Once generated, download your Ghibli-style artwork in high resolution.",
    icon: Download,
    color: "#3d405b",
  },
];
</script>