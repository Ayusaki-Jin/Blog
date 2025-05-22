<script setup>
import { useData } from 'vitepress'

const { page, frontmatter } = useData()

// frontmatterから初稿日付を取得（なければ最終更新日を使用）
const createdDate = frontmatter.value.date
    ? new Date(frontmatter.value.date).toLocaleDateString('ja-JP')
    : '不明'

// VitePressが提供する最終更新日（Gitの履歴から自動取得）
const lastUpdated = page.value.lastUpdated
    ? new Date(page.value.lastUpdated).toLocaleDateString('ja-JP')
    : '未更新'

// 更新履歴（frontmatterから取得）
const history = frontmatter.value.history || []
</script>

<template>
    <div class="page-info">
        <div class="dates">
            <span class="created">📝 初稿: {{ createdDate }}</span>
            <span class="updated">🔄 最終更新: {{ lastUpdated }}</span>
        </div>

        <details v-if="history.length > 0" class="history">
            <summary>📋 更新履歴を見る</summary>
            <ul>
                <li v-for="(item, index) in history" :key="index">
                    {{ item.date }} - {{ item.description }}
                </li>
            </ul>
        </details>
    </div>
</template>

<style scoped>
.page-info {
    margin: 2rem 0;
    padding: 1rem;
    border-radius: 8px;
    background-color: var(--vp-c-bg-soft);
}

.dates {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
}

.created,
.updated {
    font-size: 0.9rem;
}

.history {
    margin-top: 1rem;
    font-size: 0.9rem;
}

summary {
    cursor: pointer;
}
</style>
