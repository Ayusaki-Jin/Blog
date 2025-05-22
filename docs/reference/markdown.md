---
title: マークダウン早見表
date: 2025-05-23 # 今日！
tags: ['VitePress', 'Markdown', 'リファレンス']
---

# マークダウン早見表

VitePressで使えるマークダウンの基本的な書き方をまとめました。

## 見出し

# 見出し1 (H1)
## 見出し2 (H2)
### 見出し3 (H3)
#### 見出し4 (H4)
##### 見出し5 (H5)
###### 見出し6 (H6)

## 文字装飾

**太字 (Bold)** または __太字__
*斜体 (Italic)* または _斜体_
~~打ち消し線 (Strikethrough)~~
**太字で*斜体***

## リスト

### 番号なしリスト

- りんご
- ばなな
  - 黄色いばなな
  - 青いばなな
- いちご

### 番号付きリスト

1. 最初の項目
2. 次の項目
   1. サブ項目1
   2. サブ項目2
3. 最後の項目

## 引用

> これは引用文です。
> 複数行にわたる引用も可能です。
>
> > ネストされた引用もできます。

## コード

インラインコードは `const message = "Hello";` のように書きます。

ブロックコード:
function greet(name) {
console.log(Hello, ${name}!);
}
greet('VitePress');


行番号付きブロックコード (config.tsで `lineNumbers: true` が必要):
function greet(name) {
console.log(Hello, ${name}!);
}
greet('VitePress');


特定の行をハイライト:
function greet(name) {
console.log(Hello, ${name}!); // この行がハイライトされます
}
greet('VitePress');


## リンク

[VitePress公式サイト](https://vitepress.dev/)
[同じサイト内のページへのリンク](/blog/index)

## 画像

<!-- theme/custom.cssがサイズ調整してくれてるよ class作っておいて、画像張るときに適用する！-->
<img src="/sample-image.png" alt="サンプル画像" class="responsive-img-medium" title="これはサンプル画像です">

<!-- 画像は public フォルダに置くと /image.jpg のように参照できるよ -->

## 水平線

---
***
___

## テーブル

| ヘッダー1 | ヘッダー2 | ヘッダー3 |
| :-------- | :-------: | --------: |
| 左寄せ    | 中央寄せ  | 右寄せ    |
| 内容      | 内容      | 内容      |
| あいうえお | かきくけこ | さしすせそ |

## VitePress特有の機能

### コンテナ

::: info
これは情報コンテナです。
:::

::: tip
これはヒントコンテナです。
:::

::: warning
これは警告コンテナです。
:::

::: danger
これは危険コンテナです。
致命的なエラーやセキュリティリスクなど。
:::

::: details 詳細を開く
ここには折りたたまれた内容が入ります。
:::


### その他

より詳しい情報は、[VitePressの公式サイト](https://vitepress.dev/guide/markdown) を見てね！
