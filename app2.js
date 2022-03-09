const cards = document.querySelectorAll(".memory-card");
const refresh = document.querySelector(".refresh img");
const final = document.querySelector(".final");
const congrats = document.querySelector("#congratsSection");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");

let hasFlippedCard = false;
let firstCard , secondCard;
let lockBoard = false; //ard arda tıklamaya iizin vermiyo
// let second = 0;
// let minute = 0;
let totalSeconds = 0;
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
    }, 1000);
}

function resetBoard(){ // card döndüğünde tekrar tıklayabilmemizi sağlar
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}

//refresh butonuna basildiginda
refresh.addEventListener("click", function(){
    confirm("Are you sure that?")  
    location.reload();
});


//zaman göstergesi 
function startTime () {
    interval = setInterval(function () { //interval belirli araliklarla sürekli çalişmasini saglar. 
        ++totalSeconds;
        second.innerHTML = pad(totalSeconds % 60);
        minute.innerHTML = pad(parseInt(totalSeconds / 60));
    }, 1000);
};

function pad(val){ // 00 şeklinde ilerlesin zaman diye yazdik burayi
    const valString = val + "";
    if(valString.length <2){
        return "0" + valString;
    } else {
        return valString;
    }
};


//game won
function gameWon(){
    if (hasFlippedCard === 12){
        clearInterval(interval);
        final.innerHTML = `You won" + "<br> in " + ${minute}+":"+ ${second}`;
        congrats.classList.replace("hidden", "show");
    }
};
gameWon();


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
