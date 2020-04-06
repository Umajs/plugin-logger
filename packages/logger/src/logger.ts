import { TConsoleMeta } from './types/console.t';

class Logger {
    protected duplicateLoggers: Map<string, any>;

    private transports: Map<string, any>;

    public meta :TConsoleMeta;

    constructor() {
        this.transports = new Map(); // 存放输出实例
        this.duplicateLoggers = new Map(); // 存放特殊需求的fileLogger
    }

    set(key: string, value: any) {
        this.transports.set(key, value);
    }

    get(key: string) {
        return this.transports.get(key);
    }

    overrideConsole() {
        const self = this;

        ['info', 'warn', 'error', 'debug', 'log'].forEach((action) => {
            if (action === 'log') {
                // 默认console.log输出到info级别
                console[action] = self.info.bind(self);
            } else {
                console[action] = self[action].bind(self);
            }
        });
    }

    log(level:string, rest:any, meta?:any) {
        const LEVEL = level.toUpperCase();
        const duplicateLogger = this.duplicateLoggers.get(level);

        if (duplicateLogger && duplicateLogger.shouleLog(LEVEL)) {
            duplicateLogger.log(LEVEL, rest, meta);
        }

        for (const transport of this.transports.values()) {
            if (transport && transport.shouleLog(LEVEL)) {
                transport.log(LEVEL, rest, meta);
            }
        }
    }

    /**
     * 关闭所有的输出形式
     */
    close() {
        for (const transport of this.transports.values()) {
            transport.close();
        }

        for (const transport of this.duplicateLoggers.values()) {
            transport.close();
        }
    }

    error(...rest:any): void {
        this.log('error', rest);
    }

    warn(...rest:any): void {
        this.log('warn', rest);
    }

    info(...rest:any): void {
        this.log('info', rest);
    }

    debug(...rest:any): void {
        this.log('debug', rest);
    }
}

export default Logger;
