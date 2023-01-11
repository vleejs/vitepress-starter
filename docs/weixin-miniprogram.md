微信小程序说点什么，要从 `Apr 29, 2019` ，大致在 3 年前，就想写项目练练手，当时一个原因是 慕课有个销量前几的课程讲的就是小程序的课程（那是还是通过看视频的方式学习新东西，现在来看不是最佳的途径）。还有就是前几年小程序的这种应用程序方式真的很流程，又不同于 vue 等这种框架，也是需要开发者掌握。所以就作为扩展学习。
但是 踩过的坑需要和大家分享下
1、微信小程序的文档和 框架的文档有很大的不同，框架有一些语法，例如 `setup`或者各种`watch api` 让人很想搞明白是怎么用的，但是在最初的时候，就是不理解是怎么用的；微信小程序反而例外有自己的一套模式，文档所表现出的语法很直接，举个例子：
在微信小程序中 [https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html)

```js
wx.showToast({
  title: '成功',
  icon: 'success',
  duration: 2000,
})
```

这段代码就是能够弹出一个 toast

那么在 vue 中呢，[https://cn.vuejs.org/api/reactivity-core.html#watcheffect](https://cn.vuejs.org/api/reactivity-core.html#watcheffect)

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> 输出 0

count.value++
```

就会让人产生好奇。

所以说，我当时的第一个误区，就是没有好好的看微信小程序的文档，太过专注于代码怎么写。所以看了很多视频。

> 小程序开发过程中需要面对的是两大操作系统 iOS 和 Android 的微信客户端

我觉得文档中的这句话很好，关于小程序我们甚至只需关注微信这一个盒子就好
给大家的建议是

- 小程序是值得学习的，即使放在 2023 年，因为它存在拥有庞大用户群体的微信中，是一个相对独立但具有力量的应用呈现方式

2、第二个踩的坑，是在写 demo 的时候过度关注想做成一个什么，其实这是违背软件设计流程的。软件设计是应该前期具备完整的切图 产品交互逻辑，简言之就是要做一个什么产品出来。导致没有充分理解常见场景的实现方式，这会有几个结果，那就是项目“烂尾”了，前期雄心壮志写了一部分，然后后边不知道怎么开发了，或者说新增什么功能

举个例子：
对于微信小程序有一个名词，叫做 **场景值**
[https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/scene.html](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/scene.html)

这是用来描述用户进入小程序的路径，也就是小程序被怎么打开的等。这是一种很常见的需求场景，但是需要大致翻阅文档之后才知晓

3、第三个踩的坑，就是过度聚焦广度，一心想着 `trao` `uni-app` 等等，或者说甚至把圈里的所有小程序方案全都玩一遍，3 年后来看这是很幼稚的想法。或者单纯的认为支付宝小程序和微信小程序有很大的不同，或者觉得，某一个方案很全能。
至少我之前是这么觉得的。
回顾这几年，我用`uni-app` 写过公司的项目，也练过`react-native` 。甚至我还玩过一段时间的 `flutter`。不是说不好，但会消耗掉一定的时间。所以我的心得就是，初学者的话，就好好看一份文档就行

## 小程序和 vue

是因为最近一段时间在写小程序，所以有感而发。在写自定义组件 [https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)

我是在项目的根目录下新建了一组文件`custom-tab-bar`

比如 tabbar 是 首页和我的，当页面此时在首页的时候，怎么和`pages/index` 进行通讯，想了半天还是通过 `谷歌`

```js
try {
  let pages = getCurrentPages()
  const currPage = pages[pages.length - 1]
  // const prePage = pages[pages.length - 2]
  if (currPage) {
    currPage.setData({
      isClickTab: true,
      tabIndex: index,
    })
  }
} catch (error) {}
```

小程序和 vue 不同的一点就是 小程序在写的时候确实需要思考在代码设计的时候怎么写，比如是用类啊或者 function。关于数据的变更，vue 帮开发者做了很多，当写多了 vue，有点忘记了，数据和视图究竟有什么关联。
之前写 `jquery` ，在写的时候需要想一想，第一步做什么，第二步做什么。
还有就是小程序通用的部分，比如顶部的 tab 等等，在 vue 中一个`comp` 随便在哪个单文件组件中真的很方便。
小程序的话需要好好看看上文提到的自定义组件章节

## 应用设计

在上文提到的坑中，我们提到如果自己演练的话，需要重点关注某个需求的实现，就拿微信小程序来说，截止目前我也没很搞明白底层的实现是什么，原因是题目所说的《写了几个微信小程序》大多是业务代码。没有很系统的时间了解底层是什么实现的。但是不妨碍我能写，完全独立的写。

### 网络请求

有关请求，一些复杂的应用程序也需要设计 请求拦截，详情拦截。这在 web 页面中视非常成熟的方案了，比如一些开发者写好的请求封装。
那么在微信小程序中，你可以以类的方式设计，或者是函数，

```js
class HTTP {
  request(params) {
    // 从请求的参数中解构需要的参数
    const { url, method, data } = params
    // 从通用化的配置文件中拆解必要参数
    const { api_base_url } = config
    wx.request({
      url: api_base_url + url,
      method: method || 'GET',
      data,
      header: {
        'content-type': `application/json`,
      },
      success: (res) => {
        if (res?.code === 200) {
          // 成功了做什么事情
        } else {
          // 失败了，弹出失败的code 抛给用户友好的提示
          this._showError('失败了')
        }
      },
      fail: (err) => {
        this._showError('失败了')
      },
    })
  }

  _showError(info) {
    wx.showToast({
      title: info,
      icon: 'none',
      duration: 2000,
    })
  }
}
```

以函数式的设计，也可以

```js
const wxFetch = (params, _url, type = 'POST') => {
  const url = genFullUrl(_url)
  console.log('请求的完整地址', url)
  const data = { ...params }
  // 请求头
  const header = getHeader()
  return new Promise((resolve, reject) => {
    wx.request({
      url, // 完整的地址
      data, // string/object/ArrayBuffer
      method: type,
      header: header,
      fail: (err) => {
        // console.warn('wxapi wx.request 进入fail回调', err)
        reject(err)
      },
      success: (res) => {
        // console.log('wxapi wx.request：进入success回调', res)
        const retData = res?.data || {}
        if (res?.code === 401) {
          wx.showLoading({
            title: '登录失效',
            icon: 'none',
            mask: true,
          })
          setTimeout(() => {
            wx.hideLoading()
            wx.switchTab({
              url: '/pages/index/index',
            })
          }, 1300)
        } else {
          resolve(retData)
        }
      },
    })
  })
}
```

上述的两种方式，都是依赖了 [https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)。这是一个很好用的`api`
也有很详细的 [网络使用说明](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)

### utils/xx

在程序设计的时候，一般这个`js文件` 会放在 `项目的根目录/utils`

还会有其它的文件，这一系列的 js 文件辅助整个应用程序，比如 `get.js` `set.js` `wx.js` 等等

举个例子：

wx.js 中存放一些必要的 wx-api 的二次包装，当然一些非必要的 api 我们是不用二次包装的，比如消息提示什么的，这也是我和同事态度一致的地方

```js
// 来自公众号的一段代码
class ToastUtils {
  constructor() {
    this.Toast = Toast
    this.Dialog = Dialog
  }

  toast(msg, time) {
    this.Toast({
      //forbidClick: true,
      duration: time || 4000,
      message: msg,
      className: 'van-customize-toast',
      onClose: function () {},
    })
  }
}
```

我觉得上述的方案有点冗余，在 web-pc 页面基于消息提示的二次封装很有必要，但是在移动终端（公众号、小程序、app 等等） 是否有必要可以考量一下。
但是一些夹杂着配置，但同时又非常独立的功能点，比如 **消息订阅** **拍摄或从手机相册中选择图片或视频**

```js
// wx.js 消息订阅
const wxRequestSubscribeMessage = () => {
  return new Promise((resolve, reject) => {
    wx.requestSubscribeMessage({
      tmplIds: ['Tv4ja2W97U1ilcdy4ah8hMhln1mhj4HUVsP1yxDQXXU'],
      fail: (err) => {
        console.log('消息订阅失败', err)
        resolve(null)
      },
      success: (res) => {
        console.log('消息订阅的结果', res)

        resolve(res)
      },
    })
  })
}
```
