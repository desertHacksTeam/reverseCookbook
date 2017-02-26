//Alexa object courtesy of the new alexa sdk
var Alexa = require('alexa-sdk');

//main function
exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);
	alexa.execute();
};

//states
var state = {
    ASKMODE: '_ASKMODE',
    ANSWERMODE: '_ANSWERMODE'
};

//handles the intents
var handlers = {
	//instant called on launch
	'LaunchRequest': function () {
        this.emit('AMAZON.YesIntent');
    },
	
	//prompt the user for input
    'DecideRecipe': function () {
		this.emit(':tell', 'it will only open when i say open');
    },
};
