import DefaultTheme from 'vitepress/theme'
import TagLinks from './components/TagLinks.vue'
import LastUpdated from './components/LastUpdated.vue'
import './custom.css' // 必要に応じて作成

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // コンポーネントをグローバル登録
    app.component('TagLinks', TagLinks)
    app.component('LastUpdated', LastUpdated)
  }
}
