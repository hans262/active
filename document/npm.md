# npm

## 命令
```sh
  # 查看全局包
  npm ls -g --depth 0

  # 安装到生产依赖
  npm i react -S

  # 安装到开发依赖
  npm i react -D

  # 安装到全局
  npm i react -g

  # 安装指定版本
  npm i react@16.8.2

  # 安装最新版本
  npm i react@latest

  # 初始化项目
  npm init my-app

  # 卸载包
  npm uni react
  
  # 更新所有包
  pnpm update

  yarn add
  yarn remove
  yarn install
```

## NPM镜像地址
可以设置包的下载地址。
```sh
  # 官方地址
  https://registry.npmjs.org/
  
  # 淘宝地址
  https://registry.npm.taobao.org
  http://registry.npm.taobao.org
  
  # cnpm 地址
  https://registry.npmmirror.com

  # 设置地址
  npm config set registry https://registry.npm.taobao.org
  
  # 获取地址
  npm get registry
```

## github-page 静态资源托管
  - 默认不支持browserHistory路由的解决方案：
  1. 使用hashHistory路由
  2. 将index.html文件拷贝一份命名为404.html文件，
  服务器未找到接口会去调用404.html。

## npm 发布包
  - 发布包
  1. 先切换到官方源，
  2. 使用 npm login 登陆
  3. 执行发布 npm publish

  若发布不成功：检查版本号是否更新、包名是否重复

  - 删除包
  npm unpublish [包名] --force

## node版本管理
```sh
  # 适用于mac
  npm i n -g
  sudo n lts 安装最新版本
  sudo n 14.17.4 安装指定版本

  # 适用于windows
  - nvm
```

## npm 常用的库
```sh
  # 监控任意dom元素宽高发生变化
  resize-observer-polyfill

  # React 好看滚动条
  simplebar-react

  # 幻灯片组件
  swiper
 
  # React 拖拽库
  react-dnd

  # React 图片懒加载库
  react-lazy-load-image-component

  # React 砖体布局
  react-masonry-css

  # 图像处理，调整大小、缩放、水印等
  jimp # 速度有点慢
  sharp # 需要高性能可采用该库
```