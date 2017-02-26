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
		var recipes = recipeList.recipes;
		
		var suggestedRecipe = null;
		var points = 0;
		var scores = [];
		for (var i = 0; i < recipes.length; ++i) {
			for (var j = 0; j < recipes[i].ingredients.length; ++j) {
				var realIngred = recipes[i].ingredients[j];
				
				for (var k = 0; k < ingredientList.length; ++k) {
					if (ingredientList[k] == realIngred)
						++points;
				}
			}
			
			scores[i] = points;
			points = 0;
		}
		
		var bestRecipe = 0;
		var maxscore = 0;
		for (var i = 0; i < scores; ++i) {
			if (scores[i] > maxscore) {
				maxscore = scores[i];
				bestRecipe = i;
			}
		}
		
		suggestedRecipe = recipes[bestRecipe].name;

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
