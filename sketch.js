var background1, backgroundImg;
var player, playerImg;
var shark, sharkImg, sharkGroup;
var treasure, treasureImg, treasureGroup;
var fish, fishImg, fishGroup
var score = 0
var play = 1
var end = 0
var gamestate = "play"
var gameOver, gameOverImg

function preload() {
    backgroundImg = loadImage("bgImg.jpg");
    sharkImg = loadAnimation("s1.png", "s2.png", "s3.png", "s4.png", "s5.png", "s6.png");
    playerImg = loadAnimation("f1.png", "f2.png", "f3.png", "f4.png", "f5.png", "f6.png", "f7.png", "f8.png", "f9.png", "f10.png", "f11.png", "f12.png", "f13.png", "f14.png", "f15.png", "f16.png");
    treasureImg = loadAnimation("t1.png", "t2.png", "t3.png", "t4.png", "t5.png", "t6.png", "t7.png", "t8.png", "t9.png", "t10.png", "t11.png", "t12.png")
    fishImg = loadAnimation("p1.png", "p2.png", "p3.png", "p4.png", "p5.png");
    gameOverImg = loadImage("GameOVER.png")

    treasureGroup = new Group();
    sharkGroup = new Group();
    fishGroup = new Group();
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    background1 = createSprite(width / 2, height / 2, width, height);
    background1.addImage("bgImg", backgroundImg);
    background1.scale = 1.3;
    background1.velocityX = -2;

    player = createSprite(160, 300, 50, 80)
    player.addAnimation("player", playerImg);
    
    // gameOver = createSprite(width/2,height/2,100,100)
    // gameOver.addImage("gameOver",gameOverImg);
    // gameOver.visible = false
}

function draw() {
    background(220);
    if(gamestate === "play") {

    
    if (background1.x < width / 2 - 100) {
        background1.x = width / 2
    }

    if ((keyDown("UP_ARROW") && player.y>20) ) {
        player.y = player.y - 30;
    }
    if ((keyDown("DOWN_ARROW") && player.y<height-45)) {
        player.y = player.y + 30;
    }

    if(treasureGroup.isTouching(player)) {
        for(var i = 0; i<treasureGroup.length; i++){
            if(treasureGroup[i].isTouching(player)) {
                treasureGroup[i].destroy()
                score = score +10;
            }
        }
    }

    if(fishGroup.isTouching(player)){
        for(var i = 0; i<fishGroup.length; i++){
            if(fishGroup[i].isTouching(player))  {
                fishGroup[i].destroy()
                score = score - 5
            }
        }
    }

    if(sharkGroup.isTouching(player)) {
        for(var i = 0; i<sharkGroup.length; i++) {
            if(sharkGroup[i].isTouching(player)) {
                sharkGroup[i].destroy()
                gamestate = "end"
            }
        }
    }

    spawnShark();
    spawnFish();
    spawnTreasure();
    }
    drawSprites();

    textSize(20);
    stroke("black")
    fill("black")
    strokeWeight(2)
    text("Score : " +score,50,50)

    if(gamestate === "end") {
        fishGroup.setLifetimeEach(-1)
        sharkGroup.setLifetimeEach(-1)
        treasureGroup.setLifetimeEach(-1)
        fishGroup.destroyEach()
        sharkGroup.destroyEach()
        treasureGroup.destroyEach()   
    }
}


function spawnShark() {
    if (World.frameCount % 80 == 0) {
        y = random(50, height - 60);
        shark = createSprite(width - 100, y, 10, 10);
        shark.addAnimation("sharkImg", sharkImg);
        shark.velocityX = -10
        shark.lifetime = 150;
        shark.scale = 0.7;

        sharkGroup.add(shark);
    }
}

function spawnTreasure() {
    if (World.frameCount % 100 == 0) {
        treasure = createSprite(width - 100, height-80, 10, 10);
        treasure.addAnimation("treasureImg", treasureImg);
        treasure.velocityX = -10
        treasure.lifetime = 150;
        treasure.scale = 0.5;

        treasureGroup.add(treasure);
    }
 }

 function spawnFish() {
    if (World.frameCount % 60 == 0) {
        y = random(50, height - 80);
        fish = createSprite(width - 100, y, 10, 10);
        fish.addAnimation("fishImg", fishImg);
        fish.velocityX = -10
        fish.lifetime = 150;
        fish.scale = 0.2;

        fishGroup.add(fish);
    }
 }