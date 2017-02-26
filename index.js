//Alexa object courtesy of the new alexa sdk
var Alexa = require('alexa-sdk');

//main function
exports.handler = function(event, context, callback){

    var alexa = Alexa.handler(event, context);

};

//handles the intents
var handlers = {
    'DecideRecipe': function () {
		
		this.emit(':ask', 'Tell me something about yourself', 'Come again, senior?');
        this.emit(':tell', 'You know, I dont really care');
    }
};
