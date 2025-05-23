<template>
    <div class="custom-sidebar">
        <h3>ブログ記事</h3>
        <ul class="sidebar-nav">
            <li><a href="/blog/diary/diary1">ひとつめの記事</a></li>
            <li><a href="/blog/diary/test-diary">今日の出来事</a></li>
            <!-- 他の記事も手動で追加 -->
        </ul>

        <h3>小説作品</h3>
        <ul class="sidebar-nav">
            <li><a href="/novels/short-story">短編：窓の向こう</a></li>
            <!-- 他の作品も手動で追加 -->
        </ul>

        <h3>雑学</h3>
        <ul class="sidebar-nav">
            <li><a href="/knowledge/意外と知らない生物の不思議">意外と知らない生物の不思議</a></li>
            <!-- 他の記事も手動で追加 -->
        </ul>
    </div>

    <div class="sidebar-overlay" @click="closeSidebar"></div>
</template>

<script setup>
const closeSidebar = () => {
    document.body.classList.remove('sidebar-open')
}
</script>

<style scoped>
.sidebar-nav {
    list-style: none;
    padding: 0;
    margin-bottom: 1.5rem;
}

.sidebar-nav li {
    margin-bottom: 0.5rem;
}

.sidebar-nav a {
    color: var(--vp-c-text-1);
    text-decoration: none;
    padding: 0.25rem 0;
    display: block;
    border-radius: 4px;
    padding-left: 0.5rem;
}

.sidebar-nav a:hover {
    background-color: var(--vp-c-bg-soft);
    color: var(--vp-c-brand);
}
</style>
  
