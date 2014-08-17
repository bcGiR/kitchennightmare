// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.height = 512;
canvas.width = 480;
var height = canvas.height;
var width = canvas.width;
document.body.appendChild(canvas);

// Background Image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
}
bgImage.src = "images/floor.png"

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

// Oven Image
var ovenReady = false;
var ovenImage = new Image();
ovenImage.onload = function () {
    ovenReady = true;
}
ovenImage.src = "images/oven.png";

// Grill Image
var grillReady = false;
var grillImage = new Image();
grillImage.onload = function () {
    grillReady = true;
}
grillImage.src = "images/grill.png";

// Fryer Image
var fryerReady = false;
var fryerImage = new Image();
fryerImage.onload = function () {
    fryerReady = true; 
}
fryerImage.src = "images/fryer.png";

// Cooler Image
var coolerReady = false;
var coolerImage = new Image();
coolerImage.onload = function () {
    coolerReady = true;
}
coolerImage.src = "images/cooler.png";

// Game objects
var chef = {
    speed: 256, // Movement in pixels per second
    direction: 'front' // Which way the chef is facing
};
var oven = {};
var grill = {};
var fryer1 = {};
var fryer2 = {};
var cooler = {};

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
    chef.x = width / 2;
    chef.y = height / 2;
    oven.x = 4;
    oven.y = height - 132;
    grill.x = 4;
    grill.y = oven.y - 132;
    fryer1.y = grill.y - 68;
    fryer1.x = 16;
    fryer2.y = fryer1.y - 68;
    fryer2.x = 16;
    cooler.x = width - 132;
    cooler.y = 132;
};

var update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        chef.y -= chef.speed * modifier;
        chef.direction = 'back';
    }
    if (40 in keysDown) { // Player holding down
        chef.y += chef.speed * modifier;
        chef.direction = 'front';
    }
    if (37 in keysDown) { // Player holding left
        chef.x -= chef.speed * modifier;
        chef.direction = 'left';
    }
    if (39 in keysDown) { // Player holding right
        chef.x += chef.speed * modifier;
        chef.direction = 'right';
    }
};

// Draw everything
var render = function () {
    // Draw Background
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    // Draw Chef
    switch (chef.direction) {
        case 'front':
            if (chefFrontReady) {
                ctx.drawImage(chefFrontImage, chef.x, chef.y);
                }
            break;
        case 'back':
            if (chefBackReady) {
                ctx.drawImage(chefBackImage, chef.x, chef.y);
            }
            break;
        case 'left':
            if (chefLeftReady) {
                ctx.drawImage(chefLeftImage, chef.x, chef.y);
            }
            break;
        case 'right':
            if (chefRightReady) {
                ctx.drawImage(chefRightImage, chef.x, chef.y);
            }
            break;
    }

    // Draw Oven
    if (ovenReady) {
        ctx.drawImage(ovenImage, oven.x, oven.y);
    }

    // Draw Grill
    if (grillReady) {
        ctx.drawImage(grillImage, grill.x, grill.y);
    }

    // Draw Fryer1
    if (fryerReady) {
        ctx.drawImage(fryerImage, fryer1.x, fryer1.y);
    }

    // Draw Fryer2
    if (fryerReady) {
        ctx.drawImage(fryerImage, fryer2.x, fryer2.y);
    }

    // Draw Cooler
    if (coolerReady) {
        ctx.drawImage(coolerImage, cooler.x, cooler.y)
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
