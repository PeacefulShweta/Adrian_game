var ball
var enemyg;
var score =0;
var gameState = "play";
function preload(){
  marioimg = loadAnimation("mario1.png","mario2.png","mario3.png")
  groundimg = loadImage("ground-removebg-preview.png");
  bgimg = loadImage("mariobg.png");
  coinimg = loadImage("Star.png");
  endimg = loadImage("game_end.jpg");
  enemy1img = loadAnimation("enemy1.gif");
  enemy2img = loadAnimation("enemy2.gif");
  enemy3img = loadAnimation("enemy3.gif");
  enemy4img = loadAnimation("enemy4.gif");
  enemy5img = loadAnimation("enemy5.gif");
  enemy6img = loadAnimation("enemy6.gif");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  background = createSprite(width/2,height/2);
  background.addImage(bgimg)
   ball = createSprite(50, height-200,20,20);
  ball.addAnimation("mario",marioimg);
  ball.scale = 2.5;
  ground = createSprite(width/2,height-80,width,20)
  ground.visible = false;
  enemyg = new Group();
  coing = new Group();
}

function draw() {
  //background(bgimg);
  if(gameState === "play"){
  
  background.velocityX = -5;
  if(background.x<900){
    background.x = background.width/2;
  }
  if(keyDown("space")){
    ball.velocityY = -6
  }

  ball.velocityY =ball.velocityY+0.8
  ground.velocityX = -3;
  if(ground.x<50){
    ground.x = ground.width/2;
  } 
  //ball.collide(ground);
  for(var i = 0;i<coing.length;i++){
    if(coing.get(i).isTouching(ball)){
      coing.get(i).destroy();
      score = score+1;
    }
  }
  spawnenemy();
  spawncoin();
  if(enemyg.isTouching(ball) || ball.y > height){
    gameState = "end";
    ball.destroy();
  }
}
 if(gameState === "end"){
   background.velocityX =0;
   background.x = width/2;
   background.y = height/2;
  background.addImage(endimg);
   coing.destroyEach();
   enemyg.destroyEach();
 }
  drawSprites();

textSize(35);
fill("green");
text("Score"+score,width-150,30)
  text("Press space to jump the mario",width/2 -300,30);
}
function spawnenemy(){
  if(frameCount % 80===0){
enemy = createSprite(width,height-200,20,60);
enemy.scale = 0.2
var rand = Math.round(random(1,6))
switch(rand){
  case 1: enemy.addAnimation("enemy1",enemy1img);
  break;
  case 2: enemy.addAnimation("enemy2",enemy2img);
  break;
  case 3: enemy.addAnimation("enemy3",enemy3img);
  break;
  case 4: enemy.addAnimation("enemy4",enemy4img);
  break;
  case 5: enemy.addAnimation("enemy5",enemy5img);
  break;
  case 6: enemy.addAnimation("enemy6",enemy6img);
  break;
  default:break;
}
enemy.addAnimation("enemy1",enemy1img);
enemy.velocityX =-4;
enemyg.add(enemy)
}
}
function spawncoin(){
  if(frameCount % 50===0){
coin = createSprite(width,height-200,50,50);
coin.addImage(coinimg)
coin.scale = 0.1;
coin.y = Math.round(random(30,height-200));
coin.x = Math.round(random(50,width));
coin.velocityX =-4;
coin.lifetime = 200;
coing.add(coin)
}
}