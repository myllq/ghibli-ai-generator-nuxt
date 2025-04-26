<template>
  <div class="w-full">
    <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-200">
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

const openIndex = ref(null);

const toggleAccordion = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

const faqs = [
  {
    question: "Is the Ghibli AI Generator really free?",
    answer:
      "Yes, our Ghibli AI Generator is completely free to use. There are no hidden fees, subscriptions, or premium tiers. You can generate and download as many Ghibli-style images as you want without paying anything.",
  },
  {
    question: "Do I need to create an account to use the generator?",
    answer:
      "No, you don't need to create an account or sign up. Our Ghibli AI Generator is designed to be hassle-free, allowing you to start transforming your images immediately without any registration process.",
  },
  {
    question: "What types of images work best with the Ghibli AI Generator?",
    answer:
      "The Ghibli AI Generator works well with a variety of images, including landscapes, portraits, and nature scenes. Images with clear subjects and good lighting tend to produce the best results. Both color and black-and-white photos can be transformed.",
  },
  {
    question: "How long does it take to generate a Ghibli-style image?",
    answer:
      "Most images are processed within 10-30 seconds, depending on the complexity of the original image and current server load. Our AI is optimized for speed while maintaining high-quality output.",
  },
  {
    question: "What is the maximum file size and supported formats?",
    answer:
      "We support JPG, PNG, and WEBP formats with a maximum file size of 10MB. For optimal results, we recommend using images with a resolution of at least 1024x1024 pixels.",
  },
  {
    question: "Can I use the generated images commercially?",
    answer:
      "The images you generate with our Ghibli AI Generator are yours to use for personal projects. For commercial use, please ensure you have the rights to the original images you upload, and be aware of potential copyright considerations regarding the Ghibli art style.",
  },
  {
    question: "How many different Ghibli styles are available?",
    answer:
      "Currently, we offer 5 different Ghibli-inspired style variations, each capturing different aspects of the iconic Studio Ghibli aesthetic. We regularly update and add new styles based on user feedback.",
  },
  {
    question: "Is there a limit to how many images I can generate?",
    answer:
      "There is no strict limit on the number of images you can generate. However, to ensure fair usage for all users, we may implement temporary limits during periods of extremely high demand.",
  },
];
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>