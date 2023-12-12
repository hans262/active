# brew

```sh
  brew -v # 查看brew版本号
  brew install xxx # 安装包
  brew search xxx # 搜索包
  brew info xxx # 查看包信息
  brew uninstall xxx # 卸载包
  brew list # 显示已安装的包
  brew update # 更新包，此命令更新 Homebrew自己
  brew outdated # 检查过时（是否有新版本），这会列出所有安装的包里，哪些可以升级
  brew outdated xxx # 检查包
  brew upgrade # 升级所有可以升级的软件们
  brew upgrade xxx # 升级某个包
  brew cleanup # 清理不需要的版本极其安装包缓存
  brew cleanup xxx # 清理包
  brew –help # 查看brew的帮助
  brew pin xxx # 禁止指定软件升级
  brew unpin # 取消禁止指定软件升级
  
  # brew 总共四个包构成
  brew            Homebrew 源代码仓库
  homebrew-core    Homebrew 核心软件仓库
  homebrew-bottles    Homebrew 预编译二进制软件包
  homebrew-cask    MacOS 客户端应用

  # 查看 homebrew-core.git 当前源
  cd "$(brew --repo)" && git remote -v
  # origin  https://mirrors.ustc.edu.cn/brew.git

  # 查看 homebrew-core.git 当前源
  cd "$(brew --repo homebrew/core)" && git remote -v
  # origin https://mirrors.ustc.edu.cn/homebrew-core.git

  # 修改 brew.git 为阿里源
  git -C "$(brew --repo)" remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
  
  # 修改 homebrew-core.git 为阿里源
  git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git

  # zsh 替换homebrew-bottles镜像，Mac OS在10.15系统开始，默认的shell都换成了zsh
  echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.zshrc
  # 默认源
  https://mirrors.ustc.edu.cn/homebrew-bottles
  # 修改使其立即生效：
  source ~/.zshrc

```