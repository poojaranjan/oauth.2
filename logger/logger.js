
var winston = require('winston');

module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'info-file',
      filename: 'C:\\\applog\\app.log',
      level: 'info'
    })
  ]
});
