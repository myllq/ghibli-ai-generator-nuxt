<template>
  <header class="container mx-auto py-1 px-4 relative z-50">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <NuxtLink to="/" class="flex items-center">
          <img
            src="/images/ghibli-ai-generator-logo.png"
            alt="Ghibli AI Generator Logo"
            class="h-8 sm:h-10"
          />
        </NuxtLink>
      </div>
      <div class="flex items-center space-x-2 sm:space-x-4">
        <button
          class="text-[#3d405b] hover:text-[#e07a5f] text-sm sm:text-base"
          @click="$emit('scroll-to-generator')"
        >
          Try Now
        </button>
        <template v-if="userInfo">
          <div class="flex items-center">
            <img
              v-if="userInfo.avatar"
              :src="userInfo.avatar"
              :alt="userInfo.name"
              class="w-8 h-8 rounded-full"
            />
            <span class="ml-2 text-sm sm:text-base text-[#3d405b]">{{ userInfo.name }}</span>
          </div>
        </template>
        <template v-else>
          <button 
            class="bg-[#e07a5f] hover:bg-[#d8603f] text-white px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base"
            @click="$emit('showLogin')"
          >
            <span class="hidden sm:inline">Sign Up — It's Free</span>
            <span class="sm:hidden">Sign Up</span>
          </button>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, onUnmounted } from 'vue';

const showLoginModal = ref(false);
const userInfo = ref(null);
const showSuccessToast = ref(false);
const successMessage = ref('');
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
      successMessage.value = 'Successfully logged out!';
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

// 只保留必要的 props 和 emits
defineProps({
  userInfo: {
    type: Object,
    default: null
  }
});

defineEmits(['scroll-to-generator', 'showLogin']);
</script>

<style scoped>
.router-link-active {
  color: #e07a5f;
}

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

/* 自定义 Google 按钮容器样式 */
#google-login-button {
  max-width: 400px;
  margin: 0 auto;
}

/* 移除所有按钮的 outline */
#google-login-button * {
  outline: none !important;
  font-size: 16px !important;
}

/* 移除按钮的焦点样式 */
#google-login-button *:focus {
  outline: none !important;
  box-shadow: none !important;
}

/* 确保按钮在加载状态下仍然可见 */
.opacity-50 {
  opacity: 0.7;
  pointer-events: none;
}
</style>