//hacer puas, cofres, trampas, puerta, win, lose

var bgImg; 
var link, linkImgA, linkImgF, linkImgD, linkImgI;
var linkImgMA, linkImgMD, linkImgMF, linkImgMI;
var linkFlagMove = "U";
var paredGroup, spikeGroup;
var paredH1,paredH2,paredH3,paredH4,paredH5;
var paredV1,paredV2,paredV3,paredV4,paredV5,paredV6,paredV7,paredV8,paredV9,paredV10;
var limite1, limite2, limite3, limite4, limite5;
var life = 6;
var heart1,heart2,heart3,heart4,heart5,heart6;

var gameState="PLAY"; // WIN LOSE 


function preload(){
  bgImg = loadImage("assets/Map.png");
//ANIMACIONES LINK

  //Animaciones para link estático
  linkImgA = loadAnimation("assets/linkA.png"); //arriba
  linkImgD = loadAnimation("assets/linkD.png"); //derecha
  linkImgF = loadAnimation("assets/linkF.png"); //abajo
  linkImgI = loadAnimation("assets/linkI.png"); //izquierda

  //Animaciones para link en movimiento 
    //arriba
  linkImgMA = loadAnimation(
    "assets/linkMA1.png",
    "assets/linkMA2.png",
    "assets/linkMA3.png",
    "assets/linkMA4.png",
    "assets/linkMA5.png",
    "assets/linkMA6.png",
    "assets/linkMA7.png",
    "assets/linkMA8.png",
    "assets/linkMA9.png",
    "assets/linkMA10.png"
    )
    //derecha
    linkImgMD = loadAnimation(
      "assets/linkMD1.png",
      "assets/linkMD2.png",
      "assets/linkMD3.png",
      "assets/linkMD4.png",
      "assets/linkMD5.png",
      "assets/linkMD6.png",
      "assets/linkMD7.png",
      "assets/linkMD8.png",
      "assets/linkMD9.png",
      "assets/linkMD10.png"
      )
      //abajo
    linkImgMF = loadAnimation(
      "assets/linkMF1.png",
      "assets/linkMF2.png",
      "assets/linkMF3.png",
      "assets/linkMF4.png",
      "assets/linkMF5.png",
      "assets/linkMF6.png",
      "assets/linkMF7.png",
      "assets/linkMF8.png",
      "assets/linkMF9.png",
      "assets/linkMF10.png"
      )
       //izquierda
    linkImgMI = loadAnimation(
      "assets/linkMI1.png",
      "assets/linkMI2.png",
      "assets/linkMI3.png",
      "assets/linkMI4.png",
      "assets/linkMI5.png",
      "assets/linkMI6.png",
      "assets/linkMI7.png",
      "assets/linkMI8.png",
      "assets/linkMI9.png",
      "assets/linkMI10.png"
      )
      //vidas
      heartImg = loadImage("assets/heart_1.png");
}

function setup(){
  //CANVAS
  var cnv = createCanvas(1350,750);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  // GROUPS
  paredGroup = new Group();
  spikeGroup = new Group();

  //SPRITES LINK 
  link = createSprite(100, height-100, 50, 50);
  link.addAnimation("linkA",linkImgA);
  link.addAnimation("linkD",linkImgD);
  link.addAnimation("linkF",linkImgF);
  link.addAnimation("linkI",linkImgI);
  
  link.addAnimation("linkMA",linkImgMA);
  link.addAnimation("linkMD",linkImgMD);
  link.addAnimation("linkMF",linkImgMF);
  link.addAnimation("linkMI",linkImgMI);

  link.scale = 0.7;

  //SPRITES VIDAS

  heart1 = createSprite(800,710,20,20);
  heart1.addImage("heart",heartImg);
  heart1.scale = 0.4;
  
  heart2 = createSprite(870,710,20,20);
  heart2.addImage("heart",heartImg);
  heart2.scale = 0.4;
  
  heart3 = createSprite(940,710,20,20);
  heart3.addImage("heart",heartImg);
  heart3.scale = 0.4; 

  heart4 = createSprite(1010,710,20,20);
  heart4.addImage("heart",heartImg);
  heart4.scale = 0.4; 

  heart5 = createSprite(1080,710,20,20);
  heart5.addImage("heart",heartImg);
  heart5.scale = 0.4; 

  heart6 = createSprite(1150,710,20,20);
  heart6.addImage("heart",heartImg);
  heart6.scale = 0.4; 

  //SPRITES PAREDES
  
  //limites
  limite1 = createSprite(675, 720, 1350, 60); // horizontal abajo
  limite2 = createSprite(220, 20, 430, 60); //horizontal arriba 1/2
  limite3 = createSprite(930, 20, 830, 60); //horizontal arriba 2/2
  limite4 = createSprite(31, 350, 60, 750); //vertical izq
  limite5 = createSprite(1320, 350, 60, 750); //vertical der
  paredGroup.add(limite1);
  paredGroup.add(limite2);
  paredGroup.add(limite3);
  paredGroup.add(limite4);
  paredGroup.add(limite5);
  limite1.visible = false;
  limite2.visible = false;
  limite3.visible = false;
  limite4.visible = false;
  limite5.visible = false;
  
  //paredes verticales
  paredV1 = createSprite(180, 575, 30, 200); //3 ok
  paredV2 = createSprite(180, 260, 30, 240); //4 ok
  paredV3 = createSprite(328, 320, 30, 533); //8 ok
  paredV4 = createSprite(398, 290, 30, 467); //7 ok
  paredV5 = createSprite(544, 220, 30, 333); //5 ok
  paredV6 = createSprite(692, 280, 30, 267); //4 ok
  paredV7 = createSprite(762, 540, 30, 120); //2 ok
  paredV8 = createSprite(1026, 180, 30, 267); //4 antorchas ok
  paredV9 = createSprite(1172, 300, 30, 300); //5 //spike ok
  paredV10 = createSprite(835, 475, 30, 120); //2 //spike ok
  paredGroup.add(paredV1);
  paredGroup.add(paredV2);
  paredGroup.add(paredV3);
  paredGroup.add(paredV4);
  paredGroup.add(paredV5);
  paredGroup.add(paredV6);
  paredGroup.add(paredV7);
  paredGroup.add(paredV8);
  spikeGroup.add(paredV9);
  spikeGroup.add(paredV10);
  paredV1.visible = false;
  paredV2.visible = false;
  paredV3.visible = false;
  paredV4.visible = false;
  paredV5.visible = false;
  paredV6.visible = false;
  paredV7.visible = false;
  paredV8.visible = false;
  paredV9.visible = false;
  paredV10.visible = false;

  //paredes horizontales
  paredH1 = createSprite(730, 165, 120, 30); //2 ok
  paredH2 = createSprite(730, 300, 120, 30); //2 ok
  paredH3 = createSprite(920, 436, 500, 30); //8 spike ok
  paredH4 = createSprite(580, 510, 286, 30); //4 ok
  paredH5 = createSprite(1175, 580, 30, 30); //1 spike ok
  paredGroup.add(paredH1);
  paredGroup.add(paredH2);
  paredGroup.add(paredH4);
  spikeGroup.add(paredH3);
  spikeGroup.add(paredH5);
  paredH1.visible = false;
  paredH2.visible = false;
  paredH3.visible = false;
  paredH4.visible = false;
  paredH5.visible = false;

  //SPRITES PAREDES

  //SPRITES ENEMIGOS

}

function draw() {
  
  background(bgImg);

  print("x:"+link.x);
  print("y:"+link.y);

  if(gameState === "PLAY"){

    link.collide(paredGroup);
    link.collide(spikeGroup);

    if(linkFlagMove === "A"){
      link.changeAnimation("linkA",linkImgA);
    }
    if(linkFlagMove === "F"){
      link.changeAnimation("linkF",linkImgF);
    }
    if(linkFlagMove === "I"){
      link.changeAnimation("linkI",linkImgI);
    }
    if(linkFlagMove === "D"){
      link.changeAnimation("linkD",linkImgD);
    }

          
    //movimiento normal 3
    if(keyDown("UP_ARROW")){
      link.y = link.y-3;
      link.changeAnimation("linkMA",linkImgMA);
      linkFlagMove = "A";
    }
    if(keyDown("DOWN_ARROW")){
      link.y = link.y+3;
      link.changeAnimation("linkMF",linkImgMF);
      linkFlagMove = "F";
    }
    if(keyDown("LEFT_ARROW")){
      link.x = link.x-3;
      link.changeAnimation("linkMI",linkImgMI);
      linkFlagMove = "I";
    }
    if(keyDown("RIGHT_ARROW")){
      link.x = link.x+3;
      link.changeAnimation("linkMD",linkImgMD);
      linkFlagMove = "D";
    }


    
    drawSprites();
  }
}