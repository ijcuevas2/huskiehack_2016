'use strict';
var textHelper = (function () {
    return {
        completeHelp: 'Here\'s some things you can say,'
        + ' I need help with my math homework. Adam'
        + ' tell me the list of favors.'
        + ' clear favor board.'
        + ' and exit.',
        nextHelp: 'You can ask a favor, list all favors, reset all favors or exit. Which would you like?',

        getUserName: function (recognizedUserName) {
            if (!recognizedUserName) {
                return undefined;
            }
            var split = recognizedUserName.indexOf(' ');
            var newName;

            if (split < 0) {
                newName = recognizedUserName;
            } else {
                newName = recognizedUserName.substring(split+1);
            }

            return newName;
        }
    };
})();
module.exports = textHelper;
