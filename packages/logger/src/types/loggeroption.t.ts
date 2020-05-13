export type TUmaLoggerOption = {
    level?: string,
    consoleLevel?: string,
    replaceConsole?:boolean,
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
    formatter?: Function,
    splitTime?: string // 文件切割时间
};
