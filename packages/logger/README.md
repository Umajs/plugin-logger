# `@ursajs/logger`

## ursajs日志系统规划
- [x] 日志分级（高）
- [x] 日志模块缓存（高）
- [x] 日期切割（高）
- [x] 支持全局日志对象调用(中)
- [ ] 自定义日志文件配置（目录，切割方式）
- [ ] 自定义传送远程日志（将日志信息发送到指定远程服务器）


## 使用说明
```javascript
const Logger = require('@ursajs/logger');
Logger.init({
    level: 'DEBUG', //日志输出级别
    dir: '/path/to/your/custom/log', //日志输出目录
    errorLogName: 'errorlogger.log', //error级别日志文件名
    infoLogName: 'infologger.log', //info级别日志文件名
    warnLogName: 'warnlogger.log', //warn级别日志文件名
    encoding:'utf-8', //日志编码格式
    outputJSON:true, //是否格式化输出携带pid等信息 false仅输出msg
    consoleLevel:'debug', //终端日志输出级别
    allowDebugAtProd:true, //生产环境是否允许打印debug日志
});  //在启动时初始化一次 其他地方直接import Logger直接使用

or

const {UrsaLogger } = require('@ursajs/logger');
const Logger = new UrsaLogger({
   ...options
})

or

//提供单例模式使用logger 避免多次实例化
const {UrsaLogger } = require('@ursajs/logger');
const Logger = UrsaLogger.instance({
   ...options
});

//使用
Logger.info('info');
Logger.debug('debug');
Logger.warn('warn');
Logger.error('error');
```

如果用户需要使用ctx上的数据可直接使用contextLogger

```javascript
import {ContextLogger} from '@ursajs/logger';
app.use(async ctx => {
   ctx.logger = ContextLogger(ctx, options)
   ctx.logger.info('ctxLogger-info');
   ctx.body = 'Hello World';
});
```

## 配置属性
```js
{
    level: 'DEBUG', //日志输出级别
    dir: '/path/to/your/custom/log', //日志输出目录
    errorLogName: 'errorlogger.log', //error级别日志文件名
    infoLogName: 'infologger.log', //info级别日志文件名
    warnLogName: 'warnlogger.log', //warn级别日志文件名
    file: '/path/to/your/custom/log/logger.log', //日志文件写入路径(所有级别日志)
    encoding:'utf-8', //日志编码格式
    outputJSON:true, //是否格式化输出携带pid等信息 false仅输出msg
    consoleLevel:'debug', //终端日志输出级别
    allowDebugAtProd:true, //是否允许打印debug日志
    flushInterval: 1000, //文件流定时写入
    maxBufferLength: 1000, //最大buffer 超出限制执行写入
    formatter: function(meta?:TConsoleMeta) {
        return `[${meta.level} ${meta.pid}] ${meta.date} ${meta.hostname} ${meta.paddingMessage}: ${meta.message}`;
    }, //日志格式化输出
    splitTime: '00 00 * * * *' //日志文件切割时间
};
```



## 日志级别

日志分为`ALL DEBUG INFO WARN ERROR NONE`6个级别。默认会同时打印`INFO`及以上级别的日志到文件和终端，可自定义日志输出级别：

### 1.文件日志级别（默认`INFO`）

```javascript
// config/logger.config.js
exports.logger = {
   level: 'ALL' // 打印所有级别日志到文件中
};
```

### 2.终端日志级别（默认`INFO`）

```javascript
// config/logger.config.js
exports.logger = {
   consoleLevel: 'NONE' //关闭日志终端输出
};
```

`consoleLevel`优先级高于`level`，`consoleLevel`仅对终端输出生效。
日志输出如下所示：
```javascript
[DEBUG 24053] 2019-08-01 18:57:20,573 liumindeMacBook-Pro.local: debug
[INFO 24053] 2019-08-01 18:57:20,574 liumindeMacBook-Pro.local: info GET
[WARN 24053] 2019-08-01 18:57:20,575 liumindeMacBook-Pro.local: warn
[ERROR 24053] 2019-08-01 18:57:20,576 liumindeMacBook-Pro.local: error
```

### 3.生产环境关闭打印debug日志，默认关闭

```javascript
exports.logger = {
   allowDebugAtProd: ture // 开启生产环境打印debug日志
};
```

## 日志文件输出
1. 文件编码，默认编码为`utf-8`，可自定义
2. 日志文件输出格式默认为JSON

```javascript
exports.logger = {
   encoding: 'gbk',
   outputJSON: true
};
```

## 日志切割
1. 默认按天切割，在每日`00:00`按照.log.YYYY-MM-DD文件名切割。