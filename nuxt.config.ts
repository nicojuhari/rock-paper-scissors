// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],

  app: {
        head: { 
            htmlAttrs: {
              lang: 'en'
            },
            title: 'Rock Paper Scissors Online | Challenge Friends and Family',
            titleTemplate: '%s',
            link: [
                { rel: 'icon', type:'image/x-icon', href: '/favicon.ico' },
                { rel: 'icon', type:'image/svg+xml', href: '/favicon.svg' },
                { rel: 'shortcut icon', type:'image/png', sizes:"48x48", href:"/favicon-48x48.png" },
                { rel: 'apple-touch-icon', sizes:"180x180", href:"/apple-touch-icon.png" },
                { rel: 'manifest', href:"/site.webmanifest" }
            ],
            meta: [
                { name: 'apple-mobile-web-app-title', content: 'Play Rock Paper Scissors Online' },
            ],
            script: [
              { src:"https://cdn.splitbee.io/sb.js", async: ''}
            ]
        },
    },
})