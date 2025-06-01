<template>
  <header class="container mx-auto py-1 px-4 relative z-50">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <div class="relative w-[120px] sm:w-[150px] h-[60px] sm:h-[90px]">
          <img
            src="/images/ghibli-ai-generator-logo.png"
            alt="Ghibli AI Generator Logo"
            class="object-contain object-left absolute inset-0 w-full h-full"
          />
        </div>
        <span class="hidden sm:block text-lg sm:text-xl font-bold text-[#3d405b] ml-2">GhibliAIGenerator</span>
      </div>
      <div class="flex items-center gap-4 flex-shrink-0">
        <div v-if="userInfo" class="relative" @mouseleave="handleMouseLeave">
          <div 
            class="w-10 h-10 rounded-full cursor-pointer border-2 border-transparent hover:border-[#e07a5f] overflow-hidden flex items-center justify-center"
            :style="userInfo.avatar ? {} : { backgroundColor: '#e07a5f' }"
            @mouseenter="showDropdown = true"
          >
            <img 
              v-if="userInfo.avatar" 
              :src="userInfo.avatar" 
              :alt="userInfo.name"
              class="w-full h-full object-cover"
              referrerpolicy="no-referrer"
            />
            <span 
              v-else 
              class="text-white text-lg font-semibold uppercase"
            >
              {{ userInfo.email.substring(0, 2) }}
            </span>
          </div>
          <div 
            v-show="showDropdown"
            class="absolute right-0 top-full z-[100]"
          >
            <div class="h-2"></div>
            <div class="w-48 bg-white rounded-lg shadow-lg py-2">
              <div class="px-4 py-3 border-b border-gray-100">
                <p class="text-sm font-medium text-gray-900">{{ userInfo.name }}</p>
                <p class="text-xs text-gray-500">{{ userInfo.email }}</p>
              </div>
              <button 
                @click="handleLogout"
                class="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
        <button 
          v-else
          class="bg-[#e07a5f] hover:bg-[#d8603f] text-white px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base whitespace-nowrap flex items-center justify-center min-w-[100px] sm:min-w-[160px]"
          @click="showLoginModal = true"
        >
          <span class="hidden sm:inline">Sign Up — It's Free</span>
          <span class="sm:hidden">Sign Up</span>
        </button>
      </div>
    </div>
    <div
      v-if="showLoginModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      @click.self="showLoginModal = false"
    >
      <div class="bg-white rounded-2xl p-4 sm:p-8 max-w-md w-full shadow-xl transform transition-all mx-4 sm:mx-0">
        <div class="text-center">
          <div class="relative w-[120px] sm:w-[150px] h-[60px] sm:h-[90px] mx-auto mb-4 sm:mb-6">
            <img
              src="/images/ghibli-ai-generator-logo.png"
              alt="Ghibli AI Generator Logo"
              class="object-contain w-full h-full"
            />
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-[#3d405b] mb-2">
            Welcome to Ghibli AI Generator
          </h2>
          <p class="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            Sign in to start creating magical Ghibli-style images
          </p>
          <div class="relative">
            <div 
              id="google-login-button"
              class="w-full h-[40px] mt-4"
              :class="{ 'opacity-50': isLoading }"
            ></div>
            <div 
              v-if="isLoading" 
              class="absolute inset-0 flex items-center justify-center"
            >
              <div class="w-5 h-5 border-2 border-[#e07a5f] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
          <p class="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
            By continuing, you agree to our 
            <a href="/terms" class="text-[#e07a5f] hover:underline">Terms of Service</a> 
            and 
            <a href="/privacy" class="text-[#e07a5f] hover:underline">Privacy Policy</a>
          </p>
        </div>
        <button
          @click="showLoginModal = false"
          class="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600"
        >
          <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    <div
      v-if="showSuccessToast"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>Successfully logged out!</span>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, onUnmounted } from 'vue';

const showLoginModal = ref(false);
const userInfo = ref(null);
const showSuccessToast = ref(false);
const showDropdown = ref(false);
const isLoading = ref(false);
let closeTimeout = null;

// 统一处理用户信息
const setUserInfo = (userData) => {
  userInfo.value = {
    id: userData.id,
    email: userData.email,
    name: userData.name,
    avatar: userData.avatar,
    platform: userData.platform,
    provider: userData.provider,
    provider_id: userData.provider_id,
    created_at: userData.created_at,
    updated_at: userData.updated_at
  };
};

// 检查登录状态
const checkLoginStatus = async () => {
  try {
    const res = await fetch('http://localhost:8000/api/v1/user/info', {
      credentials: 'include',
    });
    const data = await res.json();
    if (data.code === 200) {
      setUserInfo(data.data);
    }
  } catch (error) {
    console.error('Failed to check login status:', error);
  }
};

// 加载 Google Auth
const loadGoogleAuth = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client?hl=en';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('Google Auth script loaded');
      resolve();
    };
    script.onerror = (error) => {
      console.error('Failed to load Google Auth script:', error);
      reject(error);
    };
    document.head.appendChild(script);
  });
};

// 渲染 Google 登录按钮
const renderGoogleButton = () => {
  console.log('Rendering Google button');
  const buttonContainer = document.getElementById('google-login-button');
  if (buttonContainer && window.google && window.google.accounts) {
    window.google.accounts.id.cancel();
    window.google.accounts.id.initialize({
      client_id: '60781202032-7crs9ghtvvridgeopuarif5liovemfe6.apps.googleusercontent.com',
      callback: async (response) => {
        if (response.credential) {
          try {
            isLoading.value = true;
            const res = await fetch('http://localhost:8000/api/v1/user/login/google', {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                token: response.credential,
                platform: 'ghibli-ai-generator'
              })
            });

            const data = await res.json();
            if (data.code === 200) {
              setUserInfo(data.data.user);
              showLoginModal.value = false;
              showSuccessToast.value = true;
              setTimeout(() => {
                showSuccessToast.value = false;
              }, 3000);
            } else {
              throw new Error(data.msg);
            }
          } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
          } finally {
            isLoading.value = false;
            renderGoogleButton();
          }
        }
      },
      ux_mode: 'popup',
      language: 'en-US',
    });

    buttonContainer.innerHTML = '';

    const isMobile = window.innerWidth < 640;
    window.google.accounts.id.renderButton(buttonContainer, {
      type: 'standard',
      theme: 'outline',
      size: isMobile ? 'medium' : 'large',
      text: 'continue_with',
      width: buttonContainer.offsetWidth,
      locale: 'en-US',
      language: 'en-US',
      disabled: isLoading.value,
    });
  }
};

// 处理登出
const handleLogout = async () => {
  try {
    const res = await fetch('http://localhost:8000/api/v1/user/logout', {
      method: 'POST',
      credentials: 'include',
    });
    
    const data = await res.json();
    if (data.code === 200) {
      userInfo.value = null;
      showDropdown.value = false;
      showSuccessToast.value = true;
      setTimeout(() => {
        showSuccessToast.value = false;
      }, 3000);
    } else {
      throw new Error(data.msg);
    }
  } catch (error) {
    console.error('Logout error:', error);
    alert('Failed to logout. Please try again.');
  }
};

// 处理鼠标离开事件
const handleMouseLeave = () => {
  closeTimeout = setTimeout(() => {
    showDropdown.value = false;
  }, 100);
};

// 监听弹窗显示状态
watch(showLoginModal, async (newValue) => {
  if (newValue) {
    await nextTick();
    await loadGoogleAuth();
    renderGoogleButton();
  }
});

// 监听窗口大小变化
let resizeTimeout;
const handleResize = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (showLoginModal.value) {
      renderGoogleButton();
    }
  }, 200);
};

onMounted(async () => {
  await checkLoginStatus();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (closeTimeout) clearTimeout(closeTimeout);
  if (resizeTimeout) clearTimeout(resizeTimeout);
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
/* 下拉菜单动画 */
.absolute {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.absolute[style*="display: none"] {
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
}

.absolute[style*="display: block"] {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* 成功提示动画 */
@keyframes slideIn {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.fixed.bottom-4 {
  animation: slideIn 0.3s ease;
}

/* 添加移动端过渡动画 */
@media (max-width: 640px) {
  .transform {
    transform-origin: bottom;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>