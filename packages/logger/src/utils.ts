import * as os from 'os';
import * as util from 'util';
import * as utility from 'utility';
import chalk from 'chalk';
import { TConsoleMeta } from './types/console.t';
import getLevel from './level';

const hostname = os.hostname();

export function normalizeLevel<T>(level: T):number {
    if (typeof level === 'number') {
        return level;
    }

    if (typeof level === 'string' && level) {
        return getLevel(level);
    }
}

/**
 * 默认输出格式
 * @param meta
 * [ERROR 15047] 2019-07-15 17:40:56,952 liumindeMacBook-Pro.local: error
 */
function defaultFormatter(meta?:TConsoleMeta) {
    return `[${meta.level} ${meta.pid}] ${meta.date} ${meta.hostname}: ${meta.message}`;
}

/**
 * ERROR日志输出格式
 * @param err
 */
function formatError(err:Error) {
    const errStack = err.stack || 'no_stack';

    return util.format('nodejs.%s: %s\n%s\npid: %s\nhostname: %s\n',
        err.name,
        err.message,
        errStack.substring(errStack.indexOf('\n') + 1),
        process.pid,
        hostname);
}

/**
 * 日志格式化输出配置
 * @param level
 * @param args
 * @param meta
 * @param outputJSON
 * @param format
 */
export function format(level:string, args?:any, meta:TConsoleMeta = {}, outputJSON?:boolean, formatt?: Function) {
    let msg:string;
    let output:string;
    const formatter = meta.formatter || formatt;

    if (args[0] instanceof Error) {
        msg = formatError(args[0]);
    } else {
        msg = util.format(args.join(' '));
    }

    output = msg; // 默认仅输出msg

    // 格式化输出
    if (outputJSON === true || formatter) {
        meta.level = level;
        meta.date = utility.logDate(',');
        meta.pid = process.pid;
        meta.hostname = hostname;
        meta.message = msg;

        output = defaultFormatter(meta);
        if (formatter) { output = formatter(meta); }
    }

    if (!output) return '';
    output += os.EOL;

    return output;
}

/**
 * 终端输出格式 & 样式配置（不同级别区分输出颜色）
 * @param meta
 */
export function consoleFormatter(meta: TConsoleMeta) {
    const duartionRegexp = /([0-9]+ms)/g;
    const categoryRegexp = /(\[[\w\-_.:]+\])/g;
    const httpMethodRegexp = /(GET|POST|PUT|PATH|HEAD|DELETE) /g;

    let msg = defaultFormatter(meta);

    if (!chalk.supportsColor) {
        return msg;
    }

    if (meta.level === 'ERROR') {
        return chalk.red(msg);
    }

    if (meta.level === 'WARN') {
        return chalk.yellow(msg);
    }

    if (meta.level === 'DEBUG') {
        return chalk.blue(msg);
    }

    // INFO级信息关键字设置颜色输出
    msg = msg.replace(duartionRegexp, chalk.green('$1'));
    msg = msg.replace(categoryRegexp, chalk.blue('$1'));
    msg = msg.replace(httpMethodRegexp, chalk.cyan('$1'));

    return msg;
}
