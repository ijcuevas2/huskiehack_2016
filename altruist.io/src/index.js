'use strict';
var AltruistClub = require('./AltruistClub');

exports.handler = function (event, context) {
    var altruistClub = new AltruistClub();
    altruistClub.execute(event, context);
};
