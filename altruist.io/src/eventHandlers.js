'use strict';
var storage = require('./storage'),
    textHelper = require('./textHelper');

var registerEventHandlers = function (eventHandlers, skillContext) {
    eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
        skillContext.needMoreHelp = false;
    };

    eventHandlers.onLaunch = function (launchRequest, session, response) {
        storage.loadState(session, function (currentState) {
            var speechOutput = '',
                reprompt;
            if (currentState.data.users.length === 0) {
                speechOutput += 'Altruist Club, currently the Favor Board is empty. Please ask a favor by saying what you need followed by your name at the end';
                reprompt = "Do you need to ask any favor?";
            }
            else {
                speechOutput += 'Altruist Club, '
                    + 'currently there are ' + currentState.data.favors.length;
                if (currentState.data.users.length > 1) {
                    speechOutput += ' people';
                }
                else {
                    speechOutput += ' person';
                }
                speechOutput += ' who you could help. You can ask a favor, list all favors, reset all favors or exit. Which would you like?';
                reprompt = textHelper.completeHelp;
            }
            response.ask(speechOutput, reprompt);
        });
    };
};
exports.register = registerEventHandlers;
