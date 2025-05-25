import { createContentLoader } from 'vitepress'

export default createContentLoader([
    'blog/**/*.md',    // ブログ記事
    'knowledge/**/*.md', // 豆知識
    'novels/**/*.md',  // 小説作品
], {
    excerpt: true,
    transform(rawData) {
        // 全記事からタグ情報を抽出
        const allTags = new Map()

        for (const post of rawData) {
            const tags = post.frontmatter.tags || []
            for (const tag of tags) {
                if (!allTags.has(tag)) {
                    allTags.set(tag, [])
                }
                allTags.get(tag).push(post)
            }
        }

        // 返すデータ形式に変換
        return {
            posts: rawData.sort((a, b) => {
                return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
            }),
            tags: Object.fromEntries(allTags)
        }
    }
})
