import pwa from './nuxt.config/pwa'
import axios from './nuxt.config/axios'
import styleResources from './nuxt.config/styleResources'
import head from './nuxt.config/head'

export default {
  ssr: 'false',
  target: 'static',
  srcDir: 'src',
  components: true, // Auto import components when used in your templates https://nuxtjs.org/docs/2.x/directory-structure/components
  buildModules: [
    '@nuxtjs/eslint-module',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  head,
  axios,
  pwa,
  styleResources,
}
  