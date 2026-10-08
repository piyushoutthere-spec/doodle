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

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveDoodler);
}
function update(){
    requestAnimationFrame(update);
    //doodler
    doodler.x += velocityX;
    context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);
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