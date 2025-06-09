<template>
  <header class="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
    <div class="container mx-auto py-2 px-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <img
              src="/images/ghibli-ai-generator-logo.png"
              alt="Ghibli AI Generator Logo"
              class="w-[100px] h-[60px] object-contain"
            />
          </NuxtLink>
        </div>
        <div class="flex items-center space-x-2 sm:space-x-4">
          <template v-if="userInfo">
            <!-- Credits Display -->
            <div class="flex items-center border border-[#e07a5f] rounded-full px-3 py-1">
              <img src="/images/credits.png" alt="Credits" class="w-4 h-4 mr-1" />
              <span class="text-[#e07a5f] font-medium">{{ credits }}</span>
            </div>
            <!-- User Avatar with Dropdown -->
            <div class="relative">
              <button
                class="flex items-center"
                @mouseenter="showDropdown = true"
                @mouseleave="handleMouseLeave"
              >
                <img
                  v-if="userInfo.avatar"
                  :src="userInfo.avatar"
                  :alt="userInfo.name || userInfo.email"
                  class="w-8 h-8 rounded-full object-cover border border-gray-200"
                  @error="handleAvatarError"
                  ref="avatarImg"
                  crossorigin="anonymous"
                  referrerpolicy="no-referrer"
                />
                <div 
                  v-else
                  class="w-8 h-8 rounded-full bg-[#e07a5f] flex items-center justify-center text-white font-medium"
                  :title="userInfo.email"
                >
                  {{ getInitials(userInfo.email) }}
                </div>
              </button>
              <!-- Dropdown Menu -->
              <div
                v-if="showDropdown"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
                @mouseenter="clearCloseTimeout"
                @mouseleave="handleMouseLeave"
              >
                <div class="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                  {{ userInfo.name || userInfo.email }}
                </div>
                <button
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="handleLogout"
                >
                  Log Out
                </button>
              </div>
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
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, onUnmounted } from 'vue';

const config = useRuntimeConfig();
const { apiBaseUrl, apiEndpoints } = config.public;

const showLoginModal = ref(false);
const userInfo = ref(null);
const credits = ref(0);
const showDropdown = ref(false);
const isLoading = ref(false);
let closeTimeout = null;

// 统一处理用户信息
const setUserInfo = (userData, userCredits) => {
  if (userData && typeof userData === 'object') {
    userInfo.value = userData;
    credits.value = userCredits;
  }
};

// 检查登录状态
const checkLoginStatus = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}${apiEndpoints.user.info}`, {
      credentials: 'include',
    });
    const data = await res.json();
    if (data.code === 200) {
      setUserInfo(data.data.user, data.data.credits);
    }
  } catch (error) {
    console.error('Failed to check login status:', error);
  }
};

// 获取邮箱前两位字符
const getInitials = (email) => {
  if (!email) return '';
  return email.substring(0, 2).toUpperCase();
};

// 修改头像错误处理
const avatarImg = ref(null);
const handleAvatarError = () => {
  if (avatarImg.value) {
    avatarImg.value.style.display = 'none';
  }
};

// 处理鼠标离开事件
const handleMouseLeave = () => {
  closeTimeout = setTimeout(() => {
    showDropdown.value = false;
  }, 100);
};

// 清除关闭定时器
const clearCloseTimeout = () => {
  if (closeTimeout) {
    clearTimeout(closeTimeout);
    closeTimeout = null;
  }
};

// 处理登出
const handleLogout = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}${apiEndpoints.user.logout}`, {
      method: 'POST',
      credentials: 'include',
    });
    
    const data = await res.json();
    if (data.code === 200) {
      userInfo.value = null;
      credits.value = 0;
      showDropdown.value = false;
    } else {
      throw new Error(data.msg);
    }
  } catch (error) {
    console.error('Logout error:', error);
    alert('Failed to logout. Please try again.');
  }
};

// 添加登录成功的处理函数
const handleLoginSuccess = (data) => {
  if (data && data.user) {
    setUserInfo(data.user, data.credits);
  }
};

onMounted(async () => {
  await checkLoginStatus();
});

onUnmounted(() => {
  if (closeTimeout) clearTimeout(closeTimeout);
});

defineEmits(['scroll-to-generator', 'showLogin']);

// 导出 handleLoginSuccess 函数
defineExpose({
  handleLoginSuccess
});
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

/* 添加头像加载过渡效果 */
.rounded-full {
  transition: all 0.3s ease;
}

/* 添加文字头像的样式 */
.bg-[#e07a5f] {
  font-size: 14px;
  letter-spacing: 0.5px;
}

/* 添加固定header的过渡效果 */
header {
  transition: box-shadow 0.3s ease;
}

/* 确保内容不会被固定header遮挡 */
header + * {
  margin-top: 76px;
}
</style>