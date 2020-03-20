import { WF } from '@ursajs/core';
declare function loadPlugin(wf:WF):void 

/**通过koa中间件方式挂载logger到上下文中
 * wf.app.use((ctx,next)=>{
 *     ctx.logger = WFLogger ;           
 * })
 */
export default loadPlugin;