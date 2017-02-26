//Alexa object courtesy of the new alexa sdk
var Alexa = require('alexa-sdk');

//main function
exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);
	alexa.execute();
};

//handles the intents
var handlers = {
	//instant called on launch
	'LaunchRequest': function () {
        this.emit('DecideRecipe');
    },
	
    'DecideRecipe': function () {
		var speechOutput = 'Tell me about yourself';
		var repromptSpeech = 'Excuse me?';

		this.emit(':ask', speechOutput, repromptSpeech);
		this.emit(':tell', 'Sorry. I really could not care less.');
    }
};
