// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Тестовое задание Mealhub'
    }
  },
  css: [
    "~/assets/style/main.css"
  ]
})
