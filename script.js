const screens = document.querySelectorAll(".screen");
const chooseInsectButtons = document.querySelectorAll(".choose-insect-btn");
const startButton = document.getElementById("start-btn");
const gameContainer = document.getElementById("game-container");
const timeElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const message = document.getElementById("message");
let seconds = 30; // Countdown starts from 30 seconds
let score = 0;
let selectedInsect = {};
let gameTimer;
let isGameOver = false; // Track if the game is over

startButton.addEventListener("click", () => screens[0].classList.add("up"));

const increaseScore = () => {
  if (isGameOver) return; // Prevent score increase after game over
  score++;
  if (score > 19) message.classList.add("visible");
  scoreElement.innerHTML = `Score: ${score}`;
};

const addInsects = () => {
  if (isGameOver) return; // Prevent new insects after game over
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1500);
};

const catchInsect = function () {
  if (isGameOver) return; // Prevent catching insects after game over
  increaseScore();
  this.classList.add("caught");
  setTimeout(() => this.remove(), 2000);
  addInsects();
};

const getRandomLocation = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
};

const createInsect = () => {
  if (isGameOver) return; // Prevent creating insects after game over
  const insect = document.createElement("div");
  insect.classList.add("insect");
  const { x, y } = getRandomLocation();
  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;
  insect.innerHTML = `<img src="${selectedInsect.src}" 
  alt="${selectedInsect.alt}" 
  style="transform: rotate(${Math.random() * 360}deg)" />`;
  insect.addEventListener("click", catchInsect);
  gameContainer.appendChild(insect);
};

const decreaseTime = () => {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeElement.innerHTML = `Time: ${m}:${s}`;
  seconds--;

  if (seconds < 0) {
    clearInterval(gameTimer);
    endGame();
  }
};

const endGame = () => {
  isGameOver = true; // Set game over flag
  message.innerHTML = `Game Over! <br /> Your Score: ${score}`;
  message.classList.add("visible");
  // Disable interaction with insects
  document.querySelectorAll(".insect").forEach((insect) => {
    insect.style.pointerEvents = "none"; // Disable clicking on insects
  });
};

const startGame = () => {
  gameTimer = setInterval(decreaseTime, 1000);
};

chooseInsectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    const src = image.getAttribute("src");
    const alt = image.getAttribute("alt");
    selectedInsect = { src, alt };
    screens[1].classList.add("up");
    setTimeout(createInsect, 1000);
    startGame();
  });
});
