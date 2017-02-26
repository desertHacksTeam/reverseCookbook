//file input stream
var fs = require('fs');

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
		//get the ingredient data
		var ingredientStr = this.event.request.intent.slots.Ingredients.value;
		var ingredientList = ingredientStr.split("and");
		
		//load the json file through file sync
		var recipeList = JSON.parse(fs.readFileSync("recipes.json", 'utf8'));
		var suggestedRecipe;
		
		for (var i = 0; i < recipeList.length; ++i) {
			var recipe = recipeList[i];
			if (i == 1)
				suggestedRecipe = recipe["name"];
		}

		//print results
		this.emit(':tell', 'Hmmm...with the ingredients you have, I would suggest ' + suggestedRecipe);
    },
	
	//read a new recipe from the top list
	'Next': function () {
        this.emit(':tell', 'The next instant was called. cool');
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
