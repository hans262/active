# curl
一个http请求工具。

```
	查看版本号
	curl --version

	查看帮助
	curl --help
	curl --help all

	GET请求
	curl http://www.baidu.com

	参数:

	-v 显示请求头、响应头

	-i 只带响应头

	设置请求头
	--header "Content-Type: application/json"

	保存内容
	-o [filename].[ext]
	-o a.txt

	带用户认证
	-u username:password
	-u hans:123456
	
	请求类型
	-X GET
	-X POST
	-X DELETE
	-X PUT

	POST请求数据
	-d '{"name": "hans", "age": 22}'
```