// Variables - results
let resultsPage = document.querySelector('#resultsPage');
let resultsContainer = document.querySelector('#resultsContainer');

/* ######## CHARACTER SELECTION PAGE ######## */
// Variables
let characterPage = document.querySelector('#characterPage');
let characterContainer = document.querySelector('#characterContainer');
let url = 'https://anapioficeandfire.com/api/characters?page=3&pageSize=10';
var activeCards = 0;    
var createCards;
var xhr;

// Get content from API
fetch(url) // Fetch the url
.then((response) => { // Response as argument
    return response.json(); // Parse response as JSON
})
.then((character) => { // Then take the parsed JSON
    createCards(character); // Create character cards
})

// Create cards from API
function createCards(character) {
    for(i=0; i!=character.length || i<character.length; i++) {
        // Create cards
        let card = document.createElement('div');
        
        // Set classes
        card.classList.add('character__card');
        
        // Add cards to DOM
        characterContainer.appendChild(card);
        
        // Only load if properties have content
        if(character[i].name == '') {} else { // Char name
            let charName = document.createElement('h1');
            charName.classList.add('character__name');
            charName.textContent = character[i].name;
            card.appendChild(charName);
        }
        if(character[i].born == '') {} else { // Char birth
            let charBirth = document.createElement('p'); // Create element
            charBirth.classList.add('character__birth'); // Add class for CSS
            charBirth.innerHTML = `<span data-type='label'>Born:</span>`; // Create label
            charBirth.innerHTML += `<span data-type='info'>${character[i].born}</span>`; // Create content
            card.appendChild(charBirth);
        }
        if(character[i].titles == '') {} else { // Char titles
            let charTitlesContainer = document.createElement('p'); // Create element
            charTitlesContainer.classList.add('character__titles'); // Add class for CSS
            charTitlesContainer.innerHTML = `<span data-type='label'>Titles: </span>`; // Create label
            card.appendChild(charTitlesContainer); // Append container
            character[i].titles.forEach(function(element) { // Iterate to create separate objects
                let charTitles = document.createElement('span'); // Create span
                charTitles.setAttribute('data-type', 'info'); // Create attribute for CSS
                charTitles.textContent = element; // Get content
                charTitlesContainer.appendChild(charTitles); // Add to container inside card
            });
        }
        if(character[i].gender == '') {} else { // Char gender
            let charGender = document.createElement('p'); // Create element
            charGender.classList.add('character__gender'); // Add class for CSS
            charGender.innerHTML = `<span data-type='label'>Gender:</span>`; // Create label
            charGender.innerHTML += `<span data-type='info'>${character[i].gender}</span>`; // Create content
            card.appendChild(charGender); // Add to card
        }
    }
    var allCards = document.getElementsByClassName('character__card');
    for(i=0;i<allCards.length;i++) {
        allCards[i].addEventListener('click', function(e) {
            if(activeCards < 2 || !(activeCards)) {
                if(this.classList.contains('character__card--active')) {
                    this.classList.remove('character__card--active');
                    activeCards += -1;
                } else {
                    this.classList.add('character__card--active');
                    activeCards += 1;
                }
            } else {
                if(this.classList.contains('character__card--active')) {
                    this.classList.remove('character__card--active');
                    activeCards += -1;
                }
            }
            e.stopPropagation
        });
    }
}

/* ######## BOARD GAME PAGE ######## */
// Variables - gameboard
var gamePage = document.getElementById('gamePage'); // Game section
var gameContainer = document.getElementById('gameContainer'); // Tiles container
var gameMenu = document.getElementById('gameMenu'); // Game top menu
var gameSidebar = document.getElementById('gameSidebar'); // Game right sidebar
var gameTilesContainer = document.getElementById('gameTilesContainer');
var whosTurnContainer = document.getElementById('whosTurnContainer');

var playerOnePosition = playerOne.getAttribute('data-tile');
var playerTwoPosition = playerTwo.getAttribute('data-tile');

var rollDiceBtn = document.getElementById('rollDiceBtn'); 
var dice = document.getElementById('dice');
var roller = document.getElementById('roller')
var startGame = document.getElementById('startGameBtn');
var rolled;
var WhosTurn = {}; // Is object, to make it available in multiple functions
var rollDice;
var player;
var gameHasStarted = false; // Set game to default
var reroll = false; // Set default reroll to false
var result = {};
var success = document.getElementById('success');
var fail = document.getElementById('fail');



// Create tiles
for(i=1;i<=30;i++) {
    var gameTiles = document.createElement('div');
    gameTiles.classList.add('game__tile');
    gameTiles.setAttribute('id', 't' + i);
    gameTilesContainer.appendChild(gameTiles);
}

startGame.addEventListener('click', function(e) {
    if(gameHasStarted === false) {
        WhosTurn.isIt = Math.floor(Math.random() * 2) + 1;
        if(WhosTurn.isIt == '1') {
            WhosTurn.playerOne = document.createElement('h1');
            WhosTurn.playerOne.textContent = 'Player one goes first';
            whosTurnContainer.appendChild(WhosTurn.playerOne);
            console.log(WhosTurn.isIt);
            gameHasStarted = true;
        } else {
            WhosTurn.playerTwo = document.createElement('h1');
            WhosTurn.playerTwo.textContent = 'Player two goes first';
            whosTurnContainer.appendChild(WhosTurn.playerTwo);
            console.log(WhosTurn.isIt);
            gameHasStarted = true;
        }
    }
e.stopPropagation;
});

rollDiceBtn.addEventListener('click', function rolldice(e) {
    if(gameHasStarted) {
        rolled = Math.floor(Math.random() * 6) + 1;
        if(playerOnePosition < 30 && playerTwoPosition < 30) { 
            if(rolled == '1') {
                rollDice();
                dice.classList = 'dicecontainer__dice';
                dice.classList.add('dicecontainer__dice--throwone');
                if(WhosTurn.isIt == 1) {
                    movePiece(rolled,1,false);
                } else if (WhosTurn.isIt == 2) {
                    movePiece(rolled,2,false);
                }
            }
            if(rolled == '2') {
                rollDice();
                dice.classList = 'dicecontainer__dice';
                dice.classList.add('dicecontainer__dice--throwtwo');
                if(WhosTurn.isIt == 1) {
                    movePiece(rolled,1,false);
                } else if (WhosTurn.isIt == 2) {
                    movePiece(rolled,2,false);
                }
            }
            if(rolled == '3') {
                rollDice();
                dice.classList = 'dicecontainer__dice';
                dice.classList.add('dicecontainer__dice--throwthree');
                if(WhosTurn.isIt == 1) {
                    movePiece(rolled,1,false);
                } else if (WhosTurn.isIt == 2) {
                    movePiece(rolled,2,false);
                }
            }
            if(rolled == '4') {
                rollDice();
                dice.classList = 'dicecontainer__dice';
                dice.classList.add('dicecontainer__dice--throwfour');
                if(WhosTurn.isIt == 1) {
                    movePiece(rolled,1,false);
                } else if (WhosTurn.isIt == 2) {
                    movePiece(rolled,2,false);
                }
            }
            if(rolled == '5') {
                rollDice();
                dice.classList = 'dicecontainer__dice';
                dice.classList.add('dicecontainer__dice--throwfive');
                if(WhosTurn.isIt == 1) {
                    movePiece(rolled,1,false);
                } else if (WhosTurn.isIt == 2) {
                    movePiece(rolled,2,false);
                }
            }
            if(rolled == '6') {
                rollDice();
                dice.classList = 'dicecontainer__dice';
                dice.classList.add('dicecontainer__dice--throwsix');
                if(WhosTurn.isIt == 1) {
                    movePiece(rolled,1,true);
                } else if (WhosTurn.isIt == 2) {
                    movePiece(rolled,2,true);
                }
            }
        } else {
            if(playerOnePosition >= 30 || playerTwoPosition >= 30) {
                result.success = document.createElement('h1');
                
                if(playerOnePosition >= 30 && playerTwoPosition < 30) {
                } else if (playerTwoPosition >= 30 && playerOnePosition < 30) {
                    result.success
                }
            }
        }
    }
e.stopPropagation;
});

function rollDice() {
    roller.style.transform = 'translateY(' + (Math.floor(Math.random() * 20) + 1) +'vw)'+' rotate(' + (Math.floor(Math.random() * 360) - 360) + 'deg)' + ' translateX(' + (Math.floor(Math.random() * 10) + 1) + 'vw)';
}
function movePiece(rolled,player,reroll) {
    if(player == 1) {
        playerOnePosition = parseInt(playerOne.getAttribute('data-tile'));
        playerOne.setAttribute('data-tile', playerOnePosition+rolled);
        reroll ? WhosTurn.isIt = 1 : WhosTurn.isIt = 2;
    } else if (player == 2) {
        playerTwoPosition = parseInt(playerTwo.getAttribute('data-tile'));
        playerTwo.setAttribute('data-tile', playerTwoPosition+rolled);
        reroll ? WhosTurn.isIt = 2 : WhosTurn.isIt = 1;
    }
}
