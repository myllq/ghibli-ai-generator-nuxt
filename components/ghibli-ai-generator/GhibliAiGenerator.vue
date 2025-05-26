<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
    <!-- Left Column - Controls -->
    <div class="bg-white p-6 rounded-lg border border-gray-200">
      

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

      <!-- Step 2: Select Ratio -->
      <div class="mb-6">
        <label class="text-lg font-medium mb-2 block">2. Select Ratio</label>
        <div class="flex space-x-3">
          <button 
            class="px-4 py-3 flex items-center gap-2 rounded-lg transition-all border"
            :class="selectedRatio === '3:2' ? 'border-[#81b29a] bg-[#81b29a]/5' : 'border-gray-200 hover:border-gray-300'"
            @click="selectedRatio = '3:2'"
          >
            <div class="w-5 h-4 border rounded-sm"
              :class="selectedRatio === '3:2' ? 'border-[#81b29a]' : 'border-gray-400'"
            ></div>
            <span class="text-sm" :class="selectedRatio === '3:2' ? 'text-[#81b29a]' : 'text-gray-600'">3:2</span>
          </button>
          
          <button 
            class="px-4 py-3 flex items-center gap-2 rounded-lg transition-all border"
            :class="selectedRatio === '2:3' ? 'border-[#81b29a] bg-[#81b29a]/5' : 'border-gray-200 hover:border-gray-300'"
            @click="selectedRatio = '2:3'"
          >
            <div class="w-4 h-5 border rounded-sm"
              :class="selectedRatio === '2:3' ? 'border-[#81b29a]' : 'border-gray-400'"
            ></div>
            <span class="text-sm" :class="selectedRatio === '2:3' ? 'text-[#81b29a]' : 'text-gray-600'">2:3</span>
          </button>
          
          <button 
            class="px-4 py-3 flex items-center gap-2 rounded-lg transition-all border"
            :class="selectedRatio === '1:1' ? 'border-[#81b29a] bg-[#81b29a]/5' : 'border-gray-200 hover:border-gray-300'"
            @click="selectedRatio = '1:1'"
          >
            <div class="w-4 h-4 border rounded-sm"
              :class="selectedRatio === '1:1' ? 'border-[#81b29a]' : 'border-gray-400'"
            ></div>
            <span class="text-sm" :class="selectedRatio === '1:1' ? 'text-[#81b29a]' : 'text-gray-600'">1:1</span>
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
          Generate Image
        </template>
      </button>

      <!-- Hidden download link -->
      <a ref="downloadLink" class="hidden"></a>
    </div>

    <!-- Right Column - Preview -->
    <div ref="previewSectionRef" class="bg-white p-6 rounded-lg border border-gray-200">
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
        <div class="flex justify-center">
          <button 
            class="bg-[#81b29a] hover:bg-[#6a9d87] text-white py-2 px-4 rounded-md w-full flex items-center justify-center"
            :disabled="isDownloading"
            :class="{ 'opacity-75 cursor-wait': isDownloading }"
            @click="downloadImage"
          >
            <template v-if="isDownloading">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-2 animate-spin">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
              </svg>
              Downloading...
            </template>
            <template v-else>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download
            </template>
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
</template>

<script setup>
import { ref, onMounted } from 'vue';

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

// 添加使用次数相关的变量
const MAX_DAILY_USES = 3;

// 添加下载状态变量
const isDownloading = ref(false);

// 检查今日使用次数
const checkDailyLimit = () => {
  const today = new Date().toISOString().split('T')[0];
  const usageKey = `ghibli_daily_usage_${today}`;
  
  // 获取今日使用次数
  let dailyUsage = localStorage.getItem(usageKey);
  if (!dailyUsage) {
    localStorage.setItem(usageKey, '0');
    return 0;
  }
  
  return parseInt(dailyUsage);
};

// 增加使用次数
const incrementDailyUsage = () => {
  const today = new Date().toISOString().split('T')[0];
  const usageKey = `ghibli_daily_usage_${today}`;
  
  let currentUsage = checkDailyLimit();
  localStorage.setItem(usageKey, (currentUsage + 1).toString());
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

const createTask = async () => {
  try {
    errorMessage.value = null;
    
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    formData.append('size', String(selectedRatio.value));

    // 测试环境：http://localhost:8000/api/v1/images/task
    // 生产环境：https://api.ghibliaigenerator.io/api/v1/images/task

    const response = await fetch('https://api.ghibliaigenerator.io/api/v1/images/task', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.code === 200) {
      taskId.value = result.data.task_id;
      return true;
    }
    
    // Handle error states
    switch (result.code) {
      case 401:
        errorMessage.value = 'Authentication failed. Please log in again.';
        break;
      case 402:
        errorMessage.value = 'Insufficient credits.';
        break;
      case 422:
        errorMessage.value = 'Invalid parameters. Please check your input.';
        break;
      case 429:
        if (result.msg?.includes('daily limit')) {
          errorMessage.value = 'Daily limit reached. Please try again tomorrow.';
        } else {
          errorMessage.value = 'Too many requests. Please try again later.';
        }
        break;
      case 455:
        errorMessage.value = 'System maintenance in progress. Please try again later.';
        break;
      case 505:
        errorMessage.value = 'This feature is currently disabled.';
        break;
      default:
        errorMessage.value = 'Failed to create task. Please try again.';
    }
    return false;
  } catch (error) {
    console.error('Create task error:', error);
    errorMessage.value = 'Network error. Please check your connection.';
    return false;
  }
};

const checkTaskStatus = async () => {
  try {
    // 测试环境：http://localhost:8000/api/v1/images/task?task_id=${taskId.value}
    // 正式环境：https://api.ghibliaigenerator.io/api/v1/images/task?task_id=${taskId.value}

    const response = await fetch(`https://api.ghibliaigenerator.io/api/v1/images/task?task_id=${taskId.value}`);
    const result = await response.json();
    
    if (result.code === 200) {
      const { progress: taskProgress, status, output, error_code, error_msg } = result.data;
      
      switch (status) {
        case 'GENERATING':
          progress.value = Math.round(parseFloat(taskProgress) * 100);
          // Query again after 5 seconds if still generating
          pollingInterval.value = setTimeout(checkTaskStatus, 5000);
          break;
          
        case 'SUCCESS':
          progress.value = 100;
          isGenerating.value = false;
          generatedImage.value = output;
          break;
          
        case 'CREATE_TASK_FAILED':
        case 'GENERATE_FAILED':
          isGenerating.value = false;
          progress.value = 0;
          
          if (error_code === 400) {
            errorMessage.value = 'Content violation detected.';
          } else if (error_code === 451) {
            errorMessage.value = 'Failed to download image.';
          } else {
            errorMessage.value = error_msg || 'Generation failed. Please try again.';
          }
          break;
      }
    }
  } catch (error) {
    console.error('Check task status error:', error);
    isGenerating.value = false;
    progress.value = 0;
    errorMessage.value = 'Network error. Please check your connection.';
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
      // 减少滚动时间
      duration: 500 // 半秒
    });
  }
  
  // 然后执行生成图片
  await generateImage();
};

// 修改 generateImage 方法
const generateImage = async () => {
  if (!previewUrl.value) return;
  
  // 检查使用次数限制
  const currentUsage = checkDailyLimit();
  if (currentUsage >= MAX_DAILY_USES) {
    errorMessage.value = 'Daily limit reached. Please try again tomorrow.';
    return;
  }
  
  isGenerating.value = true;
  progress.value = 0;
  errorMessage.value = null;

  const success = await createTask();
  
  if (success) {
    // 增加使用次数
    incrementDailyUsage();
    // 立即进行第一次查询
    checkTaskStatus();
  } else {
    isGenerating.value = false;
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
    clearTimeout(pollingInterval.value); // 改用 clearTimeout
    pollingInterval.value = null;
  }
};

const downloadImage = async () => {
  if (generatedImage.value && !isDownloading.value) {
    try {
      isDownloading.value = true;
      
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
      isDownloading.value = false;
    }
  }
};

// 添加剩余次数显示
const remainingUses = ref(MAX_DAILY_USES);

// 更新剩余次数显示
const updateRemainingUses = () => {
  const currentUsage = checkDailyLimit();
  remainingUses.value = Math.max(0, MAX_DAILY_USES - currentUsage);
};

// 组件挂载时更新剩余次数
onMounted(() => {
  updateRemainingUses();
});
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