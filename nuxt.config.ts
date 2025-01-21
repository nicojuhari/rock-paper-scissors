// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/seo'],
  nitro: {
    preset: 'netlify'
  },
  app: {
        head: { 
            htmlAttrs: {
              lang: 'en'
            },
            title: 'Play Rock Paper Scissors Game Online - Free',
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
  site: {
        url: 'https://play-rps-online.netlify.app/',
        name: 'Play Rock Paper Scissors Online',
    },
  routeRules: {
    // Set prerender to true to configure it to be prerendered
    "/": { prerender: true },
  }

})