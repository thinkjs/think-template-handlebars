'use strict';

import handlebars from 'handlebars';
import layouts from 'think-handlebars-layouts';
let Base = think.adapter('template', 'base');
handlebars.registerHelper(layouts(handlebars));
var isInit=false;
var fs=require('fs');
var path=require('path');

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

    this.prerender(options, handlebars,templateFile);

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


    //返回分散的script的方案
    //content=content.replace(/<tpl\s?.*id="(\w*)">([\s\S]*?)<\/tpl>/ig,function(Regstr,$1,$2){
    //  var ret = '<script>\n' +
    //      $1 + ' = function(opt){\n' +
    //      'return Handlebars.template(' + handlebars.precompile($2) + ')(opt);\n' +
    //      '}\n' +
    //      '</script>';
    //  return ret;
    //});
    content=content.replace(/<script\s?.*id="(\w*)">([\s\S]*?)<\/script>/ig,function(Regstr,$1,$2){
      var ret =
          '<script type="text/x-handlebars" id="'+$1+'">\n' +
          $2.replace(/{{/g,'\\{{')+
          '</script>';
      return ret;
    });
    content=content.replace(/<tpl\s?.*id="(\w*)">([\s\S]*?)<\/tpl>/ig,function(Regstr,$1,$2){
      var ret =
          '<script type="text/x-handlebars" id="'+$1+'">\n' +
          $2.replace(/{{/g,'\\{{')+
          '</script>';
      return ret;
    });
    content=content.replace(/<include\s?.*url="(.*?)"(.*?)\/>/ig,function(Regstr,name){
      return fs.readFileSync(
          path.resolve(path.dirname(templateFile),name),
          'utf-8'
      );
    });
    return handlebars.compile(content, options)(tVar);
  }
}