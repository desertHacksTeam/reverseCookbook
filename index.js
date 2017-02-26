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
        this.emit(':tell', 'Guys, I have made a LOT of new commits in the git hub. This works, I am so happy right now!');
    }
};
