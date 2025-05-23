---
title: 雑学一覧
layout: doc
editLink: false
prev: false  # ← 前のページリンクを無効
next: false  # ← 次のページリンクを無効
---

# 雑学一覧

<script setup>
import { data as articles } from '../.vitepress/theme/data/knowledge.data.js'
</script>

<ArticleList :articles="articles" />
