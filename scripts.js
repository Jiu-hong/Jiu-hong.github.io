const cards = document.querySelectorAll(".memory-card")
const startButton = document.querySelector(".start")
startButton.addEventListener("click", startGame)
const result = document.querySelector(".result")

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matchedCount = 0
let startTime
let endTime


function flipCard() {

    if (lockBoard) return;
    if (this === firstCard) return;
   
    this.classList.add("flip")

    if (!hasFlippedCard){
        hasFlippedCard = true;
        firstCard= this;

        return;
 
    } 

    secondCard = this;

    checkForMatch()    
}

function checkForMatch(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework; 
     
    isMatch ? disableCards(): unflipCards()
    
}

function disableCards() {

    firstCard.removeEventListener("click",flipCard)
    secondCard.removeEventListener("click",flipCard)
    matchedCount += 1;
console.log(matchedCount)
    if (matchedCount == (cards.length/2)){
        endTime = Date.now()
      console.log(endTime)
        elapseTIme = ((endTime - startTime)/1000).toFixed(2)
        console.log(elapseTIme)
        result.innerHTML="Your elapsed time is " + elapseTIme + "."
  
    }
    resetBoard()
}

function unflipCards() {
    lockBoard = true;
    setTimeout(()=>{ 
        firstCard.classList.remove("flip")
        secondCard.classList.remove("flip")

        resetBoard();
    }, 1500)
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard,secondCard] = [null, null]
}



// flip each cards before start button


//start button click, then unflip card
function startGame ()
{
   
    (function shuffle() {
        cards.forEach(card=>{
            let randomPos = Math.floor(Math.random() * 12)
            card.style.order = randomPos;
        })
    })();
    result.innerHTML="";
    matchedCount=0;
    cards.forEach(card=> card.classList.add("flip"));
    
    setTimeout(()=>{
        startTime = Date.now()
       
        resetBoard()
        cards.forEach(card=>card.classList.remove("flip"))
        cards.forEach(card=> card.addEventListener("click",flipCard))},5000)
}

