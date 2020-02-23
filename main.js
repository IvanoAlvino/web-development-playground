// Global variables
let randomNumber;
const message = document.querySelector(".message");
const startNewGameButton = document.querySelector(".newGameButton");
const input = document.querySelector("input");
const submitButton = document.querySelector(".guessButton");
const lastGuesses = document.querySelector(".lastGuesses");
let numberOfTries;

// Reset the game and starts it
let resetGame = function() {
	randomNumber = generateRandomNumber(1, 100);
	startNewGameButton.style.display = "none";
	lastGuesses.innerHTML = "Last entered numbers: ";
	lastGuesses.style.display = "none";
	submitButton.disabled = false;
	input.value = "";
	numberOfTries = 0;
	clearMessages();
}

// Create a random number between min and max
let generateRandomNumber = function(min, max) {
	return Math.floor(Math.random() * max + min);
}

// Remove all status messages
let clearMessages = function() {
	const child = message.firstElementChild;
	if (child) {
		message.removeChild(child);
	}
}

// Display the provided messageToShow with the provided color as background
let displayMessage = function(messageToShow, color) {
	clearMessages();
	const errorMessage = document.createElement("p");
	errorMessage.innerHTML = messageToShow;
	message.appendChild(errorMessage);
	errorMessage.style.backgroundColor = color;
}

let gameOver = function() {
	if (numberOfTries >= 10) {
		displayMessage("You lost. The number was " + randomNumber, "red");
	}
	startNewGameButton.style.display = "block";
	submitButton.disabled = true;
}

// Check the input number against randomNumber
let evaluateGuess = function() {
	const guessedNumber = parseInt(input.value);
	if (isNaN(guessedNumber)) {
		displayMessage("Please enter a number", "red");
		return;
	}

	if (numberOfTries === 0) {
		lastGuesses.style.display = "block";
	}

    if (guessedNumber === randomNumber) {
    	displayMessage("Correct! The number was " + guessedNumber, "lightgreen");
    	gameOver();
    	return;
    } else if (guessedNumber < randomNumber) {
    	displayMessage("The number was too low", "yellow");
    	numberOfTries++; 
    } else {
    	displayMessage("The number was too high", "yellow");
    	numberOfTries++;
    }

    lastGuesses.innerHTML += guessedNumber + " ";

    if (numberOfTries === 10) {
    	gameOver();
    }
}

// Main method
submitButton.onclick = evaluateGuess;
startNewGameButton.onclick = resetGame;
resetGame();