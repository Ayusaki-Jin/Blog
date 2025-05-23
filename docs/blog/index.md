---
title: ブログ記事一覧 // これはブラウザタブやSEO用
layout: doc
editLink: false
prev: false  # ← 前のページリンクを無効
next: false  # ← 次のページリンクを無効
---

# ブログ記事一覧

<script setup>
import { data as articles } from '../.vitepress/theme/data/blog.data.js'
</script>

<ArticleList :articles="articles" />
