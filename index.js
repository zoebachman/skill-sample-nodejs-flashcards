"use strict";

var Alexa = require("alexa-sdk");
var questions = require("./question");

var DECK_LENGTH = 20; //number of flashcards in a deck

var states = { //this could be a later one...
  GUESSMODE: '_GUESSMODE', //User is trying to guess answer
  STARTMODE: '_STARTMODE' //Prompt the user to start or restart the game
}

var dialogue = {
  "QUESTIONS": questions.FlashcardsHelper.flashcards.cards.[].question //what is this structure?,
  "HELP_MESSAGE": "I will ask you a question. Respond with the correct answer.",
  "REPEAT_QUESTION_MESSAGE": "To repeat the last question, say, repeat.",
  "ASK_MESSAGE_START": "What do you want to do today?.",
  "NEW_GAME_MESSAGE": "Welcome to Flashcards.",
  'ANSWER_CORRECT_MESSAGE': 'correct. ',
  'ANSWER_WRONG_MESSAGE': 'wrong. ',
  'CORRECT_ANSWER_MESSAGE': 'The correct answer is %s: %s. ',
  'ANSWER_IS_MESSAGE': 'That answer is ',
  'TELL_QUESTION_MESSAGE': 'Question %s. %s ',
  "PROGRESS_MESSAGE": "You have answered %s out of %s questions correct.",
  "CONTINUE_MESSAGE": "Would you like to continue?"
};

// The handlers object tells Alexa how to handle various actions
var newSessionHandlers = {
	"NewSession": function() {
    "LaunchRequest": function() {
      this.handler.state = states.GUESSMODE;
      this.emitWithState('StartGame', true);
    }

function populateGameQuestions(questions) {
  var gameQuestions = [];
  var indexList = [];
  var index = questions.length;

  if (DECK_LENGTH > index){
    throw new Error('Invalid Deck Length.') //not sure if this is needed. do users in the trivia game dictate how many they want to do?
  }

  for (var i = 0; i < questions.length; i++) {
    indexList.push(i);
  }
  // Pick DECK_LENGTH random questions from the list to ask the user, make sure there are no repeats.
  for (var j = 0; j < DECK_LENGTH; j++){
    var rand = Math.floor(Math.random() * index);
    index -= 1;

    var temp = indexList[index];
    indexList[index] = indexList[rand];
    indexList[rand] = temp; //like, the temporary index related to the question being asked?
    gameQuestions.push(indexList[index]);
  }

  return gameQuestions;
}
	// 	if(Object.keys(this.attributes).length === 0) { //not sure what this is
	// 		this.attributes["RubyFlashcardsCorrect"] = 0; //do we do this for each language? //this is DynamoDB related
	// 	}
	// 	this.handler.state = states.STARTMODE;
	// 	this.emit(":ask", "Hello Zoe, Welcome to Flashcards." );
	// },

	// "AMAZON.StopIntent": function() {
	// 	this.emit(':tell', "Goodbye!");
	// },
	// "AMAZON.CancelIntent": function() {
	// 	this.emit(':tell', "Goodbye!");
	// },
	// 'SessionEndedRequest': function () {
	// 		console.log('session ended!');
	// 		//this.attributes['endedSessionCount'] += 1;
	// 		this.emit(":tell", "Goodbye!");
	// }
};

var startGameHandlers = Alexa.CreateStateHandler(states.STARTMODE, { //most of this is built-in intents
	"NewSession":function () {
		this.emit('NewSession'); //Uses the handler in newSessionHadlers above
	},

  "ProgressIntent": function() {
    	var message = "You have completed eleven of twenty Ruby flashcards.", "Would you like to continue?";
  		this.emit(':ask, message');
  },
	// "AMAZON.HelpIntent": function() { //this would have to be added. durrr.
	// 	var message = "Would you like to practice some flashcards?";
	// 	this.emit(':ask, message');
	// },
	// 'AMAZON.NoIntent': function() {
	// 	console.log("NOINTENT");
	// 	this.emit(':tell', 'Ok, see you next time!');
	// },
	// "AMAZON.StopIntent": function() {
	// 	console.log("STOPINTENT");
	// 	this.emit(':tell', "Goodbye!");
	// },
	// "AMAZON.CancelIntent": function() {
	// 	console.log("CANCELINTENT");
	// 	this.emit(':tell', "Goodbye!");
	// },
	// 'SessionEndedRequest': function () {
	// 		console.log("SESSIONENDEDREQUEST");
	// 		//this.attributes['endedSessionCount'] += 1;
	// 		this.emit(':tell', "Goodbye!");
	// },
	// 'Unhandled': function() {
	// 		console.log("UNHANDLED");
	// 		var message = 'Say yes to continue, or no to end the session.';
	// 		this.emit(':ask', message, message);
	// }
});

var guessModeHandlers = Alexa.CreateStateHandler(states.GUESSMODE, {
	"NewSession": function () {
		this.handler.state = "";
		this.emitWithState("NewSession"); //Equivalent to Start Mode NewSession handler
	},

	"GuessIntent": function() {
    this.emit() //How do you find the length of a string in Ruby?
    var guess = parseStr()//this.event.request.intent.slots.answer.value); //how to modify for flashcards?
		var answer = this.attributes["answer"]; //how to modify for flashcards?
		console.log("NAME guessed:" + guess);

		if(guess !== answer){
			this.emit('Incorrect', guess);
		} else if (guess === answer){
			// With a callback, use the arrow function to preserve the correct 'this' context
			this.emit('Correct', () => {
				this.emit('ask', guess.toString() + 'is correct! Would you like to do another flashcard?', 'Say yes to continue or no to stop.'); //how do we preserve progress. like number of sessions?
			})
		} else {
			this.emit('NotValid');
		}
	},
//where do we put the question?
	// 'AMAZON.HelpIntent': function() {
  //       this.emit(':ask', 'I am thinking of a number between zero and one hundred, try to guess and I will tell you' +
  //           ' if it is higher or lower.', 'Try saying a number.');
  //   },
    "AMAZON.StopIntent": function() {
        console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function() {
        console.log("CANCELINTENT");
    },
    'SessionEndedRequest': function () {
        console.log("SESSIONENDEDREQUEST");
        this.attributes['endedSessionCount'] += 1;
        this.emit(':tell', "Goodbye!");
    },
    'Unhandled': function() {
        console.log("UNHANDLED");
        this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    }
});



// These handlers are not bound to a state
var guessAttemptHandlers = {
    'Incorrect': function(val) {
        this.emit(':ask', val.toString() + ' is incorrect.');
    },
    'Correct': function(callback) { //so, this would send it back to the beginning? is that what we want? I mean, it's sort of a one chance guessing game...
        this.handler.state = states.STARTMODE;
        this.attributes['gamesPlayed']++;
        callback();
    },
    'NotValid': function() {
        this.emit(':ask', 'Sorry, I didn\'t get that.');
    }
};





  "ProgressIntent": function () {
    var intentObj = this.event.request.intent;
    if (intentObj.slots.Source.confirmationStatus !== 'CONFIRMED') {
        if (intentObj.slots.Source.confirmationStatus !== 'DENIED') {
            // Slot value is not confirmed
            var slotToConfirm = 'language'; //what does source stand for here? just switching it to Language
            var speechOutput = 'You have completed' + intentObj.slots.Source.value + '. Would you like to continue?'; //is it confirming slot or asking to go on? but would need opportunity to switch
            var repromptSpeech = speechOutput;
            this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech); //yes?
        } else {
            // Users denies the confirmation of slot value. Says "no", in our case
            var slotToElicit = 'language';
            var speechOutput = 'Okay, Which language would you like to practice?'; //how does this map specifically to that dialogue?
            this.emit(':elicitSlot', slotToElicit, speechOutput, speechOutput);
        }
    } else {
        FlashcardsIntent();
    }
}

  //what is the logic that says "Yes" takes me to this next intent? where is it waiting to receive a yes?

  "FlashcardsIntent": function () {
    //Create speech output. This is what Alexa will speak back when the user says "Ask code academy to say hello"
    this.emit(":tell", "How do you find the length of a string in Ruby?");
  },

};

'SessionEndedRequest': function () {
    console.log('session ended!');
    this.attributes['endedSessionCount'] += 1;
    this.emit(':saveState', true); // Be sure to call :saveState to persist your session attributes in DynamoDB
},

// This is the function that AWS Lambda calls every time Alexa uses your skill.
exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context, callback);
  //alexa.appId = appId; //not sure what this is, or if I need it
  alexa.dynamoDBTableName = 'flashcards'; //That's it!
  //alexa.registerHandlers(State1Handlers, State2Handlers); //am I doing multiple states?
  alexa.registerHandlers(handlers);
  alexa.execute();
};
