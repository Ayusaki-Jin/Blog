import { defineConfig } from "vitepress";

// import { generateSidebar } from "./sidebar";

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
      { // ここの中括弧が抜けてた！
        text: "リファレンス",
        items: [
          { text: "タグ一覧", link: "/tags" },
          { text: "マークダウン早見表", link: "/reference/markdown" }
        ]
      }
    ],
    
    // ---------- サイドバー設定 ----------
    sidebar: {
      // ブログセクションのサイドバー
      '/blog/': [
        { // ここの中括弧が抜けてた！
          text: "ブログ記事",
          collapsed: false,
          items: [
            { text: "ブログ一覧", link: "/blog/" },
            { text: "日記", link: "/blog/diary/" },
            { text: "雑談", link: "/blog/chat/" },
            { text: "考え", link: "/blog/thoughts/" }
          ]
        },
        { // ここの中括弧が抜けてた！
          text: "人気の記事",
          collapsed: true,
          items: [
            { text: "人気記事1", link: "/blog/popular/post1" },
            { text: "人気記事2", link: "/blog/popular/post2" }
          ]
        }
      ],
      
      // 雑学セクションのサイドバー
      '/knowledge/': [
        { // ここの中括弧が抜けてた！
          text: "雑学",
          collapsed: true,
          items: [
            { text: "一覧", link: "/knowledge/" },
            { text: "タコの雑学１", link: "/knowledge/interesting-fact" },
            { text: "生物学", link: "/knowledge/biology/" },
            { text: "国語", link: "/knowledge/japanese/" },
            { text: "歴史", link: "/knowledge/history/" },
            { text: "科学", link: "/knowledge/science/" }
          ]
        }
      ],
      
      // 小説セクションのサイドバー
      '/novels/': [
        { // ここの中括弧が抜けてた！
          text: "小説作品",
          collapsed: false,
          items: [
            { text: "作品一覧", link: "/novels/" },
            { 
              text: "短編小説",
              collapsed: true,
              items: [
                { text: "海と空", link: "/novels/short-story" }
              ]
            },
            { 
              text: "ファンタジー小説",
              collapsed: true,
              items: [
                { text: "第1章", link: "/novels/fantasy/chapter1" },
                { text: "第2章", link: "/novels/fantasy/chapter2" },
                { text: "第3章", link: "/novels/fantasy/chapter3" }
              ]
            },
            {
              text: "SF小説",
              collapsed: true,
              items: [
                { text: "第1話", link: "/novels/scifi/part1" },
                { text: "第2話", link: "/novels/scifi/part2" }
              ]
            }
          ]
        }
      ],
      
      // リファレンスセクションのサイドバー
      '/reference/': [
        { // ここの中括弧が抜けてた！
          text: "リファレンス",
          items: [
            { text: "マークダウン早見表", link: "/reference/markdown" },
            { text: "VitePress活用法", link: "/reference/vitepress-tips" }
          ]
        }
      ]
    },
    
    // その他の設定（ここは問題なし）
    socialLinks: [
      { icon: "github", link: "https://github.com/あなたのユーザー名" },
      { icon: "twitter", link: "https://twitter.com/あなたのユーザー名" }
    ],
    
    footer: {
      message: "VitePressで作成",
      copyright: "Copyright © 2022-present お兄ちゃん"
    },
    
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "検索",
                buttonAriaLabel: "Search"
              },
              modal: {
                noResultsText: "見つかりませんでした",
                resetButtonTitle: "リセット",
                footer: {
                  selectText: "選択",
                  navigateText: "移動",
                  closeText: "閉じる"
                }
              }
            }
          }
        }
      }
    },
    
    appearance: true,
    lastUpdatedText: "最終更新",
    
    outline: {
      level: "deep",
      label: "目次"
    },
    
    docFooter: {
      prev: "前のページ",
      next: "次のページ"
    },
    
    editLink: {
      pattern: "https://github.com/あなたのユーザー名/リポジトリ名/edit/main/docs/:path",
      text: "このページを編集"
    }
    // sidebar: generateSidebar() 自動生成にしたければこれを解禁
  }
});
