import { defineConfig } from 'vite'
import { sveltepress } from '@sveltepress/vite'
import { defaultTheme } from '@sveltepress/theme-default'
import sidebar from './config/sidebar'

const config = defineConfig({
  plugins: [
    sveltepress({
      theme: defaultTheme({
        navbar: [
          // Add your navbar configs here
        ],
        sidebar,
        github: 'https://github.com/Blackman99/sveltepress',
        logo: '/Web3Dev.Education-no-text.png',
      }),
      siteConfig: {
        title: 'Web3Education',
        description: 'Everything you need to become a smart contract developer or security engineer',
      },
    }),
  ],
})

export default config
