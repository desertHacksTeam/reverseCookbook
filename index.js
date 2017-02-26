var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){

    var alexa = Alexa.handler(event, context);

};

var handlers = {

    'DecideRecipe': function () {
		
		this.emit(':ask', 'Tell me something about yourself', 'Come again, senior?');
        this.emit(':tell', 'You know, I dont really care');

    }

};
