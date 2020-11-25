var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground;
var boxPosition,boxY;
var boxLeftSprite,boxLeftBody,boxRightSprite,boxRightBody,boxBottomSprite,boxBottomBody;
var edges;
var pillar,pillar2;
var pillarBody,pillar2Body;
var stat;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	engine = Engine.create();
	world = engine.world;

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=("black");

	stat = {
		isStatic : true
	}

	boxPosition = width/2-100;
	boxY = 610;
	
	boxLeftSprite = createSprite(width/2-100,610,20,100);
	boxLeftSprite.shapeColor = "red";
	boxLeftSprite.velocityX = 2;

	boxLeftBody = Bodies.rectangle(boxPosition,boxY,20,100,stat);
	World.add(world, boxLeftBody);

	boxBottomSprite = createSprite(boxPosition + 70,boxY + 40,150,20);
	boxBottomSprite.shapeColor = "red";
	boxBottomSprite.velocityX = 2;


	boxBottomBody = Bodies.rectangle(boxPosition + 70, boxY + 40,150,20, {isStatic : true});
	World.add(world, boxBottomBody);
	
	boxRightSprite = createSprite(boxPosition + 140, boxY,20,100);
	boxRightSprite.shapeColor = "red";
	boxRightSprite.velocityX = 2;

	boxRightBody = Bodies.rectangle(boxPosition + 140,boxY,20,100, {isStatic : true});
	World.add(world, boxRightBody);

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.6, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );

	pillar = createSprite(780,620,20,100);
	pillar.visible = false;
	pillarBody = Bodies.rectangle(780,620,20,100,{isStatic : true});
	World.add(world,pillarBody);

	pillar2 = createSprite(20,620,20,100);
	pillar2.visible = false;
	pillar2Body = Bodies.rectangle(20,620,20,100,{isStatic : true});
	World.add(world,pillar2Body);

 	World.add(world, ground);


	Engine.run(engine);
  
}


function draw() {
	rectMode(CENTER);
  	background("lightblue");
  	packageSprite.x= packageBody.position.x; 
  	packageSprite.y= packageBody.position.y;
  
	if(boxRightSprite.isTouching(pillar)){
		boxLeftSprite.velocityX = -2;
		boxBottomSprite.velocityX = -2;
		boxRightSprite.velocityX = -2;
	}

	if(boxLeftSprite.isTouching(pillar2)){
		boxLeftSprite.velocityX = 2;
		boxBottomSprite.velocityX = 2;
		boxRightSprite.velocityX = 2;
	}

	packageSprite.collide(boxLeftSprite);
	packageSprite.collide(boxRightSprite);
	packageSprite.collide(boxBottomSprite);

  drawSprites();
 
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
    // Look at the hints in the document and understand how to make the package body fall only on press of the Down arrow key.
	Matter.Body.setStatic(packageBody,false);
    
  }
}



