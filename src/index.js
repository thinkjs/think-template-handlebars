'use strict';

import handlebars from 'handlebars';
import layouts from 'think-handlebars-layouts';
let Base = think.adapter('template', 'base');
handlebars.registerHelper(layouts(handlebars));
var isInit=false;
/**
 * handlebars template adapter
 */
export default class extends Base {
  /**
   * run
   * @param  {String} templateFile []
   * @param  {Object} tVar         []
   * @param  {Object} config       []
   * @return {Promise}              []
   */
  async run(templateFile, tVar, config){
    let options = this.parseConfig(config);

    this.prerender(options, handlebars);

    let content = await this.getContent(templateFile);

    if(options.compiled || content.slice(0, 13) === '{"compiler":['){
      let data = (new Function('', `return ${content}`))();
      return handlebars.template(data)(tVar);
    }
    //初始化，将thinkjs的view的根目录添加到handlebars
    if(!isInit){
      handlebars.rootPath=config.root_path;
      isInit=true;
    }
    return handlebars.compile(content, options)(tVar);
  }
}