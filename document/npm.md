# npm

## 命令
```
  * 查看全局包
  > npm ls -g --depth 0

  * 安装到生产依赖
  > npm i react -S

  * 安装到开发依赖
  > npm i react -D

  * 安装到全局
  > npm i react -g

  * 安装指定版本
  > npm i react@16.8.2

  * 安装最新版本
  > npm i react@latest

  * 初始化项目
  > npm init my-app

  * 卸载包
  > npm uni react

  yarn add
  yarn remove
  yarn install
  
```

## 配置
```
  * 发布NPM包
  - 先切换到官方源，
  - d使用 npm login 登陆
  - 执行发布 npm publish
  若发布不成功 检查版本号是否更新，检查包名是否重复

  * 删除发布的npm包
  npm unpublish [包名] --force

  * npm镜像地址 https://registry.npmjs.org/
  > npm get registry
  > npm config set registry https://registry.npm.taobao.org
  > npm config set disturl https://npm.taobao.org/dist/

  * yarn镜像地址 https://registry.yarnpkg.com
  > yarn config get registry
  > yarn config set registry https://registry.npm.taobao.org
  > yarn config set disturl https://npm.taobao.org/dist/

  * github 镜像地址
  https://github.com.cnpmjs.org/ounana/glow.git

  * gitpage静态发布
  默认不支持browserHistory路由，解决方案：
  1. 使用hashHistory路由
  2. 将404.html添加到build文件夹中，然后在404.html中重定向到index.html
```

## node
```
  * 切换node版本
  npm i n -g

  sudo n lts 安装最新版本
  sudo n 14.17.4 安装指定版本
  121
```