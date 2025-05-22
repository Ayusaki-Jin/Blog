---
title: タグ一覧
sidebar: false
---

<script setup>
import { ref, computed, onMounted } from 'vue'
import { data as postData } from './.vitepress/theme/data/tags.data.js'

const selectedTag = ref(null)
const tags = computed(() => Object.keys(postData.tags).sort())
const filteredPosts = computed(() => {
  if (!selectedTag.value) return []
  return postData.tags[selectedTag.value]
})

// URLからタグを読み取る
onMounted(() => {
  if (location.hash) {
    selectedTag.value = location.hash.slice(1)
  }
})
</script>

# タグ一覧

<div class="tags-page">
  <div class="tag-list">
    <a 
      v-for="tag in tags" 
      :key="tag"
      :href="`#${tag}`"
      :class="['tag', selectedTag === tag ? 'active' : '']"
      @click="selectedTag = tag"
    >
      {{ tag }} ({{ postData.tags[tag].length }})
    </a>
  </div>

  <div v-if="selectedTag" class="tag-posts">
    <h2>「{{ selectedTag }}」のタグがついた記事</h2>
    <ul>
      <li v-for="post in filteredPosts" :key="post.url">
        <a :href="post.url">{{ post.frontmatter.title }}</a>
        <span class="post-date">{{ new Date(post.frontmatter.date).toLocaleDateString('ja-JP') }}</span>
      </li>
    </ul>
  </div>
</div>

<style>
.tag-list {
  margin-bottom: 2rem;
}
.tag {
  display: inline-block;
  padding: 4px 10px;
  margin: 0 8px 8px 0;
  background-color: #eee;
  border-radius: 4px;
  color: #444;
  text-decoration: none;
}
.tag.active {
  background-color: #3eaf7c;
  color: white;
}
.post-date {
  color: #888;
  font-size: 0.9em;
  margin-left: 10px;
}
</style>
