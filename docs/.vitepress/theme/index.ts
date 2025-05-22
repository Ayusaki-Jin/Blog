// docs/.vitepress/theme/index.ts
import DefaultTheme from "vitepress/theme";
import TagLinks from "./components/TagLinks.vue";
import LastUpdated from "./components/LastUpdated.vue";
import ArticleList from "./components/ArticleList.vue"; // これを追加！
import "./custom.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("TagLinks", TagLinks);
    app.component("LastUpdated", LastUpdated);
    app.component("ArticleList", ArticleList); // これを追加！
  },
};
