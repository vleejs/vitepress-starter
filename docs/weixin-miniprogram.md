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
小程序的话需要好好看看上文提到的自定义组件章节。
还有就是在`vue2` 中可以很方便的 使用 `filter`。小程序中可以新建一个 `filter.wxs` 文件

[https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/01wxs-module.html](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/01wxs-module.html)

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

```js
// wx.js 选择图片
/**
 * 基础库 2.10.0 以上 拍摄或从手机相册中选择图片或视频
 */
const wxChooseMedia = () => {
  return new Promise((resolve, reject) => {
    wx.chooseMedia({
      count: 1, // 选择1张
      mediaType: ['image'], // 只能选图片
      sourceType: ['album', 'camera'], // 相册 拍照
      maxDuration: 30,
      camera: 'back',
      sizeType: ['compressed'], // 压缩
      fail: (err) => {
        console.log('wx.chooseMedia进入fail回调', err)
        resolve(false)
      },
      success: (res) => {
        /**
         * tempFiles
         * type
         */
        console.log('wx.chooseMedia 进入success回调', res)

        const { errMsg, tempFiles } = res

        if (errMsg === 'chooseMedia:ok') {
          let file = {}
          if (Array.isArray(tempFiles) && tempFiles.length > 0) {
            file = tempFiles[0]
          } else {
            file = tempFiles
          }
          console.log('选中的文件', file)
          const { tempFilePath, size } = file
          console.log('文件的临时路径', tempFilePath)
          const m = size2M(size)
          console.log('文件的大小', m)

          resolve(tempFilePath)
        } else {
          console.warn('errMsg 不是chooseMedia:ok')
          wx.showToast({
            title: '图片获取失败，请重试',
            icon: 'none',
            duration: tD,
          })
          resolve(false)
        }
      },
    })
  })
}
```

写到这里，不得不说一下 `callback` 的`promise化`，一些必要的场景下，可以都使用 `resolve`

- resolve(true) 代码操作 ok
- resolve(false) 代表操作发生了异常
  这样在外层很容易判断，只需要 `async await` 内层操作的结果是 true 还是 false 就好

关于 `get.js`，这里也说一个场景，那就是 **获取当前小程序环境内的变量信息**

[https://developers.weixin.qq.com/miniprogram/dev/api/open-api/account-info/wx.getAccountInfoSync.html](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/account-info/wx.getAccountInfoSync.html)

```js
const getConf = () => {
  const res = wx.getAccountInfoSync()
  const retConf = {
    env: '',
  }
  /**
 * {
//     miniProgram: {
//         appId: "************"
//         envVersion: "develop" develop 开发版 trial 体验版  release 正式版
//         version: "" // 线上小程序版本号仅支持在正式版小程序中获取，开发版和体验版中无法获取。
//     }

 */
  try {
    const {
      miniProgram: { envVersion },
    } = res
    if (envVersion) {
      retConf.env = envVersion
    }

    const wConf =
      typeof __wxConfig !== 'undefined' ? __wxConfig : { envVersion: '' }
    const { envVersion: eV } = wConf
    if (eV) {
      retConf.env = eV
    }
  } catch (error) {}

  return retConf
}
```

## 小程序请求用户的授权

关于授权这块，很容易查到一些资料。这里也简单说下，

[https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html#scope%20%E5%88%97%E8%A1%A8](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html#scope%20%E5%88%97%E8%A1%A8)

整理的流程是

- 未接受或拒绝过 弹窗询问
- 已经授权 直接调用
- 已拒绝 兼容用户拒绝的场景

获取位置信息，不过但凡牵扯到位置的，需要保持警惕，可以多看微信团队的公告 [https://developers.weixin.qq.com/community/develop/doc/000a02f2c5026891650e7f40351c01?highLine=%25E4%25BD%258D%25E7%25BD%25AE%25E4%25BF%25A1%25E6%2581%25AF](https://developers.weixin.qq.com/community/develop/doc/000a02f2c5026891650e7f40351c01?highLine=%25E4%25BD%258D%25E7%25BD%25AE%25E4%25BF%25A1%25E6%2581%25AF)

```js
{
  "pages": ["pages/index/index"],
  "permission": {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示" //
    }
  }
}

```

这在一些业务场景中非常常见，尤其小程序通过蓝牙操作一些支持蓝牙的终端设备。

```js
// 具体得代码实现

// 首先构造 需要拿到用户权限的 list Map表
const authList = {
  userLocation: {
    apiName: ['getLocation', 'chooseLocation'],
    authTitle: '请求授权当前位置',
    authContent: '需要获取您的位置，请确认授权',
  },
  bluetooth: {
    apiName: ['', ''],
    authTitle: '请求使用蓝牙功能',
    authContent: '需要获取您的蓝牙，请确认授权',
  },
}
```

紧接着需要看一下 `wx.getSetting`
[https://developers.weixin.qq.com/miniprogram/dev/api/open-api/setting/wx.getSetting.html](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/setting/wx.getSetting.html)

```js
/**
 * 用户当前的设置 已经向用户请求过的权限
 */

const wxGetSetting = (key) => {
  if (typeof key !== 'string') return false
  if (!authList[key]) return false
  const scopeKey = `scope.${key}`
  console.log('wx getSetting.scopeKey', scopeKey)
  return new Promise((resolve, reject) => {
    wx.getSetting({
      fail: (err) => {
        console.log('wx getSetting.fail', err)
        resolve('not-ok')
      },
      success: async (res) => {
        const { authSetting } = res
        console.log('wx getSetting.authSetting', authSetting)
        if (!authSetting.hasOwnProperty(scopeKey)) {
          console.log('wx key不在配置中')
          // 属性不存在
          const ret = await wxAuthorize(key)
          console.log('===', ret)
          if (ret === 'ok') {
            resolve('ok')
          } else {
            resolve('not-ok')
          }
        } else {
          console.log('wx key在配置中')
          if (authSetting[scopeKey] === false) {
            console.log('wx key虽在配置中但值是false', authSetting[scopeKey])
            const isOk = await _showModal(key)
            if (isOk === 'ok') {
              resolve('ok')
            } else {
              resolve('not-ok')
            }
          } else {
            resolve('ok') // 已经授权或者还未进行过授权
          }
        }
        /**
       * authSetting:
            scope.address: true
            scope.bluetooth: true
            scope.invoice: true
            scope.invoiceTitle: true
            scope.userInfo: true
            scope.userLocation: true
        */

        // 判断key是否在对象中

        // // 用户拒绝过

        // // res.authSetting = {
        // //   "scope.userInfo": true,
        // //   "scope.userLocation": true
        // // }
      },
    })
  })
}
```

还有就是需要设置一个 `modal` 引导用户去打开这些权限，因为在后续的业务流程中是必要的的。

```js
/**
 * 引导去授权设置页面
 */
const _showModal = (key) => {
  const title = authList[key].authTitle
  const content = authList[key].authContent
  console.log('需要展示Modal title', title)
  console.log('需要展示Modal content', content)
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      success(res) {
        if (res.confirm) {
          wx.openSetting({
            success: (dataAu) => {
              if (dataAu.authSetting[`scope.${key}`] === true) {
                wx.showToast({
                  title: '授权成功',
                  icon: 'success',
                  duration: 1000,
                })
                resolve('ok')
              } else {
                wx.showToast({
                  title: '授权失败',
                  icon: 'error',
                  duration: 1000,
                })
                resolve('not-ok')
              }
            },
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '授权失败',
            icon: 'error',
            duration: 1000,
          })
        }
      },
    })
  })
}
```

## 有关小程序其他的一些内容

### 项目优化

```json
// app.json
  "lazyCodeLoading": "requiredComponents",
```

vant

vant 组件不支持部分引入，上传的代码包会把这部分文件过滤掉，所以这些并不会影响实际上传的代码包的大小。

项目文件中实际存在的无依赖代码可以搜索过滤出来，验证这些代码实际没有用到，可以进行删除，减小体积并优化加载速度。

### 文件上传

- 文件上传 牵扯到用户的隐私协议 需要填写用户隐私指引 [docs](https://vant-contrib.gitee.io/vant-weapp/#/quickstart#guan-yu-yong-hu-yin-si-bao-hu-zhi-yin)
- [用户指引](https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/)

### 短信短消息跳转到小程序

开发者工具可直接测试 URL Schema

[小程序链接生成与使用规则调整公告 https://developers.weixin.qq.com/community/develop/doc/000aeab88a4ea0c5c89d81fde5b801](https://developers.weixin.qq.com/community/develop/doc/000aeab88a4ea0c5c89d81fde5b801)

按照微信的意思[https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/url-scheme.html](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/url-scheme.html)

> iOS 系统支持识别 URL Scheme，可在短信等应用场景中直接通过 Scheme 跳转小程序。
> Android 系统不支持直接识别 URL Scheme，用户无法通过 Scheme 正常打开小程序，开发者需要使用 H5 页面中转，再跳转到 Scheme 实现打开小程序

简言之，就是准备一个 `h5` 页面，跳转到这个地址 'weixin://dl/business/?t= _TICKET_' 。至于这个**h5** 页面，主要是当前页面所在的环境，是 web 电脑上的浏览器，还是微信浏览器 ，还是手机上其他的浏览器

```js

   isWXWork() {
      return this.ua.match(/wxwork/i) == 'wxwork'
    },
    isWeixin() {
      return (
        !this.isWXWork && this.ua.match(/micromessenger/i) == 'micromessenger'
      )
    },
    isMobile() {
      return navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|IEMobile)/i
      )
    },
    isDesktop() {
      return !this.isMobile
    }
```

```js

 handleJumpMP() {
      console.log(
        '当前所在的位置是微信外的手机浏览器，开始跳转的地址',
        this.jumpWxUrl
      )
      if (!this.jumpWxUrl) {
        this.$toast.fail('跳转失败，刷新浏览器重试')
        return
      } else {
        // 跳转到地址准备好了
        location.href = this.jumpWxUrl
      }
    }
```
