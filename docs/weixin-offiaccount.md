**微信公众号的开发** 是我在公司 `2021年06月25号` 作的一次技术分享。我是先写的企业的公众号项目，感触最深的就是 h5 页面的适配问题，在不同的机型上的样式的适配。写了一段时间之后，组织了会，与大家进行的一次沟通学习。 会上写 ios 的同事提测一个问题：微信里关注的公众号写的文档，和公众号开发有什么区别？今天针对这个问题作探讨分享。以下内容涉及（不完全）：

- 认识公众号官方文档
- 开发环境的准备以及配置
- 公众号**重点** 以及 **难点**
- 公众号开发中的核心步骤
- 总结与扩展

认识公众号开发文档
公众号开发入门指南（参照文档） [入门指南](https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Getting_Started_Guide.html)

- 开发前必读
  - 了解开发规范
  - `微信服务器`抛出的响应信息
  - 入门操作
    - 开始开发
    - 服务器的配置
    - 获取 `access token`
    - 自定义菜单
    - 消息能力
    - `XML` 通信格式
    - 微信网页开发能力
    - 网页授权
    - `JS-SDK`的调用与使用

开发环境准备配置

- 微信开发配置 ：采用测试号 进行测试
- 后端（后台）Node：主要与`微信服务器交互`
- 前端
  - 微信开发工具
  - 一个`web页面`
- 内网穿透 [https://www.ngrok.cc/user.html](https://www.ngrok.cc/user.html)

## 我的理解

1、`微信公众号开发` 一点不难，但是需要你掌握移动端适配问题，用 vue 那就是写一个组件、写一个 vue 页面，呈现在微信中的微信公众号里。但是必须是适配的，在什么手机上打开都不错乱

2、看接下来这篇内容之前，请先把这部分文档看 2 遍以上 [https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/iOS_WKWebview.html](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/iOS_WKWebview.html)。官方文档讲的微信网页开发，当然公众号开发不仅仅是`微信网页开发`

3、你不仅要会写公众号文章，还要会开发网页，把网页放到你的公众号内。它是非常值得学习的，但是你不必掌握 `vue` 等这种框架，只需要了解基础的 `html` `js` ，可以轻而易举学习。为什么指的学习，因为有的企业会有公众号的研发工作，当然前端工程师默认是会这项能力

4、你公司在**开发公众号** 之前，或者还在读书就是想单纯的了解公众号的开发，我的这篇基本能有个系统的了解，并且其中部分细节应该对你有帮助

5、下文指的 `微信公众号` `公众号` 等指的都是 公众号开发，所谓公众号开发一般指面向开发者利用微信提供的生态开发生成一个产物或者产品，

- 入门指引包含 `后端` 和 `前端` 的内容
- 本文我们指的是 `开发者模式` （因为我们平常关注的公众号阅读的文章一般是内容模式的产物）

## node 的一些了解

[https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)
谈公众号，按道理来讲，不应该讲`node.js`，一个 js 的运行时 [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/) ，但是都知道，node 有一些 服务器 server 的能力。不过我们不说那么复杂，其实 node 的学习，我也踩了不少坑（有机会说）

```js
// node环境中有 http 模块
const http = require('http')
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('okay')
})
```

[https://koajs.com/](https://koajs.com/)
我之前写了一个简单地 demo ，这是依赖，可以看到有 `koa` ,这是一个基于 node 上层的框架，但是你不必关心 `koa` 是怎么实现的，或者怎么用，这和我们今天说的`微信公众号开发` 距离就太远了

```json
"dependencies": {
    "@koa/router": "^10.0.0",
    "axios": "^0.21.1",
    "co-wechat": "^2.4.0",
    "co-wechat-api": "^3.11.0",
    "co-wechat-oauth": "^2.0.1",
    "koa": "^2.13.1",
    "koa-bodyparser": "^4.3.0",
    "koa-static": "^5.0.0",
    "koa-xml-body": "^2.2.0",
    "sha1": "^1.1.1",
    "urlencode": "^1.1.0",
    "xml2js": "^0.4.23"
  },
```

## 基本环境的准备

在我们了解了官方的开发文档，也了解 node 的一些非常基本的内容之后，就要作一些简单的准备了

### 申请服务器

凡是都有目的，我们准备一个`公网` 的服务目的是 能够通过 `公网` 与 `腾讯自己的服务器` 通信，进行数据交互，有几种方式

- 云服务器
  - 阿里
  - 腾讯
  - 华为云
- 云开发
  - 微信生态的云服务
- 内网穿透代理

**有的同学说了，我学习公众号，怎么还要申请服务器呢，我记得是要收费的。** 为了达到学习的作用，我们使用 **内网穿透** 的方案，具体细节就不在讨论了

### 服务端准备

> 所谓服务搭建，指的是写一套接口，能够满足 `微信服务器` 与之 的**信息** 往来

在搭建服务这个步骤，可以选择自己喜欢的语言进行开发，文档给出的是通过 `python` 当然可以选择

- java
- php
- node
- 微信云开发能力

> 微信云开发是微信团队联合腾讯云推出的专业的小程序开发服务。
> 开发者可以使用云开发快速开发小程序、小游戏、公众号网页等，并且原生打通微信开放能力。
> 开发者无需搭建服务器，可免鉴权直接使用平台提供的 API 进行业务开发

我们使用`koa2` 开发服务端

### 申请公众号

1、不论是单纯的写公众号文章或者运行个人品牌，还是进行代码开发，最好是有一个自己的公众号，有不同的账号类型，根据文档引导注册就行

2、开发者：更应关注 公众号开发后台 [后台](https://mp.weixin.qq.com/cgi-bin/frame?t=advanced/dev_tools_frame&nav=10049&token=1456896920&lang=zh_CN)

## 服务器搭建，后端能力

这部分的内容有点难度了，核心要做的一件事情，就是搭建一个服务器端的环境，然后这个环境个微信的服务器进行通讯

```js
// 项目的根目录/src/app.js

'use strict'
// 使用 koa 搭建服务
const Koa = require('koa')
// koa 的生态能力 静态资源服务有关
const koaStatic = require('koa-static')
// koa 生态的能力 xml 格式转换
const xmlBody = require('koa-xml-body')
// const sha1 = require('sha1') // 加密模块
// const bodyParser = require('koa-bodyparser')

// 服务端的路由
const serverRouter = require('./routes/server')
// 前端 web 页面的路由
const webRouter = require('./routes/web')

const app = new Koa()
// app.use(bodyParser())
// 使用 上述 koa 的能力
app.use(xmlBody())
app.use(koaStatic(__dirname + '/views'))

// Routes
app.use(serverRouter.routes()).use(serverRouter.allowedMethods())
app.use(webRouter.routes()).use(webRouter.allowedMethods())
// 起服务，监听端口 80
app.listen(80, () => {
  console.log(`http://127.0.0.1:8080`)
})
```

### 验证消息来自微信服务器

```js
/**
 * @description 验证消息来自微信服务器 开发者提交信息后，
 * 微信服务器将发送GET请求到填写的服务器地址URL上，GET请求携带参数如下
 * GET /wx
 */
router.get('/wx', async (ctx, next) => {
  const { signature, timestamp, nonce, echostr } = ctx.query
  // 将token、timestamp、nonce三个参数进行字典序排序
  // 将三个参数字符串拼接成一个字符串进行sha1加密
  // 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
  const str = [Token, timestamp, nonce].sort().join('')

  // const res = sha1(str)
  const cryptoSignature = crypto.createHash('sha1').update(str).digest('hex')
  console.log(`cryptoSignature`, cryptoSignature)
  // cryptoSignature b532934c036d173610d881a460920534d0df8105
  if (cryptoSignature === signature) {
    ctx.body = echostr
  } else {
    ctx.body = `not wechat`
  }
  await next()
})
```

### 获取 Access token

```js
/**
 * @docs https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html
 */
router.get(`/getAccessToken`, async (ctx, next) => {
  const res = await axios(
    genAccessTokenApi({
      appid: appID,
      secret: appsecret,
    })
  )
  console.log(res.data)
  // 由于 token有效期 避免重复获取 服务端可适当缓存
  fs.writeFileSync('./token.txt', res.data.access_token, 'utf8')
  ctx.body = res.data
})
```

### 发送模板消息

```js
/**
 * @docs  https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Template_Message_Interface.html#5
 * @description 发送模板消息
 */
```

除了上述枯燥无味的逻辑，还有个比较有意思的，那就是发送模板消息

```js
router.get(`/sendMsgTemp`, async (ctx, next) => {
  let token = fs.readFileSync('./token.txt', 'utf8')
  let url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${token}`
  const tempIdRes = await axios({
    method: 'post',
    url: `https://api.weixin.qq.com/cgi-bin/template/api_add_template?access_token=${token}`,
    data: {
      template_id_short: 'AhYMiwh0exHqZOYj6-ASXKEuNdGxE4-jqfDojKQGKyI',
    },
  })
  console.log(tempIdRes.data)
  const data = {
    touser: 'oMDoU6O88NYxsCsCaoGYxTmazu-4',
    template_id: 'AhYMiwh0exHqZOYj6-ASXKEuNdGxE4-jqfDojKQGKyI',
    url: 'http://vast.free.idcfengye.com',
    data: {
      first: {
        value: '恭喜你购买成功！',
        color: '#173177',
      },
      keyword1: {
        value: '巧克力',
        color: '#173177',
      },
      keyword2: {
        value: '39.8元',
        color: '#173177',
      },
      keyword3: {
        value: '2014年9月22日',
        color: '#173177',
      },
      remark: {
        value: '欢迎再次购买！',
        color: '#173177',
      },
    },
  }
  const res = await axios({
    method: 'post',
    url,
    data,
  })

  console.log(res)
  ctx.body = `123`
})
```

### utils/xx

接着来说，utils 下的文件

```js
// utils/index.js 充分利用node 环境中的 crypto 模块
const { createHash } = require('crypto')
/**
 * @description 生成随机字符串
 */

function genNoncestr(len) {
  let res = ''
  do {
    res += Math.random().toString(36).split('.')[1]
  } while (res.length < len)

  console.log(res)

  return res.substr(0, len)
}

function mySha1(wd) {
  let hash = createHash('sha1')
  hash.update(wd)
  return hash.digest('hex')
}

module.exports = {
  genNoncestr,
  mySha1,
}
```

```js
// utils/xmlParse.js
/**
 * @description 解析XML
 * @docs https://www.npmjs.com/package/xml2js
 */
const xml2js = require('xml2js')

function XML2JSON(xml) {
  return new Promise((resolve, reject) => {
    const parseString = require('xml2js').parseString
    parseString(xml, function (err, result) {
      console.dir(result)
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

function json2XML(jsonObj) {
  const builder = new xml2js.Builder()
  return builder.buildObject(jsonObj)
}

function _message(msg, content) {
  return json2XML({
    xml: {
      ToUserName: msg.FromUserName,
      FromUserName: msg.ToUserName,
      CreateTime: Date.now(),
      //   MsgType: msg.MsgType,
      MsgType: 'text',
      Content: content,
    },
  })
}

function text(msg, content) {
  return _message(msg, content)
}

module.exports = {
  XML2JSON,
  json2XML,
  text,
}
```

## 前端相关的内容

上文的内容本质上和真正写公众号的时候，不太一样，因为`服务器` 和 微信服务器的通信，在公司是有人来做的，前端只是写页面而已

```html
<!-- views/index.html -->
```

上面说了，不必要必须会 vue ，但下文也不难

```html
<!-- 为了让界面的按钮好看一点 -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/vant@next/lib/index.css"
/>
```

```html
<!-- 使用 vue 3的能力  -->
<script src="https://unpkg.com/vue@next"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@next"></script>
<script src="https://cdn.jsdelivr.net/npm/vant@next/lib/vant.min.js"></script>
<!-- w -->
<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

引入 js 文件可以参考

[https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#3](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#3)

举个例子，配置`js-sdk`

```js
// 配置 js sdk
const configJSSDK = async () => {
  const config = {
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'xxx', // 必填，公众号的唯一标识
    timestamp: 1624332586559, // 必填，生成签名的时间戳
    nonceStr: 'xx', // 必填，生成签名的随机串
    signature: 'xxxx', // 必填，签名
  }
  const res = await wxConfig(config)
  console.log('res--', res)
}
```

```js
// 获取 js sdk
const getJsConfig = async () => {
  console.log(`==JSSDK`)
  const params = {
    debug: true,
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
    url: window.location.href,
  }
  const res = await axios(`/getJsConfig`, {
    params,
  })
  console.log('res', res)
  const wxConfig = {
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: res.data.appId, // 必填，公众号的唯一标识
    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
    nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
    signature: res.data.signature, // 必填，签名
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], // 必填，需要使用的JS接口列表
  }

  wx.config(wxConfig)
  wx.ready(function () {
    // config信息验证后会执行ready方法，
    // 所有接口调用都必须在config接口获得结果之后
    //config是一个客户端的异步操作，
    // 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
    // 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    console.log(`wx.ready`)
  })

  wx.getNetworkType({
    success: function (res) {
      const networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
      console.log(networkType)
    },
  })
}
```

接着可以愉快的进行微信扫码动作

```js
const scanQRCode = async () => {
  await configJSSDK()
  wx.scanQRCode({
    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
    success: function (res) {
      const result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
      console.log(result)
    },
  })
}
```

**但是** 上文说提到的配置中的参数，或者一些其他的信息，是需要从我们自己的服务器来取得的，通过 `axios` 调用我们的 Node 服务

我们就拿一个例子来说，从 web 页面出发

```html
<div>
  <van-button type="primary" size="small" @click="handleWxAuthorize1">
    微信网页授权</van-button
  >
</div>
```

点击 `微信网页授权` 执行 html 文件中的 `handleWxAuthorize1`

```js
const handleWxAuthorize1 = async () => {
  window.location.href = `/wxAuthorize1`
}
```

使用 `window.location.href ` 加载 `/wxAuthorize1` ,然后逻辑走到 `routes/web.js`

```js
// 浏览器的一个 get 请求
router.get(`/wxAuthorize1`, async (ctx, next) => {
  const state = 123
  console.log(ctx.href) // http://vast.free.idcfengye.com/wxAuthorize1
  let redirectUrl = ctx.href.replace('wxAuthorize1', 'wxCallback') // http://vast.free.idcfengye.com/wxCallback
  console.log(urlencode(redirectUrl))
  ctx.redirect(
    `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=${urlencode(
      redirectUrl
    )}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
  )
})
```

然后微信回调地址

```js
router.get('/wxCallback', handleWxCallback) // 微信回调地址
```

```js
 async handleWxCallback(ctx, next) {
    // 用户同意授权，获取code
    const { code } = ctx.query
    // ctx.body = `callback page code is:${code}`
    // 如果用户同意授权，页面将跳转至 redirect_uri/?code=CODE&state=STATE。
    // http://vast.free.idcfengye.com/wxCallback?code=071i4k0w3b4OAW2FlU1w30wmE33i4k0b&state=123

    const URL = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appID}&secret=${appsecret}&code=${code}&grant_type=authorization_code`
    const res = await axios(URL)
    console.log(res.data)
    // ctx.body = `callback page res is:${JSON.stringify(res.data)}`
    ctx.redirect(
      `/?openid=${res.data.openid}&access_token=${res.data.access_token}`
    )
  }
```

[小结] 一次从页面出发，然后调用自己写的服务器接口，然后 koa 与微信官方服务器通讯，然后交互结果，给到自己的服务器，自己的服务器把结果给到页面，完整的代码案例，你可以

```sh
git clone https://github.com/yayxs/wechat-learn
```

## 关联性不强，作参考

### 目录结构简单的说明

1、`src/bin` `sunny-start.bat` Sunny-Ngrok 启动工具 by Sunny 内网穿透脚本

2、`controllers/web.js` 接口服务，服务于前端的 controller

3、`routes/server.js` koa 路由，服务于 后端的接口
4、`routes/web.js` koa 路由，服务于 html 文件逻辑的路由
