import fs from 'fs'
import path from 'path'

// ファイルの拡張子を除去する関数
function removeExtension(file: string) {
  return file.replace(/\.[^/.]+$/, '')
}

// フォルダ内のマークダウンファイルを取得する関数
function getFiles(dir: string) {
  const dirPath = path.resolve(__dirname, '../', dir)
  if (!fs.existsSync(dirPath)) return []
  
  return fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .map(file => {
      return {
        text: removeExtension(file),
        link: `/${dir}/${removeExtension(file)}`
      }
    })
}

// サブフォルダを取得する関数
function getSubfolders(dir: string) {
  const dirPath = path.resolve(__dirname, '../', dir)
  if (!fs.existsSync(dirPath)) return []
  
  return fs.readdirSync(dirPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => {
      const subDir = `${dir}/${dirent.name}`
      
      return {
        text: dirent.name,
        collapsed: true,
        items: [
          { text: '一覧', link: `/${subDir}/` },
          ...getFiles(subDir)
        ]
      }
    })
}

// サイドバーの生成
export function generateSidebar() {
  return {
    '/blog/': [
      {
        text: 'ブログ記事',
        collapsed: false,
        items: [
          { text: 'ブログ一覧', link: '/blog/' },
          ...getFiles('blog'),
          ...getSubfolders('blog')
        ]
      }
    ],
    '/knowledge/': [
      {
        text: '豆知識コレクション',
        collapsed: false,
        items: [
          { text: '一覧', link: '/knowledge/' },
          ...getFiles('knowledge'),
          ...getSubfolders('knowledge')
        ]
      }
    ],
    '/novels/': [
      {
        text: '小説作品',
        collapsed: false,
        items: [
          { text: '作品一覧', link: '/novels/' },
          ...getFiles('novels'),
          ...getSubfolders('novels')
        ]
      }
    ]
  }
}
