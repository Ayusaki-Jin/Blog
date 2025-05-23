import DefaultTheme from "vitepress/theme";
import TagLinks from "./components/TagLinks.vue";
import LastUpdated from "./components/LastUpdated.vue";
import ArticleList from "./components/ArticleList.vue";
import Pagination from "./components/Pagination.vue";
import "./custom.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("TagLinks", TagLinks);
    app.component("LastUpdated", LastUpdated);
    app.component("ArticleList", ArticleList);
    app.component("Pagination", Pagination);
  },
  setup() {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        // VitePressのデフォルトハンバーガー機能を無効化
        const hamburger = document.querySelector(".VPNavBarHamburger");
        if (hamburger) {
          // 既存のイベントリスナーを削除（無効化）
          const newHamburger = hamburger.cloneNode(true) as HTMLElement;
          hamburger.replaceWith(newHamburger);

          // カスタムのクリックイベントを追加
          if (newHamburger) {
            // ← nullチェック追加
            newHamburger.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();

              // カスタムのサイドバートグル
              const isOpen = document.body.classList.contains(
                "custom-sidebar-open"
              );
              if (isOpen) {
                document.body.classList.remove("custom-sidebar-open");
              } else {
                document.body.classList.add("custom-sidebar-open");
              }
            });
          }
        }

        // ESCキーでサイドバーを閉じる
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            document.body.classList.remove("custom-sidebar-open");
          }
        });

        // サイドバー外クリックで閉じる
        document.addEventListener("click", (e) => {
          const target = e.target as HTMLElement; // ← 型キャスト追加
          if (document.body.classList.contains("custom-sidebar-open")) {
            if (
              target &&
              !target.closest(".VPSidebar") &&
              !target.closest(".VPNavBarHamburger")
            ) {
              document.body.classList.remove("custom-sidebar-open");
            }
          }
        });
      }, 100);
    }
  },
};
