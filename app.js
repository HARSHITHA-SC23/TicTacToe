//HTML Elements
const statusDiv = document.querySelector('.status'); //for we grab this div class for manipulating
const resetDiv = document.querySelector('.reset'); //for reseting the game
const cellDivs = document.querySelectorAll('.game-cell');

//game constants
const xSymbol = '×';
const oSymbol = '〇';

//game variables
let gameIsLive = true; //If the variables is true then game is live if the game is tie we manually set this to false.We use LET because we need to change it later so.
let xIsNext = true; //If this variable is true then it is 'x' turn or else if it is false then it is 'o' turn.
let winner =null;


//functions
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handlewinner = (letter) => {
    gameIsLive = false;
    winner = letter;
    if(winner==='x')
    {
      statusDiv.innerHTML = `${letterToSymbol(winner)} has WON!`;
    }
    else
    {
        statusDiv.innerHTML = `<span>${letterToSymbol(winner)} has WON!</span>`;
    }
}

const checkGameStaus = () => {
    const topLeft=cellDivs[0].classList[1];
    const topMiddle=cellDivs[1].classList[1];
    const topRight=cellDivs[2].classList[1];
    const middleLeft=cellDivs[3].classList[1];
    const middleMiddle=cellDivs[4].classList[1];
    const middleRight=cellDivs[5].classList[1];
    const bottomLeft=cellDivs[6].classList[1];
    const bottomMiddle=cellDivs[7].classList[1];
    const bottomRight=cellDivs[8].classList[1];

    //Is there a winner?
    if(topLeft && topLeft===topMiddle && topLeft===topRight) {
        handlewinner(topLeft);
        cellDivs[0].classList.add('WON');
        cellDivs[1].classList.add('WON');
        cellDivs[2].classList.add('WON');

    }
    else if(middleLeft && middleLeft===middleMiddle && middleLeft===middleRight)
    {
        handlewinner(middleLeft);
        cellDivs[3].classList.add('WON');
        cellDivs[4].classList.add('WON');
        cellDivs[5].classList.add('WON');
    }
    else if(bottomLeft && bottomLeft===bottomMiddle && bottomLeft===bottomRight) {
        handlewinner(bottomLeft);
        cellDivs[6].classList.add('WON');
        cellDivs[7].classList.add('WON');
        cellDivs[8].classList.add('WON');
    }
    else if(topLeft && topLeft===middleLeft && topLeft===bottomLeft) {
        handlewinner(topLeft);
        cellDivs[0].classList.add('WON');
        cellDivs[3].classList.add('WON');
        cellDivs[6].classList.add('WON');
    }
    else if(topMiddle && topMiddle===middleMiddle && topMiddle===bottomMiddle) {
        handlewinner(topMiddle);
        cellDivs[1].classList.add('WON');
        cellDivs[4].classList.add('WON');
        cellDivs[7].classList.add('WON');
    }
    else if(topRight && topRight===middleRight && topRight===bottomRight) {
        handlewinner(topRight);
        cellDivs[2].classList.add('WON');
        cellDivs[5].classList.add('WON');
        cellDivs[8].classList.add('WON');
    }
    else if(topLeft && topLeft===middleMiddle && topLeft ===bottomRight){
        handlewinner(topLeft);
        cellDivs[0].classList.add('WON');
        cellDivs[4].classList.add('WON');
        cellDivs[8].classList.add('WON');
    }
    else if(topRight && topRight===middleMiddle && topRight===bottomLeft){
        handlewinner(topRight);
        cellDivs[2].classList.add('WON');
        cellDivs[4].classList.add('WON');
        cellDivs[6].classList.add('WON');
    }
    else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight){
        gameIsLive=false;
        statusDiv.innerHTML= 'Game is Tied!';
    }
    else
    {
        xIsNext=!xIsNext;
        if(xIsNext)
        {
            statusDiv.innerHTML=`${xSymbol} is next`;
        }
        else{
            statusDiv.innerHTML=`<span>${oSymbol} is next</span>`;
        }
    }
    

};


//event handler 
const handleReset = () => {
    xIsNext=true;
    statusDiv.innerHTML=`${xSymbol} is next`;
    winner=null;
    for (const cellDiv of cellDivs)
    {
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('WON');

    }
    gameIsLive=true;
};

const handleCellClick = (e) => {
    const classList=e.target.classList;
    if(!gameIsLive || classList[1]==='x' || classList[1]==='o'){
        ;return
    }
    if(xIsNext)
    {
        classList.add('x');
        checkGameStaus();
    }
    else
    {
        classList.add('o');
        checkGameStaus();
    }
}

//event listeners
resetDiv.addEventListener('click', handleReset);
for(const cellDiv of cellDivs){
    cellDiv.addEventListener('click',handleCellClick);
}

