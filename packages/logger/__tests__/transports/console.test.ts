import * as path from 'path';
import * as child_process from 'child_process';

describe('test src/logger.ts', () => {
    const result = {msg: [], errMsg: []};

    beforeAll(async() => {
        await new Promise(resolve => {
            const m = child_process.spawn('ts-node', [
                path.join(__dirname, "../__mocks__/console.ts")
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
    it('should print "console transport info test" msg into console stdout', () => {
        expect(result.msg.join('')).toMatch(/console transport info test/);
    });
    it('should print "console transport error test" msg into console stderr', () => {
        expect(result.errMsg.join('')).toMatch(/console transport error test/);
    });

});