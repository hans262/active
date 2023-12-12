# FFmpeg
视频、音频转换的程序，可以采用GPU加速。
- 功能：
视频编码、录制、裁剪、加水印、抓图、格式转换；
音频处理；
支持视频推流rtsp协议的流媒体服务器。

## 视频分辨率
度量图像内数据量多少的一个参数，(PPI)。
视频内容宽的像素点总和 x 视频内容高的像素点总和。
320X180的视频是指它在横向和纵向上的有效像素。

分辨率也就是视频的内容宽高，不能决定视频的清晰度。
窗口尺寸是播放器的宽高尺寸，窗口尺寸决定了视频的清晰度。
窗口小时ppi值较高，看起来清晰；
窗口放大时，由于没有那么多有效像素填充窗口，有效像素ppi值下降，就模糊了。

低分辨率的视频，在小的屏幕上观看很清晰，在大的屏幕上就模糊了，
那是因为屏幕宽高大于了视频的宽高。

分辨率也要符合一般的纵横比，才能完美在显示屏幕上展示，常见的纵横比有：4:3，16:9等等。

常见的有480p、720p、1080p、2k、4k。
480p 标清 640x480
720p 高清 1280x720
1080p 超清 1920x1080
2k 2560x1440
4k 3840x2160

## 视频编码
视频信息从一种形式或格式转换为另一种形式的过程，将原始视频格式的文件转换成另一种视频格式文件的方式。

视频的内容就是包含了所有帧，每一帧就是一张图片，图片又是像素点构成，这样就组成了一个视频文件。
视频压缩技术就是压缩图片，有JPEG和MPEG算法。

视频的编码类型就是各种压缩技术，有：H264, VP8, AVS, RMVB, WMV, QuickTime（mov）AV1 AVC等，

## 视频格式
avi mkv rmvb mp4 mov m4v

## 视频帧率
画面每秒钟传输帧数，单位为FPS。每秒钟刷新的帧数越多，画面动作越流畅。
视频一般为20~30fps左右，游戏为60~100fps。

## 视频码率
数据传输时单位时间传送的数据位数，一般单位为kbps、mbps，就是每秒钟的视频数据大小。

码率是反应视频质量的重要指标，视频每一秒钟所承载的数据量大小，代表了码率大小。码率越高处理出来的视频文件就越接近原始文件，但是再高的码率也不会超过原始文件的清晰度。

码率和视频质量、文件体积成正比，几乎所有的编码格式重视的都是如何用最低的码率达到最少的失真。

```sh
  # 原始视频码率(kbps) = 文件大小(KB) * 8 / 时间(秒)
  
  # 常用码率
  2mbps/6mbps/12mbps/45mbps/5g
  1mbps = 1024kbps
  1kbps = 8kbit

  # 查看码率
  ffmpeg -i public/out.mp4 # 其中bitrate字段就是码率
```

## FFmpeg操作指南
```sh
  -version # 查看版本

  # 选择流
  # 有的视频包含多个音频流和字幕流，视频流、音频流、字幕流。
  -map # 自动选择流，ffmpeg选择最优的视频流、音频流、字幕流
  -map 0 # 使用所有流
  -an # 去掉音频流
  -vn # 去掉视频流
  
  # 指定编码
  -codec # 编码，别名-c
  -vcodec # 视频选项，别名-c:v
  -acodec # 音频选项，别名-c:a
  -c copy # # 保持原编码格式，能加快速度，有可能报错
  -c:v libx264 # 指定视频编码h264
  -c:a aac # 指定音频编码aac
  -ar 44100 # 指定⾳频采样率

  # 选项参数
  # 注意参数不能放在 output.file结尾，不然参数不生效
  -i input_file # 输入文件地址
  -y # 输出文件覆盖不询问
  -s 480x270 # 修改视频分辨率，视频尺寸的修改
  -ss 00:11:34 # 指定视频开始时间
  -to 00:11:34 # 指定视频结束时间
  -t 10 # 持续时间，优先级高于-to
  -r 15 # 强制指定帧率，默认25
  -aspect 16:9 # 调整视频纵横比 4:3 16:9

  # 强制输入、输出格式
  # ffmpeg会根据文件后缀自动检测，多数情况下不需要设置。
  -f flv # 输出
  -f mov i test.mov # 输入
  
  # 修改码率
  -b 400k # 总的码率
  -b:v 400k # 视频码率
  -b:a 192k # 音频码率

  # 性能优化
  # 转码速度与质量的平衡，默认值medium
  -preset [ultrafast, superfast, veryfast, ..., medium, ...]
  -crf 18~28 # 默认22，越大质量越差
  -tune zerolatency # 直播推流，延迟策略
  
  # GPU硬件加速，如果你有GPU
  ffpeg -hwaccels # 查看支持的硬件列表
  -hwaccel cuda/videotoolbox # 设置
  
  # 比较快的转码
  ffmpeg -i input.rmvb -y -c:v libx264 -preset ultrafast -c:a aac -ar 44100 out.mp4

  # 常用命令
  ffmpeg -i input.mp4 # 查看视频信息
  
  # 制作gjf
  ffmpeg -i input.mp4 -y -r 8 out.gif
  # 由于gif尺寸很大，可以调小分辨率-s值
  
  # 原编码格式转换
  ffmpeg -i input.mp4 -y -c copy out.mp4
  
  # 裁切视频内容
  ffmpeg -i cc.mp4 -y -vf crop=592:800:0:400 cc2.mp4
  # crop=宽:高:x:y

  # 裁剪视频
  ffmpeg -i input.mp4 -ss 00:00:00 -to 00:00:10 -c copy out.mp4
  ffmpeg -i input.mp4 -y -ss 00:00:00 -t 10 -c copy out.mp4
```

## RTMP
一种视频流传输协议，起初是为flash播放器和服务器之间音视频传输开发的协议。

从数据采集端推送数据流到流媒体服务器，再到播放端从流媒体服务器获取数据流的过程，而定义的一套传输规则。它定义了视频文件如何拆分成小数据包，以及它的传输顺序。

## RTSP
一种流媒体传输协议。

## FLV
是一种视频格式，全称为FLASH VIDEO，也是一种流媒体视频格式。

诞生原因：因为rm，wmv，mov，mp4等众多的视频格式，都需要相关的视频播放器才能播放，后来因为windows附带flash播放软件、浏览器嵌入了flash插件，这样解决了播放器的问题，那么flv就成为了最流行的视频格式。

随着flash插件被各大浏览器禁用，不再支持播放flv格式视频，flv.js诞生。flv.js是可以在浏览器直接解码flv格式视频流，然后把解码后的视频流喂给video标签，实现播放。

### 使用ffmpeg推送FLV格式视频流
1. 搭建流媒体服务器
```ts
  import NodeMediaServer from 'node-media-server'
  const config = {
    rtmp: {
      port: 1935,
      chunk_size: 60000,
      gop_cache: true,
      ping: 30,
      ping_timeout: 60
    },
    http: {
      port: 8000,
      allow_origin: '*'
    }
  };
  var nms = new NodeMediaServer(config)
  nms.run();
```

2. 使用ffmpeg推流
```sh
  # 如果您有包含H.264编码视频和AAC音频的视频文件：
  ffmpeg -re -i out.mp4 -c copy -f flv rtmp://localhost/live/out
  
  # 或者，如果您有以其他音视频格式编码的视频文件：
  ffmpeg -re -i /Users/macbookair/Downloads/文档/move/eee.mp4 -c:v libx264 -preset veryfast -tune zerolatency -c:a aac -ar 44100 -f flv rtmp://localhost/live/out

  ffmpeg -re -i /Users/macbookair/Downloads/文档/move/eee.mp4 -c copy -f flv rtmp://localhost/live/out
```

3. 使用flv.js播放直播流
```html
  <!-- flv.js只支持 H.264 + AAC / MP3 编码格式视频 -->
  <script src="https://cdn.bootcss.com/flv.js/1.5.0/flv.min.js"></script>
  <video id="videoElement" controls width="100%" autoplay></video>
  <script>
    if (flvjs.isSupported()) {
      var videoElement = document.getElementById('videoElement');
      var flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: 'http://localhost:8000/live/out.flv'
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
    }
  </script>
```

## HLS
是HTTP Live Streaming的简称，可以动态自适应码率的流媒体传输协议。把一个视频分割成多个ts格式的切片，这些视频切片的索引位置被保存在目录文件m3u8中，可以使用兼容hls的播放器播放视频。

```sh
  # ffmpeg 推流hls
  ffmpeg -re -i public/out.mp4 -c copy -f hls rtmp://localhost/live/out
```

### 使用FFmpeg制作m3u8视频
```sh
  -map 0 # 使用输入文件中所有流
  -f segment # 指定分割方式
  -segment_time 10 # 片段持续时间，需重新编码
  -hls_time 10 # 片段持续时间，需重新编码
  -segment_list index.m3u8 %03d.ts # 指定索引文件n.m3u8和片段名001.ts、002.ts
  -segment_list_flags +live # 表示流是实时流
  -segment_format mpegts # 将段的格式指定为MPEG-TS
  -hls_init_time # 第一个片段的时间长度
  
  ffmpeg -i out.mp4 -c copy -map 0 -f segment -segment_list_flags +live -segment_time 10 -segment_format mpegts -segment_list mp4.m3u8 %03d.ts
  
  # -f segment 分割
  ffmpeg -i public/out.mp4 -y -c copy -f segment -segment_time 10 -segment_list public/m3u8/index.m3u8 public/m3u8/index%d.ts

  # -f hls 分割
  ffmpeg -i public/out.mp4 -y -c copy -f hls -hls_time 10 -hls_init_time 3 -hls_playlist_type vod  public/m3u8/index.m3u8

  # 编码后切片
  ffmpeg -i public/out22.mp4 -y -c:v h264 -hls_time 10 -hls_init_time 3 -hls_playlist_type vod public/m3u8/index.m3u8

  # 编码后 hls_time hls_init_time 才会生效
  # 切割不准确的原因：ts文件的切割还跟视频的GoP大小(两个I帧之间的间隔）有关，并不是指定1秒切一个ts文件就能保证1秒切一个ts文件的。任何一个视频流在播放端要能获取到完整的GoP才能播放，所以一个ts文件所实际包含的时间是GoP的整数倍。

  # 对视频片段进行AES-128加密
  1. 生成加密文件
  openssl rand 16 -hex > video.key
  2. 生成iv
  openssl rand -hex 16
  3. 创建keyinfo文件
  http://localhost:49509/public/video.key # key 网络位置
  public/video.key # key 文件相对位置
  8ff67e48ea0f8a162b37f17e6f2dc345 # iv
  4. 引入hls_key_info_file
  ffmpeg -i public/out.mp4 -y -c copy -f hls -hls_time 10 -hls_playlist_type vod -hls_key_info_file public/key_info public/m3u8/index.m3u8

  # 这种AES-128保护有多安全？
  # video.key默认情况下是暴露在外的，想要安全，服务器可以校验客户端身份后再返回video.key。
```

### 使用hls.js播放m3u8视频
```html
  <script src="https://cdn.jsdelivr.net/npm/hls.js@1"></script>
  <video id="video" controls width="100%"></video>
  <script>
    var video = document.getElementById('video');
    var videoSrc = 'public/m3u8/index.m3u8';
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
    }
  </script>
```

##  压缩技术

```sh
  ### JPEG压缩原理
  JPEG压缩原理
  把原始数据中不重要的部分去掉，节省内存空间。

  一张1080p的图片，
  size = 1920 * 1080 

  ### 有损压缩
  JPEG 文件小
  大图片

  ### 无损压缩
  PNG 文件大
  小图片
  ### gif
```
