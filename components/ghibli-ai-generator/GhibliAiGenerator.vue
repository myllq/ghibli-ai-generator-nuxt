<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
    <!-- Left Column - Controls -->
    <div class="bg-white p-6 rounded-lg border border-gray-200">
      <!-- Step 1: Upload Image -->
      <div class="mb-6">
        <label class="text-lg font-medium mb-2 block">1. Upload Image</label>
        <div
          class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#81b29a] transition-colors h-[200px] flex flex-col items-center justify-center relative"
          @click="!previewUrl && handleImageClick()"
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
          </template>
          <div v-else class="relative w-full h-full flex items-center justify-center">
            <img
              :src="previewUrl"
              alt="Preview"
              class="max-h-full max-w-full object-contain cursor-pointer"
              @click.stop="handleImageClick"
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
          <input 
            ref="fileUpload" 
            type="file" 
            class="hidden" 
            accept="image/*" 
            @change="handleFileChange"
          />
        </div>
      </div>

      <!-- Step 2: Select Style -->
      <div class="mb-6">
        <label class="text-lg font-medium mb-2 block">2. Select Style</label>
        <div class="grid grid-cols-2 md:flex md:items-center md:gap-3">
          <button 
            v-for="style in defaultStyles.slice(0, 3)" 
            :key="style.id"
            class="px-3 py-2 flex flex-col items-center gap-2 rounded-lg transition-all border md:flex-1"
            :class="selectedStyle === style.id ? 'border-[#81b29a] bg-[#81b29a]/5' : 'border-gray-200 hover:border-gray-300'"
            @click="selectedStyle = style.id"
          >
            <div class="w-full aspect-square rounded-md overflow-hidden">
              <img :src="style.icon" :alt="style.name" class="w-full h-full object-cover" />
            </div>
            <span class="text-sm text-center" :class="selectedStyle === style.id ? 'text-[#81b29a]' : 'text-gray-600'">{{ style.name }}</span>
          </button>
          <button 
            class="px-3 py-2 flex flex-col items-center gap-2 rounded-lg transition-all border border-gray-200 hover:border-gray-300 md:flex-1"
            @click="showStyleModal = true"
          >
            <div class="w-full aspect-square rounded-md bg-gray-50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
            <span class="text-sm text-gray-600">More</span>
          </button>
        </div>
      </div>

      <!-- Step 3: Select Ratio -->
      <div class="mb-6">
        <label class="text-lg font-medium mb-2 block">3. Select Ratio</label>
        <div class="flex flex-wrap gap-3">
          <button 
            v-for="ratio in ratios" 
            :key="ratio.value"
            class="px-3 py-2 flex items-center gap-2 rounded-lg transition-all border"
            :class="selectedRatio === ratio.value ? 'border-[#81b29a] bg-[#81b29a]/5' : 'border-gray-200 hover:border-gray-300'"
            @click="selectedRatio = ratio.value"
          >
            <div 
              class="border rounded-sm"
              :class="selectedRatio === ratio.value ? 'border-[#81b29a]' : 'border-gray-400'"
              :style="{
                width: `${ratio.width}px`,
                height: `${ratio.height}px`
              }"
            ></div>
            <span class="text-sm" :class="selectedRatio === ratio.value ? 'text-[#81b29a]' : 'text-gray-600'">{{ ratio.label }}</span>
          </button>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
        {{ errorMessage }}
      </div>

      <!-- Generate Button -->
      <button
        class="w-full bg-[#e07a5f] hover:bg-[#d8603f] text-white py-2 px-4 rounded-md flex items-center justify-center"
        :disabled="!previewUrl || isGenerating"
        :class="{ 'opacity-50 cursor-not-allowed': !previewUrl || isGenerating }"
        @click="handleGenerateClick"
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
          Generate Image (3 Credits)
        </template>
      </button>

      <!-- Hidden download link -->
      <a ref="downloadLink" class="hidden"></a>
    </div>

    <!-- Right Column - Preview -->
    <div ref="previewSectionRef" class="bg-white p-6 rounded-lg border border-gray-200">
      <!-- Tab Header -->
      <div class="flex border-b border-gray-200 mb-4">
        <button 
          class="px-4 py-2 text-[18px] font-medium transition-colors relative"
          :class="!showHistory ? 'text-[#81b29a]' : 'text-gray-500 hover:text-gray-700'"
          @click="showHistory = false"
        >
          Preview
          <div 
            v-if="!showHistory" 
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#81b29a]"
          ></div>
        </button>
        <button 
          class="px-4 py-2 text-[18px] font-medium transition-colors relative"
          :class="showHistory ? 'text-[#81b29a]' : 'text-gray-500 hover:text-gray-700'"
          @click="handleHistoryClick"
        >
          History
          <div 
            v-if="showHistory" 
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#81b29a]"
          ></div>
        </button>
      </div>

      <!-- Tab Content -->
      <div class="min-h-[300px]">
        <!-- History List -->
        <div v-if="showHistory" class="h-[500px]">
          <div v-if="historyLoading && historyItems.length === 0" class="h-full flex items-center justify-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#81b29a]"></div>
          </div>
          <div v-else-if="historyItems.length === 0" class="h-full flex items-center justify-center">
            <div class="text-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-12 w-12 mx-auto mb-4 text-gray-400">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              <p>No history records found</p>
            </div>
          </div>
          <div v-else class="h-full overflow-y-auto pr-2" ref="historyContainer">
            <div class="grid grid-cols-2 gap-4">
              <div 
                v-for="item in historyItems" 
                :key="item.id"
                class="relative"
              >
                <img 
                  :src="item.generate_img_url" 
                  :alt="'Generated image ' + item.id"
                  class="w-full aspect-square object-cover rounded-lg"
                />
                <div class="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap">
                  {{ formatDate(item.created_at) }}
                </div>
                <button
                  class="absolute bottom-2 right-2 bg-white text-gray-800 px-2 py-1 rounded-md text-xs hover:bg-gray-100 transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  @click="downloadHistoryImage(item.generate_img_url)"
                  :disabled="downloadingImageId === item.generate_img_url"
                >
                  <template v-if="downloadingImageId === item.generate_img_url">
                    <div class="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3 animate-spin">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                      </svg>
                      <span>Downloading...</span>
                    </div>
                  </template>
                  <template v-else>
                    <div class="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      <span>Download</span>
                    </div>
                  </template>
                </button>
              </div>
            </div>
            <div v-if="hasMoreHistory" class="py-4 flex justify-center">
              <div v-if="historyLoading" class="animate-spin rounded-full h-6 w-6 border-b-2 border-[#81b29a]"></div>
              <div v-else ref="historyObserver" class="h-4"></div>
            </div>
          </div>
        </div>

        <!-- Preview Content -->
        <div v-else>
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
            <p class="text-gray-500 text-sm mt-1">It takes about 1 minute...</p>
          </div>
          
          <div v-else-if="generatedImage" class="space-y-4">
            <div class="relative h-[300px] rounded-lg overflow-hidden">
              <img 
                :src="generatedImage" 
                alt="Generated Ghibli Image"
                class="absolute inset-0 w-full h-full object-contain"
              />
            </div>
            <div class="flex justify-center gap-4">
              <button
                class="bg-[#e07a5f] hover:bg-[#d8603f] text-white py-2 px-4 rounded-md w-1/2 flex items-center justify-center"
                :disabled="isDownloading(generatedImage)"
                :class="{ 'opacity-75 cursor-wait': isDownloading(generatedImage) }"
                @click="downloadImage"
              >
                <template v-if="isDownloading(generatedImage)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-2 animate-spin">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                  </svg>
                  <span class="text-sm sm:text-base">Downloading...</span>
                </template>
                <template v-else>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span class="text-[14px] sm:text-base">Download</span>
                </template>
              </button>
              <button
                class="bg-[#81b29a] hover:bg-[#6a9d87] text-white py-2 px-4 rounded-md w-1/2 flex items-center justify-center"
                @click="handleShareClick"
                :disabled="hasSharedToday"
                :class="{ 'opacity-50 cursor-not-allowed': hasSharedToday }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-2">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
                <span class="text-[14px] sm:text-base whitespace-nowrap">Share (+100)</span>
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
            <p class="text-gray-400 text-sm">Upload an image to get started</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Share Modal -->
  <div v-if="showShareModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
    <div class="bg-white rounded-lg max-w-lg w-full p-6 relative">
      <!-- Close Button -->
      <button 
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        @click="showShareModal = false"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Modal Content -->
      <h3 class="text-xl font-semibold mb-4 text-[#3d405b]">Share and Earn Credits</h3>
      <p class="text-gray-600 mb-6">Share your creation on social media and earn 10-100 credits!</p>

      <!-- Social Media Icons -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <a href="#" class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50">
          <img src="/images/social/reddit.png" alt="Reddit" class="w-8 h-8 mb-2" />
          <span class="text-sm text-gray-600">Reddit</span>
        </a>
        <a href="#" class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50">
          <img src="/images/social/facebook.png" alt="Facebook" class="w-8 h-8 mb-2" />
          <span class="text-sm text-gray-600">Facebook</span>
        </a>
        <a href="#" class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50">
          <img src="/images/social/instagram.png" alt="Instagram" class="w-8 h-8 mb-2" />
          <span class="text-sm text-gray-600">Instagram</span>
        </a>
        <a href="#" class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50">
          <img src="/images/social/twitter.png" alt="Twitter" class="w-8 h-8 mb-2" />
          <span class="text-sm text-gray-600">Twitter</span>
        </a>
        <a href="#" class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50">
          <img src="/images/social/youtube.png" alt="YouTube" class="w-8 h-8 mb-2" />
          <span class="text-sm text-gray-600">YouTube</span>
        </a>
        <a href="#" class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50">
          <img src="/images/social/tiktok.png" alt="TikTok" class="w-8 h-8 mb-2" />
          <span class="text-sm text-gray-600">TikTok</span>
        </a>
      </div>

      <!-- Copy Link -->
      <div class="mb-6">
        <div class="flex gap-2">
          <input
            type="text"
            :value="generatedImage"
            readonly
            class="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <button
            class="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md"
            @click="copyImageLink"
          >
            Copy
          </button>
        </div>
      </div>

      <!-- Submit URL Form -->
      <div class="space-y-4">
        <div class="flex gap-2">
          <input
            v-model="shareUrl"
            type="text"
            placeholder="Input post url"
            class="flex-1 min-w-0 border border-gray-300 rounded-md px-3 py-2"
          />
          <button
            class="bg-[#81b29a] hover:bg-[#6a9d87] text-white px-4 sm:px-6 py-2 rounded-md whitespace-nowrap"
            :disabled="isSubmitting || hasSharedToday"
            :class="{ 'opacity-50 cursor-not-allowed': isSubmitting || hasSharedToday }"
            @click="submitShare"
          >
            <span class="text-[14px] sm:text-base">{{ isSubmitting ? 'Submitting...' : 'Submit' }}</span>
          </button>
        </div>
        <p v-if="shareError" class="text-red-500 text-sm">{{ shareError }}</p>
        <p v-if="hasSharedToday" class="text-gray-500 text-sm">You've already received sharing rewards today. Come back tomorrow!</p>
      </div>
    </div>
  </div>

  <!-- Style Modal -->
  <div v-if="showStyleModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
    <div class="bg-white rounded-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
      <!-- Close Button -->
      <button 
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        @click="showStyleModal = false"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Modal Content -->
      <h3 class="text-xl font-semibold mb-4 text-[#3d405b]">Select Style</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <button 
          v-for="style in allStyles" 
          :key="style.id"
          class="px-3 py-2 flex flex-col items-center gap-2 rounded-lg transition-all border"
          :class="selectedStyle === style.id ? 'border-[#81b29a] bg-[#81b29a]/5' : 'border-gray-200 hover:border-gray-300'"
          @click="handleStyleSelect(style.id)"
        >
          <div class="w-full aspect-square rounded-md overflow-hidden">
            <img :src="style.icon" :alt="style.name" class="w-full h-full object-cover" />
          </div>
          <span class="text-sm text-center" :class="selectedStyle === style.id ? 'text-[#81b29a]' : 'text-gray-600'">{{ style.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, nextTick, computed } from 'vue';

const config = useRuntimeConfig();
const { apiBaseUrl, apiEndpoints } = config.public;

const previewUrl = ref(null);
const selectedFile = ref(null);
const generatedImage = ref(null);
const isGenerating = ref(false);
const progress = ref(0);
const prompt = ref("");
const selectedRatio = ref("3:2");
const fileUpload = ref(null);
const downloadLink = ref(null);
const taskId = ref(null);
const errorMessage = ref(null);
const pollingInterval = ref(null);
const previewSectionRef = ref(null);

// 分享相关的状态
const showShareModal = ref(false);
const shareUrl = ref('');
const shareError = ref('');
const isSubmitting = ref(false);
const hasSharedToday = ref(false);

// 风格选择相关
const showStyleModal = ref(false);
const selectedStyle = ref('ghibli');

// 默认展示的风格
const defaultStyles = [
  { id: 'ghibli', name: 'Ghibli Style', icon: '/images/styles/ghibli.webp' },
  { id: 'pixar', name: 'Pixar Style', icon: '/images/styles/pixar.webp' },
  { id: 'child3d', name: 'Child 3D Icon', icon: '/images/styles/child3d.webp' },
  { id: 'sketch', name: 'Sketch Style', icon: '/images/styles/sketch.webp' },
];

// 所有可用的风格
const allStyles = [
  { id: 'ghibli', name: 'Ghibli Style', icon: '/images/styles/ghibli.webp' },
  { id: 'pixar', name: 'Pixar Style', icon: '/images/styles/pixar.webp' },
  { id: 'child3d', name: 'Child 3D Icon', icon: '/images/styles/child3d.webp' },
  { id: 'sketch', name: 'Sketch Style', icon: '/images/styles/sketch.webp' },
  { id: 'snoopy', name: 'Snoopy Style', icon: '/images/styles/snoopy.webp' },
  { id: 'disney', name: 'Disney Style', icon: '/images/styles/disney.webp' },
  { id: 'pixel', name: 'Pixel Style', icon: '/images/styles/pixel.webp' },
  { id: 'painting', name: 'Painting Style', icon: '/images/styles/painting.webp' },
];

// 比例选项
const ratios = [
  { value: '3:2', label: '3:2', width: 15, height: 10 },
  { value: '2:3', label: '2:3', width: 10, height: 15 },
  { value: '1:1', label: '1:1', width: 12, height: 12 },
];

// 在 script setup 部分添加
const showHistory = ref(false);
const historyItems = ref([]);
const historyLoading = ref(false);
const currentPage = ref(1);
const hasMoreHistory = ref(true);
const historyObserver = ref(null);
const historyContainer = ref(null);

// 添加下载状态变量
const downloadingImageId = ref(null);

// 添加计算属性
const isDownloading = (imageUrl) => computed(() => downloadingImageId.value === imageUrl);

// 添加 handleHistoryClick 方法
const handleHistoryClick = () => {
  showHistory.value = true;
  // 重置状态
  historyItems.value = [];
  currentPage.value = 1;
  hasMoreHistory.value = true;
  // 加载数据
  loadHistory();
};

// 修改下载历史图片方法
const downloadHistoryImage = async (imageUrl) => {
  if (downloadingImageId.value) return;
  
  try {
    downloadingImageId.value = imageUrl;
    
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Download failed');
    
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.href = blobUrl;
    tempLink.download = `ghibli-style-${Date.now()}.webp`;
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download history image error:', error);
  } finally {
    // 添加一个小延迟，确保用户能看到加载状态
    setTimeout(() => {
      downloadingImageId.value = null;
    }, 500);
  }
};

// 修改 loadHistory 方法
const loadHistory = async () => {
  if (historyLoading.value || !hasMoreHistory.value) return;
  
  try {
    historyLoading.value = true;
    const response = await fetch(
      `${apiBaseUrl}/api/v1/images/history?app_id=ghibli_ai_generator&platform=ghibli_image_generator&page=${currentPage.value}&limit=10`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    const result = await response.json();
    
    if (result.code === 200) {
      const { items, total } = result.data;
      // 保存当前滚动位置
      const container = historyContainer.value;
      const scrollPosition = container?.scrollTop || 0;
      
      // 添加新数据
      historyItems.value = [...historyItems.value, ...items];
      hasMoreHistory.value = historyItems.value.length < total;
      currentPage.value++;
      
      // 在下一个 tick 后恢复滚动位置
      nextTick(() => {
        if (container) {
          container.scrollTop = scrollPosition;
        }
      });
    } else {
      console.error('Load history failed:', result.msg);
      hasMoreHistory.value = false;
    }
  } catch (error) {
    console.error('Load history error:', error);
    hasMoreHistory.value = false;
  } finally {
    historyLoading.value = false;
  }
};

// 检查今日是否已分享
const checkTodayShared = () => {
  const lastSharedDate = localStorage.getItem('lastSharedDate');
  const today = new Date().toISOString().split('T')[0];
  hasSharedToday.value = lastSharedDate === today;
};

// 处理分享按钮点击
const handleShareClick = () => {
  checkTodayShared();
  showShareModal.value = true;
};

// 检查用户登录状态和积分
const checkUserStatus = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}${apiEndpoints.user.info}`, {
      credentials: 'include',
    });
    const data = await res.json();
    
    if (data.code === 200) {
      // 更新 header 中的积分显示
      emit('updateCredits', {
        user: data.data.user,
        credits: data.data.credits
      });
      
      // 检查积分是否足够
      if (data.data.credits < 3) {
        errorMessage.value = 'Insufficient credits. Please recharge';
        return false;
      }
      return true;
    } else {
      emit('showLogin');
      errorMessage.value = 'Please login to continue';
      return false;
    }
  } catch (error) {
    console.error('Check user status error:', error);
    errorMessage.value = 'Network error. Please check your connection';
    return false;
  }
};

// 更新用户积分
const updateUserCredits = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}${apiEndpoints.user.info}`, {
      credentials: 'include',
    });
    const data = await res.json();
    if (data.code === 200) {
      emit('updateCredits', {
        user: data.data.user,
        credits: data.data.credits
      });
    }
  } catch (error) {
    console.error('Update credits error:', error);
  }
};

const createTask = async () => {
  try {
    errorMessage.value = null;
    
    // 先检查登录状态和积分
    const canProceed = await checkUserStatus();
    if (!canProceed) {
      return false;
    }
    
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    formData.append('size', String(selectedRatio.value));
    formData.append('style', selectedStyle.value);

    const response = await fetch(`${apiBaseUrl}${apiEndpoints.images.task}`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    
    // 处理413错误
    if (response.status === 413) {
      errorMessage.value = 'File size too large. Please try a smaller image';
      return false;
    }
    
    const result = await response.json();
    
    if (result.code === 200) {
      taskId.value = result.data.task_id;
      // 创建任务成功后更新积分
      await updateUserCredits();
      return true;
    }
    
    // Handle error states
    switch (result.code) {
      case 401:
        errorMessage.value = 'Authentication failed. Please login again';
        emit('showLogin');
        break;
      case 402:
        errorMessage.value = 'Insufficient credits. Please recharge';
        break;
      case 422:
        errorMessage.value = 'Invalid parameters. Please check your input';
        break;
      case 429:
        errorMessage.value = 'Too many requests. Please try again later';
        break;
      case 455:
        errorMessage.value = 'System maintenance. Please try again later';
        break;
      case 505:
        errorMessage.value = 'This feature is temporarily unavailable';
        break;
      default:
        errorMessage.value = 'Failed to create task. Please try again';
    }
    return false;
  } catch (error) {
    console.error('Create task error:', error);
    errorMessage.value = 'Network error. Please check your connection';
    return false;
  }
};

const checkTaskStatus = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}${apiEndpoints.images.task}?task_id=${taskId.value}`, {
      credentials: 'include'
    });
    const result = await response.json();
    
    if (result.code === 200) {
      const { progress: taskProgress, status, output, error_code, error_msg } = result.data;
      
      switch (status) {
        case 'GENERATING':
          progress.value = Math.round(parseFloat(taskProgress) * 100);
          pollingInterval.value = setTimeout(checkTaskStatus, 5000);
          break;
          
        case 'SUCCESS':
          progress.value = 100;
          isGenerating.value = false;
          generatedImage.value = output;
          // 生成成功后更新积分
          await updateUserCredits();
          break;
          
        case 'CREATE_TASK_FAILED':
        case 'GENERATE_FAILED':
          isGenerating.value = false;
          progress.value = 0;
          
          if (error_code === 400) {
            errorMessage.value = 'Content violation detected';
          } else if (error_code === 451) {
            errorMessage.value = 'Failed to download image';
          } else {
            errorMessage.value = error_msg || 'Generation failed. Please try again';
          }
          // 生成失败后更新积分
          await updateUserCredits();
          break;
      }
    }
  } catch (error) {
    console.error('Check task status error:', error);
    isGenerating.value = false;
    progress.value = 0;
    errorMessage.value = 'Network error. Please check your connection';
    // 发生错误时也更新积分
    await updateUserCredits();
  }
};

const handleGenerateClick = async () => {
  // 如果是移动端，立即滚动
  if (window.innerWidth <= 768) {
    const yOffset = -20;
    const y = previewSectionRef.value.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
    window.scrollTo({
      top: y,
      behavior: 'smooth',
      duration: 500
    });
  }
  
  // 执行生成图片
  await generateImage();
};

const generateImage = async () => {
  if (!previewUrl.value) return;
  
  isGenerating.value = true;
  progress.value = 0;
  errorMessage.value = null;

  const success = await createTask();
  
  if (success) {
    // 立即进行第一次查询
    checkTaskStatus();
  } else {
    isGenerating.value = false;
  }
};

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

const resetGenerator = () => {
  selectedFile.value = null;
  previewUrl.value = null;
  generatedImage.value = null;
  progress.value = 0;
  errorMessage.value = null;
  taskId.value = null;
  
  if (pollingInterval.value) {
    clearTimeout(pollingInterval.value);
    pollingInterval.value = null;
  }
};

const downloadImage = async () => {
  if (generatedImage.value && !downloadingImageId.value) {
    try {
      downloadingImageId.value = generatedImage.value;
      
      // 获取图片数据
      const response = await fetch(generatedImage.value);
      const blob = await response.blob();
      
      // 创建临时的 blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // 创建临时下载链接
      const tempLink = document.createElement('a');
      tempLink.href = blobUrl;
      tempLink.download = `ghibli-style-${Date.now()}.webp`;
      
      // 触发下载
      document.body.appendChild(tempLink);
      tempLink.click();
      
      // 清理
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download error:', error);
      errorMessage.value = 'Failed to download image. Please try again.';
    } finally {
      downloadingImageId.value = null;
    }
  }
};

const emit = defineEmits(['showLogin', 'updateCredits']);

// 复制图片链接
const copyImageLink = () => {
  navigator.clipboard.writeText(generatedImage.value)
    .then(() => {
      alert('Link copied to clipboard!');
    })
    .catch(() => {
      alert('Failed to copy link');
    });
};

// 提交分享链接
const submitShare = async () => {
  if (!shareUrl.value) {
    shareError.value = 'Please input the post url';
    return;
  }

  if (hasSharedToday.value) {
    shareError.value = 'You can only receive sharing rewards once per day';
    return;
  }

  try {
    isSubmitting.value = true;
    shareError.value = '';

    const response = await fetch(`${apiBaseUrl}${apiEndpoints.user.share}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        url: shareUrl.value
      })
    });

    const result = await response.json();

    if (result.code === 200) {
      // 记录分享日期
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('lastSharedDate', today);
      hasSharedToday.value = true;

      // 更新积分
      emit('updateCredits', {
        credits: result.data.credits
      });
      alert('Thanks for sharing! The sharing link is under review.');
      showShareModal.value = false;
      shareUrl.value = '';
    } else if (result.code === 401) {
      emit('showLogin');
    } else {
      shareError.value = result.msg || 'Failed to submit share url';
    }
  } catch (error) {
    console.error('Submit share error:', error);
    shareError.value = 'Network error. Please try again';
  } finally {
    isSubmitting.value = false;
  }
};

// 处理风格选择
const handleStyleSelect = (styleId) => {
  selectedStyle.value = styleId;
  showStyleModal.value = false;
};

// 修改 handleImageClick 方法
const handleImageClick = () => {
  const input = fileUpload.value;
  if (input) {
    input.value = ''; // 清除之前的选择
    input.click();
  }
};

// 设置无限滚动观察器
onMounted(() => {
  checkTodayShared();
  
  // 设置无限滚动观察器
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && showHistory.value && !historyLoading.value) {
        loadHistory();
      }
    },
    { threshold: 0.1 }
  );

  watch(historyObserver, (el) => {
    if (el) {
      observer.observe(el);
    }
  });

  onUnmounted(() => {
    if (historyObserver.value) {
      observer.unobserve(historyObserver.value);
    }
  });
});

// 添加日期格式化函数
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
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

/* 添加模态框动画 */
.fixed {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 添加滚动条样式 */
.max-h-\[90vh\] {
  scrollbar-width: thin;
  scrollbar-color: #81b29a #f3f4f6;
}

.max-h-\[90vh\]::-webkit-scrollbar {
  width: 6px;
}

.max-h-\[90vh\]::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

.max-h-\[90vh\]::-webkit-scrollbar-thumb {
  background-color: #81b29a;
  border-radius: 3px;
}

/* 添加水平滚动条样式 */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: #81b29a #f3f4f6;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: #81b29a;
  border-radius: 3px;
}

/* 添加垂直滚动条样式 */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #81b29a #f3f4f6;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #81b29a;
  border-radius: 3px;
}
</style>