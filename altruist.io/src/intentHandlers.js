'use strict';
var textHelper = require('./textHelper'),
    storage = require('./storage');

var registerIntentHandlers = function (intentHandlers, skillContext) {
    intentHandlers.AskFavorIntent = function (intent, session, response) {
        var newUserName = textHelper.getUserName(intent.slots.User.value);
        var newFavor = textHelper.getFavor(intent.slots.Favor.value);
        if (!newUserName) {
            response.ask('I\'m sorry could you repeat that again?', 'I did not get that correctly, could you repeat that?');
            return;
        }
        storage.loadState(session, function (currentState) {
            var speechOutput = newUserName + ' favor has been posted. ';
            currentState.data.favors[newUserName] = newFavor;
            currentState.save(function () {
                response.tell(speechOutput);
            });
        });
    };

    intentHandlers.ListFavorsIntent = function (intent, session, response) {
        storage.loadState(session, function (currentState) {
            var speechOutput = '';
            var favorBoard = '';

            if (Object.keys(currentState.data.favors).length === 0) {
                response.tell('There are nobody asking for a favor at this moment.');
                return;
            }

            // TODO here
            var idx = 0;
            var favs = currentState.data.favors;
            for (var name in favs) {
                if (favs.hasOwnProperty(name)) {
                    var favor = favs[name];

                    if (idx === 0) {
                        speechOutput += name + ' needs help with ' + favor;
                    } else if (idx === Object.keys(currentState.data.favors).length - 1) {
                        speechOutput += 'And ' + name + ' needs help with ' + favor;
                    } else {
                        speechOutput += name + ' needs help with' + favor;
                    }
                    speechOutput += '. ';
                    favorBoard += name + ' : ' + favor + '\n';

                    idx++;
                }
            }
            response.tellWithCard(speechOutput, "List of Favors", favorBoard);
        });
    };

    intentHandlers.ClearFavorsIntent = function (intent, session, response) {
        storage.newState(session).save(function () {
            response.ask('Favor board has been cleared, who do you want to ask a favor?', 'Do you want to ask a favor?');
        });
    };

    intentHandlers['AMAZON.HelpIntent'] = function (intent, session, response) {
        var speechOutput = textHelper.completeHelp;
        if (skillContext.needMoreHelp) {
            response.ask(speechOutput + ' So, how can I help?', 'How can I help?');
        } else {
            response.tell(speechOutput);
        }
    };

    intentHandlers['AMAZON.CancelIntent'] = function (intent, session, response) {
        if (skillContext.needMoreHelp) {
            response.tell('Okay.  Whenever you\'re ready, you can ask a favor by saying a sentence followed by your name.');
        } else {
            response.tell('');
        }
    };

    intentHandlers['AMAZON.StopIntent'] = function (intent, session, response) {
        if (skillContext.needMoreHelp) {
            response.tell('Okay.  Whenever you\'re ready, you can ask a favor by saying a sentence followed by your name.');
        } else {
            response.tell('');
        }
    };
};
exports.register = registerIntentHandlers;
