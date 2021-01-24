export default {
    publicRuntimeConfig: {
        baseURL: process.env.BASE_URL
    },
    head: {
        titleTemplate: 'Nozom -  Ecomerce template',
        title: 'Nozom -  Ecomerce template',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content:
                    'Martfury - Multipurpose Marketplace Vuejs Ecommerce Template'
            }
        ],
        link: [
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700&amp;amp;subset=latin-ext'
            }
        ]
    },

    css: [
        'swiper/dist/css/swiper.css',
        '~/static/fonts/Linearicons/Font/demo-files/demo.css',
        '~/static/fonts/font-awesome/css/font-awesome.css',
        '~/static/css/bootstrap.min.css',
        '~/assets/scss/style.scss'
    ],
    
    plugins: [
        { src: '~plugins/vueliate.js', ssr: false },
        { src: '~/plugins/swiper-plugin.js', ssr: false },
        { src: '~/plugins/vue-notification.js', ssr: false },
        { src: '~/plugins/axios.js', ssr: false },
        { src: '~/plugins/lazyLoad.js', ssr: false }
    ],

    buildModules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/style-resources',
        '@nuxtjs/auth-next',
        'cookie-universal-nuxt'
    ],

    styleResources: {
        scss: './assets/scss/env.scss'
    },

    modules: ['@nuxtjs/axios', 'nuxt-i18n'],

    i18n: {
        locales: [
            { code: 'en', file: 'en.json' },
            { code: 'ar', file: 'ar.json' }
        ],
        lazy: true,
        defaultLocale: 'en',
        langDir: 'lang/locales/'
    },

    router: {
        linkActiveClass: '',
        linkExactActiveClass: 'active'
    },

    auth: {
        strategies: {
          local: {
            token: {
              property: 'access_token',
              required: true,
              type: 'Bearer'
            },
            redirect: {
                login: '/account/login',
                logout: '/',
                callback: '/account/login',
                home: '/'
            },
            user: {
            //   property: 'user',
              autoFetch: true
            },
            endpoints: {
                
              login: { url: `http://localhost:8000/api/login`, method: `post` },
              logout: { url: `http://localhost:8000/api/logout`, method: `post` },
              user: { url: `http://localhost:8000/api/user`, method: `get` }
            }
          }
        }
    },

    server: {
        port: 3000,
        host: 'localhost'
    }
};
