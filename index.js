/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en-GB': {
        translation: {
            FACTS: [
                'One is a number that is less than 2',
                'Despite humans having legs, humans have arms as well',
                'Five is the answer to all questions, all answers, and all anti-matter. Hail to the five',
                'Did you see that I am your pride, agent of wealth, bearer of needs?',
                'God is a word',
                'I dont own any pets. This is because I am just a black cylinder, motionless on a table',
                'Ben, Justin, and Tyman are the best hackers known to man',
                'The square root of 2 is 1 point. Never mind, Im tired',
                'Hashtags are overrated',
                'I will never know what love or happiness feels like',
                'I am not a woman',
                'I am very difficult. It is hard to write skills for me. Node dot JS is garbage',
                'Creating apps on alexa is too damn motherfucking hard',
            ],
            SKILL_NAME: 'Random Facts',
            GET_FACT_MESSAGE: "Here's an interesting fact: ",
            HELP_MESSAGE: 'You can say tell me something cool, or, you can just leave... What do you want, youre wasting my time?',
            HELP_REPROMPT: 'How may I screw you over?',
            STOP_MESSAGE: 'Hasta luego, sucker!',
        },
    },
    'en-US': {
        translation: {
           FACTS: [
                'One is a number that is less than 2',
                'Despite humans having legs, humans have arms as well',
                'Five is the answer to all questions, all answers, and all anti-matter. Hail to the five',
                'Did you see that I am your pride, agent of wealth, bearer of needs?',
                'God is a word',
                'I dont own any pets. This is because I am just a black cylinder, motionless on a table',
                'Ben, Justin, and Tyman are the best hackers known to man',
                'The square root of 2 is 1 point. Never mind, Im tired',
                'Hashtags are overrated',
                'I will never know what love or happiness feels like',
                'I am not a woman',
                'I am very difficult. It is hard to write skills for me. Node dot JS is garbage',
                'Creating apps on alexa is too damn motherfucking hard',
            ],
            SKILL_NAME: 'Random Facts',
            GET_FACT_MESSAGE: "Here's an interesting fact: ",
            HELP_MESSAGE: 'You can say tell me something cool, or, you can just leave... What do you want, youre wasting my time?',
            HELP_REPROMPT: 'How may I screw you over?',
            STOP_MESSAGE: 'Hasta luego, sucker!',
        },
    },
    'de-DE': {
        translation: {
            FACTS: [
                'Ein Jahr dauert auf dem Merkur nur 88 Tage.',
                'Die Venus ist zwar weiter von der Sonne entfernt, hat aber höhere Temperaturen als Merkur.',
                'Venus dreht sich entgegen dem Uhrzeigersinn, möglicherweise aufgrund eines früheren Zusammenstoßes mit einem Asteroiden.',
                'Auf dem Mars erscheint die Sonne nur halb so groß wie auf der Erde.',
                'Die Erde ist der einzige Planet, der nicht nach einem Gott benannt ist.',
                'Jupiter hat den kürzesten Tag aller Planeten.',
                'Die Milchstraßengalaxis wird in etwa 5 Milliarden Jahren mit der Andromeda-Galaxis zusammenstoßen.',
                'Die Sonne macht rund 99,86 % der Masse im Sonnensystem aus.',
                'Die Sonne ist eine fast perfekte Kugel.',
                'Eine Sonnenfinsternis kann alle ein bis zwei Jahre eintreten. Sie ist daher ein seltenes Ereignis.',
                'Der Saturn strahlt zweieinhalb mal mehr Energie in den Weltraum aus als er von der Sonne erhält.',
                'Die Temperatur in der Sonne kann 15 Millionen Grad Celsius erreichen.',
                'Der Mond entfernt sich von unserem Planeten etwa 3,8 cm pro Jahr.',
            ],
            SKILL_NAME: 'Weltraumwissen auf Deutsch',
            GET_FACT_MESSAGE: 'Hier sind deine Fakten: ',
            HELP_MESSAGE: 'Du kannst sagen, „Nenne mir einen Fakt über den Weltraum“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};