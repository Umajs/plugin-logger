import { normalizeLevel, format } from '../utils';
import { ITransportOption } from '../types/transport.t';
import { TConsoleMeta } from '../types/console.t';


export default class Transport {
    level: string;

    allowDebugAtProd: boolean;

    outputJSON: boolean;

    formatter: Function;

    constructor({ level = 'INFO', allowDebugAtProd = false, outputJSON = true, formatter = null }: ITransportOption) {
        this.level = level;
        this.allowDebugAtProd = allowDebugAtProd;
        this.outputJSON = outputJSON;
        this.formatter = formatter;
    }

    /**
     * 日志分级规则
     * @param level 当前日志输出级别 log.debug()为‘DEBUG’
     * >=this.option.level 均为可输出日志
     */
    shouleLog(level: string):boolean {
        if (this.level === 'NONE') {
            return false;
        }

        // 非开发环境关闭debug日志
        if (level === 'DEBUG' && (!this.allowDebugAtProd)) {
            return false;
        }

        return normalizeLevel(this.level) <= normalizeLevel(level);
    }

    baselog(level:string, args: any, meta?: TConsoleMeta):string {
        return format(level, args, meta, this.outputJSON, this.formatter);
    }

    close() {}
}
