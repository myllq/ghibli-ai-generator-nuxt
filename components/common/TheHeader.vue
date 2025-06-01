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
    <div class="flex items-center gap-4">
      <div v-if="userInfo" class="relative group">
        <div 
          class="w-10 h-10 rounded-full cursor-pointer border-2 border-transparent hover:border-[#e07a5f] overflow-hidden flex items-center justify-center"
          :style="userInfo.avatar ? {} : { backgroundColor: '#e07a5f' }"
        >
          <img 
            v-if="userInfo.avatar" 
            :src="userInfo.avatar" 
            :alt="userInfo.name"
            class="w-full h-full object-cover"
          />
          <span 
            v-else 
            class="text-white text-lg font-semibold uppercase"
          >
            {{ userInfo.email.substring(0, 2) }}
          </span>
        </div>
        <div class="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <div class="px-4 py-2 border-b border-gray-100">
            <p class="text-sm font-medium text-gray-900">{{ userInfo.name }}</p>
            <p class="text-xs text-gray-500">{{ userInfo.email }}</p>
          </div>
          <button 
            @click="handleLogout"
            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      </div>
      <button 
        v-else
        class="bg-[#e07a5f] hover:bg-[#d8603f] text-white px-6 py-2 rounded-md w-auto flex items-center justify-center"
        @click="showLoginModal = true"
      >
        Sign Up — It's Free
      </button>
    </div>
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
          <div 
            id="google-login-button"
            class="w-full h-[40px] mt-4"
          ></div>
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
    <div
      v-if="showSuccessToast"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>Successfully logged in!</span>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';

const showLoginModal = ref(false);
const userInfo = ref(null);
const showSuccessToast = ref(false);

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
      // 直接使用返回的用户数据
      setUserInfo(data.data);
    }
  } catch (error) {
    console.error('Failed to check login status:', error);
  }
};

// Google 登录回调处理
const handleGoogleLogin = async (response) => {
  if (response.credential) {
    try {
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
      console.log('Backend response:', data);

      if (data.code === 200) {
        // 使用返回的用户数据
        setUserInfo(data.data.user);
        showLoginModal.value = false;
        
        // 显示成功提示
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
    }
  }
};

// 渲染 Google 登录按钮
const renderGoogleButton = () => {
  console.log('Rendering Google button');
  const buttonContainer = document.getElementById('google-login-button');
  if (buttonContainer && window.google && window.google.accounts) {
    window.google.accounts.id.initialize({
      client_id: '60781202032-7crs9ghtvvridgeopuarif5liovemfe6.apps.googleusercontent.com',
      callback: handleGoogleLogin
    });

    window.google.accounts.id.renderButton(buttonContainer, {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
      width: buttonContainer.offsetWidth,
    });
    
    console.log('Google button rendered');
  } else {
    console.error('Button container or Google API not found');
  }
};

// 监听弹窗显示状态
watch(showLoginModal, async (newValue) => {
  if (newValue) {
    // 等待 DOM 更新后渲染按钮
    await nextTick();
    renderGoogleButton();
  }
});

// 加载 Google Auth
const loadGoogleAuth = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
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

// 初始化
onMounted(async () => {
  console.log('Component mounted, checking login status');
  await checkLoginStatus(); // 先检查登录状态
  await loadGoogleAuth(); // 再加载 Google Auth
  if (showLoginModal.value) {
    renderGoogleButton();
  }
});

// 登出处理
const handleLogout = async () => {
  try {
    const res = await fetch('http://localhost:8000/api/v1/user/logout', {
      method: 'POST',
      credentials: 'include', // 重要：允许发送和接收 cookies
    });
    
    const data = await res.json();
    if (data.code === 200) {
      userInfo.value = null;
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script>

<style scoped>
/* 添加过渡动画 */
.group-hover\:block {
  transition: all 0.2s ease;
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
</style>