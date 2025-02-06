let noCount = 0;
const responses = [
    "adam pidikkaadha, say yes so that I can give you more of my love ❤️",
    "YES sollu pleeeeeeeeeease 🥺",
    "nee YES solra varaiku vida maaten 😗",
    "innum evlo neram NO solra nu papom 😒",
    "please chellam I'll be sad 🥺",
    "marubudiyum NO ah? 😭",
    "I'll wait, i have all the time in the world 😁"
];

function initializePage() {
    playBackgroundMusic();
    generateStationaryHearts();
}

function playSound() {
    let sound = document.getElementById("click-sound");
    sound.pause();
    sound.currentTime = 0;
    sound.volume = 0.2;
    sound.play();
}

function playBackgroundMusic() {
    let bgMusic = document.getElementById("bg-music");
    bgMusic.volume = 0.5;
    bgMusic.play().catch(error => console.log("Autoplay blocked: ", error));
    document.addEventListener("click", () => bgMusic.play(), { once: true });
}

function openLetter() {
    playSound();
    document.getElementById("seal-img").style.display = "none";
    document.getElementById("envelope-img").style.display = "none";

    let letter = document.getElementById("letter-content");
    letter.classList.remove("hidden");
    letter.classList.add("show");
}

function answerYes() {
    playSound();
    document.getElementById("yes-btn").style.display = "none";
    document.getElementById("no-btn").style.display = "none";
    document.getElementById("response-text").classList.remove("hidden");
    document.getElementById("rose-img").classList.remove("hidden");

    if (noCount === 0) {
        document.getElementById("response-text").innerText = "Yay! I am honoured!";
    } else {
        document.getElementById("response-text").innerText = "Haha I knew you would come around! I am honoured!";
    }

    // Show "Get Asked Again" button under the letter
    setTimeout(() => {
        let restartBtn = document.getElementById("restart");
        restartBtn.classList.remove("hidden");
        restartBtn.style.display = "block";
    }, 1000);
}

function answerNo() {
    playSound();
    document.getElementById("response-text").classList.remove("hidden");

    document.getElementById("response-text").innerText = responses[noCount % responses.length];
    noCount++;
}

function generateStationaryHearts() {
    const heartsContainer = document.querySelector(".hearts-container");
    heartsContainer.innerHTML = "";

    const numHearts = 20;
    const gridSize = Math.ceil(Math.sqrt(numHearts));
    const spacingX = 100 / gridSize;
    const spacingY = 100 / gridSize;

    let positions = new Set();

    for (let i = 0; i < numHearts; i++) {
        let heart = document.createElement("img");
        heart.src = "things/hearts.png";
        heart.classList.add("heart");

        let row, col, position;
        do {
            row = Math.floor(Math.random() * gridSize);
            col = Math.floor(Math.random() * gridSize);
            position = `${row}-${col}`;
        } while (positions.has(position));

        positions.add(position);

        // Ensure hearts are spread from top to bottom
        let topOffset = row * spacingY + Math.random() * (spacingY * 0.6);
        let leftOffset = col * spacingX + Math.random() * (spacingX * 0.6);

        heart.style.top = `${topOffset}vh`;
        heart.style.left = `${leftOffset}vw`;

        let size = Math.random() * 20 + 70;
        heart.style.width = `${size}px`;

        heartsContainer.appendChild(heart);
    }
}