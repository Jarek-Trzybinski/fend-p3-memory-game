/*
 * Create a list that holds all of your cards
 */
let cards = document.getElementsByClassName('card');
let cardsArray = Array.prototype.slice.call(cards);
let openedCards = [];
let moveCounter = 0;
let minute = 0;
let second = 0;
let timerScreen = document.querySelector('.timer');
let stars = document.querySelector('.stars');

//modal variables
let modal = document.querySelector('.modal');
let closeButton = document.querySelector('.close-button');

//modal functions
function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

//event lisners for modal
closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);

let modalContent = document.querySelector('.modal-content');

function toggleModal() {
    modal.classList.toggle('show-modal');
}

function starRating() {
    switch (moveCounter) {
        case 22:
        stars.querySelector('li').remove();
        break;

        case 34:
        stars.querySelector('li').remove();
        break;
    };
}

function timer() {
    setInterval(function(){
        second++;
        
        if (second == 60) {
            minute++;
            second=0;
        }
        timerScreen.innerHTML= minute + "min" + second + "s";
    } , 1000);
};
timer();

//refresh page by clicking restart buton
let refreshButton = document.querySelector('.restart');
refreshButton.addEventListener("click", function(){ location.reload(); });

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
shuffledCardsArray = shuffle(cardsArray);
console.log(shuffledCardsArray[1]);

//empty set of cards


//create new shuffled set of cards /
function newShuffledDeck() {
    let deck = document.querySelector('.deck');
    let emptyDeck = deck.innerHTML="";//why after removing this line code still working and still has 16 elements?
    console.log(deck);
    let arrayLength = shuffledCardsArray.length;
        for (let i = 0; i < arrayLength; i++) {
            //deck.appendChild
            
            document.querySelector('.deck').appendChild(shuffledCardsArray[i]);
    //Do something
}
console.log(arrayLength);
}
newShuffledDeck(); 


// set up the event listener for a card. If a card is clicked
for (let i = 0; i < cards.length; i++){
    cards[i].addEventListener("click", compareCards);
};

// function open cards


// function checking if cards are identical
function compareCards() {
    
    if(!this.classList.contains("show") && !this.classList.contains("open") ) {
        openedCards.push(this);
        this.classList.toggle("open");
        this.classList.toggle("show");
    }
    
    //if(this.classList.contains("show") && this.classList.contains("open")) {}
    //openedCards.push(this);
    //openedCards.push(this);
    
    if(openedCards.length == 2) {
            // if cards are identical
            if(openedCards[0].querySelector('i').getAttribute('class')===openedCards[1].querySelector('i').getAttribute('class') ){
                openedCards[0].classList.add('match');
                openedCards[1].classList.add('match');
                openedCards = [];
            
        } else {
            //if cards are different
        setTimeout(function(){
            openedCards[0].classList.toggle("open");
            openedCards[0].classList.toggle("show");
            openedCards[1].classList.toggle("open");
            openedCards[1].classList.toggle("show");
            openedCards[0].classList.remove("disabled");
            openedCards[1].classList.remove("disabled");

            
            openedCards = [];
        }, 300);
        }
            moveCounter++;
            starRating();
            
            console.log('move: ' + moveCounter);
            // why this doesn't work
            //document.getElementsByClassName(moveCounter;
            // this is why i added jquery
            $( ".moves" ).html(moveCounter);
            countMatch = document.getElementsByClassName('match').length;
            console.log('matched cards ' + countMatch);
            if (countMatch==16) {
                
                finalInfo = '<h3>Final moves: ' + moveCounter + '</h3>';
                
                
                finalTimerScreen = document.querySelector('.timer').innerHTML;

                finalInfo += '<h3> Final time: ' + finalTimerScreen + '</h3>';

                finalStars = document.querySelector('.stars').innerHTML;
                finalInfo += '<h3>Final Stars:</h3> <ul class="final-stars">' + finalStars + '</ul>';
                finalInfo += '<input class="playagain-button" type="button" value="Play Again" onClick="window.location.reload()">'

                 
                //modalContent.innerHTML += finalInfo;

                let endGameInfo = document.querySelector('.end-game-info');
                endGameInfo.innerHTML = finalInfo;
                
                //
                toggleModal();

            };  
    }
};

// countMatch = document.getElementsByClassName('match');
// console.log(countMatch);

// numItems = $('.match').length; 

        

// loop through each card and create its HTML



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
