FLASHCARDS PSEUDOCODE


- User: Alexa, Open Codecademy Flashcards
- Alexa: Hello Zoe, Welcome to Flashcards. What do you want to do today? [LaunchRequest]
- User: Test my Ruby Knowledge
- Alexa: You have completed eleven of twenty Ruby flashcards. Would you like to continue? [ProgressIntent]
- User: Yes
- Alexa: How do you find the length of a string in Ruby? [FlashcardsIntent]
- User: length
- Alexa: nice job! You have completed twelve of twenty flashcards. [AnswerIntent]



inside of handlers: >> this is interesting, guessing game has multiple handlers to define different states

1. LaunchRequest
  a. asks the user [by name - built-in slot] what they want to practice. (bit vague?)
  b. user responds

2. ProgressIntent
  a. if user has explicitly stated a language (slot), Alexa tells them their current progress ("You have completed X of TOTAL LANGUAGE flashcards. Would you like to continue?" (pulled from DynamoDB table, "flashcards") [call FlashcardsIntent]
  b. elif the user has not stated the language, prompt them to give the language (slot), and once they have, tell them their current progress
    ex: user says, "practice flashcards" and alexa says, "which language do you want to practice?", then tell them their current progress (pulled from DynamoDB table, "flashcards") in that language and ask if they want to continue [call FlashcardsIntent>startmode?]
  c. if they decide not to continue, just stop or cancel will end and that's a built-in intent.


3. FlashcardsIntent
  a. Asks the user to answer different questions (where do we define this object?) in the specified language [state = GUESSMODE]
  b. If user gets it correct (so, need someway of checking it against value), Alexa says, "Nice job! You have completed X of TOTAL flashcards" and one point is added to DynamoDB database
  c. Elif user gets it wrong, Alexa says, "No. Sorry that's incorrect. The correct answer is BLAH"
  d. [UX: After each turn, asks if you want another one [would that get annoying?] Or does user have to say, next? >> not important for video]
