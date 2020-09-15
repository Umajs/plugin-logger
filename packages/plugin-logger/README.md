# `@umajs/plugin-logger`

> umajs框架日志插件,挂载到koa上下文ctx上。

## Usage

```
npm install @umajs/plugin-logger --save

```
## logger插件配置
```
//app/src/config/plugin.config.ts
import * as path from 'path';
import Uma from '@umajs/core';
export default {
    logger: {
        enable: true,
        options: {
            level: 'DEBUG', //日志输出级别
            file: path.resolve(Uma.instance().options.ROOT, '../log/ctxLogger.log'),
            allowDebugAtProd: false, // 是否允许打印debug日志
            replaceConsole:false, //是否重写系统console日志
        },
    }
}
```

## 使用
```
//使用 app/src/controller/index.controller.ts
export default class Index extends Controller {
    @Path('/index')
    @RequestMethod('GET')
    index() {
        this.ctx.logger.info(this.testService.return1());
        this.ctx.logger.debug('debug');
        this.ctx.logger.warn('warn');
        this.ctx.logger.error('error');
        this.ctx.body = '这里是首页';
    }
}
```



