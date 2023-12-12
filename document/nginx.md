# nginx

```sh
  # 安装
  brew install nginx

  # 启动服务
  nginx

  # 停止服务
  nginx -s stop

  # 配置文件目录
  cd /usr/local/etc/nginx/nginx.conf
```

## 配置文件

```sh
server {
  listen       8080;
  server_name  localhost;

  # 开启ssl证书
  # listen       8080 ssl;

  # 设置ssl证书
  ssl_certificate localhost+1.pem;
  ssl_certificate_key localhost+1-key.pem;

  # 支持流式响应，支持nextjs的流式响应内容
  proxy_cache off;  # 关闭缓存
  proxy_buffering off;  # 关闭代理缓冲
  chunked_transfer_encoding on;  # 开启分块传输编码
  tcp_nopush on;  # 开启TCP NOPUSH选项，禁止Nagle算法
  tcp_nodelay on;  # 开启TCP NODELAY选项，禁止延迟ACK算法
  keepalive_timeout 300;  # 设定keep-alive超时时间为65秒

  # 将8080端口转发到3000端口
  location / {
    # root   html;
    # index  index.html index.htm;

    # 转发本地3000端口的服务
    proxy_pass http://0.0.0.0:3000;
  }
}
```
