---
title: タグ一覧
sidebar: false
---

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { data as postData } from './.vitepress/theme/data/tags.data.js'

const selectedTag = ref(null)
const tags = computed(() => Object.keys(postData.tags).sort())
const filteredPosts = computed(() => {
  if (!selectedTag.value) return []
  return postData.tags[selectedTag.value]
})

// URLエンコーディング関数
const encodeTag = (tag) => {
  return encodeURIComponent(tag)
}

const decodeTag = (encodedTag) => {
  try {
    return decodeURIComponent(encodedTag)
  } catch (e) {
    return encodedTag // デコードに失敗した場合はそのまま返す
  }
}

// URLからタグを読み取る（デコード対応）
const updateSelectedTag = () => {
  if (location.hash) {
    const hashTag = location.hash.slice(1)
    const decodedTag = decodeTag(hashTag)
    
    // 実際に存在するタグかチェック
    if (postData.tags[decodedTag]) {
      selectedTag.value = decodedTag
    } else {
      selectedTag.value = null
    }
  } else {
    selectedTag.value = null
  }
}

onMounted(() => {
  updateSelectedTag()
  
  // ハッシュ変更を監視
  window.addEventListener('hashchange', updateSelectedTag)
})

// タグクリック時の処理
const selectTag = (tag) => {
  selectedTag.value = tag
  window.location.hash = encodeTag(tag)
}
</script>

# タグ一覧

<div class="tags-page">
  <div class="tag-list">
    <a 
      v-for="tag in tags" 
      :key="tag"
      :href="`#${encodeTag(tag)}`"
      :class="['tag', selectedTag === tag ? 'active' : '']"
      @click.prevent="selectTag(tag)"
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

<!-- style部分は同じ -->


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
