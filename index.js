<<<<<<< HEAD
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
=======
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

		var speechOutput = 'Tell me about yourself';
		var repromptSpeech = 'Excuse me?';

		this.emit(':ask', speechOutput, repromptSpeech);
		this.emit(':tell', 'Sorry. I really could not care less.');
    },
	'AMAZON.HelpIntent': function () {
	    this.attributes['speechOutput'] = this.t("HELP_MESSAGE");
	    this.attributes['repromptSpeech'] = this.t("HELP_REPROMT");
	    this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
	},
	'AMAZON.RepeatIntent': function () {
	    this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
	},
	'AMAZON.StopIntent': function () {
	    this.emit('SessionEndedRequest');
	},
	'AMAZON.CancelIntent': function () {
	    this.emit('SessionEndedRequest');
	},
	'SessionEndedRequest':function () {
	    this.emit(':tell', this.t("STOP_MESSAGE"));
	}
};
>>>>>>> 702fc47e9b2ed415862a6ce126c000fdeaf84dd4
