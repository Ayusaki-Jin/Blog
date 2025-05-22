<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-after>
      <TagLinks v-if="frontmatter.tags" :tags="frontmatter.tags" />
      <LastUpdated />
    </template>
  </Layout>
</template>
