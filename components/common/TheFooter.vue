<template>
  <footer class="bg-white text-gray-600 py-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- About -->
        <div>
          <div class="mb-4">
            <div class="relative w-full h-[60px]">
              <img
                src="/images/ghibli-ai-generator-logo.png"
                alt="Ghibli AI Generator Logo"
                class="object-contain object-left absolute inset-0 w-full h-full"
              />
            </div>
          </div>
          <p class="text-sm">
            GhibliAIGenerator is a free online tool that transforms your photos into the magical style of Studio Ghibli
            using advanced AI technology.
          </p>
        </div>

        <!-- AI Image Generator -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-[#3d405b]">AI Image Generator</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="/" class="hover:text-[#3d405b]">Ghibli AI Generator</a>
            </li>
          </ul>
        </div>

        <!-- About Us -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-[#3d405b]">About Us</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="#" class="hover:text-[#3d405b]">Privacy Policy</a>
            </li>
            <li>
              <a href="#" class="hover:text-[#3d405b]">Terms of Service</a>
            </li>
          </ul>
        </div>

        <!-- Contact Us -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-[#3d405b]">Contact Us</h3>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span>ghibliaigeneratorio@gmail.com</span>
            </li>
          </ul>
          <div class="mt-4 flex gap-4">
            <a href="#" class="text-gray-600 hover:text-[#3d405b]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-600 hover:text-[#3d405b]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a href="#" class="text-gray-600 hover:text-[#3d405b]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-600 hover:text-[#3d405b]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>&copy; {{ new Date().getFullYear() }} GhibliAIGenerator. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineEmits(['scroll-to']);
</script> 