# 马洪伟个人商业介绍网站

这是一个参考 Wix Studio 高端作品站模式搭出来的静态单页网站。当前版本已根据资产目录中的简历重新整理为商业计划书式表达：突出定位、价值主张、代表成果、执行模型和合作方向，而不是求职简历式罗列。

## 模块结构

- 首屏：AI影像导演定位、核心价值主张、作品片段播放入口。
- 商业定位：把内容创意、视听语言、AI生成、数字人、UE5和交付管理整合成生产闭环。
- 价值主张：平台内容导演、AI影像生产、游戏CG视觉统筹、流程产品化与降本。
- 代表成果：腾讯视频、BitHuman、UE5游戏CG、AI工作流/iOS App。
- 执行模型：用项目资产而非求职履历呈现经验。
- 联系：合作方向和表单骨架。

## 替换素材

- 首屏和导演片场图：`assets/hero-cinema.png`
- 作品卡 1：`assets/still-motel.png`
- 作品卡 2：`assets/still-platform.png`
- 首屏 12 秒循环预览视频：`assets/movie1-preview-medium.mp4`
- 弹窗播放 fast-start 视频：`assets/movie1-reel-fast.mp4`
- 定位区懒加载视频：`assets/ai-capability-loop.mp4`
- 视频地址：在 `index.html` 里搜索 `data-video` 和 `<source src=...>` 替换成你的 mp4 或流媒体地址。

`assets/movie1.mp4` 和 `assets/一套可交付的AI影像生产能力.mp4` 是本地母版文件，体积较大，默认不建议放入公开部署包。

## 本地预览

```bash
python3 -m http.server 5173
```

然后打开 `http://127.0.0.1:5173`。
