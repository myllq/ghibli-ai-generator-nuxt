import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/sitemap'],
  css: ['~/assets/css/main.css'],

  sitemap: {
    hostname: 'https://ghibliaigenerator.io',
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      title: 'Free Ghibli AI Generator | No Sign-up Required | Transform Photos Instantly',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Transform your photos into stunning Ghibli-style artwork with our free AI generator. No registration required. Get high-quality Ghibli art in seconds.' 
        },
        { 
          name: 'keywords', 
          content: 'ghibli ai generator, free ghibli generator, studio ghibli art, ai art generator, ghibli style, no signup ai generator' 
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ]
    }
  },

  runtimeConfig: {
    public: {
      // 设置为 true 使用开发环境，false 使用生产环境
      apiBaseUrl: false  // 在这里改 true/false 来切换环境
        ? 'http://localhost:8000'
        : 'https://api.ghibliaigenerator.io',
      apiEndpoints: {
        user: {
          login: '/api/v1/user/login/google',
          info: '/api/v1/user/info',
          logout: '/api/v1/user/logout'
        },
        images: {
          task: '/api/v1/images/task'
        }
      }
    }
  }
})