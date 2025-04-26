<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
    <!-- Left Column - Controls -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-6 text-[#3d405b]">Generate Ghibli Image</h3>

      <!-- Step 1: Upload Image -->
      <div class="mb-6">
        <label class="text-lg font-medium mb-2 block">1. Upload Image</label>
        <div
          class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#81b29a] transition-colors h-[200px] flex flex-col items-center justify-center relative"
          @click="!previewUrl && $refs.fileUpload.click()"
          @drop.prevent="handleDrop"
          @dragover.prevent
        >
          <template v-if="!previewUrl">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-10 w-10 mx-auto mb-4 text-gray-400">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <p class="text-gray-500 mb-2">Drag and drop your image here</p>
            <p class="text-gray-400 text-sm mb-4">or click to browse</p>
            <button class="border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 mx-auto">
              Select Image
            </button>
            <input ref="fileUpload" type="file" class="hidden" accept="image/*" @change="handleFileChange" />
          </template>
          <div v-else class="relative w-full h-full flex items-center justify-center">
            <img
              :src="previewUrl"
              alt="Preview"
              class="max-h-full max-w-full object-contain"
            />
            <button
              class="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full h-8 w-8 p-1 border border-gray-200 flex items-center justify-center"
              @click.stop="resetGenerator"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Step 2: Enter Prompt -->
      <div class="mb-6">
        <label class="text-lg font-medium mb-2 block">2. Enter Prompt</label>
        <textarea
          v-model="prompt"
          placeholder="Convert photos to Ghibli style"
          class="w-full min-h-[100px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#81b29a]"
        ></textarea>
      </div>

      <!-- Step 3: Select Ratio -->
      <div class="mb-6">
        <label class="text-lg font-medium mb-2 block">3. Select Ratio</label>
        <div class="flex space-x-4">
          <div class="flex items-center space-x-2">
            <input 
              type="radio" 
              id="ratio-3-2" 
              value="3:2" 
              v-model="selectedRatio"
              class="h-4 w-4 text-[#81b29a] focus:ring-[#81b29a]" 
            />
            <label for="ratio-3-2">3:2</label>
          </div>
          <div class="flex items-center space-x-2">
            <input 
              type="radio" 
              id="ratio-2-3" 
              value="2:3" 
              v-model="selectedRatio"
              class="h-4 w-4 text-[#81b29a] focus:ring-[#81b29a]" 
            />
            <label for="ratio-2-3">2:3</label>
          </div>
          <div class="flex items-center space-x-2">
            <input 
              type="radio" 
              id="ratio-1-1" 
              value="1:1" 
              v-model="selectedRatio"
              class="h-4 w-4 text-[#81b29a] focus:ring-[#81b29a]" 
            />
            <label for="ratio-1-1">1:1</label>
          </div>
        </div>
      </div>

      <!-- Generate Button -->
      <button
        class="w-full bg-[#e07a5f] hover:bg-[#d8603f] text-white py-2 px-4 rounded-md flex items-center justify-center"
        :disabled="!previewUrl || isGenerating"
        @click="generateImage"
      >
        <template v-if="isGenerating">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-2 animate-spin">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
          </svg>
          Generating...
        </template>
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-2">
            <path d="M15 4V2"></path>
            <path d="M15 16v-2"></path>
            <path d="M8 9h2"></path>
            <path d="M20 9h2"></path>
            <path d="M17.8 11.8 19 13"></path>
            <path d="M15 9h0"></path>
            <path d="M17.8 6.2 19 5"></path>
            <path d="M3 21l9-9"></path>
            <path d="M12.2 6.2 11 5"></path>
          </svg>
          Generate Image
        </template>
      </button>

      <!-- Hidden download link -->
      <a ref="downloadLink" class="hidden"></a>
    </div>

    <!-- Right Column - Preview -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4 text-[#3d405b]">Preview</h3>

      <div v-if="isGenerating" class="flex flex-col items-center justify-center h-[300px]">
        <div class="relative h-40 w-40 mb-4">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="h-32 w-32 rounded-full border-4 border-[#e07a5f] border-opacity-25"></div>
            <div
              class="absolute h-32 w-32 rounded-full border-t-4 border-[#e07a5f] animate-spin"
              :style="{
                clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin(progress * 0.0628)}% ${50 - 50 * Math.cos(progress * 0.0628)}%, 50% 50%)`
              }"
            ></div>
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-xl font-bold text-[#3d405b]">{{ progress }}%</span>
          </div>
        </div>
        <p class="text-gray-500">Generating your Ghibli-style image...</p>
      </div>
      
      <div v-else-if="generatedImage" class="space-y-4">
        <div class="relative h-[300px] rounded-lg overflow-hidden">
          <img
            :src="generatedImage"
            alt="Generated Ghibli Image"
            class="absolute inset-0 w-full h-full object-contain"
          />
        </div>
        <div class="flex justify-center">
          <button class="bg-[#81b29a] hover:bg-[#6a9d87] text-white py-2 px-4 rounded-md w-full flex items-center justify-center" @click="downloadImage">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download
          </button>
        </div>
      </div>
      
      <div v-else class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center h-[300px] flex flex-col items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-12 w-12 mx-auto mb-4 text-gray-400">
          <path d="M15 4V2"></path>
          <path d="M15 16v-2"></path>
          <path d="M8 9h2"></path>
          <path d="M20 9h2"></path>
          <path d="M17.8 11.8 19 13"></path>
          <path d="M15 9h0"></path>
          <path d="M17.8 6.2 19 5"></path>
          <path d="M3 21l9-9"></path>
          <path d="M12.2 6.2 11 5"></path>
        </svg>
        <p class="text-gray-500 mb-4">Your Ghibli-style image will appear here</p>
        <p class="text-gray-400 text-sm">Upload an image and enter a prompt to get started</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const previewUrl = ref(null);
const selectedFile = ref(null);
const generatedImage = ref(null);
const isGenerating = ref(false);
const progress = ref(0);
const prompt = ref("");
const selectedRatio = ref("3:2");
const fileUpload = ref(null);
const downloadLink = ref(null);

const handleFileChange = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    selectedFile.value = file;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      previewUrl.value = fileReader.result;
    };
    fileReader.readAsDataURL(file);
    generatedImage.value = null;
  }
};

const handleDrop = (e) => {
  const file = e.dataTransfer.files?.[0];
  if (file) {
    selectedFile.value = file;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      previewUrl.value = fileReader.result;
    };
    fileReader.readAsDataURL(file);
    generatedImage.value = null;
  }
};

const generateImage = () => {
  if (!previewUrl.value) return;

  isGenerating.value = true;
  progress.value = 0;

  // Simulate progress
  const interval = setInterval(() => {
    progress.value += 5;
    if (progress.value >= 100) {
      clearInterval(interval);
      progress.value = 100;
    }
  }, 100);

  // Simulate image generation with a timeout
  setTimeout(() => {
    // For demo purposes, we're just using placeholder images
    // In a real app, you would call your AI service here
    generatedImage.value = `/images/ghibli-image${Math.floor(Math.random() * 3) + 1}-after.webp`;
    isGenerating.value = false;
    clearInterval(interval);
    progress.value = 100;
  }, 2000);
};

const resetGenerator = () => {
  selectedFile.value = null;
  previewUrl.value = null;
  generatedImage.value = null;
  prompt.value = "";
  progress.value = 0;
};

const downloadImage = () => {
  if (generatedImage.value && downloadLink.value) {
    // Create a temporary link to download the image
    downloadLink.value.href = generatedImage.value;
    downloadLink.value.download = `ghibli-style-${Date.now()}.webp`;
    downloadLink.value.click();
  }
};
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>