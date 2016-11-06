var express = require('express');
var app = express();
var path = require('path');
var ddb = require('dynamodb').ddb({
    accessKeyId: 'AKIAIJFZSD5YAOVIKGZA',
    secretAccessKey: '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'
});

app.use('/public', express.static(path.join(__dirname, '/public')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get('/favors', function (req, res) {
    ddb.getItem('AltruistClubUserData', 'amzn1.ask.account.AHWEWW63UHV7A7MO6PQNXSFTRYFDKST5LEHAJCFTSQOZTSDMI22X3U4ELHZ6LIPKRAFI6II6VHTQB5WS5OEWMIVABVT3Z5CM65ZJN42ARSNNNBFCEHXJ7MUY3QYMNQ7CT6KOGTW2VW3B5D7K5ZIQ4W4PXWCEPPHDYJBBFUFD3WZLTTGRG2WY7O3JOYUX26X5HKNTTQL77OJ4PUY', null, {}, function(err, data, cap) {
        if (err) {
            console.log(err, err.stack);
            res.end();
        }

        res.send(data.Data);
    });
});

// run server
// var server = app.listen(process.env.PORT || 80, function () {
var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server listening at http://%s:%s', host, port);
});