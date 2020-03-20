import * as Koa from "koa";

export type WFLoggerOption = {
    level?: string,
    consoleLevel?: string,
    allowDebugAtProd?: boolean,
    dir?: string,
    errorLogName?: string,
    infoLogName?: string,
    warnLogName?: string,
    encoding?: string,
    outputJSON?: boolean,
    file?: string,
    eol?: string, // 文件流换行
    flushInterval?: number,
    maxBufferLength?: number,
    formatter?: Function
};

export interface TransportOption {
    level: string,
    allowDebugAtProd: boolean,
    outputJSON: boolean,
    formatter?: Function
}
export interface TransportFileOption extends TransportOption {
    file: string,
    encoding?: string
}

export interface TransportFileBufferOption extends TransportFileOption {
    flushInterval?: number,
    maxBufferLength?: number
}

/**
 * 实例化日志模块
 * @param options WFLoggerOption
 */
export class UrsaLogger {
    constructor(options?: WFLoggerOption);
    init(options: WFLoggerOption)
}

/**
 * 实例化用于挂载到koa.ctx上
 * @param ctx Koa.BaseContext
 * @param logger WFLogger
 */
export class ContextLogger{
    constructor(ctx: Koa.BaseContext, logger:UrsaLogger)
}

export class Logger extends UrsaLogger{
    constructor();
    /**
     * 设置日志级别采用哪种打印方式
     * @param type  ALL | DEBUG | INFO | WARN | ERROR | NONE 
     * @param transport 日志打印工厂
     */
    set(type:string,transport:Transport);
    /**
     * 
     * @param rest 日志类型 比如 log('info','msg')
     */
    log(...rest:any):void;
    /**
     * 
     * @param rest 日志类型 比如 info('info','msg')
     */
    info(...rest:any):void;
    /**
     * 
     * @param rest 日志类型 比如 error('info','msg')
     */
    error(...rest:any):void;
    /**
     * 
     * @param rest 日志类型 比如 warn('info','msg')
     */
    warn(...rest:any):void;
    /**
     * 
     * @param rest 日志类型 比如 debug('info','msg')
     */
    debug(...rest:any):void;
    /**
     * 
     * @param levet log | debug | warn | error | info
     * @param rest 
     */
    invoke(levet:string,...rest:any):void;
}

export default Logger;

export class Transport{
    constructor(options:TransportOption);
}

export class ConsoleTransport extends Transport{
    constructor(options:TransportOption);
}

export class FileBufferTransport extends Transport{
    constructor(options:TransportFileBufferOption);
}

export class FileTransport extends Transport{
    constructor(options:TransportFileOption);
}