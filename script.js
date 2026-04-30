// --- Lógica de la Cuenta Regresiva ---



const countdown = () => {
    const countDate = new Date('July 15, 2026 00:00:00');
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    document.getElementById('days').innerText = textDay < 10 ? '0' + textDay : textDay;
    document.getElementById('hours').innerText = textHour < 10 ? '0' + textHour : textHour;
    document.getElementById('minutes').innerText = textMinute < 10 ? '0' + textMinute : textMinute;
    document.getElementById('seconds').innerText = textSecond < 10 ? '0' + textSecond : textSecond;

    if (gap <= 0) {
        document.getElementById('countdown').innerText = "¡FELIZ CUMPLEAÑOS!";
    }
};

setInterval(countdown, 1000);
countdown();

// --- Lógica del Pastel y Redirección ---

const blowButton = document.getElementById('blow-button');
const flame = document.querySelector('.flame');

blowButton.addEventListener('click', () => {
    flame.classList.add('blown-out');
    blowButton.innerText = "¡Deseo Pedido!";
    blowButton.disabled = true;

    for (let i = 0; i < 50; i++) {
        createConfetti();
    }

    // Redirección después de 2 segundos
    setTimeout(() => {
        window.location.href = "https://www.google.com"; // CAMBIA ESTE LINK
    }, 2000);
});

// --- Lógica del Confeti ---

const confettiContainer = document.getElementById('confetti-container');
const colors = ['#f472b6', '#be185d', '#fbbf24', '#38bdf8', '#a78bfa'];

const createConfetti = () => {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    confetti.style.opacity = Math.random();
    const size = Math.random() * 10 + 5 + 'px';
    confetti.style.width = size;
    confetti.style.height = size;

    confettiContainer.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 5000);
};

setInterval(createConfetti, 150);

// --- Lógica del Minijuego (Flappy Bird) ---

const canvas = document.getElementById('flappyCanvas');
const ctx = canvas.getContext('2d');
const gameBtn = document.getElementById('start-game-btn');
const gameContainer = document.getElementById('game-container');

let birdY = 200;
let birdX = 50;
let velocity = 0;
let gravity = 0.25;
let score = 0;
let pipes = [];
let gameRunning = false;

function createPipe() {
    const gap = 120;
    const minHeight = 50;
    const height = Math.floor(Math.random() * (canvas.height - gap - minHeight * 2)) + minHeight;
    pipes.push({ x: canvas.width, y: height, gap: gap });
}

function updateGame() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Pájaro
    velocity += gravity;
    birdY += velocity;
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(birdX, birdY, 20, 20);

    // Tuberías
    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 150) {
        createPipe();
    }

    pipes.forEach((pipe, index) => {
        pipe.x -= 2;

        ctx.fillStyle = "#22c55e";
        // Tubo superior
        ctx.fillRect(pipe.x, 0, 40, pipe.y);
        // Tubo inferior
        ctx.fillRect(pipe.x, pipe.y + pipe.gap, 40, canvas.height);

        // Colisiones
        if (birdX + 20 > pipe.x && birdX < pipe.x + 40) {
            if (birdY < pipe.y || birdY + 20 > pipe.y + pipe.gap) {
                gameOver();
            }
        }

        if (pipe.x === birdX) score++;

        if (pipe.x + 40 < 0) pipes.splice(index, 1);
    });

    // Suelo/Techo
    if (birdY > canvas.height || birdY < 0) gameOver();

    // Puntaje
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText(`Puntos: ${score}`, 10, 25);

    requestAnimationFrame(updateGame);
}

function gameOver() {
    gameRunning = false;
    alert(`Juego Terminado. Puntos: ${score}`);
    resetGame();
}

function resetGame() {
    birdY = 200;
    velocity = 0;
    score = 0;
    pipes = [];
    gameBtn.innerText = "Reintentar Juego";
}

gameBtn.addEventListener('click', () => {
    gameContainer.style.display = "block";
    if (!gameRunning) {
        gameRunning = true;
        updateGame();
    }
});

window.addEventListener('keydown', (e) => { if (e.code === "Space") velocity = -5; });
canvas.addEventListener('mousedown', () => { velocity = -5; });
