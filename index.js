var gutil = require('gulp-util');
var through = require('through2');

module.exports = function (options) {
    var REGX_HTML_ENCODE = /"/g;
    var encodeHtml = function(s){
      return s.replace(/[\r\n\t]/g, " ").replace(/\\/g, "\\\\").replace(/'/g, "\\\'");
    }; 
    return through.obj(function (file, enc, cb) {
        //console.log(options);
        options = options || {};
        var self = this;

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }

        var html = file.contents.toString();

        /**  replace html func
        */
       var sp = file.path.split('/');
       var name = sp[sp.length-1].split('.')[0];
        html = encodeHtml(html);

        file.contents = new Buffer("define(\""+name+"\",function(c,a,b){return \'"+html+"\'},\'"+options+"\');");
        self.push(file);
        cb();

    });
};
