// board
let board;
let boardwidth=350;
let boardheight= 570;
let context;

//doodler
let doodlerwidth=46;
let doodlerheight= 46;
let doodlerX= boardwidth/2 - doodlerwidth/2;
let doodlerY= boardheight*7/8 - doodlerheight;
let doodlerRightImg;
let doodlerLeftImg;
let doodler={
    img: null,
    x: doodlerX,
    y: doodlerY,
    width: doodlerwidth,
    height: doodlerheight
}

// phy
let velocityX= 0;
let velocityY= 0;// jump speed
let initialVelocityY= -6; // starting V
let gravity = 0.4;

// platforms
let platformArray=[];
let platformWidth= 60;
let platformHeight= 18;
let platformImg;

let score=0;
let maxScore=0;
let gameOver = false;

window.onload = function(){
    board= document.getElementById("board");
    board.height= boardheight;
    board.width= boardwidth;
    context = board.getContext("2d");// for drawing
    // draw doodler
    //context.fillStyle= "green";
    //context.fillRect(doodler.x,doodler.y,doodler.width,doodler.height);
    // images
    doodlerRightImg = new Image();
    doodlerRightImg.src = "imgs/doodler-right.png";
    doodler.img= doodlerRightImg;
    doodlerRightImg.onload=function() {
        context.drawImage(doodler.img, doodler.x,doodler.y, doodler.width,doodler.height);
    }

    doodlerLeftImg = new Image();
    doodlerLeftImg.src="imgs/doodler-left.png";

    platformImg= new Image();
    platformImg.src="imgs/platform.png";

    velocityY= initialVelocityY;
    placePlatforms();

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveDoodler);
}
function update(){
    requestAnimationFrame(update);
    if (gameOver){
        return;
    }
    context.clearRect(0 ,0, board.width, board.height);
    //doodler
    doodler.x += velocityX;
    if (doodler.x> boardwidth){
        doodler.x= 0;
    }
    else if (doodler.x + doodler.width<0){
        doodler.x = boardwidth;
    }

    velocityY += gravity;
    doodler.y += velocityY;
    if (doodler.y > board.height){
        gameOver = true;
    }
    context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);
    // platforms
    for (let i= 0; i < platformArray.length; i++){
        let platform= platformArray[i];
        if (velocityY < 0 && doodler.y < boardheight*3/4){
            platform.y -= initialVelocityY; //slide platform in
        }
        if (detectCollision(doodler, platform)&& velocityY >=0){
            velocityY = initialVelocityY; // jump
        }
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
    }
    // clear platforms add new plaform
    while (platformArray.length > 0 && platformArray[0].y >= boardheight){
        platformArray.shift(); // removes first ellemt
        newPlatform();
    }
    // score
    updateScore();
    context.fillStyle="brown";
    context.font="16px sans-serif";
    context.fillText(score, 5, 20);
    
    if (gameOver){
        context.fillText("Game over: press 'Space' to Restart", boardwidth/7, boardheight*7/8);
    }
}
function moveDoodler(e){
    if (e.code == "ArrowRight"|| e.code== "KeyD"){
        velocityX=2;
        doodler.img= doodlerRightImg;
    }
    else if (e.code == "ArrowLeft"|| e.code == "KeyA"){
        velocityX= -2;
        doodler.img= doodlerLeftImg;
    }
    else if (e.code =="Space" && gameOver){
        //reset
    doodler={
        img: doodlerRightImg,
    x: doodlerX,
    y: doodlerY,
    width: doodlerwidth,
    height: doodlerheight
    }    
    velocityX= 0;
    velocityY= initialVelocityY;
    score=0;
    maxScore=0;
    gameOver= false;
    placePlatforms();
    }
}

function placePlatforms(){
    platformArray=[];
    // starting 
    let platform = {
        img: platformImg,
        x: boardwidth/2,
        y: boardheight - 50,
        width: platformWidth,
        height: platformHeight
    }

    platformArray.push(platform);

    //platform = {
    //   img: platformImg,
    //    x: boardwidth/2,
    //    y: boardheight - 150,
    //    width: platformWidth,
    //    height: platformHeight
    //}
    //platformArray.push(platform);

    for (let i= 0; i<6; i++){
        let randomX = Math.floor(Math.random()*boardwidth*3/4); //(0-1)*boardwidth*3/4
        let platform = {
        img: platformImg,
        x: randomX,
        y: boardheight - 75*i - 150,
        width: platformWidth,
        height: platformHeight
        }
        platformArray.push(platform);

    }
}

function newPlatform() {
    let randomX = Math.floor(Math.random()*boardwidth*3/4); //(0-1)*boardwidth*3/4
        let platform = {
        img: platformImg,
        x: randomX,
        y: -platformHeight,
        width: platformWidth,
        height: platformHeight
        }
        platformArray.push(platform);
}

function detectCollision(a, b){
    return a.x < b.x + b.width && // a top left dont reach with b top right
           a.x + a.width > b.x && // a top right passes b top left corner
           a.y < b.y + b.height &&
           a.y + a.height> b.y;
}
function updateScore(){
    if (velocityY< 0 && doodler.y < boardheight*3/4){
        score++;
    }
}