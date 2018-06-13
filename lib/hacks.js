const logger = require('./logger');

(function(){
    var oldLog = console.log;
    console.log = function (string) {
        // DO MESSAGE HERE.
        logger.log(string)
        oldLog.apply(console, arguments);
    };
})();
