import * as path from 'path';
import Logger from '../logger';
import ConsoleTransport from '../transports/console';
import FileBufferTransport from '../transports/fileBuffer';
import { TUrsaLoggerOption } from '../types/loggeroption.t';

let instance: UrsaLogger = null;

export default class UrsaLogger extends Logger {
    constructor(options?:TUrsaLoggerOption) {
        super();
        this.options = options;
        options && this.init(options);
    }

    options: TUrsaLoggerOption;

    init(options:TUrsaLoggerOption) {
        this.options = options;
        const { file, level, encoding, outputJSON, flushInterval, maxBufferLength, allowDebugAtProd, splitTime, formatter } = this.options;
        const fileOption = { file, level, encoding, outputJSON, flushInterval, maxBufferLength, allowDebugAtProd, splitTime, formatter };

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

    static instance(options?: TUrsaLoggerOption):UrsaLogger {
        if (instance) return instance;

        instance = new UrsaLogger(options);

        return instance;
    }
}
