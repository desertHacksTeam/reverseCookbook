//Alexa object courtesy of the new alexa sdk
var Alexa = require('alexa-sdk');

//main function
exports.handler = function(event, context, callback){

    var alexa = Alexa.handler(event, context);

};

//handles the intents
var handlers = {
    'DecideRecipe': function () {
		//this.emit(':ask', 'Tell me something about yourself', 'Come again, senior?');
        this.emit(':tell', 'You know, I dont really care');
		
		//some random crap
		var cardTitle = 'Hello World Card';

		var cardContent = 'This text will be displayed in the companion app card.';
		
		var imageObj = {
			smallImageUrl: 'https://imgs.xkcd.com/comics/standards.png',
			largeImageUrl: 'https://imgs.xkcd.com/comics/standards.png'
		}
    }
};
