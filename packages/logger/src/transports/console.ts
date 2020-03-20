import Transport from './transport';
import { ITransportOption } from '../types/transport.t';
import { normalizeLevel, consoleFormatter } from '../utils';

export default class ConsoleTransport extends Transport {
    constructor({ level = 'ERROR', allowDebugAtProd = false, outputJSON = true, formatter = null }: ITransportOption) {
        super({ level, allowDebugAtProd, outputJSON, formatter });
        if (outputJSON) { this.formatter = consoleFormatter; } // 默认仅输出msg 如果outputJSON为true则按格式化输出
    }

    log(level:string, args: any) {
        const msg = super.baselog(level, args);

        if (normalizeLevel(level) === normalizeLevel('error')) {
            process.stderr.write(msg);
        } else {
            process.stdout.write(msg);
        }

        return '';
    }
}
