'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _thinkHandlebarsLayouts = require('think-handlebars-layouts');

var _thinkHandlebarsLayouts2 = _interopRequireDefault(_thinkHandlebarsLayouts);

var Base = think.adapter('template', 'base');
_handlebars2['default'].registerHelper(_thinkHandlebarsLayouts2['default'](_handlebars2['default']));
var isInit = false;
/**
 * handlebars template adapter
 */

var _default = (function (_Base) {
  _inherits(_default, _Base);

  function _default() {
    _classCallCheck(this, _default);

    _Base.apply(this, arguments);
  }

  /**
   * run
   * @param  {String} templateFile []
   * @param  {Object} tVar         []
   * @param  {Object} config       []
   * @return {Promise}              []
   */

  _default.prototype.run = function run(templateFile, tVar, config) {
    var options, content, data;
    return _regeneratorRuntime.async(function run$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          options = this.parseConfig(config);

          this.prerender(options, _handlebars2['default']);

          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(this.getContent(templateFile));

        case 4:
          content = context$2$0.sent;

          if (!(options.compiled || content.slice(0, 13) === '{"compiler":[')) {
            context$2$0.next = 8;
            break;
          }

          data = new Function('', 'return ' + content)();
          return context$2$0.abrupt('return', _handlebars2['default'].template(data)(tVar));

        case 8:
          //初始化，将thinkjs的view的根目录添加到handlebars
          if (!isInit) {
            _handlebars2['default'].rootPath = config.root_path;
            isInit = true;
          }
          return context$2$0.abrupt('return', _handlebars2['default'].compile(content, options)(tVar));

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  };

  return _default;
})(Base);

exports['default'] = _default;
module.exports = exports['default'];