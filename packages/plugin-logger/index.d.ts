import { Uma } from '@umajs/core';
declare function loadPlugin(uma:Uma):void 

/**通过koa中间件方式挂载logger到上下文中
 * uma.app.use((ctx,next)=>{
 *     ctx.logger = UmaLogger ;           
 * })
 */
export default loadPlugin;