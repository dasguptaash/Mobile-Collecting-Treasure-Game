var PLAY = 1;
var END = 0;
var gameState = PLAY;

var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,boyImg2;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

var gameOver;
var gameOverSound;
var cash, diamonds, jwellery;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation ("runner1.png","runner2.png");
  boyImg2 = loadAnimation("runner1.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
  gameOverSound = loadSound("Game Over Sound.wav") 
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation ("SahilRunning", boyImg);
boy.addAnimation ("SahilStop", boyImg2);
boy.scale=0.08;
boy.setCollider ("circle",100,100,700)

  
gameOver = createSprite(width/2,height/2);
gameOver.addImage(endImg);
gameOver.scale = 0.5;
 
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
  

}

function draw() {

  background(0);
  
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
    

    if (cashG.isTouching(boy) )
     {
      cashG[0].destroy();
      treasureCollection = treasureCollection + 50;
    }else if(diamondsG.isTouching(boy) ){
      diamondsG[0].destroy();
      treasureCollection  = treasureCollection + 500;
    } else if (jwelleryG.isTouching(boy)) {
   
      jwelleryG[0].destroy();
      treasureCollection  = treasureCollection + 100;
 
    }
    
   if(swordGroup.isTouching(boy)){
     swordGroup.destroyEach();
       gameState = END;
       boy.changeAnimation ("SahilStop", boyImg2);
       boy.velocityY = 0;
       boy.x = width-350;
                      
       cashG.destroyEach();
       cashG.setVelocityYEach(0);
                      
       diamondsG.destroyEach();
       diamondsG.setVelocityYEach(0);
        
       jwelleryG.destroyEach();
       jwelleryG.setVelocityYEach(0);
        
       swordGroup.destroyEach();
       swordGroup.setVelocityYEach(0);
        
       path.velocityY = 0;
        
       gameOver.visible = true;
       gameOverSound.play();
        
      }
   
   
    
  
       
  
  if(gameState === PLAY){
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    gameOver.visible = false;
    
    if((touches.length > 0 )){
      boy.x = mouseX;
       touches = [];
       }
    
  }
      
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width/2,30);
}
  

function createCash() {
  if (World.frameCount % 50 == 0) {
  cash = createSprite(Math.round(random(50,width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  diamonds = createSprite(Math.round(random(50,width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  jwellery = createSprite(Math.round(random(50,width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50,width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}


  