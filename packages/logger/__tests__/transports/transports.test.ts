import * as os from 'os';
import * as utility from 'utility';
import Transport from '../../src/transports/transport';

const transport = new Transport({
    level: "INFO"
});

describe('test src/transports/transport.ts', () => {
    it('Transport default params', () => {
        expect(transport.allowDebugAtProd).toEqual(false);
        expect(transport.level).toEqual('INFO');
        expect(transport.outputJSON).toEqual(true);
        expect(transport.formatter).toEqual(null);
    });
    it('should log info level function', () => {
        expect(transport.shouleLog('DEBUG')).toBe(false);
    });
    it('should log info level function', () => {
        expect(transport.shouleLog('INFO')).toBe(true);
    });
    it('should log info level function', () => {
        expect(transport.shouleLog('ERROR')).toBe(true);
    });

    it('should log msg', () => {
        let result = transport.baselog('info', ['msg']).split(',');
        expect(`${result[0]} ${result[1].split(' ').splice(1).join(' ')}`).toBe(`[info ${process.pid}] ${utility.logDate(',').split(',')[0]} ${os.hostname}: msg`+os.EOL);
    });
});