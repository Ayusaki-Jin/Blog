---
title: 小説作品一覧
layout: doc
editLink: false
prev: false  # ← 前のページリンクを無効
next: false  # ← 次のページリンクを無効
---

# 小説作品一覧

<script setup>
import { data as articles } from '../.vitepress/theme/data/novels.data.js'
</script>

<ArticleList :articles="articles" />
