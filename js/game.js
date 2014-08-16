// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.height = 800px;
canvas.width = 600px;
document.body.appendChild(canvas);

// Background Image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
}
bgImage.src = "images/kitchenfloor.png"

// Chef Front Image
var chefFrontReady = false;
var chefFrontImage = new Image();
chefFrontImage.onload = function () {
    chefFrontReady = true;
}
chefFrontImage.src = "images/cheffront.png";

// Chef Right Image
var chefRightReady = false;
var chefRightImage = new Image();
chefRightImage.onload = function () {
    chefRightReady = true;
}
chefRightImage.src = "images/chefright.png";

// Chef Left Image
var chefLeftReady = false;
var chefLeftImage = new Image();
chefLeftImage.onload = function () {
    chefLeftReady = true;
}
chefLeftImage.src = "images/chefleft.png";

// Chef Back Image
var chefBackReady = false;
var chefBackImage = new Image();
chefBackImage.onload = function () {
    chefBackReady = true;
}
chefBackImage.src = "images/chefback.png";

// Game objects
var chef = {
    speed: 256, // Movement in pixels per second
    direction: front // Which way the chef is facing
}

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
    }, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
    }, false);

// Resets the game; places the chef in the middle of the kitchen
var reset = function () {
    chef.x = canvas.width / 2;
    chef.y = canvas.height / 2;
}

var update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        chef.y -= chef.speed * modifier;
        chef.direction = back;
    }
    if (40 in keysDown) { // Player holding down
        chef.y += chef.speed * modifier;
        chef.direction = front;
    }
    if (37 in keysDown) { // Player holding left
        chef.x -= chef.speed * modifier;
        chef.direction = left;
    }
    if (39 in keysDown) { // Player holding right
        chef.x += chef.speed * modifier;
        chef.direction = right;
    }
};

// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    switch (chef.direction) {
        case front:
            if (chefFrontReady) {
                ctx.drawImage(chefFrontImage, chef.x, chef.y);
                }
            break;
        case back:
            if (chefBackReady) {
                ctx.drawImage(chefBackImage, chef.x, chef.y);
            }
            break;
        case left:
            if (chefLeftReady) {
                ctx.drawImage(chefLeftImage, chef.x, chef.y);
            }
            break;
        case right:
            if (chefRightReady) {
                ctx.drawImage(chefRightImage, chef.x, chef.y);
            }
            break;
    }
};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
