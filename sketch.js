let gameState = "title";
//tileSize for main room background
let tileSize = 50;
let hasStaff = false;
let gameOver = false;
let hasKey = false;
let enemyDefeat = false;
let hoot = false;
let roundCount = 0;
let playerHealth = 3;
let enemyHealth = 3;
let playerRoll = "";
let finalTime = 0;
let tutorialDone = false;
let fogSpeed = 0.5;
let fogX = 0;
let fogY = 100;
// art and fonts
let img;
let stairsTop;
let stairsBottom;
let stairsLeft;
let stairsRight;
let owl;
let owlSad;
let staff;
let reward;
let knight;
let summon;
let d20;
let crowInverse;
let titleFont;
let wordsFont;
let crowFront;
let crowBack;
let crowLeft;
let crowRight;
let currentImg;
//music and sounds
let titleSound;
let audioStart = false;


let playerX = 300;
let playerY = 200;
let speed = 3;
  

async function setup() {
  noSmooth();
  createCanvas(600, 400);
  img = await loadImage("assets/crowstaff.png");
  knight = await loadImage("assets/knight.png");
  owl = await loadImage("assets/mrowl.png");
  owlSad = await loadImage("assets/owlsad.png");
  crowInverse = await loadImage("assets/crowinvert.png");
  crowFront = await loadImage("assets/crowfront.png");
  crowBack = await loadImage("assets/crowback.png");
  crowLeft = await loadImage("assets/crowleft.png");
  crowRight = await loadImage("assets/crowright.png");
  stairsTop = await loadImage ("assets/stairs.png");
  stairsBottom = await loadImage ("assets/stairs.png");
  stairsLeft = await loadImage ("assets/stairs.png");
  stairsRight = await loadImage ("assets/stairs.png");
  staff = await loadImage("assets/staff.png");
  summon = await loadImage("assets/summon.png");
  d20 = await loadImage("assets/d20.png");
  reward = await loadImage("assets/key.png")
  titleFont = await loadFont("assets/title.ttf");
  wordsFont = await loadFont("assets/pixelpurl.medium.ttf");
  currentImg = crowFront;
  titleSound = createAudio("assets/dungeon.mp3");
  //msic and sounds

  
  
  
}

function draw() {
  textFont(wordsFont);
  textSize(22);
  if (gameState === "title"){
    drawTitle();
  } else if (gameState === "game"){
  movePlayer();
  checkRoom();
  drawGame();
  
  //guy only if in game state
  fill (134, 73, 209);
  noStroke();
  image(currentImg,playerX,playerY,100,100);

  fill (184, 175, 222,70);
  noStroke();
    /*rect(fogX, fogY, 550,350,40);
    fogX += fogSpeed;
    if (fogX > width){
      fogX = -350
    }
    rect(fogX-100, fogY-200, 700,200,40);
    fogX += fogSpeed;
    if (fogX > width){
      fogX = -350
    }*/
    //sets gameState
  } else if (gameState === "talk"){
    drawTalk();
  } else if (gameState === "knife"){
    drawKnife();
  } else if (gameState === "combat"){
    drawCombat();
  } else if (gameState === "fight"){
    drawFight ();
  } else if (gameState === "door"){
    drawDoor ();
  } else if (gameState === "crawl"){
    drawCrawl ();
  }else if (gameState === "riddle"){
    drawRiddle ();
  }
}

  //how player gets to each room
  function checkRoom(){
  if (playerY < 50){
    gameState = "talk";
  } else if (playerY > 350){
    gameState = "knife";
  }else if (playerX < 50){
    gameState = "combat";
  } else if (playerX > 550){
    gameState = "door";
  }
}
 
//functions for each room
 function drawTitle(){
  background(35, 43, 41);
   textAlign(CENTER,CENTER);
   noSmooth();
   imageMode(CENTER);
  fill(126, 53, 191);
   textSize(60);
   textFont(titleFont);
   text("neCROWmancer",300,100);
   textSize(24);
   fill(255,255,255);
   textFont(wordsFont);
   text("CLICK TO START", 300, 330);
   textFont(wordsFont);
   image(img,300,220,200,200);
   
 }

function drawCrawl(){
  background (0,0,0);
  textAlign(CENTER,CENTER);
  textFont(wordsFont);
  textSize(22);
  fill(255,255,255);
  text("You are a powerful NECROWMANCER, a carrion bird with the power to \n SUMMON THE DEAD with your MAGIC STAFF. You're kinda hot stuff.",300,70);
  text("What's not hot stuff is the fact that you tripped and fell \n into the CRYPT OF THE DOOMED and lost your staff!",300,130);
  text("You woke up in the crypt with one goal, get your staff and get out. \n (That's technically two goals I just realized.)",300,200);
  text("But you got this, because you're",300,250);
  textFont(titleFont);
  textSize(30);
  fill(126, 53, 191);
  text("The Necrowmancer", 300, 290);
   textFont(wordsFont);
  textSize(22);
  fill(255,255,255);
  text("Now go on, get outta here! \n Click to Continue",300, 350);
}
 function drawGame(){
   
  for(let x=0; x < width; x += tileSize) {
    for (let y = 0; y < height; y += tileSize){
      //alternate colors
      if ((x/ tileSize + y/ tileSize) % 2 === 0){
        fill(81, 90, 112);
      } else {
        fill(59, 65, 82);
      }
      noStroke();
      rect(x,y,tileSize,tileSize);
      }
    }
   fill(143, 145, 148)
   rect(150,200,50,50);
   arc(175,200,50,50, PI, TWO_PI);
   fill (114, 115, 117);
   //rect(190,200,10,50);
   fill (0,0,0);
   text("RIP",175,200);
   fill (255,255,255)
   text("INVENTORY:",50,20);
   if(hasStaff === true){
     image(staff, 120, 18, 30, 30);
   }
   if(hasKey === true){
     image(reward, 140, 18, 40, 40);
   }
   image(stairsTop,275,25,50,50);
   image(stairsBottom,325,375,50,50);
   image(stairsLeft,25,225,50,50);
   image(stairsLeft,575,175,50,50);
   if (tutorialDone === false){
     textAlign(CENTER,CENTER);
  textFont(wordsFont);
  textSize(24);
  fill(255,255,255);
     text("Use the WASD keys to move around",300,100);
   }
  }
function drawTalk (){
  background(0,0,0);
  fill(255,255,255);
  image(owl, 300, 180, 300,300);
  if (hoot === false){
  text("Halt! In order to pass, you must answer my riddles three!", 300, 50);
  text("Click to Continue", 300, 350);
  } else
  text("Wait you're back? I think I have riddle for you!", 300, 50);
  text("Click to Continue", 300, 350);
}

function drawRiddle (){
   background(0,0,0);
  fill(255,255,255);
  if (hoot === false){
  text("For my first riddle, what has, um, who, who, hoo..?", 300, 30);
  text("I uh, I got nothin', sorry for wasting your time.", 300, 50);
  text("Click to Leave the Room", 300, 350);
  } else {
  text("Um uh, how many licks does it take to..?", 300, 30);
  text("Sorry, I think I'm just hungry.", 300, 50);
  text("Click to Leave the Room", 300, 350);
  }
  image(owlSad, 300, 180, 300,300);

}

function drawKnife(){
  background (0,0,0);
  noSmooth();
  fill (255,255,255);
  textSize(22);
  text("Click to Leave the Room", 300, 350);
  if (hasStaff === false){
    image(staff, 300, 200, 300, 300);
    text("You found the staff! That was easy!", 300, 50);
  } else if (hasStaff === true){
    text("There is a staff-shaped imprint in the ground",300,50);
  }
  tutorialDone = true;
}

function drawCombat(){
  tutorialDone = true;
 background (0,0,0);
  fill (255,255,255);
  image (knight, 300, 200, 250, 250);
  textAlign(CENTER,CENTER);
  if ( enemyHealth < 1 && enemyDefeat === true && hasKey === true){
  text("You already defeated me! Don't kick me while I'm down!",300,50);
  text("Click to Leave the Room!",300,350);
  } else if (hasStaff === false){
  text("Puny little crow! \n Face me when you have a weapon to fight!", 300, 50);
  text("Click to Leave Room", 300, 350);
  } else if (hasStaff === true){
  text("You want the key? Face my blade!", 300, 50);
  text("Click to Fight!", 300, 350);
 } 
}

function drawFight(){
  background (0,0,0);
    fill (255,255,255);
  image (knight, 470, 200, 250, 250);
  image (d20, 90, 200, 150, 150);
  if (playerHealth <= 0 ){
    text("Game Over!",300,200);
    fill(255,0,0);
    text(playerRoll,88,200);
    fill(255,255,255);
    text("Click to restart the fight",300,350);
    text("Your HP: " + playerHealth, 50, 20);
    text("Knightengale's HP: " + enemyHealth, 500, 20);
  } else if (enemyHealth <= 0){
    text("Sigh, you were a worthy opponent. Take the key!",300,50);
    text("Click to Leave the Room!",300,350);
    image (crowInverse, 80, 350, 200, 200);
    image (reward, 300, 220, 150, 150);
    text(playerRoll,88,200);
    hasKey = true;
         text("Your HP: " + playerHealth, 50, 20);
    text("Knightengale's HP: " + enemyHealth, 500, 20);
  } else {
    //combat start
    image (summon, 200, 250, 150, 150);
    image (crowInverse, 80, 350, 200, 200);
    text("Your HP: " + playerHealth, 50, 20);
    text("Knightengale's HP: " + enemyHealth, 500, 20);
    textAlign(CENTER,CENTER);
    text("Roll higher than an 8 to deal damage before Knightengale!\n Press SPACE to roll!",300,70);
    if (playerRoll !== ""){
      text(playerRoll,88,200);
    
    if (playerRoll <= 8){
      text("Knightengale hit you first! \n Press SPACE to roll again!", 300, 350)
    } else {
      text("Your summon hit Knightengale first! \n Press SPACE to roll again!", 325, 350)
    }
    }
  }
}

function drawDoor(){
  tutorialDone = true;
  background (0,0,0);
    fill (255,255,255);
  textAlign(CENTER,CENTER);
  if (hasKey === true){
    text("You escaped the crypt!",300,200);
    text("Click to Restart",300,250);
  } else {
    text("It's a gate to escape the crypt, but it's locked!\n Defeat the Knightengale to claim the key!", 300, 200);
    text("Click to Leave the Room",300,250);
  }
}
//if key is pressed
  function keyPressed(){
    if (playerHealth <= 0 || enemyHealth <= 0){ 
      return;
  }
  if (gameState === "fight" && keyCode === 32){
    playerRoll = floor(random(1, 21));
    roundCount += 1;
    if (playerRoll <= 8){
    playerHealth -= 1;
  } else {
    enemyHealth -= 1;
  }
  }
    
}
async function mousePressed(){
  await userStartAudio();
  
  
    if (gameState === "crawl"){
     gameState = "game";
      playerX = 275;
      playerY = 200;
      userStartAudio();
  } else if (gameState === "talk"){
    playerY = 75;
     gameState = "riddle";
    currentImg = crowFront;
  } else if (gameState === "knife"){
  playerY = 315;
  currentImg = crowBack;
  gameState = "game";
  hasStaff = true;
  } else if (gameState === "combat"){
      if (hasStaff === false){
        playerX = 80;
        gameState = "game";
        currentImg = crowRight;
      } if (hasStaff === true){
        gameState = "fight";
      } if (enemyDefeat === true){
        playerX = 80;
        gameState = "game";
        currentImg = crowRight;
      }
  } else if (gameState === "fight"){
      currentImg = crowRight;
      if(enemyHealth <= 0){
        playerX = 80;
        gameState = "game";
        enemyDefeat = true;
        currentImg = crowRight;
      } else if(playerHealth <= 0){
        gameState = "combat";
        roundCount = 1;
        playerHealth = 3;
        enemyHealth = 3;
        playerRoll = "";
      }
  } else if (gameState === "door"){
      if (hasKey === true){
        hasStaff = false;
        gameOver = false;
        hasKey = false;
        enemyDefeat = false;
        roundCount = 0;
        playerHealth = 3;
        enemyHealth = 3;
        playerRoll = "";
        playerX = 275;
        playerY = 200;
        currentImg = crowFront;
        gameState = "title";
        tutorialDone = false;
        hoot = false;
      } else{
        playerX = 525;
        gameState = "game";
        currentImg = crowLeft;
      }
  } else if (gameState === "title"){
      gameState = "crawl";
      if(!audioStart){
        titleSound.volume(0.5);
        titleSound.loop();
        audioStart = true;
      }
  } else if (gameState === "riddle"){
      gameState = "game";
      playerY = 50;
      currentImg = crowFront;
      hoot = true;
  }
}

  //moves player
  function movePlayer(){
   if (keyIsDown('a') || keyIsDown('A')){
    playerX-= speed;
     currentImg = crowLeft;
     tutorialDone = true;
  }
  if (keyIsDown('d') || keyIsDown('D')){
    playerX+= speed;
    currentImg = crowRight;
    tutorialDone = true;
  }
  if (keyIsDown('w') || keyIsDown('W')){
    playerY-= speed;
    currentImg = crowBack;
    tutorialDone = true;
  }
  if (keyIsDown('s') || keyIsDown('S')){
    playerY+= speed;
    currentImg = crowFront;
    tutorialDone = true;
  }
 
  }
 