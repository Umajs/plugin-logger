import * as path from 'path';
import * as fs from 'fs';
import FileTransport from '../../src/transports/file';

const transport = new FileTransport({
    level: "INFO",
    file: path.join(__dirname, '../__mocks__/log/file.test.log'),
    encoding: 'utf8'
});

describe('test src/transports/file.ts', () => {
    it('FileTransport default params', () => {
        expect(transport.allowDebugAtProd).toEqual(false);
        expect(transport.level).toEqual('INFO');
        expect(transport.outputJSON).toEqual(true);
        expect(transport.formatter).toEqual(null);
        expect(transport.file).toEqual(path.join(__dirname, '../__mocks__/log/file.test.log'));
        expect(transport.encoding).toEqual('utf8');
    });

    it('should log msg into file', async() => {
        await transport.log('info', ['file log test']);
        const content =  fs.readFileSync(path.join(__dirname, '../__mocks__/log/file.test.log'), 'utf8');
        expect(content).toMatch(/file log test/);
    });
});