一份写好的`md` 文档，非常便捷的生成一个 web 页面，然后分享给他人。即 MD 变为 Docs。这是把一些思考记录下来很好的方式。不管是日记、笔记、读书读后感等，又或者是技术博客。
在 2022 年底 2023 年初，在了解 vite 的过程中，也用了 vitepress ，个人开发体验极佳。之前写过 `vuepress`，而`VitePress is VuePress' little brother, built on top of Vite.`
有一个自身的需求：在一个 `web页面中`，部分内容加密，有的内容不加密。由于 vitepress 目前正在处于 `alpha` 阶段，在我用 vitepress 写 文档的过程中，也没发现比较好玩的 plugin。所以我想起了很久之前，基于 `vuepress` 的一个主题

```sh
git clone https://github.com/vuepress-reco/vuepress-theme-reco-1.x
```

[https://vuepress-theme-reco.recoluan.com/views/1.x/password.html](https://vuepress-theme-reco.recoluan.com/views/1.x/password.html)

这种加密方式，一是可以对整个项目进行加密，一个是可以对项目中的某一篇进行加密

密码 123456 对应的 32 位的 md5 加密密文 `e10adc3949ba59abbe56e057f20f883e`

```js
// .vuepress/config.js vuepress 的配置文档

module.exports = {
  theme: 'reco',
  themeConfig: {
    // 密钥
    keyPage: {
      keys: ['e10adc3949ba59abbe56e057f20f883e'], // 1.3.0 版本后需要设置为密文
      color: '#42b983', // 登录页动画球的颜色
      lineColor: '#42b983', // 登录页动画线的颜色
    },
  },
};
```

我打开控制台，发现这种加密方式是 通过 class 样式 或者某种 hidden 隐藏了页面内容，但是 文档的内容还是可以看到，达不到真正加密的方式，这种实操不符合我的需求

![vuepress 主题加密页面图片]()

接着，看下这部分

[https://theme-hope.vuejs.press/zh/guide/feature/encrypt.html](https://theme-hope.vuejs.press/zh/guide/feature/encrypt.html)

::: danger
警告

注意，受到 VuePress 的限制，在未解密前，文章内容仅仅被隐藏，访问者仍可以从源码中获取文章的内容。

所以请不要使用该加密功能用于任何敏感、机密的文章与档案，造成的后果请你自负
:::

看了两个主题，虽然支持对特定文件夹或特定的路径进行加密，也支持进行全局范围的加密。但是有点类似`假的加密`

## hexo

```sh
A fast, simple & powerful blog framework, powered by Node.js.
一个快速、简单且功能强大的博客框架，由 Node.js 提供支持。
```

> Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

在探索 文档加密过程中，我简单根据文档，跑了一个`demo`

```sh
.
├── _config.yml # 配置文件
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

跑起来看了一下，默认的**theme** 不是很好看，我不是很熟悉`hexo`，关于它的加密，你可以看
[https://github.com/D0n9X1n/hexo-blog-encrypt/blob/master/ReadMe.zh.md](https://github.com/D0n9X1n/hexo-blog-encrypt/blob/master/ReadMe.zh.md)

## vuepress

在很早，我出过一期视频，讲的是怎么配置`vuepress`。放到现在来看仍有参考意义。在 `vuepress` 文档中，有关当下几个静态站点生成的方案，有个横向对比

[https://v2.vuepress.vuejs.org/zh/guide/#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E6%98%AF](https://v2.vuepress.vuejs.org/zh/guide/#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E6%98%AF)

在`package.json`，文件中

```json
 "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  },
```

这两个脚本需要特别留意一下，这在一些静态部署的网站上是需要进行 部署配置的。在 `vuepress` 跑起来之后

首页读取的是 `项目的根目录/docs/index.md` ，把这个 md 渲染在页面首页

![vuepress 官方仓库 docs 下的目录结构图片]

接着就是配置`.vuepress/config.js`

```js
module.exports = {
  title: 'vitepress',
  description: 'fett',
  themeConfig: {
    nav: [
      { text: 'Guides', link: '/guides/' },
      { text: 'External', link: 'https://google.com' },
    ],
    sidebar: [
      {
        title: 'HTML', // 必要的

        collapsable: false, // 可选的, 默认值是 true,

        children: ['/guides/html/'],
      },
      {
        title: 'CSS',
        collapsable: true,
        children: ['/guides/css/'],
      },
    ],
  },
};
```

移动端的优化，在移动端，搜索框在获得焦点时会放大，并且在失去焦点后可以左右滚动，这可以通过设置元来优化。

```js

 head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no'
      }
    ]
  ],
```

[阶段小结]

- 1、现在能使用 vitepress 尽可能使用 `vitepress` ，当社区中没有你需求的插件或者能力的时候，可以使用 vuepress
- 2、不管使用 `config.ts` 或者 `config.js` 都行，在你的项目中可以轻松接入 `typescript`
- 3、尽可能多读文档，不必要不看一下相关的博客，讲怎么配置怎么配置，有时候可能会把你搞懵圈
- 4、也不必使用一些第三方的主题，除非你对文档的“华丽性” 有要求，但是这和极简的主旨恰恰相反

## vitepress

在说 vitepress 之前，先说说我静态文档站点踩的坑，希望对你有启发

1. 在最起初想搭建一个博客的时候，特地希望有个
