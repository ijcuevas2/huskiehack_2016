'use strict';
var AWS = require("aws-sdk");

var storage = (function () {
    var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    /*
        State class saves the state of each dialog session
     */
    function State(session, data) {
        if (data) {
            this.data = data;
        } else {
            this.data = {
                favors: {}
            };
        }
        this._session = session;
    }

    State.prototype = {
        save: function (callback) {
            this._session.attributes.currentState = this.data;
            dynamodb.putItem({
                TableName: 'AltruistClubUserData',
                Item: {
                    CustomerId: {
                        S: this._session.user.userId
                    },
                    Data: {
                        S: JSON.stringify(this.data)
                    }
                }
            }, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                }
                if (callback) {
                    callback();
                }
            });
        }
    };

    return {
        loadState: function (session, callback) {
            if (session.attributes.currentState) {
                console.log('get state from session=' + session.attributes.currentState);
                callback(new State(session, session.attributes.currentState));
                return;
            }
            dynamodb.getItem({
                TableName: 'AltruistClubUserData',
                Key: {
                    CustomerId: {
                        S: session.user.userId
                    }
                }
            }, function (err, data) {
                var currentState;
                if (err) {
                    console.log(err, err.stack);
                    currentState = new State(session);
                    session.attributes.currentState = currentState.data;
                    callback(currentState);
                } else if (data.Item === undefined) {
                    currentState = new State(session);
                    session.attributes.currentState = currentState.data;
                    callback(currentState);
                } else {
                    console.log('get state from dynamodb=' + data.Item.Data.S);
                    currentState = new State(session, JSON.parse(data.Item.Data.S));
                    session.attributes.currentState = currentState.data;
                    callback(currentState);
                }
            });
        },

        newState: function (session) {
            return new State(session);
        }
    };
})();
module.exports = storage;
