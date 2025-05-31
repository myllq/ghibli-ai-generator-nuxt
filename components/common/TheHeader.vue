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
      class="bg-[#e07a5f] hover:bg-[#d8603f] text-white px-6 py-2 rounded-md w-auto flex items-center justify-center"
      @click="showLoginModal = true"
    >
      Sign Up — It's Free
    </button>
    <div
      v-if="showLoginModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      @click.self="showLoginModal = false"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl transform transition-all">
        <div class="text-center">
          <div class="relative w-[150px] h-[90px] mx-auto mb-6">
            <img
              src="/images/ghibli-ai-generator-logo.png"
              alt="Ghibli AI Generator Logo"
              class="object-contain w-full h-full"
            />
          </div>
          <h2 class="text-2xl font-bold text-[#3d405b] mb-2">
            Welcome to Ghibli AI Generator
          </h2>
          <p class="text-gray-600 mb-8">
            Sign in to start creating magical Ghibli-style images
          </p>
          <button
            @click="handleGoogleLogin"
            class="w-full bg-white border border-gray-300 rounded-lg px-6 py-3 flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors"
          >
            <img 
              src="/images/google-logo.png" 
              alt="Google" 
              class="w-5 h-5"
            />
            <span class="text-gray-700 font-medium">Continue with Google</span>
          </button>
          <p class="mt-6 text-sm text-gray-500">
            By continuing, you agree to our 
            <a href="/terms" class="text-[#e07a5f] hover:underline">Terms of Service</a> 
            and 
            <a href="/privacy" class="text-[#e07a5f] hover:underline">Privacy Policy</a>
          </p>
        </div>
        <button
          @click="showLoginModal = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const showLoginModal = ref(false);

const handleGoogleLogin = async () => {
  try {
    // TODO: 实现 Google 登录逻辑
    console.log('Google login clicked');
  } catch (error) {
    console.error('Login error:', error);
  }
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style> 