const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let firstCard , secondCard;
let lockBoard = false; //ard arda tıklamaya iizin vermiyo
const refresh = document.querySelector(".refresh img");
let second = 0;
let minute = 0;
let time = document.querySelector(".time");
let interval;


function flipCard(){

    if(lockBoard) return;   
    if(this === firstCard) return;

    this.classList.add("flip");

    if(!hasFlippedCard ){
        // first click
        hasFlippedCard =true;
        firstCard = this;
        startTime();
        return; 
    } 

    //second click
    hasFlippedCard = false;  
    secondCard =this;
    
    checkForMatch();
}

function checkForMatch(){
    let isMatch =  firstCard.dataset.id === secondCard.dataset.id;
    isMatch ? disableCards() : unFlipCards();
}

function disableCards(){
//eşleştiğinde
firstCard.removeEventListener("click", flipCard);
secondCard.removeEventListener("click", flipCard);
resetBoard();
}


function unFlipCards(){
    lockBoard= true;

     //not match
     setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        lockBoard =false;
    }, 1500);
}

function resetBoard(){ // card döndüğünde tekrar tıklayabilmemizi sağlar
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}

// refresh.addEventListener("click", )

function startTime () {
    interval = setInterval(function () {
        time.innerHTML = ` ${minute} : ${second}`;
        second++;

        if( second == 60){
            minute++;
            second = 0;
        }

        if (minute == 60){
            hour++;
            minute = 0;
        }
    }, 1000);
};

// function moveCounter (){
//     moves++;
// }


(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*12)
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener("click", flipCard));
