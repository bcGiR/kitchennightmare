// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.height = 512;
canvas.width = 480;
var height = canvas.height;
var width = canvas.width;
document.body.appendChild(canvas);

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
var fridge = {};
var pass = {};

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
    }, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
    }, false);

// Resets the game; places the chef in the middle of the kitchen
var init = function () {
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
    cooler.y = 116;
    fridge.x = 132;
    fridge.y = 4;
    pass.x = width - 132;
    pass.y = height - 260;

    main();
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
    if (chef.x < 0) {
        chef.x = 0;
    }
    if (chef.x > width - 64) {
        chef.x = width - 64;
    }
    if (chef.y < 0) {
        chef.y = 0;
    }
    if (chef.y > height - 64) {
        chef.y = height - 64;
    }
};

// Draw everything
var render = function () {
    // Draw Background
        ctx.drawImage(resources.get('images/floor.png'), 0, 0);

    // Draw Oven
        ctx.drawImage(resources.get('images/oven.png'), oven.x, oven.y);

    // Draw Grill
        ctx.drawImage(resources.get('images/grill.png'), grill.x, grill.y);

    // Draw Fryer1
        ctx.drawImage(resources.get('images/fryer.png'), fryer1.x, fryer1.y);

    // Draw Fryer2
        ctx.drawImage(resources.get('images/fryer.png'), fryer2.x, fryer2.y);

    // Draw Cooler
        ctx.drawImage(resources.get('images/cooler.png'), cooler.x, cooler.y);

    // Draw Fridge
        ctx.drawImage(resources.get('images/fridge.png'), fridge.x, fridge.y);

    // Draw Pass
        ctx.drawImage(resources.get('images/pass.png'), pass.x, pass.y);

    // Draw Chef
    switch (chef.direction) {
        case 'front':
                ctx.drawImage(resources.get('images/cheffront.png'), chef.x, chef.y);
            break;
        case 'back':
                ctx.drawImage(resources.get('images/chefback.png'), chef.x, chef.y);
            break;
        case 'left':
                ctx.drawImage(resources.get('images/chefleft.png'), chef.x, chef.y);
            break;
        case 'right':
                ctx.drawImage(resources.get('images/chefright.png'), chef.x, chef.y);
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

resources.load([
        'images/floor.png',
        'images/cheffront.png',
        'images/chefback.png',
        'images/chefright.png',
        'images/chefleft.png',
        'images/cooler.png',
        'images/fridge.png',
        'images/grill.png',
        'images/oven.png',
        'images/pass.png',
        'images/fryer.png'
        ]);
var then = Date.now();
resources.onReady(init);
