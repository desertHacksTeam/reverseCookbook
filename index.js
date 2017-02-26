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
		his.emit(':tell', 'Tyman, Ive made a LOT of new commits in the git hub');
		
		this.emit(':responseReady'); // Called after the response is built but before it is returned to the Alexa service. Calls :saveState.
		this.emit(':saveState', false); // Handles saving the contents of this.attributes and the current handler state to DynamoDB and then sends the previously built response to the Alexa service. Override if you wish to use a different persistence provider. The second attribute is optional and can be set to ‘true’ to force saving.
		this.emit(':saveStateError'); // Called if there is an error while saving state. Override to handle any errors yourself.
	}
	
    'DecideRecipe': function () {
		//this.emit(':ask', 'Tell me something about yourself', 'Come again, senior?');
        this.emit(':tell', 'You know, I dont really care');
		
		this.emit(':responseReady'); // Called after the response is built but before it is returned to the Alexa service. Calls :saveState.
		this.emit(':saveState', false); // Handles saving the contents of this.attributes and the current handler state to DynamoDB and then sends the previously built response to the Alexa service. Override if you wish to use a different persistence provider. The second attribute is optional and can be set to ‘true’ to force saving.
		this.emit(':saveStateError'); // Called if there is an error while saving state. Override to handle any errors yourself.
    }
};
