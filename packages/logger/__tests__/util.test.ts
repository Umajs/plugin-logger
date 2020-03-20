import * as os from 'os';
import * as utility from 'utility';
import { normalizeLevel, format, consoleFormatter } from './../src/utils';

describe('test src/utils.ts', () => {
    // normalizeLevel获取日志级别对应number
    it('shoule get number 0 with level debug', () => {
        expect(normalizeLevel('debug')).toBe(0)
    });
    it('shoule get number 0 with level DEBUG', () => {
        expect(normalizeLevel('DEBUG')).toBe(0)
    });
    it('shoule get number 0 with level 0', () => {
        expect(normalizeLevel(0)).toBe(0)
    });
    // format格式化输出
    it('should output only msg', () => {
        let result = format('info', ['msg'], undefined, false);
        expect(result).toBe('msg'+os.EOL);
    });

    /**
     * 默认输出格式
     * `[info ${process.pid}] ${utility.logDate(',')} ${os.hostname}: msg`+os.EOL
     */
    test('should output default format msg', () => {
        let result = format('info', ['msg'], undefined, true);
        expect(result).toMatch(/[info ${process.pid}]/);
        expect(result).toMatch(/msg/);
    });
    it('should output custom format msg', () => {
        let formatter = function(meta: { level: any; pid: any; date: { split: (arg0: string) => any[]; }; hostname: any; message: any; }) {
            return `${meta.level}-${meta.pid} ${meta.date.split(',')[0]} ${meta.hostname}: ${meta.message}`;
        }
        let result = format('info', ['msg'], undefined, true, formatter);
        expect(result).toEqual(`info-${process.pid} ${utility.logDate(',').split(',')[0]} ${os.hostname}: msg`+os.EOL);
    });
    it('should output meta format msg', () => {
        let formatter = function(meta: { level: any; pid: any; date: { split: (arg0: string) => any[]; }; hostname: any; message: any; }) {
            return `${meta.level}-${meta.pid} ${meta.date.split(',')[0]} ${meta.hostname}: ${meta.message}`;
        }
        let result = format('info', ['msg'], {formatter: formatter}, true);
        expect(result).toEqual(`info-${process.pid} ${utility.logDate(',').split(',')[0]} ${os.hostname}: msg`+os.EOL);
    });

    //终端格式化输出 添加颜色
    it('should output meta format msg', () => {
        let meta = {
            level: 'info',
            pid: process.pid,
            date: utility.logDate(',').split(',')[0],
            hostname: 'os.hostname',
            message: 'info test'
        }
        expect(consoleFormatter(meta)).toEqual(`[info ${process.pid}] ${utility.logDate(',').split(',')[0]} os.hostname: info test`);
    });
});