const canvas =
    document.getElementById("gameCanvas");

const ctx =
    canvas.getContext("2d");


const WIDTH = canvas.width;
const HEIGHT = canvas.height;


/* =========================
   INTERFAZ
========================= */

const scoreElement =
    document.getElementById("score");

const bestElement =
    document.getElementById("best");

const livesElement =
    document.getElementById("lives");

const startScreen =
    document.getElementById("startScreen");

const gameOverScreen =
    document.getElementById("gameOver");

const finalScoreElement =
    document.getElementById("finalScore");

const startButton =
    document.getElementById("startButton");

const restartButton =
    document.getElementById("restartButton");


/* =========================
   ESTADO DEL JUEGO
========================= */

let gameRunning = false;

let score = 0;

let lives = 3;

let best =
    Number(
        localStorage.getItem(
            "neonVelocityBest"
        )
    ) || 0;

let difficulty = 1;

let lastTime = 0;

let enemyTimer = 0;

let screenShake = 0;


/* =========================
   DIRECCIONES
========================= */

const DIRECTIONS = {

    up: {
        x: 0,
        y: -1
    },

    down: {
        x: 0,
        y: 1
    },

    left: {
        x: -1,
        y: 0
    },

    right: {
        x: 1,
        y: 0
    }

};


/* =========================
   ESTRELLAS
========================= */

let stars = [];

for(let i = 0; i < 120; i++) {

    stars.push({

        x: Math.random() * WIDTH,

        y: Math.random() * HEIGHT,

        size: Math.random() * 2,

        alpha:
            Math.random() * .7

    });

}


/* =========================
   PARTÍCULAS
========================= */

let particles = [];


/* =========================
   CLASE TRAIL
========================= */

class Trail {

    constructor(x, y, color) {

        this.points = [
            {
                x,
                y
            }
        ];

        this.color = color;

    }


    add(x, y) {

        const last =
            this.points[
                this.points.length - 1
            ];

        if(
            !last ||
            Math.hypot(
                x - last.x,
                y - last.y
            ) > 5
        ) {

            this.points.push({
                x,
                y
            });

        }


        if(this.points.length > 1000) {

            this.points.shift();

        }

    }


    draw(alpha = 1) {

        if(this.points.length < 2)
            return;


        ctx.save();


        ctx.globalAlpha = alpha;


        ctx.lineCap = "round";

        ctx.lineJoin = "round";


        /*
        EFECTO GLOW
        */

        ctx.shadowColor =
            this.color;

        ctx.shadowBlur = 25;


        ctx.strokeStyle =
            this.color;

        ctx.lineWidth = 10;


        ctx.beginPath();


        this.points.forEach(
            (point, index) => {

                if(index === 0) {

                    ctx.moveTo(
                        point.x,
                        point.y
                    );

                } else {

                    ctx.lineTo(
                        point.x,
                        point.y
                    );

                }

            }
        );


        ctx.stroke();


        /*
        LÍNEA BLANCA CENTRAL
        */

        ctx.shadowBlur = 0;

        ctx.lineWidth = 3;

        ctx.strokeStyle = "white";

        ctx.globalAlpha =
            .75 * alpha;

        ctx.stroke();


        ctx.restore();

    }

}


/* =========================
   CLASE MOTO
========================= */

class Bike {

    constructor(
        x,
        y,
        color,
        player = false
    ) {

        this.x = x;

        this.y = y;

        this.color = color;

        this.player = player;

        this.direction =
            DIRECTIONS.right;

        this.nextDirection =
            DIRECTIONS.right;

        this.speed =
            player
                ? 240
                : 150;

        this.alive = true;

        this.trail =
            new Trail(
                x,
                y,
                color
            );

    }


    changeDirection(direction) {

        /*
        Evita que la moto pueda
        regresar sobre sí misma.
        */

        if(
            direction.x ===
                -this.direction.x &&
            direction.y ===
                -this.direction.y
        ) {

            return;

        }


        this.nextDirection =
            direction;

    }


    update(delta) {

        if(!this.alive)
            return;


        this.direction =
            this.nextDirection;


        this.x +=
            this.direction.x *
            this.speed *
            delta;


        this.y +=
            this.direction.y *
            this.speed *
            delta;


        this.trail.add(
            this.x,
            this.y
        );

    }


    draw() {

        if(!this.alive)
            return;


        ctx.save();


        ctx.translate(
            this.x,
            this.y
        );


        const angle =
            Math.atan2(
                this.direction.y,
                this.direction.x
            );


        ctx.rotate(angle);


        /*
        GLOW
        */

        ctx.shadowColor =
            this.color;

        ctx.shadowBlur = 30;


        /*
        CUERPO
        */

        ctx.fillStyle =
            this.color;


        ctx.beginPath();


        ctx.moveTo(22, 0);

        ctx.lineTo(-12, -8);

        ctx.lineTo(-20, 0);

        ctx.lineTo(-12, 8);


        ctx.closePath();


        ctx.fill();


        /*
        PARTE OSCURA
        */

        ctx.shadowBlur = 0;

        ctx.fillStyle =
            "#061019";


        ctx.beginPath();

        ctx.moveTo(10, 0);

        ctx.lineTo(-9, -5);

        ctx.lineTo(-12, 0);

        ctx.lineTo(-9, 5);

        ctx.closePath();

        ctx.fill();


        /*
        LUZ FRONTAL
        */

        ctx.fillStyle =
            "white";


        ctx.fillRect(
            5,
            -2,
            13,
            4
        );


        ctx.restore();

    }

}


/* =========================
   JUGADOR
========================= */

let player;


/* =========================
   ENEMIGOS
========================= */

let enemies = [];


/* =========================
   REINICIAR MUNDO
========================= */

function resetGame() {

    score = 0;

    lives = 3;

    difficulty = 1;

    enemyTimer = 1;

    screenShake = 0;


    player =
        new Bike(
            180,
            HEIGHT / 2,
            "#00f7ff",
            true
        );


    enemies = [];

    particles = [];


    updateHUD();

}


/* =========================
   HUD
========================= */

function updateHUD() {

    scoreElement.textContent =
        String(
            Math.floor(score)
        ).padStart(6, "0");


    bestElement.textContent =
        String(best)
            .padStart(6, "0");


    livesElement.textContent =
        lives > 0
            ? "♥ ".repeat(lives)
            : "—";

}


/* =========================
   CREAR ENEMIGO
========================= */

function createEnemy() {

    const side =
        Math.floor(
            Math.random() * 4
        );


    let x;

    let y;

    let direction;


    if(side === 0) {

        x = 30;

        y =
            Math.random() *
            HEIGHT;

        direction =
            DIRECTIONS.right;

    }

    else if(side === 1) {

        x = WIDTH - 30;

        y =
            Math.random() *
            HEIGHT;

        direction =
            DIRECTIONS.left;

    }

    else if(side === 2) {

        x =
            Math.random() *
            WIDTH;

        y = 30;

        direction =
            DIRECTIONS.down;

    }

    else {

        x =
            Math.random() *
            WIDTH;

        y =
            HEIGHT - 30;

        direction =
            DIRECTIONS.up;

    }


    const colors = [

        "#ff168b",

        "#9b30ff",

        "#ff542e"

    ];


    const enemy =
        new Bike(
            x,
            y,
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ]
        );


    enemy.direction =
        direction;

    enemy.nextDirection =
        direction;


    enemy.speed =
        130 +
        Math.random() * 70 +
        difficulty * 7;


    enemies.push(enemy);

}


/* =========================
   PARTÍCULAS
========================= */

function explosion(
    x,
    y,
    color
) {

    for(
        let i = 0;
        i < 40;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI * 2;


        const speed =
            50 +
            Math.random() *
            250;


        particles.push({

            x,

            y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life:
                .5 +
                Math.random() *
                .6,

            color

        });

    }

}


/* =========================
   COLISIÓN CON ESTELA
========================= */

function hitTrail(
    x,
    y,
    trail,
    skip
) {

    const points =
        trail.points;


    for(
        let i = 0;
        i <
        points.length - skip;
        i += 2
    ) {

        const point =
            points[i];


        const distance =
            Math.hypot(
                x - point.x,
                y - point.y
            );


        if(distance < 13)
            return true;

    }


    return false;

}


/* =========================
   DAÑO AL JUGADOR
========================= */

function playerCrash() {

    if(!player.alive)
        return;


    player.alive = false;


    explosion(
        player.x,
        player.y,
        player.color
    );


    screenShake = 15;


    lives--;


    updateHUD();


    if(lives <= 0) {

        setTimeout(
            gameOver,
            700
        );

        return;

    }


    setTimeout(
        () => {

            player =
                new Bike(
                    180,
                    HEIGHT / 2,
                    "#00f7ff",
                    true
                );

        },
        700
    );

}


/* =========================
   IA ENEMIGOS
========================= */

function enemyAI(enemy) {

    const margin = 90;


    const nearBorder =
        enemy.x < margin ||
        enemy.x >
            WIDTH - margin ||
        enemy.y < margin ||
        enemy.y >
            HEIGHT - margin;


    if(
        nearBorder ||
        Math.random() < .01
    ) {

        const possible = [];


        if(enemy.direction.x !== 0) {

            possible.push(
                DIRECTIONS.up,
                DIRECTIONS.down
            );

        }

        else {

            possible.push(
                DIRECTIONS.left,
                DIRECTIONS.right
            );

        }


        const direction =
            possible[
                Math.floor(
                    Math.random() *
                    possible.length
                )
            ];


        enemy.changeDirection(
            direction
        );

    }

}


/* =========================
   UPDATE
========================= */

function update(delta) {

    difficulty +=
        delta * .02;


    score +=
        delta *
        (8 + difficulty * 2);


    /*
    GENERACIÓN DE ENEMIGOS
    */

    enemyTimer -= delta;


    if(enemyTimer <= 0) {

        createEnemy();


        enemyTimer =
            Math.max(
                .6,
                2 -
                difficulty * .12
            );

    }


    /*
    JUGADOR
    */

    player.update(delta);


    /*
    BORDE DEL MAPA
    */

    if(
        player.x < 25 ||
        player.x > WIDTH - 25 ||
        player.y < 25 ||
        player.y > HEIGHT - 25
    ) {

        playerCrash();

    }


    /*
    COLISIÓN CON SU PROPIA ESTELA
    */

    if(
        hitTrail(
            player.x,
            player.y,
            player.trail,
            35
        )
    ) {

        playerCrash();

    }


    /*
    ENEMIGOS
    */

    enemies.forEach(
        enemy => {

            enemyAI(enemy);

            enemy.update(delta);


            /*
            SI SALE DEL MAPA
            */

            if(
                enemy.x < 25 ||
                enemy.x >
                    WIDTH - 25 ||
                enemy.y < 25 ||
                enemy.y >
                    HEIGHT - 25
            ) {

                enemy.direction = {

                    x:
                        -enemy.direction.x,

                    y:
                        -enemy.direction.y

                };

                enemy.nextDirection =
                    enemy.direction;

            }


            /*
            ENEMIGO CONTRA ESTELA
            */

            if(
                hitTrail(
                    enemy.x,
                    enemy.y,
                    player.trail,
                    20
                )
            ) {

                explosion(
                    enemy.x,
                    enemy.y,
                    enemy.color
                );


                enemy.alive = false;


                score += 250;

            }


            /*
            ENEMIGO CONTRA SU PROPIA ESTELA
            */

            else if(
                hitTrail(
                    enemy.x,
                    enemy.y,
                    enemy.trail,
                    25
                )
            ) {

                explosion(
                    enemy.x,
                    enemy.y,
                    enemy.color
                );


                enemy.alive = false;


                score += 150;

            }

        }
    );


    enemies =
        enemies.filter(
            enemy =>
                enemy.alive
        );


    /*
    PARTÍCULAS
    */

    particles.forEach(
        particle => {

            particle.x +=
                particle.vx *
                delta;

            particle.y +=
                particle.vy *
                delta;


            particle.vx *= .97;

            particle.vy *= .97;


            particle.life -=
                delta;

        }
    );


    particles =
        particles.filter(
            particle =>
                particle.life > 0
        );


    screenShake *= .88;


    updateHUD();

}


/* =========================
   FONDO
========================= */

function drawBackground() {

    ctx.fillStyle =
        "#02030a";


    ctx.fillRect(
        0,
        0,
        WIDTH,
        HEIGHT
    );


    /*
    GRADIENTE
    */

    const gradient =
        ctx.createRadialGradient(
            WIDTH / 2,
            HEIGHT / 2,
            20,
            WIDTH / 2,
            HEIGHT / 2,
            700
        );


    gradient.addColorStop(
        0,
        "rgba(20,15,60,.8)"
    );


    gradient.addColorStop(
        1,
        "rgba(0,0,5,1)"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        WIDTH,
        HEIGHT
    );


    /*
    ESTRELLAS
    */

    stars.forEach(
        star => {

            ctx.globalAlpha =
                star.alpha;

            ctx.fillStyle =
                "#9eefff";


            ctx.fillRect(
                star.x,
                star.y,
                star.size,
                star.size
            );

        }
    );


    ctx.globalAlpha = 1;


    /*
    GRID
    */

    const size = 60;


    ctx.strokeStyle =
        "rgba(0,247,255,.12)";


    ctx.lineWidth = 1;


    for(
        let x = 0;
        x < WIDTH;
        x += size
    ) {

        ctx.beginPath();

        ctx.moveTo(
            x,
            0
        );

        ctx.lineTo(
            x,
            HEIGHT
        );

        ctx.stroke();

    }


    for(
        let y = 0;
        y < HEIGHT;
        y += size
    ) {

        ctx.beginPath();

        ctx.moveTo(
            0,
            y
        );

        ctx.lineTo(
            WIDTH,
            y
        );

        ctx.stroke();

    }


    /*
    BORDE
    */

    ctx.save();


    ctx.shadowColor =
        "#00f7ff";

    ctx.shadowBlur = 20;


    ctx.strokeStyle =
        "#00f7ff";


    ctx.globalAlpha = .7;


    ctx.strokeRect(
        25,
        25,
        WIDTH - 50,
        HEIGHT - 50
    );


    ctx.restore();

}


/* =========================
   DIBUJAR
========================= */

function draw() {

    ctx.save();


    /*
    SHAKE
    */

    if(screenShake > 1) {

        ctx.translate(
            (Math.random() - .5) *
            screenShake,

            (Math.random() - .5) *
            screenShake
        );

    }


    drawBackground();


    /*
    ESTELAS
    */

    player.trail.draw();


    enemies.forEach(
        enemy =>
            enemy.trail.draw(.9)
    );


    /*
    PARTÍCULAS
    */

    particles.forEach(
        particle => {

            ctx.save();


            ctx.globalAlpha =
                Math.max(
                    0,
                    particle.life
                );


            ctx.fillStyle =
                particle.color;


            ctx.shadowColor =
                particle.color;


            ctx.shadowBlur = 15;


            ctx.fillRect(
                particle.x,
                particle.y,
                3,
                3
            );


            ctx.restore();

        }
    );


    /*
    MOTOS
    */

    player.draw();


    enemies.forEach(
        enemy =>
            enemy.draw()
    );


    /*
    SCANLINES
    */

    ctx.fillStyle =
        "rgba(255,255,255,.015)";


    for(
        let y = 0;
        y < HEIGHT;
        y += 5
    ) {

        ctx.fillRect(
            0,
            y,
            WIDTH,
            1
        );

    }


    ctx.restore();

}


/* =========================
   GAME OVER
========================= */

function gameOver() {

    gameRunning = false;


    const finalScore =
        Math.floor(score);


    if(
        finalScore > best
    ) {

        best =
            finalScore;


        localStorage.setItem(
            "neonVelocityBest",
            best
        );

    }


    finalScoreElement.textContent =
        finalScore;


    updateHUD();


    gameOverScreen
        .classList
        .remove("hidden");

}


/* =========================
   INICIAR
========================= */

function startGame() {

    resetGame();


    gameRunning = true;


    startScreen
        .classList
        .add("hidden");


    gameOverScreen
        .classList
        .add("hidden");

}


/* =========================
   CONTROLES
========================= */

window.addEventListener(
    "keydown",
    event => {

        const key =
            event.key.toLowerCase();


        if(
            [
                "w",
                "a",
                "s",
                "d",
                "r"
            ].includes(key)
        ) {

            event.preventDefault();

        }


        if(!player)
            return;


        if(key === "w") {

            player.changeDirection(
                DIRECTIONS.up
            );

        }


        if(key === "s") {

            player.changeDirection(
                DIRECTIONS.down
            );

        }


        if(key === "a") {

            player.changeDirection(
                DIRECTIONS.left
            );

        }


        if(key === "d") {

            player.changeDirection(
                DIRECTIONS.right
            );

        }


        if(key === "r") {

            startGame();

        }

    }
);


/* =========================
   BOTONES
========================= */

startButton.addEventListener(
    "click",
    startGame
);


restartButton.addEventListener(
    "click",
    startGame
);


/* =========================
   GAME LOOP
========================= */

function gameLoop(time) {

    const delta =
        Math.min(
            .033,
            (time - lastTime) / 1000 || 0
        );


    lastTime = time;


    if(gameRunning) {

        update(delta);

    }


    draw();


    requestAnimationFrame(
        gameLoop
    );

}


/* =========================
   INICIO
========================= */

resetGame();

requestAnimationFrame(
    gameLoop
);
