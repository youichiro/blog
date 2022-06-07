const siteMetadata = {
  title: 'youichiro blog',
  author: 'youichiro',
  headerTitle: 'youichiro blog 🐈‍⬛',
  description: 'youichiro blog',
  theme: 'system', // system, dark or light
  siteUrl: 'https://tailwind-nextjs-starter-blog.vercel.app',
  image: '/static/images/avatar.jpg',
  socialBanner: '/static/images/twitter-card.png',
  email: 'cinnamon416@gmail.com',
  github: 'https://github.com/youichiro',
  twitter: 'https://twitter.com/youichiroz',
  locale: 'ja-JP-u-ca-japanese',
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports plausible, simpleAnalytics, umami or googleAnalytics
    plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // true or false
    umamiWebsiteId: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    googleAnalyticsId: '', // e.g. UA-000000-2 or G-XXXXXXX
  },
}

module.exports = siteMetadata
