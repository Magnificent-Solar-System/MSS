var standard_input = process.stdin;
global.concommands = {
    "exit" : function() { process.exit(); },
}

module.exports = function(){
    standard_input.setEncoding('utf-8');
    standard_input.on('data', function (data) {
      data = data.substr(0, data.length - 2);
      let arg = data.split(' ');
      if(global.concommands.hasOwnProperty(arg[0])) global.concommands[arg[0]](arg.slice(1, arg.length));
    });
   };