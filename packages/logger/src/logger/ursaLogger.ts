import * as path from 'path';
import Logger from '../logger';
import ConsoleTransport from '../transports/console';
import FileBufferTransport from '../transports/fileBuffer';
import { TUrsaLoggerOption } from '../types/loggeroption.t';

/**
 * ursalogger 封装为uras.js框架使用的logger类
 */
export default class UrsaLogger extends Logger {
    protected options: TUrsaLoggerOption;

    constructor(option?:TUrsaLoggerOption) {
        super();
        option && this.init(option);
    }

    init(option:TUrsaLoggerOption) {
        this.options = option;

        const { file, level, encoding, outputJSON, flushInterval, maxBufferLength, allowDebugAtProd, splitTime } = this.options;
        const fileOption = { file, level, encoding, outputJSON, flushInterval, maxBufferLength, allowDebugAtProd, splitTime };

        // 文件输出配置
        if (this.options.file) {
            const fileBufferTransport = new FileBufferTransport(fileOption);

            this.set('file', fileBufferTransport);
        }

        // 终端输出配置
        const consoleTransport = new ConsoleTransport({
            level: this.options.consoleLevel,
            allowDebugAtProd: this.options.allowDebugAtProd,
            outputJSON: this.options.outputJSON,
        });

        this.set('console', consoleTransport);

        // ERROR级别 错误日志文件单独输出配置
        if (this.options.errorLogName) {
            const errorLogger = new FileBufferTransport({
                ...fileOption,
                file: path.join(this.options.dir, this.options.errorLogName),
            });

            this.duplicateLoggers.set('error', errorLogger);
        }

        // INFO级别 日志文件单独输出配置
        if (this.options.infoLogName) {
            const infoLogger = new FileBufferTransport({
                ...fileOption,
                file: path.join(this.options.dir, this.options.infoLogName),
            });

            this.duplicateLoggers.set('info', infoLogger);
        }

        // WARN级别 日志文件单独输出配置
        if (this.options.warnLogName) {
            const warnLogger = new FileBufferTransport({
                ...fileOption,
                file: path.join(this.options.dir, this.options.warnLogName),
            });

            this.duplicateLoggers.set('warn', warnLogger);
        }

        // 复写console系统日志输出
        if (this.options.replaceConsole) {
            this.overrideConsole();
        }
    }
}
