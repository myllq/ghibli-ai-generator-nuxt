<template>
  <div class="min-h-screen bg-[#f8f5f0]">
    <TheHeader 
      ref="headerRef"
      @scroll-to-generator="scrollToRef('generator')" 
      @showLogin="showLoginDialog = true" 
    />
    
    <!-- Main Content -->
    <main>
      <!-- Hero Section -->
      <section class="container mx-auto py-2 md:py-4 px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <!-- Left Column - Text Content -->
          <div>
            <h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#3d405b] mb-4 md:mb-6">
              {{ content.hero.title }}
              <span class="block text-[#e07a5f] mt-2">{{ content.hero.subtitle }}</span>
            </h1>
            <p class="text-base md:text-lg text-gray-700 mb-6 md:mb-8">
              {{ content.hero.description }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                class="bg-[#e07a5f] hover:bg-[#d8603f] text-white px-6 h-12 md:h-12 text-base md:text-lg rounded-md flex items-center justify-center"
                @click="scrollToRef('generator')"
              >
                {{ content.hero.buttonText }}
              </button>
              <button
                class="border border-[#81b29a] text-[#81b29a] hover:bg-[#81b29a] hover:text-white px-6 h-12 md:h-12 text-base md:text-lg rounded-md flex items-center justify-center"
                @click="scrollToRef('examples')"
              >
                {{ content.hero.galleryButtonText }}
              </button>
            </div>
          </div>
          
          <!-- Right Column - Carousel -->
          <div class="relative pt-2 md:pt-4">
            <HeroCarousel :data="content.hero" />
          </div>
        </div>
      </section>

      <!-- Generator Section -->
      <section class="py-16 bg-white" id="generator">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center text-[#3d405b] mb-4">Transform Your Images Now</h2>
          <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Upload your photo and watch the magic happen in seconds.
          </p>
          <GhibliAiGenerator 
            @showLogin="showLoginDialog = true" 
            @updateCredits="handleCreditsUpdate"
          />
        </div>
      </section>

      <!-- Features Section -->
      <section class="bg-[#f8f5f0] py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center text-[#3d405b] mb-4">Powerful Ghibli AI Features</h2>
          <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover the magic behind our Ghibli AI Generator and how it transforms your ordinary photos into extraordinary artwork.
          </p>
          <FeatureSection :data="content.features" @button-click="scrollToRef('generator')" />
        </div>
      </section>

      <!-- Examples Section -->
      <section ref="examplesRef" class="py-16 bg-white" id="examples">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center text-[#3d405b] mb-4">{{ content.examples.title }}</h2>
          <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {{ content.examples.description }}
          </p>
          <ExamplesSection 
            :data="content.examples" 
            @generate-click="scrollToRef('generator')" 
          />
        </div>
      </section>

      <!-- How To Section -->
      <section class="py-16 bg-[#f8f5f0]">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center text-[#3d405b] mb-4">How to Use Our Ghibli AI Generator</h2>
          <HowToSection :data="content.howTo" />
        </div>
      </section>

      <!-- Why Choose Section -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center text-[#3d405b] mb-4">{{ content.whyChoose.title }}</h2>
          <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {{ content.whyChoose.description }}
          </p>
          <WhyChooseSection :data="content.whyChoose" />
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="py-16 bg-[#f8f5f0]">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center text-[#3d405b] mb-4">
            {{ content.testimonials.title }}
          </h2>
          <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {{ content.testimonials.description }}
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialSection
              v-for="testimonial in content.testimonials.items"
              :key="testimonial.name"
              :testimonial="testimonial"
            />
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center text-[#3d405b] mb-4">
            {{ content.faq.title }}
          </h2>
          <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {{ content.faq.description }}
          </p>
          <div class="max-w-3xl mx-auto">
          <FaqSection />
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-10 md:py-16 bg-[#3d405b] text-white">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Ready to Transform Your Photos?</h2>
          <p class="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Try our free Ghibli AI generator now and experience the magic of Studio Ghibli-inspired artwork.
          </p>
          <button
            class="bg-[#e07a5f] hover:bg-[#d8603f] text-white px-6 h-12 text-base md:text-lg w-full sm:w-auto rounded-md flex items-center justify-center mx-auto"
            @click="scrollToRef('generator')"
          >
            Generate Your Ghibli Art Now
          </button>
          <p class="mt-4 md:mt-6 text-[#f2cc8f]">No sign-up required. 100% free to use.</p>
        </div>
      </section>
    </main>

    <TheFooter @scroll-to="scrollToRef" />

    <!-- 登录弹窗 -->
    <LoginDialog
      v-model:showLoginDialog="showLoginDialog"
      @loginSuccess="handleLoginSuccess"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import content from '~/content/index.json'
import HeroCarousel from '~/components/ghibli-ai-generator/HeroCarousel.vue';
import GhibliAiGenerator from '~/components/ghibli-ai-generator/GhibliAiGenerator.vue';
import FeatureSection from '~/components/sections/FeatureSection.vue';
import HowToSection from '~/components/sections/HowToSection.vue';
import ExamplesSection from '~/components/sections/ExamplesSection.vue';
import WhyChooseSection from '~/components/sections/WhyChooseSection.vue';
import TestimonialSection from '~/components/sections/TestimonialSection.vue';
import FaqSection from '~/components/sections/FaqSection.vue';
import TheHeader from '~/components/common/TheHeader.vue';
import TheFooter from '~/components/common/TheFooter.vue';
import LoginDialog from '~/components/common/LoginDialog.vue';

// Scroll function
const scrollToRef = (refName) => {
  const element = document.getElementById(refName);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const headerRef = ref(null);
const showLoginDialog = ref(false);

// 处理登录成功
const handleLoginSuccess = (data) => {
  console.log('Login success, user data:', data);
  headerRef.value?.handleLoginSuccess(data);
};

// 处理积分更新
const handleCreditsUpdate = (data) => {
  headerRef.value?.handleLoginSuccess(data);
};

// 移除重复的检查登录状态
onMounted(async () => {
  // 不需要重复检查登录状态，因为 TheHeader 组件会自己检查
});

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Free Ghibli AI Art Generator Online - No Sign-up Required",
  "description": "Transform your photos into stunning Ghibli-style artwork with our free AI generator. Create magical Ghibli art in seconds, no registration needed.",
  "url": "https://ghibliaigenerator.io",
  "applicationCategory": "Art & Design",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}

useHead({
  title: content.seo.title,
  meta: [
    { name: 'description', content: content.seo.description },
    { name: 'keywords', content: content.seo.keywords }
  ],
  link: [
    { rel: 'canonical', href: content.seo.canonical },
    { rel: 'icon', type: 'image/png', href: content.seo.favicon }
  ],
  script: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-RVJ3ZNTEQ2',
      async: true
    },
    {
      children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-RVJ3ZNTEQ2');
      `
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLdData)
    }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})
</script>