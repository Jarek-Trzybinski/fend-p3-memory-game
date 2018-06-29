// list of variables
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
let modalContent = document.querySelector('.modal-content');

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

//star rating function 
function starRating() {
    switch (moveCounter) {
        case 22:
        stars.querySelector('li').remove();
        break;

        case 34:
        stars.querySelector('li').remove();
        break;
    }
}


function timer() {
    second++;    
    if (second == 60) {
        minute++;
        second=0;
    }
    timerScreen.innerHTML= minute + "m " + second + "s";
}

// function that starts timer
let time = null;
let startTimer = function() {
   time =  setInterval(timer , 1000);
};

//function that stops timer
let stopTimer = function() {clearInterval(time)};

// refresh button
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


//create new shuffled set of cards /
function newShuffledDeck() {
    let deck = document.querySelector('.deck');
    let emptyDeck = deck.innerHTML="";
    console.log(deck);
    let arrayLength = shuffledCardsArray.length;
        for (let i = 0; i < arrayLength; i++) {
            document.querySelector('.deck').appendChild(shuffledCardsArray[i]);
        }
}

newShuffledDeck(); 

startTimer();
// set up the event listener for a card. If a card is clicked
for (let i = 0; i < cards.length; i++){
    cards[i].addEventListener("click", compareCards);
}


// function checking if cards are identical
function compareCards() {
    if(!this.classList.contains("show") && !this.classList.contains("open") ) {
        openedCards.push(this);
        this.classList.toggle("open");
        this.classList.toggle("show");
    }

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
        }, 265);
        }
            moveCounter++;
            starRating();
            
            //checking how many cards matched
            $( ".moves" ).html(moveCounter);
            countMatch = document.getElementsByClassName('match').length;


           if (countMatch==16) {
               stopTimer();
                
               //generate final modal content
               finalTimerScreen = document.querySelector('.timer').innerHTML;
               finalStars = document.querySelector('.stars').innerHTML;
               
               finalInfo = `
                            <h3>Final moves: ${moveCounter}</h3>
                            <h3> Final time: ${finalTimerScreen}</h3>
                            <h3>Final Stars:</h3> <ul class="final-stars"> ${finalStars}</ul>
                            <input class="playagain-button" type="button" value="Play Again" onClick="window.location.reload()">
                            `;

                let endGameInfo = document.querySelector('.end-game-info');
                endGameInfo.innerHTML = finalInfo;
                
                //show final modal
                toggleModal();
            }
    }
}

/*
TO DO LIST FOR FUTURE:
*animation effect for cards
*start button and count down 3.. 2.. 1 .. start 
*/