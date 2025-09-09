// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui','@nuxtjs/seo'],
  css: ['~/assets/css/main.css'],
  nitro: {
    preset: 'netlify'
  },
  app: {
        head: { 
            htmlAttrs: {
              lang: 'en'
            },
            title: 'Rock Paper Scissors Online | No Sign-Up Required | Play FREE',
            titleTemplate: '%s',
            link: [
                { rel: 'icon', type:'image/x-icon', href: '/favicon.ico' },
                { rel: 'icon', type:'image/svg+xml', href: '/favicon.svg' },
                { rel: 'shortcut icon', type:'image/png', sizes:"48x48", href:"/favicon-48x48.png" },
                { rel: 'apple-touch-icon', sizes:"180x180", href:"/apple-touch-icon.png" },
                { rel: 'manifest', href:"/site.webmanifest" }
            ],
            meta: [
                { name: 'google-site-verification', content: 'G-DmsXHjqgYIZfoeMtgM5iLhal2sV3E-IBpjR7G8zhg' },
                { name: 'apple-mobile-web-app-title', content: 'Rock Paper Scissors Game Online' },
            ],
            script: [
                { src: 'https://scripts.simpleanalyticscdn.com/latest.js', async: true, 'data-collect-dnt': true }
            ]
        },
  },
  site: {
        url: 'https://rps-game.online',
        name: 'Rock Paper Scissors Online',
    },
  routeRules: {
    // Set prerender to true to configure it to be prerendered
    "/": { prerender: true },
  },
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'neutral', 'error', 'success', 'warning', 'info']
    },
    colorMode: false
  }

})