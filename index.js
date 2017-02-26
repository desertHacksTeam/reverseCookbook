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
		this.emit(':tell', 'Tyman, Ive made a LOT of new commits in the git hub');
	}
	
    'DecideRecipe': function () {
		//this.emit(':ask', 'Tell me something about yourself', 'Come again, senior?');
        this.emit(':tell', 'You know, I dont really care');
    }
};
