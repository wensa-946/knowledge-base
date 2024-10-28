import { defineConfig } from 'vitepress'
import nav from './nav'
// import sidebar from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "knowledge-base",
  description: "wensa 的前端知识库",
  srcDir: "前端",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.svg",
    outlineTitle: "知识点目录",
    outline: [3, 6],
    nav,
    // sidebar,
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档"
          },
          modal: {
            noResultsText: "未找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            }
          }
        }
      }
    },
    socialLinks: [
      { 
        icon: 'github', 
        link: 'https://gitee.com/wensa946/knowledge-base.git' 
      }
    ],
    footer: {
      copyright: "copyright @ 2024 wensa946"
    },
    lastUpdated: {
      text: '最后更新时间',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  },
  markdown: {
    lineNumbers: true
  },
  
})
