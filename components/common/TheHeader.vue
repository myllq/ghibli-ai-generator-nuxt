<template>
  <header class="container mx-auto py-1 px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
    <div class="flex items-center">
      <div class="relative w-[150px] h-[60px] sm:h-[90px]">
        <img
          src="/images/ghibli-ai-generator-logo.png"
          alt="Ghibli AI Generator Logo"
          class="object-contain object-left absolute inset-0 w-full h-full"
        />
      </div>
      <span class="text-lg sm:text-xl font-bold text-[#3d405b] ml-2">GhibliAIGenerator</span>
    </div>
    <button 
      class="bg-[#e07a5f] hover:bg-[#d8603f] text-white px-4 py-2 rounded-md w-full sm:w-auto flex items-center justify-center"
      @click="$emit('scroll-to-generator')"
    >
      Try Ghibli AI Generator
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
        class="w-5 h-5 ml-2"
      >
        <path d="M15 4V2" />
        <path d="M15 16v-2" />
        <path d="M8 9h2" />
        <path d="M20 9h2" />
        <path d="M17.8 11.8 19 13" />
        <path d="M15 9h0" />
        <path d="M17.8 6.2 19 5" />
        <path d="M3 21l9-9" />
        <path d="M12.2 6.2 11 5" />
      </svg>
    </button>
  </header>
</template>

<script setup>
defineEmits(['scroll-to-generator']);
</script> 