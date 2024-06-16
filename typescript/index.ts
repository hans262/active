import jimp from "jimp";

jimp.read("./public/WechatIMG75.jpeg", (err, lenna) => {
  console.log(lenna.getWidth(), lenna.getHeight())
  
  // 3024 3355
  // lenna.resize(295, 413).write("./public/test.jpeg");
  lenna.crop(0, 0, 295, 413).write("./public/test.jpeg");

  // lenna.resize(295, 413).write("./public/test.jpeg");
});
