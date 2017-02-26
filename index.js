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
	
    'DecideIngredients': function () {
		this.emit(':ask', 'Tell me about yourself.', 'Im sorry. What was that?');
    },
	
	'Respond': function () {
		this.emit(':tell', 'Sorry. I really could not care less.');
	},
	
	'DecideRecipe': function () {
		this.emit(':tell', 'You can make lots of things with that.');
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
