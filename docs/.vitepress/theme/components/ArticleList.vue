<script setup>
import { computed, ref } from 'vue'
import Pagination from './Pagination.vue'

const props = defineProps({
    articles: {
        type: Array,
        required: true,
        default: () => []
    },
    itemsPerPage: {
        type: Number,
        default: 15 // 1ページあたりの記事数
    }
})

// 現在のページ番号を管理
const currentPage = ref(1)

// ページネーション関連の計算
const totalPages = computed(() => {
    return Math.ceil(props.articles.length / props.itemsPerPage)
})

// 現在のページに表示する記事を計算
const displayedArticles = computed(() => {
    const start = (currentPage.value - 1) * props.itemsPerPage
    const end = start + props.itemsPerPage
    return props.articles.slice(start, end)
})

// ページ変更ハンドラー
const handlePageChange = (page) => {
    currentPage.value = page
    // ページが変わったらページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
    <div class="article-list-container">
        <!-- 記事一覧 -->
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

        <!-- ページネーション -->
        <Pagination :current-page="currentPage" :total-pages="totalPages" :max-visible-pages="8"
            @page-change="handlePageChange" />
    </div>
</template>

<style scoped>
/* 既存のスタイルはそのまま維持 */
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
}

.article-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
}

.article-title {
    font-size: 1.2rem;
    font-weight: 600;
    display: block;
    margin-bottom: 0.75rem;
    color: var(--vp-c-text-1);
    text-decoration: none;
}

.article-title:hover {
    color: var(--vp-c-brand);
    text-decoration: underline;
}

.article-meta {
    font-size: 0.85rem;
    color: var(--vp-c-text-2);
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 0.5rem 1rem;
    min-height: 2.5em;
}

.article-date {
    white-space: nowrap;
}

.article-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
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
