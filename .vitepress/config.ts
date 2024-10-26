import { defineConfig } from 'vitepress'
import nav from './nav'
import sidebar from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "knowledge-base",
  description: "wensa 的前端知识库",
  srcDir: "前端",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks: [
      { 
        icon: 'github', 
        link: 'https://gitee.com/wensa946/knowledge-base.git' 
      }
    ]
  }
})
