const images =[
    {
      id: 1,
      image:
        "https://pngpress.com/wp-content/uploads/2020/04/HTML-logo-300x300.png",
    },
    {
      id: 2,
      image:
        "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/042015/css3.png?itok=OlYIVwA0",
    },
    {
      id: 3,
      image:
        "https://www.ocpsoft.org/wp-content/uploads/2013/01/javascript_logo_unofficial-300x300.png",
    },
    {
      id: 4,
      image:
        "https://www.pine64.org/wp-content/uploads/2019/04/github-logo.jpg",
    },
    {
      id: 5,
      image:
        "https://proyectosbeta.net/wp-content/uploads/2016/10/Logo-StackOverFlow.png",
    },
    {
      id: 6,
      image:
        "https://www.deepnetsecurity.com/wp-content/uploads/2014/03/linux-logo.jpg",
    },
    {
      id: 11,
      image:
        "https://pngpress.com/wp-content/uploads/2020/04/HTML-logo-300x300.png",
    },
    {
      id: 12,
      image:
        "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/042015/css3.png?itok=OlYIVwA0",
    },
    {
      id: 13,
      image:
        "https://www.ocpsoft.org/wp-content/uploads/2013/01/javascript_logo_unofficial-300x300.png",
    },
    {
      id: 14,
      image:
        "https://www.pine64.org/wp-content/uploads/2019/04/github-logo.jpg",
    },
    {
      id: 15,
      image:
        "https://proyectosbeta.net/wp-content/uploads/2016/10/Logo-StackOverFlow.png",
    },
    {
      id: 16,
      image:
        "https://www.deepnetsecurity.com/wp-content/uploads/2014/03/linux-logo.jpg",
    },
  ];

const cardContainer = document.getElementsByClassName("cardContainer")[0];


 


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function rotateCard(){
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("rotate");

  if (!hasFlippedCard){
    //first click 
    hasFlippedCard = true;
    firstCard = this;

    return;   
  }
  //second click
  secondCard = this;
  checkForMatch();
};

function checkForMatch(){
  
  let isMatch = firstCard.cardDiv[0] === secondCard.cardDiv[0];
  console.log(isMatch);
  isMatch ? disableCards() : unFlipCards();
};

function disableCards(){
  firstCard.removeEventListener("click", rotateCard);
  secondCard.removeEventListener("click", rotateCard);

  resetBoard();
};

function unFlipCards(){
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("rotate");
    secondCard.classList.remove("rotate");

 resetBoard();
  },1500);
};

function resetBoard(){
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};

function shuffle(a){
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let shuffledImages = shuffle(images);

 //kartları rastgele karıştırmak için fun.
shuffledImages.map((item)=> { // map her bir elemana bunu uygula demek

// cardImage oluşuturuldu ve src ve class verildi
let cardFrontImage = document.createElement("img");
cardFrontImage.setAttribute("src", item.image);
cardFrontImage.classList.add("frontImage");


let cardBackImage = document.createElement("div");
// cardBackImage.setAttribute("src",backImageSrc);
cardBackImage.classList.add("backImage");

// cardDiv oluşturuldu ve class verildi
let cardDiv = document.createElement("div");
cardDiv.classList.add("cardDiv");

cardDiv.appendChild(cardFrontImage);
cardDiv.appendChild(cardBackImage);
cardContainer.appendChild(cardDiv);

// cardDiv'e tıklandığında rotateCard func. (rotate class'ı toggle) uygula. 
cardDiv.addEventListener("click", rotateCard); 
});