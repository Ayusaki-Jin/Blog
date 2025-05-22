// docs/.vitepress/sidebar.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter"; // フロントマターをパースするライブラリ

// gray-matterをインストールする必要があるよ！
// ターミナルで: npm install gray-matter

// ファイルの拡張子を除去する関数
function removeExtension(file: string) {
  return file.replace(/\.[^/.]+$/, "");
}

// マークダウンファイルからフロントマターのタイトルを取得する関数
function getTitleFromMarkdown(filePath: string): string | null {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent); // フロントマターをパース
    return data.title || null; // titleがあればそれを返す
  } catch (error) {
    // console.error(`Error reading frontmatter from ${filePath}:`, error) // デバッグ用
    return null;
  }
}

// フォルダ内のマークダウンファイルを取得し、タイトルを優先して表示名にする関数
function getMarkdownFilesWithTitle(baseDir: string, currentDir: string = "") {
  const dirPath = path.resolve(__dirname, "../", baseDir, currentDir);
  if (!fs.existsSync(dirPath)) return [];

  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".md") && file !== "index.md")
    .map((file) => {
      const filePath = path.resolve(dirPath, file);
      const title = getTitleFromMarkdown(filePath);
      const linkText = title || removeExtension(file).replace(/-/g, " "); // titleがなければファイル名ベース
      return {
        text: linkText,
        link: `/${path
          .join(
            baseDir.replace(/^docs\/?/, ""),
            currentDir,
            removeExtension(file)
          )
          .replace(/\\/g, "/")}`,
      };
    })
    .sort((a, b) => a.text.localeCompare(b.text, "ja")); // タイトルで並び替え (任意)
}

// サブフォルダも考慮してアイテムを取得する関数 (改良版)
function getItemsForDirectoryWithTitle(
  baseDir: string,
  currentDir: string = ""
) {
  const items: any[] = [];

  // 現在のディレクトリ直下のファイル
  const filesInCurrentDir = getMarkdownFilesWithTitle(baseDir, currentDir);
  items.push(...filesInCurrentDir);

  // サブフォルダを探索
  const subdirectories = fs
    .readdirSync(path.resolve(__dirname, "../", baseDir, currentDir), {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const subDir of subdirectories) {
    // サブフォルダ内のindex.mdからタイトルを取得してみる (もしあれば)
    const subDirIndexPath = path.resolve(
      __dirname,
      "../",
      baseDir,
      currentDir,
      subDir,
      "index.md"
    );
    const subDirTitle = fs.existsSync(subDirIndexPath)
      ? getTitleFromMarkdown(subDirIndexPath)
      : null;
    const subDirLinkText = subDirTitle || subDir.replace(/-/g, " ");

    items.push({
      text: subDirLinkText, // フォルダ名 or index.mdのタイトル
      collapsed: true,
      items: getItemsForDirectoryWithTitle(
        baseDir,
        path.join(currentDir, subDir)
      ), // 再帰呼び出し
    });
  }
  return items.sort((a, b) => {
    // ファイルとフォルダを混ぜてソート (任意)
    const aIsFile = !!a.link;
    const bIsFile = !!b.link;
    if (aIsFile && !bIsFile) return 1; // ファイルはフォルダの後
    if (!aIsFile && bIsFile) return -1; // フォルダはファイルの前
    return a.text.localeCompare(b.text, "ja");
  });
}

export function generateSidebar() {
  return {
    "/blog/": [
      {
        text: "ブログ記事", // このセクションタイトルは固定
        collapsed: false,
        items: [
          { text: "ブログ一覧", link: "/blog/" }, // 一覧ページは固定
          ...getItemsForDirectoryWithTitle("blog"), // blogフォルダ以下をタイトルベースで自動生成
        ],
      },
    ],
    "/knowledge/": [
      {
        text: "雑学",
        collapsed: true,
        items: [
          { text: "雑学一覧", link: "/knowledge/" },
          ...getItemsForDirectoryWithTitle("knowledge"),
        ],
      },
    ],
    "/novels/": [
      {
        text: "小説作品",
        collapsed: false,
        items: [
          { text: "作品一覧", link: "/novels/" },
          ...getItemsForDirectoryWithTitle("novels"),
        ],
      },
    ],
  };
}
