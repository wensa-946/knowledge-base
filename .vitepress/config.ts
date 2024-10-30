import { defineConfig } from "vitepress";
import viteCompression from "vite-plugin-compression"; 
// 谨记：vite-plugin-compression 在 vitepress 只能打包 dist/assets/ 下面的代码
import nav from "./nav";
import sidebar from "./sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "knowledge-base",
  description: "wensa 的前端知识库",
  srcDir: "前端",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.svg",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    outline: {
      level: "deep", // 右侧大纲标题层级
      label: "目录大纲", // 右侧大纲标题文本配置
    },
    nav,
    sidebar,
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索知识",
            buttonAriaLabel: "搜索知识",
          },
          modal: {
            noResultsText: "未找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://gitee.com/wensa946/knowledge-base.git",
      },
    ],
    footer: {
      copyright: "knowledge-base | Copyright © 2024 wensa946",
    },
    lastUpdated: {
      text: "上次更新",
      formatOptions: {
        dateStyle: "short", // 默认 short，full
        timeStyle: "medium", // 默认 short，medium
      },
    },
  },
  markdown: {
    lineNumbers: true,
  },
  vite: {
    plugins: [
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "brotliCompress",
        ext: ".br",
      }),
    ],
  },
});
