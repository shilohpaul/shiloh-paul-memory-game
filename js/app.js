/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane', 'fa-paper-plane', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];

document.querySelector('.congratsPopup').style.display = "none";

let timerStarted=false;
let secondsPassed;


function timerBegins(){
  if (timerStarted === false) {
    timerStarted = true;
    let timer = setInterval (function (){
      console.log('works');
      secondsPassed ++;
      document.querySelector('.time').innerHTML = `${secondsPassed}`;}, 1000);
  }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
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

getCardsInHTML();

let cardDeck = document.querySelectorAll('.card');
let flippedCards = [];
let numberMatches = 0;
let movesCounter = 0;


cardDeck.forEach(function (card) {
  card.addEventListener('click', function(events) {
    timerBegins();
    if (!card.classList.contains('show') && !card.classList.contains('open') && !card.classList.contains('match')) {
      if (flippedCards.length<=1){
        flippedCards.push(card);
        card.classList.add('open','show');
        if (flippedCards.length===2) {
          countMoves();
          checkMatch();
          removeStars();
          }
        }
      }
    });
  });

function checkMatch() {
  if (flippedCards[0].dataset.outercard===flippedCards[1].dataset.outercard){
    flippedCards[0].classList.add('match');
    flippedCards[1].classList.add('match');
    flippedCards = [];
    numberMatches += 1;
    if (numberMatches===8) {
      popThePopup();
    }
  }
  else {
    setTimeout (function(){
        flippedCards[0].classList.remove('open','show');
        flippedCards[1].classList.remove('open','show');
        flippedCards = [];
      }, 1000);
  }
}


function countMoves() {
  const moves = document.querySelector('.moves');
  movesCounter += 1;
  moves.innerHTML = movesCounter;
}



const refreshButton = document.querySelector('.restart')
refreshButton.addEventListener('click', function() {
  refreshPage();
});

function refreshPage() {
  document.location.reload();
}


function popThePopup() {
    document.querySelector('.congratsPopup').style.display = "block";
  }

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
  function getTotalStarsInHTML(){
    const totalStars = document.querySelector('.totalStars');
    totalStars.innerHTML = `TotalStars: ${countStars}`;
  }
  getTotalStarsInHTML();
}

document.querySelector('.playAgain').addEventListener('click', function(){
  refreshPage();
});





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
