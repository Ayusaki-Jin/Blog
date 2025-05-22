import { createContentLoader } from 'vitepress'

export default createContentLoader('novels/**/*.md', { // 対象フォルダを 'novels' に
    excerpt: true,
    transform(rawData) {
        return rawData
            .filter(page => {
                // URLが '/novels/' (この一覧ページ自身) でもなく、
                // かつ、URLの末尾が '/index.html' (サブフォルダの一覧ページ) でもないページだけ
                return page.url !== '/novels/' && !page.url.endsWith('/index.html');
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
