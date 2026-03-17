// --- Lógica de la Cuenta Regresiva ---

const countdown = () => {
    const countDate = new Date('July 15, 2026 00:00:00');
    // ESTABLECE AQUÍ LA FECHA REAL DEL CUMPLEAÑOS (ej: 'July 15, 2024 00:00:00')
    // Actualmente está configurada para 24 horas después de cargar la página.
    countDate.setDate(countDate.getDate() + 1); 

    const now = new Date().getTime();
    const gap = countDate - now;

    // Cálculos de tiempo
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Calcular días, horas, minutos y segundos restantes
    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    // Actualizar el HTML
    document.getElementById('days').innerText = textDay < 10 ? '0' + textDay : textDay;
    document.getElementById('hours').innerText = textHour < 10 ? '0' + textHour : textHour;
    document.getElementById('minutes').innerText = textMinute < 10 ? '0' + textMinute : textMinute;
    document.getElementById('seconds').innerText = textSecond < 10 ? '0' + textSecond : textSecond;

    // Si la cuenta regresiva termina
    if (gap <= 0) {
        document.getElementById('countdown').innerText = "¡FELIZ CUMPLEAÑOS!";
    }
};

// Ejecutar la función cada segundo
setInterval(countdown, 1000);
countdown(); // Ejecutar una vez al inicio para evitar el retraso de 1s


// --- Lógica del Pastel y la Vela ---

const blowButton = document.getElementById('blow-button');
const flame = document.querySelector('.flame');

blowButton.addEventListener('click', () => {
    flame.classList.add('blown-out');
    blowButton.innerText = "¡Deseo Pedido!";
    blowButton.style.backgroundColor = "#666"; // Deshabilitar visualmente
    blowButton.disabled = true;

    // Lanzar más confeti al soplar
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
});


// --- Lógica del Confeti ---

const confettiContainer = document.getElementById('confetti-container');
const colors = ['#f472b6', '#be185d', '#fbbf24', '#38bdf8', '#a78bfa']; // Rosa, fucsia, amarillo, azul, morado

const createConfetti = () => {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    
    // Propiedades aleatorias
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's'; // Entre 2s y 5s
    confetti.style.opacity = Math.random();
    const size = Math.random() * 10 + 5 + 'px'; // Entre 5px y 15px
    confetti.style.width = size;
    confetti.style.height = size;

    confettiContainer.appendChild(confetti);

    // Eliminar el confeti después de que termine la animación
    setTimeout(() => {
        confetti.remove();
    }, 5000);
};

// Generar confeti continuamente al inicio
setInterval(createConfetti, 150);