/*
 * Create a list that holds all of your cards
 */
const cards = [
  'fa-diamond', 'fa-diamond',
  'fa-paper-plane', 'fa-paper-plane',
  'fa-anchor', 'fa-anchor',
  'fa-bolt', 'fa-bolt',
  'fa-cube', 'fa-cube',
  'fa-leaf', 'fa-leaf',
  'fa-bicycle', 'fa-bicycle',
  'fa-bomb', 'fa-bomb'
];

//hides popup initially
document.querySelector('.congratsPopup').style.display = "none";

//initializes variables
let timerStarted=false;
let secondsPassed = 0;
let flippedCards = [];
let numberMatches = 0;
let movesCounter = 0;
let timer;

//randomly shuffles through cards
shuffle(cards);
//gets cards to display in HTML on page
function getCardsInHTML(){
  let deck = document.querySelector(".deck");
  const cardsHTML = cards.map(function(card) {
    /*learned about data- and dataset from webinar. I could not find an alternative
    to compare their values as simply calling the index did not work*/
    return `<li class="card" data-outercard="${card}"><i class="fa ${card}"></i></li>`;
  });
  /*learned to use join function from udacity webinar on memory game- without it
  cards display with an apostrophe between them*/
  deck.innerHTML = cardsHTML.join('');
}
//calls function to get cards to display
getCardsInHTML();

let cardDeck = document.querySelectorAll('.card');

//goes through each card in cardDeck
cardDeck.forEach(function (card) {
  //adds event listener to each card
  card.addEventListener('click', function(events) {
    //starts timer after initial click
    timerBegins();
    /*checks to make sure no card contains any of the show, match, or open
    classes before allowing for click*/
    if (!card.classList.contains('show') && !card.classList.contains('open') && !card.classList.contains('match')) {
      //only allows the flippedCards array to hold 2
      if (flippedCards.length<=1){
        flippedCards.push(card);
        card.classList.add('open','show');
        /*for each time two cards are flipped, adds a move, checks to see if
        they match and checks to see if the number of stars should be reduced*/
        if (flippedCards.length===2) {
          countMoves();
          checkMatch();
          removeStars();
          }
        }
      }
    });
  });

/*checks to see if there is a match between the outercard class of the two in
flipped cards*/
function checkMatch() {
  if (flippedCards[0].dataset.outercard===flippedCards[1].dataset.outercard){
    flippedCards[0].classList.add('match');
    flippedCards[1].classList.add('match');
    flippedCards = [];
    numberMatches += 1;
    /*checks to see if the number of matches is 8 for a win game and if it is
    pop the win game popup, turn off the timer, and set totalTime var*/
    if (numberMatches===8) {
      popThePopup();
      timerEnds();
      document.querySelector('.totalTime').innerHTML = `Total Time: ${secondsPassed}`;
    }
  }
  /*if there is no match, flip the cards back over and clear flippedcards array
  after 1 second*/
  else {
    setTimeout (function(){
        flippedCards[0].classList.remove('open','show');
        flippedCards[1].classList.remove('open','show');
        flippedCards = [];
      }, 1000);
  }
}

//update the moves counter display
function countMoves() {
  const moves = document.querySelector('.moves');
  movesCounter += 1;
  moves.innerHTML = movesCounter;
}

//set the refresh button to be clickable and call refresh page
const refreshButton = document.querySelector('.restart')
refreshButton.addEventListener('click', function() {
  refreshPage();
});

//reload document page from: https://www.w3schools.com/jsref/met_loc_reload.asp
function refreshPage() {
  document.location.reload();
}

//change the popup display from none to block
function popThePopup() {
    document.querySelector('.congratsPopup').style.display = "block";
  }
//set the number of stars displayed based on number of moves
function removeStars(){
  let countStars = 3;
  if (movesCounter>8){
    console.log('youre at 2');
    countStars = 2;
    document.querySelector('#star3').style.display = "none";
  }
  if (movesCounter>=20){
    console.log('youre at 1');
    countStars=1;
    document.querySelector('#star2').style.display = "none";
    document.querySelector('#star3').style.display = "none";
  }
  //display final amount of stars in popup
  function getTotalStars(){
    const totalStars = document.querySelector('.totalStars');
    totalStars.innerHTML = `Total Stars: ${countStars}`;
  }
  getTotalStars();
}

//set the play again button on popup to refresh the page
document.querySelector('.playAgain').addEventListener('click', function(){
  refreshPage();
});

/*set the function to start the timer only if it has not already started (true)
and add seconds to the display clock. thanks to classmate Stefan R for the
idea to use a boolean to test*/
function timerBegins(){
  if (timerStarted === false) {
    timerStarted = true;
    timer = setInterval (function (){
      console.log('works');
      secondsPassed ++;
      document.querySelector('.time').innerHTML = `${secondsPassed}`;}, 1000);
  }
}

//clears the interval
function timerEnds(){
  clearInterval(timer);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
