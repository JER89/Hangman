
var great_house = [
    "stark", 
    "lannister", 
    "baratheon",
    "greyjoy",
    "arryn",
    "martell",
    "bolton",
    "tully",
    "clegane",
    "tyrell",
    "targaryen"        
]

let answer = '';
let maxError = 10;
let mistakes = 0;
let guessed = [];
let wordStatus = null;


function playTheme(){
    var audio = new Audio('https://upload.wikimedia.org/wikipedia/en/a/a8/Game_of_Thrones_Main_Title_sample.ogg');
    audio.play();
}

function randomWord() {
    answer = great_house[Math.floor(Math.random() * great_house.length)];
}

function generateButtons() {

    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
        <button 
            class="btn btn-info btn-lg btn-ptimary m-2"
            id= '` + letter + `'
            onClick="handleGuess('` + letter +  `')"
        >
            ` + letter +  `
        </button>
    `).join('');

    document.getElementById('target').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute("disabled", true);

    if(answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfGameWon();

    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPic();
    }
}
function updateHangmanPic() {
    document.getElementById('Picture').src ="./images/" + mistakes + ".png" ;
}

function checkIfGameWon() {
    if(wordStatus === answer) {
        playTheme();
        /*document.getElementById('target').innerHTML = 'Winner !';*/
    }    
}

function checkIfGameLost() {
    if(mistakes === maxError) {
        document.getElementById('word').innerHTML = 'The answer was: ' + answer;
       /* document.getElementById('target').innerHTML = 'Looser !'*/
    }
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : "  _  ")).join('');
    document.getElementById('word').innerHTML = wordStatus;
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

function restart() {
    mistakes = 0;
    guessed = [];
    document.getElementById('Picture').src = "./images/0.png";

    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();    
}




document.getElementById('maxError').innerHTML = maxError;

randomWord();
generateButtons();
guessedWord();



