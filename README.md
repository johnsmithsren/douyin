## 抖音弹幕获取(2023/2/2)
1. 抖音弹幕改为websocket接口获取，感觉更加方便了
2. [致谢大佬](https://github.com/YunzhiYike/douyin-live) 提供的极详细的proto文件，虽然我用不到这么多字段。同时提供了解决方案，我这边纯粹是翻译了一下大佬的python语言，转换成js的写法而已。没想到抖音居然对bytes进行了压缩。。。如果不是大佬的提示，真的是跪在这个坑里出不来了，都怀疑protobuf用出了问题了。
3. js 的 request没法拿到完整的 网页body内容，尝试了很久都没用，不得不使用python 的方式来获取。待优化。
4. 主要还是自行改造吧，代码很老旧，纯粹是从原来的项目中删减出来的，各位只需摘取核心代码自行处理即可。
5. 摒弃了原先的docker部署，越简单越好，就  npm run tsc && node dist/app.js 就可以部署了。开发环境就npm run start。懂得都懂，很简单。 

### redis 是需要自行配置!!!!!!!!!!!!!!!!
1. utils/redisStore.ts 配置redis 然后应该就可以运行了