//file input stream
var fs = require('fs');
//import xml http request
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
		//read the api key/id file
		var keyInfoList = fs.readFileSync("key.txt", 'utf8').split("/");
		var id = keyInfoList[0];
		var key = keyInfoList[1];
		var maxReturn = 3;

		//perform the xhtttp requests
		var xmlhttp = new XMLHttpRequest();
		var url = "https://api.edamam.com/search?q=" + ingredientList + "&app_id=" + id + "&app_key=" + key + "&from=0&to=" + maxReturn;
		
		/*
		//request the list of recipes from the API
		//var recipeData = null;
		xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
				recipeData = JSON.parse(this.responseText);
		    }
		};

		xmlhttp.open("GET", url, true);
		xmlhttp.send();*/

		//print results
		this.emit(':tell', 'ALEXA IS A BITCH');
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
