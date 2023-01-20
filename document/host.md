## hosts文件
没有扩展名的系统文件，用来关联常用网址域名与其对应的ip地址。

当我们访问一个网站域名，会去请求dns域名服务器，域名服务器会解析域名拿到ip地址。
然后可以通过ip地址进行tcp通信。

有了hosts文件，就可以把一些常用网址的ip地址存储到本地，不再去访问域名解析服务器。

## github访问慢的原因
因为DNS解析问题，即Github的CDN域名遭到了DNS污染，
导致无法连接使用Github的加速分发服务器，才使得国内访问速变慢。

## Hosts文件位置
  window: C:\Windows\System32\drivers\etc\hosts
  mac: 
  Shift+Command+G
  搜索 /etc/hosts

## 修改hosts文件
```
# Github
140.82.114.3 github.com
# Baidu
39.156.69.79 baidu.com
```
如果资源没有对应上，有可能ip地址不正确。
打开控制台查看资源加载情况，即可查出哪些域名没有对应上。

这时候则需要去查找域名对应的ip。
可通过网站host查询 对应 ip地址。

## 刷新host
修改host后，需要刷新host。
cmd: ipconfig /flushdns

## google翻译失效问题
获取ip
ping google.cn
修改对应host
