# myreads_track项目
myreads_track项目，是基于React构建的单页面应用程序，在这个应用程序中用户能够选择和归类阅读过的图书、正在阅读的图书以及想要阅读的图书。 该项目重点讲解如何使用 React 构建该应用并提供一个 API 服务器和客户端库，使用户在与应用互动时能够保存信息。

## 安装使用

* 使用`https://github.com/xumeishan0527/myreads_track.git`将远程仓库下载在本地
* 使用`npm install`安装所有的项目依赖项
* 使用`npm start`启动开发服务器

## 文件目录
```bash
├── README.md - 该文件。
├── SEARCH_TERMS.md # 可用于搜索字词的白名单简短集合，与应用程序一起使用。
├── package.json # npm 包管理器文件。
├── public
│   ├── favicon.ico # 如果你愿意，可以随意修改 React 图标。
│   └── index.html # 不用修改
└── src
    ├── App.css # 应用程序样式。
    ├── App.js # 应用程序的根文件。
    ├── App.test.js # 用于测试。提供 Create React 应用程序。
    ├── Book.js # 书本列表组件。
    ├── BookCategory.js # 书架分类组件。
    ├── BooksAPI.js # 提供的Udacity后端的JavaScript API。 方法说明如下。
    ├── BookSearch.js # 搜索页面组件。
    ├── icons # 你的应用程序的有用图片。
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # 全局样式。
    └── index.js # 仅用于DOM渲染。
```

## 后端服务器

提供的文件[`BooksAPI.js`](src/BooksAPI.js) 包含在后端执行必要操作的方法：

* [`getAll`](#获取主页所有图书数据)
* [`update`](#更新)
* [`search`](#搜索)

### `getAll`

方法签名:

```js
getAll()
```

- 返回一个 Promise ，该Promise解析为包含一组书对象的JSON对象。
- 此集合代表目前应用程序书架中的图书。

### `update`

方法签名:

```js
update(book, shelf)
```

- book: 至少包含`id`属性。
- shelf: `<String>` 包含["wantToRead", "currentlyReading", "read"]之一。
- 返回一个Promise，该Promise解析为包含POST请求响应数据的JSON对象。Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

方法签名:

```js
search(query)
```

- query: `<String>`
- maxResults: `<Integer>` 由于后端服务器的性质，即使设置了较高数值，搜索结果的上限也为20。
- 返回一个Promise，它解析成一个包含book对象集合的JSON对象。
- 这些书不知道他们的书架。 它们只是原始结果。 在搜索页面上，你需要确保书籍具备正确的状态。

## 重要提示

后端 API 使用一组固定的缓存搜索结果，仅限于一组特定的搜索字词，可以在[SEARCH_TERMS.md](SEARCH_TERMS.md)中找到。 这个术语列表是与后端一起使用的_only_术语，所以如果你对“Basket Weaving”或“Bubble Wrap”的搜索没有任何结果返回，请不用惊讶。
