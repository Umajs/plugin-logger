import * as path from 'path'; 
import * as fs from 'fs';
import * as child_process from 'child_process';

describe('test src/index.ts', () => {
    const result = {msg: [], errMsg: []};
    let fileContent: string;
    beforeAll(async() => {
        await new Promise(resolve => {
            const m = child_process.spawn('ts-node-dev', [
                'src/app.ts',
            ], {
                cwd: path.resolve(__dirname, './app/'),
            });
            m.stdout.on('data', (data) => {
                result.msg.push(data.toString());
            });
            m.stderr.on('data',(err)=>{
                result.errMsg.push(err.toString());
            })
            m.stdout.on('close', () => {
                resolve(result);
            })
        }).catch((err)=>{
            console.log(err);  
        });
        fileContent =  fs.readFileSync(path.join(__dirname, '/app/src/logs/home.log'), 'utf8');
    })
    it('should print info msg into console', () => {
        expect(result.msg.join('')).toMatch(/plugin-logger info/);
    });
    it('should print warn msg into console', () => {
        expect(result.msg.join('')).toMatch(/plugin-logger warn/);
    });
    it('should print error msg into console', () => {
        expect(result.errMsg.join('')).toMatch(/plugin-logger error/);
    });
    it('should print "plugin-logger warn" msg into file', async () => {
        expect(fileContent).toMatch(/plugin-logger warn/);
    });
    it('should print "plugin-logger error" msg into file', async () => {
        expect(fileContent).toMatch(/plugin-logger error/);
    });
});