import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/sitemap'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'static' // 告诉 Nuxt 明确用 "静态部署"
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
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ]
    }
  },

  compatibilityDate: '2025-04-26'
})