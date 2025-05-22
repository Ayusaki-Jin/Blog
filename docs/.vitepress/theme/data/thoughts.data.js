import { createContentLoader } from 'vitepress'

export default createContentLoader('thoughts/**/*.md', { // 'thoughts' フォルダ以下の全mdファイルを対象
    excerpt: true, // 抜粋も取得 (今回は使わないかもだけど、念のため)
    transform(rawData) {
        return rawData
            .filter(page => !page.url.endsWith('/index.html')) // 各フォルダのindex.mdは除く
            .map(page => {
                return {
                    title: page.frontmatter.title,
                    date: page.frontmatter.date,
                    url: page.url,
                    tags: page.frontmatter.tags || [],
                    // 必要なら他の情報も追加
                }
            })
            .sort((a, b) => { // 日付の降順（新しい順）でソート
                return +new Date(b.date) - +new Date(a.date)
            })
    }
})
