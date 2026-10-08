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
// phy
let velocityX= 0;
let velocityY= 0;// jump speed
let initialVelocityY= -8; // starting V
let gravity = 0.4;

// platforms
let platformArray=[];
let platformWidth= 60;
let platformHeight= 18;
let platformImg;


let doodler={
    img: null,
    x: doodlerX,
    y: doodlerY,
    width: doodlerwidth,
    height: doodlerheight
}

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
    context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);
    // platforms
    for (let i= 0; i < platformArray.length; i++){
        let platform= platformArray[i];
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);

    }
}
function moveDoodler(e){
    if (e.code == "ArrowRight"|| e.code== "KeyD"){
        velocityX=4;
        doodler.img= doodlerRightImg;
    }
    else if (e.code == "ArrowLeft"|| e.code == "KeyA"){
        velocityX= -4;
        doodler.img= doodlerLeftImg;
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

    platform = {
        img: platformImg,
        x: boardwidth/2,
        y: boardheight - 150,
        width: platformWidth,
        height: platformHeight
    }

    platformArray.push(platform);


}