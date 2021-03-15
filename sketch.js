var bg;

var dead = false;

var player;
var speed = 0.3;
var jump = 17;
var jumping = false;

var player_walk_sprites,
    player_walk,
    player_stand_sprites,
    player_stand;

var zombie;
var zombie_walk_sprites,
    zombie_walk;

var gravity = 1;
var platform;

var wall;
var scoreValue = 0;

function preload(){
    player_walk_sprites = loadSpriteSheet("images/player.png", 64, 64, 8);
    player_walk = loadAnimation(player_walk_sprites);
    player_stand_sprites = loadSpriteSheet("images/player.png", 64, 64, 1);
    player_stand = loadAnimation(player_stand_sprites);
    
    zombie_walk_sprites = loadSpriteSheet("images/zombie.png", 64, 64, 8);
    zombie_walk = loadAnimation(zombie_walk_sprites);
    
}


function setup() {
    createCanvas(720,360);
    
    bg = loadImage("images/final_bg.png");
    
    player = createSprite(100, 100);
    player.addAnimation("walk", player_walk);
    player.addAnimation("stand", player_stand);
    player.setCollider("rectangle", 0, 0, 25, 50);
   // player.debug = true;
    
    zombie = new Group();
    
    for (var i = 0; i < 7; i++) {
        var newZombie = createSprite(random(width/2, width*2), 300);
        
        newZombie.addAnimation("walk", zombie_walk);
        newZombie.setCollider("rectangle",0,0,25,50);
        //newZombie.debug = true;
        zombie.add(newZombie);
        
    }
    
    //zombie = createSprite(600, 300);
    //zombie.addAnimation("walking", zombie_walk);
    //zombie.setCollider("circle", 0, 0, 25);
    //zombie.debug = true;
    console.log(zombie.length);
    
    platform = createSprite(width/2, height -30, width, 1);
   // platform.debug = true;
    platform.draw = function() {};
    //platform.visible = false;
    
        
    wall = createSprite(0, height, 0, height*2);
   // wall = createSprite(717, height, 0, height*2);
    //wall.debug = true;
    
    walls = createSprite(719, 222, 1, height);
    //walls.debug = true;
    
}

function draw () {
    background(bg);
    
    if (dead && keyDown("x"))
        newGame();
    
    if (!dead) {
        
    fill("white");
    textSize(25);
    text("Score: " + scoreValue + " ", 550,30,70,50);
    
    for (var i = 0; i < zombie.length; i++) {
        var z = zombie[i];
        //z.debug = true;
        //z.position.y += sin(frameCount/10);
        z.mirrorX(-1);
        z.changeAnimation("walk");
        z.velocity.x -= .1/5;
        z.maxSpeed = 5;
    if (z.position.x < -20)
        z.position.x = random(width, width*2);
        
    if (player.collide(z)) {
       
        
        console.log(player.position.x, z.position.x);
        if (player.position.y < z.position.y - 10) {
            
            z.remove();
            scoreValue += 75;
        } else {
            dead = true;
        }
    }
        
        
    }
        
        
    if ( keyDown("space") && !jumping) {
        player.velocity.y -= jump;
        jumping = true;
    }
    
    if ( keyDown("a") ) {
        player.velocity.x -= speed;
       // platform.velocity.x = 0;
        
        //zombie.velocity.x -= 0;
        //zombie.changeAnimation("walk");
        player.mirrorX(-1);
        player.changeAnimation("walk");
    } else {
        player.friction = 1;
        player.changeAnimation("stand");
        
    }
        
    if ( keyDown ("d") ) {
        player.velocity.x += speed;
       // platform.velocity.x = 0;
        //zombie.velocity.x -= speed;
        //zombie.mirrorX(-1);
        player.changeAnimation("walk");
        player.mirrorX(+1);
    } else {
       // platform.velocity.x = 0;
        
        player.changeAnimation("stand");
    }
    
    player.velocity.y += gravity;
    if (player.collide(platform)) {
        player.velocity.y = 0;
        if (jumping) jumping = false;
    }
    
   /* if (player.collide(z)) {
        //player.remove();
        player.position.x = 100;
        player.position.y = 0;
        player.velocity.x = 0;
        dead = true;
    }*/
    
    
	
    //if (zombie.position.x <= zombie.width) zombie.position.x += x;
    
    // walls //    
    if (player.collide(wall)) {
        player.velocity.x = 0;
    }
    if (player.collide(walls)) {
        player.velocity.x = 0;    
    }    
    
    drawSprites();
    
    } else {
        bg = color =("red");
        fill("black");
        textSize(30);
        text("You Have Been Eaten!", 300, 190, 200);
        
    function die(){
        updateSprites(false);
        dead = true;
    }
   
    function newGame() {
        dead = false;
        updateSprites(true);
        player.position.x = 100;
        player.position.y = 100;
        player.velocity.y += gravity;
        
    }
    function mousePressed() {
        if(dead)
            newGame();
    }
    }
    
    
    
}

