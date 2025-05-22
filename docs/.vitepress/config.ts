import { defineConfig } from "vitepress";

import { generateSidebar } from "./sidebar";

export default defineConfig({
  // ---------- 基本設定 ----------
  title: "お兄ちゃんのブログ",
  description: "日常と創作の記録、雑学や小説をお届けします",
  lang: "ja-JP",
  lastUpdated: true,

  markdown: {
    lineNumbers: true,
  },

  // ---------- テーマ設定 ----------
  themeConfig: {
    siteTitle: "お兄ちゃんのサイト",
    logo: "/logo.png",

    // ---------- ナビゲーションバー設定 ----------
    nav: [
      { text: "ホーム", link: "/" },
      { text: "ブログ", link: "/blog/" },
      { text: "豆知識", link: "/knowledge/" },
      { text: "小説", link: "/novels/" },
      {
        // ここの中括弧が抜けてた！
        text: "リファレンス",
        items: [
          { text: "タグ一覧", link: "/tags" },
          { text: "マークダウン早見表", link: "/reference/markdown" },
        ],
      },
    ],

    // その他の設定（ここは問題なし）
    socialLinks: [
      { icon: "github", link: "https://github.com/あなたのユーザー名" },
      { icon: "twitter", link: "https://twitter.com/あなたのユーザー名" },
    ],

    footer: {
      message: "VitePressで作成",
      copyright: "Copyright © 2022-present お兄ちゃん",
    },

    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "検索",
                buttonAriaLabel: "Search",
              },
              modal: {
                noResultsText: "見つかりませんでした",
                resetButtonTitle: "リセット",
                footer: {
                  selectText: "選択",
                  navigateText: "移動",
                  closeText: "閉じる",
                },
              },
            },
          },
        },
      },
    },

    appearance: true,
    lastUpdatedText: "最終更新",

    outline: {
      level: "deep",
      label: "目次",
    },

    docFooter: {
      prev: "前のページ",
      next: "次のページ",
    },

    editLink: false,
    sidebar: generateSidebar(),
  },
});
