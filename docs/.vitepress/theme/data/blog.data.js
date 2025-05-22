// docs/.vitepress/theme/data/blog.data.js
import { createContentLoader } from 'vitepress'

export default createContentLoader('blog/**/*.md', {
    excerpt: true,
    transform(rawData) {
        return rawData
            .filter(page => {
                // URLが `/blog/` (ルートのindex.md) でもなく、
                // かつ、URLの末尾が `/index.html` (サブフォルダのindex.md) でもないページだけを対象にする
                return page.url !== '/blog/' && !page.url.endsWith('/index.html');
            })
            .map(page => {
                return {
                    title: page.frontmatter.title,
                    date: page.frontmatter.date,
                    url: page.url,
                    tags: page.frontmatter.tags || [],
                }
            })
            .sort((a, b) => {
                return +new Date(b.date) - +new Date(a.date)
            })
    }
})
