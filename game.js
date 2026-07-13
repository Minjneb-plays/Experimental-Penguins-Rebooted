const player = document.getElementById("player");
const sprite = document.getElementById("sprite");
const nameDiv = document.getElementById("name");
const room = localStorage.getItem("room") || "snow";

nameDiv.textContent = localStorage.getItem("penguinName") || "Penguin";

const game = document.getElementById("game");

loadRoom();

function loadRoom(){

    switch(room){

        case "snow":
            game.style.background = "white";
            break;

        case "north":
            game.style.background = "#dfefff";
            break;

        case "crash":
            game.style.background = "#eeeeee";
            break;

    }

}

let x = 500;
let y = 300;

let targetX = x;
let targetY = y;

const speed = 2.5;

document.getElementById("game").addEventListener("click", (e) => {

    targetX = e.clientX;
    targetY = e.clientY;

});

let lastTime = performance.now();

function update(currentTime){

    const delta = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    const dx = targetX - x;
    const dy = targetY - y;

    const distance = Math.hypot(dx, dy);

    const speed = 180; // pixels per second

    if(distance > 1){

        const move = Math.min(speed * delta, distance);

        x += dx / distance * move;
        y += dy / distance * move;

        updateDirection(dx, dy);

    }

    player.style.left = x + "px";
    player.style.top = y + "px";

    requestAnimationFrame(update);
}

requestAnimationFrame(update);

function updateDirection(dx, dy) {

    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    // Right
    if (angle >= -22.5 && angle < 22.5) {
        sprite.src = "assets/penguin/Left.png";
        sprite.style.transform = "scaleX(-1)";
    }

    // Down-right
    else if (angle >= 22.5 && angle < 67.5) {
        sprite.src = "assets/penguin/Diagonal_fwd.png";
        sprite.style.transform = "scaleX(1)";
    }

    // Down
    else if (angle >= 67.5 && angle < 112.5) {
        sprite.src = "assets/penguin/Front.png";
        sprite.style.transform = "scaleX(1)";
    }

    // Down-left
    else if (angle >= 112.5 && angle < 157.5) {
        sprite.src = "assets/penguin/Diagonal_fwd.png";
        sprite.style.transform = "scaleX(-1)";
    }

    // Left
    else if (angle >= 157.5 || angle < -157.5) {
        sprite.src = "assets/penguin/Left.png";
        sprite.style.transform = "scaleX(1)";
    }

    // Up-left
    else if (angle >= -157.5 && angle < -112.5) {
        sprite.src = "assets/penguin/Back.png";
        sprite.style.transform = "scaleX(1)";
    }

    // Up
    else if (angle >= -112.5 && angle < -67.5) {
        sprite.src = "assets/penguin/Back.png";
        sprite.style.transform = "scaleX(1)";
    }

    // Up-right
    else {
        sprite.src = "assets/penguin/Back.png";
        sprite.style.transform = "scaleX(-1)";
    }

}

update();