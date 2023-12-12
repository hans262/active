# Docker

一个虚拟机容器。

## 镜像

```sh
  # 查看本地镜像列表
  docker images

  # 从hub源拉取镜像
  docker pull node:latest
  docker pull ubuntu:latest
  docker pull mysql:latest
  docker pull redis:latest

  # 从镜像创建容器，并映射端口
  docker run -itd -p 6379:6379 --name redis-test redis

  # 官方镜像地址 https://hub.docker.com
```

## 容器

```sh
  # 常用参数
  -itd # -i -t -d
  -d # 后台运行容器
  --name node-test # 定义容器
  /bin/bash # 启动bash程序
  exit # 退出容器终端
  -p 8000:5000 # 映射端口

  # 查看容器
  docker ps # 正在运行的
  docker ps -a # 全部，包括停止运行的

  # 启动已停止运行的容器
  docker start [container_id]
  docker restart [container_id] # 重启运行中的

  # 停止一个容器
  docker stop [container_id]

  # 进入已启动的容器
  docker exec -it [container_id] /bin/bash
  # exit 命令退出终端，不会导致容器停止

  # 选择一个镜像来启动容器
  docker run -it --name node-test node /bin/bash
  docker run -it --name ubuntu-test ubuntu /bin/bash
  docker run -itd --name ubuntu-test ubuntu # 后台运行

  # 导出一个容器
  docker export [container_id] > my-image.tar

  # 导入本地镜像
  cat my-image.tar | docker import - my-image

  # 删除容器
  docker rm -f [container_id]

  # 怎么杀进程
  # 每次很多进程，重启容器
```

## volume

容器可以使用 volume 来存储数据。
容器中的所有数据一旦删除容器就会丢失，容器使用 volume 可以持久化数据。

```sh
  # 创建一个卷
  docker volume create my-store

  # 查看当所有卷
  docker volume ls

  # 查看当前卷属性
  docker volume inspect my-store

  # 挂载卷
  # 如果卷不存在，则创建一个新的卷
  # 容器被销毁，存在卷中的数据也将被保存
  docker run -v my-store:/data mysql

  # 创建一个匿名卷，映射到/data目录
  # /data目录就是卷的空间
  docker run -itd --name ubuntu-test2 -v /data ubuntu

  # 挂载目录
  # 也可将主机上的任意目录地址挂载到该容器
  # 可以挂载一个项目地址，修改代码后，不用每次重新编译镜像
  docker run -v D:/code:/app node

  # 应用
  docker run -itd --name nginx-test -p 8080:80 -v "${pwd}"/target:usr/share/nginx/html nginx

```

## 制作自己镜像

1. 在项目根目录创建 Dockerfile 文件

```Dockerfile
  FROM node:lts
  # 拷贝所有内容到/app
  COPY . /app

  # 进入到工作目录/app
  WORKDIR /app

  # 安装依赖
  RUN npm install --registry=https://registry.npm.taobao.org

  # 暴露端口，测试是否需要该字段
  EXPOSE 5000

  # 容器运行后的执行程序，只能有一个
  CMD npm run dev
```

2. 创建 dockerignore 文件

```sh
  # .dockerignore文件内容
  # 可以排除不被打包进镜像的文件

  .git
  node_modules
  pnpm-lock.yaml
```

3. 执行脚本

```sh
  # 编译镜像
  docker build -t nicest .
  # . 表示Dockerfile所在目录

  # 在容器运行镜像
  docker run -itd -p 5001:5000 --name nicest-test nicest
```

## 多容器通信

```sh
  # 为什么建议一个容器中只运行一个进程

  项目往往都不是独立运行的，需要数据库、缓存这些东西配合运作。
  这节我们把前面的 Web 项目增加一个 Redis 依赖，多跑一个 Redis 容器，演示如何多容器之间的通信。

  # 创建一个名为test-net的网络：
  docker network create test-net

  # 运行 Redis 在 test-net 网络中，别名redis
  docker run -d --name redis --network test-net --network-alias redis redis:latest


  # 运行 Web 项目，使用同个网络
  docker run -p 8080:8080 --name test -v D:/test:/app --network test-net -d test:v1

  # 查看网络列表
  docker network ls

  docker-compose
```
