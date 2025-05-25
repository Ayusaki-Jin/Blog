<script setup>
import { computed } from 'vue'

const props = defineProps({
  tags: {
    type: Array,
    default: () => []
  }
})

// URLエンコーディング関数追加
const encodeTag = (tag) => {
  return encodeURIComponent(tag)
}

const tagLinks = computed(() => {
  return props.tags.map(tag => {
    return {
      text: tag,
      link: `/tags.html#${encodeTag(tag)}`  // ← URLエンコード
    }
  })
})
</script>

<template>
  <div class="tag-links">
    <span v-if="tags.length" class="tags-label">タグ: </span>
    <a v-for="(tag, index) in tagLinks" :key="index" :href="tag.link" class="tag-link">
      {{ tag.text }}
    </a>
  </div>
</template>

<!-- style部分は同じ -->


<style scoped>
.tag-links {
  margin-top: 20px;
}
.tags-label {
  font-weight: bold;
  margin-right: 6px;
}
.tag-link {
  display: inline-block;
  padding: 2px 8px;
  margin-right: 6px;
  border-radius: 4px;
  background-color: #eee;
  color: #444;
  font-size: 0.9em;
  text-decoration: none;
}
.tag-link:hover {
  background-color: #ddd;
}
</style>
