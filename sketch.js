var monkey , monkey_running;
var banana ,bananai;
var obstacle, obstaclei, r;
var ground, fakeground;
var gameover;

var gravity;
var score = 0;
var survivaltime = 0;

var PLAY = 1;
var END = 0;
var gamestate = 1;

function preload()
{
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  gameoveri = loadAnimation("game.png","gameover.png");
  
  bananai = loadImage("banana.png");
  obstaclei = loadImage("obstacle.png");
  monkeyi = loadImage("gameover.png");
  
  obstaclegroup = new Group();
  bananagroup = new Group();
}

function setup() 
{
  createCanvas(400,400);
  
  monkey = createSprite(200,270);
  monkey.addAnimation("moving",monkey_running);
  monkey.velocityY = 7;
  monkey.scale = 0.1;
  
  fakeground = createSprite(200,320,0,0);
  
  gameover = createSprite(200,200);
  gameover.addAnimation("last",gameoveri);
}  

function draw()
{
  background('white'); 
  
  if(gamestate === PLAY)
  { 
    
    gameover.visible = false;
    
    ground = createSprite(200,320,400,5);
    ground.velocityX = -4;
    if(ground.x < 0)
    {  
      ground.x = ground.width/2;
    } 
    ground.depth = 0.5;
    ground.Lifetime = 100;
    
    survivaltime = Math.ceil(frameCount/frameRate());
  
    fakeground.visible = false;
  
    console.log(monkey.y);
  
    monkey.velocityY = 5;
  
    if(keyDown("space"))
    {
      monkey.velocityY = -20;
    }
  
    monkey.velocityY = monkey.velocityY + 6;
  
    monkey.collide(fakeground);
  
    if(bananagroup.isTouching(monkey))
    {
      bananagroup.destroyEach();
      score = score + 2;
    }  
    
    if(obstaclegroup.isTouching(monkey))
    {
      obstaclegroup.destroyEach();
      bananagroup.destroyEach();
      
      ground.visible = false;
      
      monkey.x = 200;
      monkey.setVelocity(0,0);
      
      gamestate = END;
    }  
  
    spawnobstacles();
    spawnbanana();
  } else
  
  if(gamestate === END)
  {
    monkey.visible = false;
    ground.visible = false;
    
    score.visible = true;
    survivaltime.visible = true;
    gameover.visible = true; 
  }  
  
  stroke("black");
  textSize(20);
  fill("red");
  text("Score = " + score,250,50);
  
  stroke("black");
  textSize(20);
  fill("blue");
  text("Survival Time = " + survivaltime,10,50);
  
  drawSprites();
}

function spawnobstacles()
{
  if(World.frameCount % 300 === 0 )
  {
    obstacle = createSprite(430,300);
    obstacle.addImage(obstaclei);
    obstacle.velocityX = -4;
    
    r = Math.round(random(1,4))
    
    if(r == 1)
    {
      obstacle.scale = 0.25;
      obstacle.y = 300;
    } else
    if(r == 2)
    {
      obstacle.scale = 0.1;
      obstacle.y = 310;
    } else
    if(r == 3)
    {
      obstacle.scale = 0.15;
      obstacle.y = 315;
    } else 
    if(r == 4)
    {
      obstacle.scale = 200;
      obstacle.y = 300;
    } 
    
    obstaclegroup.add(obstacle);
    obstaclegroup.Lifetime = 100;
  }  
}

function spawnbanana()
{
  if(frameCount % 80 === 0)
  {  
    banana = createSprite(400,110);
    banana.addImage(bananai);
    banana.scale = 0.1;
    banana.velocityX = -7;
    banana.y = Math.round(random(120,200));
    bananagroup.add(banana);
  }  
}

