<script setup>
import { computed } from 'vue'

const props = defineProps({
    articles: { // 表示する記事データの配列
        type: Array,
        required: true,
        default: () => []
    },
    // 今後ページネーションのために追加するprops:
    // currentPage: Number,
    // itemsPerPage: Number,
})

// 表示する記事を計算 (今は全部表示)
const displayedArticles = computed(() => {
    return props.articles
    // ページネーションを実装するなら、ここでスライス処理とかする
})
</script>

<template>
    <div class="article-list-container">
        <ul v-if="displayedArticles.length" class="article-list">
            <li v-for="article in displayedArticles" :key="article.url" class="article-item">
                <a :href="article.url" class="article-title">{{ article.title || '無題の記事' }}</a>
                <div class="article-meta">
                    <span v-if="article.date" class="article-date">
                        {{ new Date(article.date).toLocaleDateString('ja-JP') }}
                    </span>
                    <div v-if="article.tags && article.tags.length" class="article-tags">
                        <span v-for="tag in article.tags" :key="tag" class="tag-link">
                            <a :href="`/tags.html#${tag}`">{{ tag }}</a>
                        </span>
                    </div>
                </div>
            </li>
        </ul>
        <p v-else>
            まだ記事がありません。
        </p>
        <!-- ここにページネーションのUIを追加していく -->
    </div>
</template>

<style scoped>
/* ArticleList.vue の <style scoped> の中 */
.article-list-container {
    margin-top: 2rem;
}

.article-list {
    list-style: none;
    padding: 0;
}

.article-item {
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--vp-c-divider);
    padding-bottom: 1rem;
    /* ★重要★ アイテム自体の下にしっかり余白を取る！ */
    /* これが区切り線と次の記事タイトルの間のスペースになる */
}

.article-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
    /* 最後のアイテムは下の余白や線をなくす */
}

.article-title {
    font-size: 1.2rem;
    font-weight: 600;
    display: block;
    margin-bottom: 0.75rem;
    color: var(--vp-c-text-1);
    /* ★追加★ リンクの色を通常の文字色に */
    text-decoration: none;
    /* ★追加★ リンクの下線を消す */
}

.article-title:hover {
    color: var(--vp-c-brand);
    /* ホバー時はブランドカラーにするなど (任意) */
    text-decoration: underline;
    /* ホバー時は下線を出すなど (任意) */
}

.article-meta {
    font-size: 0.85rem;
    color: var(--vp-c-text-2);
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    /* min-height は一旦削除してみよう。代わりに親のpaddingで調整する */
    /* margin-bottom は一旦削除。親のpadding-bottomで調整 */
}

.article-date {
    /* 特に大きな変更なし */
}

.article-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    min-height: 1.2em;
    /* ★重要★ タグエリアが空でも、最低1行分の高さを確保するイメージ */
    /* (タグがない場合、ここに透明な高さができる) */
}

.article-tags:empty {
    /* もしタグが一つもない場合は、この高さも不要にする */
    min-height: 0;
    margin-top: -0.4rem;
    /* gapも打ち消す (任意) */
}


.tag-link a {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 4px;
    background-color: var(--vp-c-bg-soft);
    color: var(--vp-c-text-2);
    font-size: 0.85em;
    text-decoration: none;
}

.tag-link a:hover {
    background-color: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
}
</style>
