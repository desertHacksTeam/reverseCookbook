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
	
	//prompt the user for input
    'DecideRecipe': function () {
		this.emit(':tell', 'Lets gather round the camp fire and sing our camp fire song. our C a m p f i r e s o n g song. and if you dont think that we can sing it faster than youre wrong. but itll help if you just sing along. bomb bomb...bomb');
    },
};
