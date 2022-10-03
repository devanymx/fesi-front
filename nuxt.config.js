export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'fesi-front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '@/components',
    '@/components/shared',
    '@/components/products'
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/fontawesome'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth-next'
  ],

  speedkit: {
    detection: {
      performance: true,
      browserSupport: true
    }
  },

  plugins: [
    { src: '~plugins/file-pond-plugin.js', ssr: false }
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build

  axios: {
    credentials: true,
    prefix: '/api'
  },
  auth: {
    redirect: {
      login: '/',
      home: '/dashboard'
    },
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.API_URL,
        endpoints: {
          login: { url: '/api/login', method: 'post' }
        }
      }
    }
  },

  ssr: false,

  build: {
  },
  fontawesome: {
    component: 'fontawesome-icon',
    suffix: false,
    icons: {
      solid: true,
      brands: true
    }
  },
  env: {
    apiUrl: process.env.API_URL,
    apiToken: process.env.API_TOKEN
  },
  vue: {
    config: {
      silent: true
    }
  }
}
