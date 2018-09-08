# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)
* [About](#about)
* [Functions](#functions)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

The starter repository with the HTML, CSS, and JS building blocks is from Udacity

Author: Shiloh Paul
Date: September 8, 2018

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

##About
The Memory Game project is a basic card matching game in which the user tries to
match two cards. There are 8 different types of cards, and 16 in total. When the
user selects two cards, if they are a match, the cards stay flipped over. If they
are not, they flip back over.

##Functions
shuffle automatically shuffles the cards array so that the cards are displayed
randomly for the user. It accepts an array argument.

getCardsInHTML displays the objects in the cards array as HTML

timerBegins starts the timer after the first card is clicked

countMoves adds a count each time two cards are clicked

checkMatch determines if there has been a match and if so how many matches have
been made so far. It calls the popThePopup and the timerEnds functions if user
has made 8 matches (won the game)

removeStars reduces the number of stars based on the number of moves that have
been made so far. A perfect game is 3 stars, 2 are for between 9 and 20 moves,
and 1 is for more than 20 moves. Calls the getTotalStars function  

popThePopup changes the initial display of the popup from none to block

timerEnds stops the timer

refreshPage reloads the page

getTotalStars displays the number of stars in the popup
