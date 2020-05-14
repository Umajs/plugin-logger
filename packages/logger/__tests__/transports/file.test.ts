import * as path from 'path';
import * as fs from 'fs';
import * as sleep from 'ko-sleep';
import { fileTransport } from '../__fixtures__/transport';

describe('test src/transports/file.ts', () => {
    it('FileTransport default params', () => {
        expect(fileTransport.allowDebugAtProd).toEqual(false);
        expect(fileTransport.level).toEqual('INFO');
        expect(fileTransport.outputJSON).toEqual(true);
        expect(fileTransport.formatter).toEqual(null);
        expect(fileTransport.file).toEqual(path.join(__dirname, '../__fixtures__/log/file.test.log'));
        expect(fileTransport.encoding).toEqual('utf8');
    });

    it('should log msg into file', function*(){
        fileTransport.log('INFO', ['file log test']);
        yield sleep(10)
        const content =  fs.readFileSync(path.join(__dirname, '../__fixtures__/log/file.test.log'), 'utf8');
        expect(content).toMatch(/file log test/);
    });
});