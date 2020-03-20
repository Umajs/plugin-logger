/**
 * 输出基类所需参数配置
 */
export interface ITransportOption {
    level: string,
    allowDebugAtProd?: boolean,
    outputJSON?: boolean,
    formatter?: Function
}

/**
 * 文件输出类所需参数配置
 */
export interface ITransportFileOption extends ITransportOption {
    file: string,
    encoding?: string,
    splitTime?: string // 文件切割时间
}

/**
 * 文件缓存类所需参数配置
 */
export interface ITransportFileBufferOption extends ITransportFileOption {
    flushInterval?: number,
    maxBufferLength?: number
}
