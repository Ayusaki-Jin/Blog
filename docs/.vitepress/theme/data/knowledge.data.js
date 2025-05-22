import { createContentLoader } from 'vitepress'

export default createContentLoader('knowledge/**/*.md', { // 対象フォルダを 'knowledge' に
    excerpt: true,
    transform(rawData) {
        return rawData
            .filter(page => {
                // URLが '/knowledge/' (この一覧ページ自身) でもなく、
                // かつ、URLの末尾が '/index.html' (サブフォルダの一覧ページ) でもないページだけ
                return page.url !== '/knowledge/' && !page.url.endsWith('/index.html');
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
