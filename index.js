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
        this.emit('DecideIngredients');
    },
	
	//called when user does not include ingredinets themselves
    'DecideIngredients': function () {
		this.emit(':ask', 'What ingredients do you have?', 'Im sorry. What was that?');
    },
	
	//called when user lists ingredients in question
	'DecideRecipe': function () {
		this.emit(':tell', 'Im Alexa. Im dumber than a bag of nails. Im too stupid to do very simple tasks, but im going to try. The ingredient you literally just told me is ' + this.event.request.intent.slots.Ingredients.value + '. i hope that my dumb computer brain has the mental capacity to repreat what you say 3 seconds after you say it.');
    },
	
	//standard intents
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
	
	'SessionEndedRequest': function () {
	   this.emit(':tell', this.t("STOP_MESSAGE"));
	}
};

var languageStrings = {
	"en-US": {
		"translation": {
			"SKILL_NAME": "Koobkooc",
			"WELCOME_MESSAGE": "Welcome to %s. List your ingredients.",
			"WELCOME_REPROMT": "List your ingredients, or say help.",
			"DISPLAY_CARD_TITLE": "%s  - Recipe using %s.",
			"HELP_MESSAGE": "List your ingredients, and I can help you find recipes using those ingredients, or say exit. List your ingredients.",
			"HELP_REPROMT": "I can find recipes using the ingredients you tell me. List your ingredients",
			"STOP_MESSAGE": "Goodbye!"
		}
	}
};
