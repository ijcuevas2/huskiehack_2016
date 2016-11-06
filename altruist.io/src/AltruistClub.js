'use strict';
var AlexaSkill = require('./AlexaSkill'),
    eventHandlers = require('./eventHandlers'),
    intentHandlers = require('./intentHandlers');

var APP_ID = "amzn1.ask.skill.56054711-5303-417f-8907-81e70fc2e6d2";
var skillContext = {};

var AltruistClub = function () {
    AlexaSkill.call(this, APP_ID);
    skillContext.needMoreHelp = true;
};


// Extend AlexaSkill
AltruistClub.prototype = Object.create(AlexaSkill.prototype);
AltruistClub.prototype.constructor = AltruistClub;

eventHandlers.register(AltruistClub.prototype.eventHandlers, skillContext);
intentHandlers.register(AltruistClub.prototype.intentHandlers, skillContext);

module.exports = AltruistClub;

