import * as path from 'path'; 
import * as fs from 'fs';
import * as child_process from 'child_process';
jest.setTimeout(10000);
describe('test src/logger.ts', () => {
    const result = {msg: [], errMsg: []};
    beforeAll(async() => {
        await new Promise(resolve => {
            const m = child_process.spawn('ts-node-dev', [
                path.join(__dirname, './__mocks__/logger.ts'),
            ], {
                cwd: process.cwd(),
            });
    
            m.stdout.on('data', (data) => {
                result.msg.push(data.toString());
            });
    
            m.stdout.on('close', () => {
                resolve(result);
            });
            m.stderr.on('data',(err)=>{
                result.errMsg.push(err.toString());
            });
        }).catch((e)=>{
            console.log("test src/logger.ts has error:"+e);
        });
    })
    test('should print msg into console stdout', () => {
        expect(result.msg.join('')).toMatch(/jest-info/);
        expect(result.msg.join('')).toMatch(/jest-warn/);
    });
    it('should print "jest-error" msg into console stderr', () => {
        expect(result.errMsg.join('')).toMatch(/jest-error/);
    });
    test('should print current msg into file', () => {
        let fileContent = fs.readFileSync(path.join(__dirname, '/__mocks__/log/logger.test.log'), 'utf8');
        expect(fileContent).toMatch(/jest-info/);
        expect(fileContent).toMatch(/jest-warn/);
        expect(fileContent).toMatch(/jest-error/);
        expect(fileContent).toMatch(/jest-replaceConsole/);
    });
});