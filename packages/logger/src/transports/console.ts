import Transport from './transport';
import { ITransportOption } from '../types/transport.t';
import { TConsoleMeta } from '../types/console.t';
import { normalizeLevel, colorfulLog } from '../utils';

export default class ConsoleTransport extends Transport {
    constructor({ level = 'ERROR', allowDebugAtProd = false, outputJSON = true, formatter }: ITransportOption) {
        super({ level, allowDebugAtProd, outputJSON, formatter });
    }

    log(level:string, args: any, meta?: TConsoleMeta) {
        const msg = colorfulLog(level, super.baselog(level, args, meta));

        if (normalizeLevel(level) === normalizeLevel('error')) {
            process.stderr.write(msg);
        } else {
            process.stdout.write(msg);
        }

        return '';
    }
}
