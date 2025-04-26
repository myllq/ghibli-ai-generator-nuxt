<template>
  <div class="min-h-screen bg-[#f8f5f0]">
    <!-- Header -->
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
      <button 
        class="bg-[#e07a5f] hover:bg-[#d8603f] text-white px-4 py-2 rounded-md w-full sm:w-auto flex items-center justify-center"
        @click="scrollToRef('generator')"
      >
        Try Now 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 h-4 w-4">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </button>
    </header>

    <!-- Hero Section -->
    <section class="container mx-auto py-2 md:py-4 px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#3d405b] mb-4 md:mb-6">
            Free Ghibli AI Generator
            <span class="block text-[#e07a5f] mt-2">No Sign-up Required</span>
          </h1>
          <p class="text-base md:text-lg text-gray-700 mb-6 md:mb-8">
            Transform your photos into stunning Ghibli-style artwork with our AI-powered generator. Experience the
            magic of Studio Ghibli aesthetics with just a few clicks.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              class="bg-[#e07a5f] hover:bg-[#d8603f] text-white px-6 h-12 md:h-12 text-base md:text-lg rounded-md flex items-center justify-center"
              @click="scrollToRef('generator')"
            >
              Generate Ghibli Art Now
            </button>
            <button
              class="border border-[#81b29a] text-[#81b29a] hover:bg-[#81b29a] hover:text-white px-6 h-12 md:h-12 text-base md:text-lg rounded-md flex items-center justify-center"
              @click="scrollToRef('examples')"
            >
              View Gallery
            </button>
          </div>
        </div>
        <div class="relative pt-2 md:pt-4">
          <HeroCarousel />
        </div>
      </div>
    </section>

    <!-- Image Generator Section -->
    <section ref="generatorRef" class="py-16 bg-white" id="generator">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-[#3d405b] mb-4">Transform Your Images Now</h2>
        <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Upload your photo, add a prompt, and watch the magic happen in seconds.
        </p>
        <ImageGenerator />
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-[#f8f5f0] py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-[#3d405b] mb-4">Powerful Ghibli AI Features</h2>
        <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover the magic behind our Ghibli AI Generator and how it transforms your ordinary photos into
          extraordinary artwork.
        </p>

        <div class="space-y-8">
          <FeatureSection
            title="Authentic Ghibli Art Style"
            description="Our AI has been trained on thousands of Studio Ghibli frames to perfectly capture the iconic style that fans love. From the soft color palettes to the distinctive character designs, your images will be transformed with the same magical quality found in films like Spirited Away and My Neighbor Totoro."
            image="/images/ghibli-feature1.webp"
            alt="Girl with cat in Ghibli style"
            :isReversed="false"
            @button-click="scrollToRef('generator')"
          />

          <FeatureSection
            title="Multiple Style Variations"
            description="Choose from various Ghibli-inspired styles to match the mood of your image. Whether you want the warm summer aesthetic of Kiki's Delivery Service, the natural beauty of Princess Mononoke, or the whimsical charm of Howl's Moving Castle, our generator offers multiple style options."
            image="/images/ghibli-feature2.jpeg"
            alt="Couple in Ghibli style"
            :isReversed="true"
            @button-click="scrollToRef('generator')"
          />

          <FeatureSection
            title="High-Quality Transformations"
            description="Unlike other AI generators, our Ghibli AI preserves the important details of your original image while applying the artistic transformation. The result is a high-resolution artwork that maintains the essence of your photo while bringing it into the enchanting world of Studio Ghibli."
            image="/images/ghibli-feature3.jpg"
            alt="Family in Ghibli style"
            :isReversed="false"
            @button-click="scrollToRef('generator')"
          />
        </div>
      </div>
    </section>

    <!-- Examples Section -->
    <section ref="examplesRef" class="py-16 bg-white" id="examples">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-[#3d405b] mb-4">Stunning Ghibli AI Transformations</h2>
        <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          See the magic of our Ghibli style AI generator through these amazing examples.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="rounded-lg overflow-hidden shadow-lg bg-white">
            <div class="h-64 relative">
              <img
                src="/images/ghibli-style1.webp"
                alt="Girl with cat in Ghibli style"
                class="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-[#3d405b]">Countryside Journey</h3>
              <p class="text-sm text-gray-500">
                A girl and her cat embarking on a peaceful countryside adventure
              </p>
            </div>
          </div>

          <div class="rounded-lg overflow-hidden shadow-lg bg-white">
            <div class="h-64 relative">
              <img
                src="/images/ghibli-style2.webp"
                alt="Couple on grass in Ghibli style"
                class="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-[#3d405b]">Summer Daydream</h3>
              <p class="text-sm text-gray-500">A couple enjoying a peaceful moment on a sunny hillside</p>
            </div>
          </div>

          <div class="rounded-lg overflow-hidden shadow-lg bg-white">
            <div class="h-64 relative">
              <img
                src="/images/ghibli-style3.webp"
                alt="Couple on street in Ghibli style"
                class="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-[#3d405b]">Town Exploration</h3>
              <p class="text-sm text-gray-500">Students exploring a charming town street on a bright day</p>
            </div>
          </div>

          <div class="rounded-lg overflow-hidden shadow-lg bg-white">
            <div class="h-64 relative">
              <img
                src="/images/ghibli-style4.webp"
                alt="School hallway scene in Ghibli style"
                class="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-[#3d405b]">School Surprise</h3>
              <p class="text-sm text-gray-500">An unexpected meeting in a sunlit school corridor</p>
            </div>
          </div>

          <div class="rounded-lg overflow-hidden shadow-lg bg-white">
            <div class="h-64 relative">
              <img
                src="/images/ghibli-style5.webp"
                alt="Girl with red hair in Ghibli style"
                class="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-[#3d405b]">Countryside Portrait</h3>
              <p class="text-sm text-gray-500">A young woman with vibrant red hair against a rural backdrop</p>
            </div>
          </div>

          <div class="rounded-lg overflow-hidden shadow-lg bg-white">
            <div class="h-64 relative">
              <img
                src="/images/ghibli-style6.webp"
                alt="Boy in village in Ghibli style"
                class="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-[#3d405b]">Village Adventure</h3>
              <p class="text-sm text-gray-500">A young boy exploring a picturesque village on a sunny day</p>
            </div>
          </div>
        </div>
        <div class="text-center mt-6 md:mt-10">
          <button
            class="bg-[#81b29a] hover:bg-[#6a9d87] text-white px-4 py-2 rounded-md w-full sm:w-auto"
            @click="scrollToRef('generator')"
          >
            Generate Your Ghibli Art Now
          </button>
        </div>
      </div>
    </section>

    <!-- How To Section -->
    <section class="py-16 bg-[#f8f5f0]">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-[#3d405b] mb-6">How to Use Our Ghibli AI Generator</h2>
        <p class="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Follow these simple steps to transform your photos into Ghibli-style artwork.
        </p>
        <HowToSteps />
      </div>
    </section>

    <!-- Why Choose Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-[#3d405b] mb-4">Why Choose Our Ghibli AI Generator</h2>
        <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          What makes our Ghibli style AI generator stand out from the rest.
        </p>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-[#f8f5f0] p-8 rounded-lg shadow-md">
            <h3 class="text-2xl font-semibold text-[#3d405b] mb-4">Unmatched Quality</h3>
            <ul class="space-y-4">
              <li class="flex items-start">
                <div class="flex-shrink-0 h-6 w-6 rounded-full bg-[#81b29a] flex items-center justify-center text-white font-bold mr-3">
                  ✓
                </div>
                <p>Advanced AI model specifically trained on Ghibli art style</p>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0 h-6 w-6 rounded-full bg-[#81b29a] flex items-center justify-center text-white font-bold mr-3">
                  ✓
                </div>
                <p>High-resolution output that preserves details</p>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0 h-6 w-6 rounded-full bg-[#81b29a] flex items-center justify-center text-white font-bold mr-3">
                  ✓
                </div>
                <p>Authentic Ghibli aesthetics with magical elements</p>
              </li>
            </ul>
          </div>
          <div class="bg-[#f8f5f0] p-8 rounded-lg shadow-md">
            <h3 class="text-2xl font-semibold text-[#3d405b] mb-4">User-Friendly Experience</h3>
            <ul class="space-y-4">
              <li class="flex items-start">
                <div class="flex-shrink-0 h-6 w-6 rounded-full bg-[#e07a5f] flex items-center justify-center text-white font-bold mr-3">
                  ✓
                </div>
                <p>100% free to use with no hidden costs</p>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0 h-6 w-6 rounded-full bg-[#e07a5f] flex items-center justify-center text-white font-bold mr-3">
                  ✓
                </div>
                <p>No registration or sign-up required</p>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0 h-6 w-6 rounded-full bg-[#e07a5f] flex items-center justify-center text-white font-bold mr-3">
                  ✓
                </div>
                <p>Simple interface with instant results</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Reviews Section -->
    <section class="py-16 bg-[#f8f5f0]">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-[#3d405b] mb-4">
          What Users Say About Our Ghibli AI Generator
        </h2>
        <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Don't just take our word for it. See what our users have to say.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TestimonialCard
            name="Sarah K."
            :rating="5"
            text="The Ghibli AI generator transformed my vacation photos into magical artwork. The quality is amazing!"
          />
          <TestimonialCard
            name="Michael T."
            :rating="5"
            text="I love how this tool captures the essence of Ghibli's art style. My portraits look straight out of a Miyazaki film!"
          />
          <TestimonialCard
            name="Emma L."
            :rating="4"
            text="As a Ghibli fan, I'm impressed by how accurately this AI captures the studio's unique aesthetic. And it's free!"
          />
          <TestimonialCard
            name="David R."
            :rating="5"
            text="The fact that I don't need to sign up makes this my go-to Ghibli style generator. Quick and hassle-free."
          />
          <TestimonialCard
            name="Jessica M."
            :rating="5"
            text="I've tried many AI art generators, but this Ghibli one is special. The results are consistently beautiful."
          />
          <TestimonialCard
            name="Robert P."
            :rating="4"
            text="The transformation is magical! My landscape photos now have that dreamy Ghibli quality I love."
          />
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-[#3d405b] mb-4">Frequently Asked Questions</h2>
        <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Find answers to common questions about our Ghibli AI generator.
        </p>
        <div class="max-w-3xl mx-auto">
          <FaqAccordion />
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

    <!-- Footer -->
    <footer class="bg-[#f8f5f0] py-6 md:py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center gap-2 mb-4 md:mb-0">
            <div class="relative w-8 h-8 md:w-10 md:h-10">
              <img
                src="/images/ghibli-ai-generator-logo.png"
                alt="Ghibli AI Generator Logo"
                class="absolute inset-0 w-full h-full object-contain"
              />
            </div>
            <span class="text-base md:text-lg font-bold text-[#4a6670]">GhibliAIGenerator.io</span>
          </div>
          <div class="text-xs md:text-sm text-gray-600">
            © {{ new Date().getFullYear() }} GhibliAIGenerator.io | All rights reserved
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeroCarousel from '~/components/HeroCarousel.vue';
import ImageGenerator from '~/components/ImageGenerator.vue';
import FeatureSection from '~/components/FeatureSection.vue';
import HowToSteps from '~/components/HowToSteps.vue';
import TestimonialCard from '~/components/TestimonialCard.vue';
import FaqAccordion from '~/components/FaqAccordion.vue';

// Scroll function
const scrollToRef = (refName) => {
  const element = document.getElementById(refName);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Add Google Analytics
onMounted(() => {
  // Google Analytics
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-RVJ3ZNTEQ2';
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-RVJ3ZNTEQ2');
  `;
  document.head.appendChild(script2);
});
</script>

<script>
export default {
  data() {
    return {
      prompt: "",
      imageUrl: "",
      examples: [
        {
          url: "/example1.jpg",
          description: "A serene forest scene with a hidden spirit.",
        },
        {
          url: "/example2.jpg",
          description: "A bustling marketplace in a Ghibli-inspired town.",
        },
        {
          url: "/example3.jpg",
          description: "A lone traveler gazing at a majestic mountain range.",
        },
      ],
    }
  },
  methods: {
    async generateImage() {
      // Placeholder for API call
      this.imageUrl = "/generated-image.jpg" // Replace with actual API response
    },
    scrollToRef(refName) {
      const element = document.getElementById(refName)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    },
  },
}
</script>