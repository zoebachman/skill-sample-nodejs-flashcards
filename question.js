'use strict';
module.change_code = 1;
var _ = require('lodash');

function FlashcardsHelper (obj) {
  this.started = false;
  this.correctCards = [];

  this.flashcards =
    {
      cards: [
        {
          value: null,
          question: 'What is the method for finding the length of a string in ruby?',
          answer: 'length'
        },
        {
          value: null,
          question: 'What is the word that is used to print to the console in ruby?',
          answer: 'puts'
        }
      ]
    };
  for (var prop in obj) this[prop] = obj[prop];
}

FlashcardsHelper.prototype.completed = function() {
  return this.correctCards.length === (this.currentFlashcards().cards.length);
};

FlashcardsHelper.prototype.getCorrectCards = function() {
  return this.correctCards().length;
};

FlashcardsHelper.prototype.removeOnCorrectAnswer = function(correctIndex) {
  return this.flashcards.cards.splice(correctIndex, 1)
}

// Current flashcards include any incorrect answers or were not answered yet
FlashcardsHelper.prototype.currentFlashcards = function() {
  return this.flashcards;
};

module.exports = FlashcardsHelper;
