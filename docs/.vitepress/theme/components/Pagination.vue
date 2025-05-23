<script setup>
import { computed } from 'vue'

const props = defineProps({
    currentPage: {
        type: Number,
        default: 1
    },
    totalPages: {
        type: Number,
        required: true
    },
    maxVisiblePages: {
        type: Number,
        default: 7 // 表示する数字ボタンの最大数
    }
})

const emit = defineEmits(['page-change'])

// ページ番号ボタンの配列を計算
const visiblePages = computed(() => {
    const total = props.totalPages
    const current = props.currentPage
    const max = props.maxVisiblePages

    if (total <= max) {
        // 総ページ数が少ない場合は全部表示
        return Array.from({ length: total }, (_, i) => i + 1)
    }

    // 複雑なロジック: 現在のページを中心にして、前後に数字を表示
    const half = Math.floor(max / 2)
    let start = Math.max(1, current - half)
    let end = Math.min(total, start + max - 1)

    // 終端近くの場合の調整
    if (end === total) {
        start = Math.max(1, end - max + 1)
    }

    const pages = []

    // 最初のページは常に表示
    if (start > 1) {
        pages.push(1)
        if (start > 2) {
            pages.push('...') // 省略記号
        }
    }

    // 中央部分のページ番号
    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    // 最後のページは常に表示
    if (end < total) {
        if (end < total - 1) {
            pages.push('...') // 省略記号
        }
        pages.push(total)
    }

    return pages
})

// ページ変更ハンドラー
const goToPage = (page) => {
    if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
        emit('page-change', page)
    }
}

const goToFirst = () => goToPage(1)
const goToLast = () => goToPage(props.totalPages)
const goToPrev = () => goToPage(props.currentPage - 1)
const goToNext = () => goToPage(props.currentPage + 1)
</script>

<template>
    <div v-if="totalPages > 1" class="pagination">
        <!-- 最初へ << -->
        <button @click="goToFirst" :disabled="currentPage === 1" class="pagination-btn pagination-first"
            title="最初のページへ">
            &laquo;&laquo;
        </button>

        <!-- 前へ < -->
        <button @click="goToPrev" :disabled="currentPage === 1" class="pagination-btn pagination-prev" title="前のページへ">
            &laquo;
        </button>

        <!-- ページ番号ボタン -->
        <template v-for="page in visiblePages" :key="page">
            <button v-if="page !== '...'" @click="goToPage(page)" :class="[
                'pagination-btn',
                'pagination-number',
                { 'pagination-current': page === currentPage }
            ]">
                {{ page }}
            </button>
            <span v-else class="pagination-ellipsis">{{ page }}</span>
        </template>

        <!-- 次へ > -->
        <button @click="goToNext" :disabled="currentPage === totalPages" class="pagination-btn pagination-next"
            title="次のページへ">
            &raquo;
        </button>

        <!-- 最後へ >> -->
        <button @click="goToLast" :disabled="currentPage === totalPages" class="pagination-btn pagination-last"
            title="最後のページへ">
            &raquo;&raquo;
        </button>
    </div>
</template>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin: 2rem 0;
    flex-wrap: wrap;
}

.pagination-btn {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--vp-c-border);
    background-color: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    min-width: 2.5rem;
    text-align: center;
}

.pagination-btn:hover:not(:disabled) {
    background-color: var(--vp-c-bg-soft);
    border-color: var(--vp-c-brand);
    color: var(--vp-c-brand);
}

.pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.pagination-current {
    background-color: var(--vp-c-brand) !important;
    color: var(--vp-c-bg) !important;
    border-color: var(--vp-c-brand) !important;
}

.pagination-ellipsis {
    padding: 0.5rem 0.25rem;
    color: var(--vp-c-text-2);
}

/* レスポンシブ対応 */
@media (max-width: 640px) {
    .pagination {
        gap: 0.25rem;
    }

    .pagination-btn {
        padding: 0.4rem 0.6rem;
        font-size: 0.8rem;
        min-width: 2rem;
    }
}
</style>
