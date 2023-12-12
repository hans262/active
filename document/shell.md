# SHELL

## 常用命令

```sh
  # 切换到root用户
  su root
  # 然后输入密码即可

  # 信息输出
  ls # 列出目录
  ls -a # 包含隐藏文件
  pwd # 输出当前目录路径

  # 文件操作
  mkdir [dir_name] # 创建文件夹
  cat [file_name] # 输出文件内容
  touch [file_name] # 创建文件
  rm [file_name] # 删除文件
  rm -rf [folder_name] # 删除文件夹，无法恢复

  cp [file_name] [dir_name] # 复制文件
  mv [file_name] [path] # 移动文件

  # echo
  echo [string] 输出一段文字
  # 写入内容文件，文件不存在则创建
  echo [string] > [file_name]
  echo [string] >> [file_name] # 追加内容到文件
  
  # 进程
  ps -ef # 输出进程信息
  kill -9 [pid] # 杀死进程
  $? # 上一个程序的退出状态码，一般0是成功

  nohup node [app.js] & 
  # 后台运行程序，要杀死该进程，需要记住该进程的pid，通过任务管理结束该进程。
  # 进程日志会产出在当前目录下的nohup.out文件中。



  \n 换行

```

## 语法
一些基本语法
```sh
  # 为脚本文件提供权限
  chmod +x  ./[file_name].sh
  sudo chmod +x  ./[file_name].sh # mac

  # 赋值变量，等号两边不能有空格
  git_version=$(git version)
  echo $git_version

  # 命令执行成功，再执行后续命令
  git push www.baidu.com && \
  echo hello world

  # 逻辑判断
  -ne 不等
  -eq 相等
  if [ $x -ne 0 ];

  # 判断程序执行失败
  git push www.baidu.com
  if [ $? -ne 0 ];
  then
    echo "执行失败"
    exit 1
  else
    echo "执行成功"
  fi

  # 统计输出行数
  ln=$(git status | wc -l)
  echo $ln

  # 判断目录是否存在
  if [ -d "./document" ];
  then
    echo "目录存在"
    else
    echo "目录不存在"
  fi


  # 标准准入流
  echo "请录入信息"
  read -p "请输入姓名:" name
  read -p "请输入年龄:" age
  echo "你的信息是 ${name}${age}"
  
```

## 特殊用法
```sh
  # 实现程序不退出，暂停
  function pause(){
    read -n 1 -p "$*" INP
    if [ $INP != '' ];
      then
        echo -ne '\b \n'
      fi
  }
  pause "pause..."
  
  #保证程序没一步执行正确，有不正确的直接退出
  set -e

```

## ssh登陆
是较可靠的，专为远程登陆和其他网络服务提供安全性的协议。几乎所有的平台都可以运行SSH。
```sh
  # 登陆
  ssh 用户@ip -p 端口
  ssh root@94.191.35.215 -p 22
  # 如果有密码，会提示让输入密码
  # id_dsa         -->私钥(钥匙)
  # id_dsa.pub     -->公钥(锁)
```