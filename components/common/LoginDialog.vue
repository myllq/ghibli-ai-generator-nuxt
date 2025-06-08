<template>
  <div
    v-if="showLoginDialog"
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    @click.self="closeDialog"
  >
    <div class="bg-white rounded-2xl p-4 sm:p-8 max-w-md w-full shadow-xl transform transition-all mx-4 sm:mx-0">
      <div class="text-center">
        <div class="relative w-[150px] h-[90px] mx-auto mb-4 sm:mb-6">
          <img
            src="/images/ghibli-ai-generator-logo.png"
            alt="Ghibli AI Generator Logo"
            class="object-contain w-full h-full"
          />
        </div>
        <h2 class="text-xl sm:text-2xl font-bold text-[#3d405b] mb-2">
          Welcome to Ghibli AI Generator
        </h2>
        <p class="text-sm sm:text-base text-[#e07a5f] mb-6 sm:mb-8">
          Get 10 free credits on first sign-in!
        </p>
        <div class="relative">
          <div 
            id="google-login-button"
            class="hidden"
          ></div>
          <button
            class="w-full h-[46px] sm:h-[50px] mt-4 border border-gray-300 rounded-md px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors relative"
            @click="handleGoogleButtonClick"
            :disabled="isLoading"
          >
            <div class="flex items-center justify-center gap-2">
              <img src="/images/google-logo.png" alt="Google" class="w-6 h-6" />
              <span class="text-gray-600 font-roboto text-base">Sign in with Google</span>
            </div>
            <div 
              v-if="isLoading" 
              class="absolute inset-0 flex items-center justify-center bg-white/80 z-10 rounded-md"
            >
              <div class="w-6 h-6 border-2 border-[#e07a5f] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </button>
        </div>
        <p class="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
          By continuing, you agree to our 
          <a href="/terms" class="text-[#e07a5f] hover:underline">Terms of Service</a> 
          and 
          <a href="/privacy" class="text-[#e07a5f] hover:underline">Privacy Policy</a>
        </p>
      </div>
      <button
        @click="closeDialog"
        class="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 p-2"
      >
        <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  showLoginDialog: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:showLoginDialog', 'loginSuccess']);
const isLoading = ref(false);

// 处理 Google 登录回调
const handleGoogleLogin = async (response) => {
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
        emit('update:showLoginDialog', false);
        emit('loginSuccess', data.data);
      } else {
        throw new Error(data.msg);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('登录失败，请重试');
    } finally {
      isLoading.value = false;
    }
  }
};

// 添加关闭弹窗方法
const closeDialog = () => {
  emit('update:showLoginDialog', false);
};

// 修改 renderGoogleButton 方法
const renderGoogleButton = () => {
  console.log('Start rendering Google button');
  const buttonContainer = document.getElementById('google-login-button');
  if (!buttonContainer || !window.google?.accounts) {
    console.error('Button container or Google accounts not ready');
    return;
  }

  try {
    window.google.accounts.id.initialize({
      client_id: '60781202032-7crs9ghtvvridgeopuarif5liovemfe6.apps.googleusercontent.com',
      callback: handleGoogleLogin,
      ux_mode: 'popup',
      auto_select: false,
      context: 'signin',
    });

    buttonContainer.innerHTML = '';
    window.google.accounts.id.renderButton(buttonContainer, {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular',
      width: buttonContainer.offsetWidth,
      logo_alignment: 'center',
      locale: 'en',
      language: 'en'
    });

    // 立即应用自定义样式
    requestAnimationFrame(() => {
      const buttonElement = buttonContainer.querySelector('div[role="button"]');
      if (buttonElement) {
        Object.assign(buttonElement.style, {
          borderRadius: '6px',
          border: '1px solid #dadce0',
          boxShadow: 'none',
          fontSize: '16px',
          height: '48px',
          padding: '0 12px',
          backgroundColor: '#ffffff',
          cursor: 'pointer',
          width: '100%',
          outline: 'none',
        });
        
        // 添加点击事件监听器
        buttonElement.addEventListener('mousedown', (e) => {
          e.preventDefault();
          buttonElement.style.border = '1px solid #dadce0';
          buttonElement.style.outline = 'none';
        });
        
        // 添加焦点事件监听器
        buttonElement.addEventListener('focus', (e) => {
          e.preventDefault();
          buttonElement.style.border = '1px solid #dadce0';
          buttonElement.style.outline = 'none';
        });
        
        const textSpan = buttonElement.querySelector('span');
        if (textSpan) {
          Object.assign(textSpan.style, {
            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
            color: '#3c4043',
          });
          if (textSpan.textContent.includes('Google')) {
            textSpan.textContent = 'Continue with Google';
          }
        }

        // 处理按钮内所有元素的焦点样式
        const allElements = buttonElement.querySelectorAll('*');
        allElements.forEach(element => {
          element.style.outline = 'none';
          element.addEventListener('focus', (e) => {
            e.preventDefault();
            element.style.outline = 'none';
          });
        });
      }
    });
  } catch (error) {
    console.error('Error rendering Google button:', error);
  }
};

// 优化 Google Auth 加载
const loadGoogleAuth = () => {
  if (window.google?.accounts) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    
    // 添加超时处理
    const timeout = setTimeout(() => {
      reject(new Error('加载超时'));
    }, 10000); // 10秒超时
    
    script.onload = () => {
      clearTimeout(timeout);
      console.log('Google Auth script loaded');
      resolve();
    };
    
    script.onerror = () => {
      clearTimeout(timeout);
      reject(new Error('加载失败'));
    };
    
    document.head.appendChild(script);
  });
};

// 优化初始化函数
const initGoogleAuth = async () => {
  try {
    await loadGoogleAuth();
    renderGoogleButton();
  } catch (error) {
    console.error('Failed to initialize Google Auth:', error);
  }
};

// 添加点击处理方法
const handleGoogleButtonClick = () => {
  const googleButton = document.getElementById('google-login-button')?.querySelector('div[role="button"]');
  if (googleButton) {
    googleButton.click();
  } else {
    console.error('Google button not found');
    alert('Login button failed to load. Please check your network!');
  }
};

// 监听弹窗显示状态
watch(() => props.showLoginDialog, async (newValue) => {
  console.log('Dialog visibility changed:', newValue);
  if (newValue) {
    await initGoogleAuth();
  }
});

// 组件挂载时初始化
onMounted(async () => {
  console.log('Component mounted, showLoginDialog:', props.showLoginDialog);
  if (props.showLoginDialog) {
    await initGoogleAuth();
  }
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

#google-login-button {
  min-height: 48px;
  width: 100%;
  position: relative;
}

#google-login-button > div {
  width: 100% !important;
  border-radius: 6px !important;
  box-shadow: none !important;
  font-family: 'Roboto', sans-serif !important;
}

#google-login-button iframe {
  width: 100% !important;
  min-height: 48px !important;
}

/* 预加载 Roboto 字体 */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
</style> 