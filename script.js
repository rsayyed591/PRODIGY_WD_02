/*  script.js  */ 
let startTime;
let interval;
let running = false;
let lapCounter = 0;
let pausedTime = 0; 
let accumulatedTime = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapsList = document.getElementById('laps');
const lapButton = document.getElementById('lap');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
  if (!running) {
    startTime = Date.now() - accumulatedTime;
    interval = setInterval(updateDisplay, 10);
    running = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
  }
}

function pause() {
  if (running) {
    clearInterval(interval);
    accumulatedTime += Date.now() - startTime;
    interval = null;
    running = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
  }
}

function reset() {
  clearInterval(interval);
  interval = null;
  running = false;
  display.textContent = '00:00:00';
  startButton.disabled = false;
  pauseButton.disabled = true;
  lapsList.innerHTML = '';
}

function updateDisplay() {
  const elapsed = Date.now() - startTime;
  const formattedTime = formatTime(elapsed);
  display.textContent = formattedTime;
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const millis = milliseconds % 1000;

  return `${pad(minutes)}:${pad(seconds)}:${pad(millis, 3)}`;
}

function pad(num, size = 2) {
  let s = num.toString();
  while (s.length < size) {
    s = '0' + s;
  }
  return s;
}

function lap() {
  if (running) {
    const lapTime = display.textContent;
    lapCounter++;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapsList.appendChild(lapItem);
  }
}
