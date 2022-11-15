// Define match times (in minutes)
let startHalfTime = 15; // Half length
let startSetTime = 3; // Max set length
let minimumSetTime = 1;  // Min set length
let halftimeBreakTime = 3;  // Halftime break length

// Initialize team scores
let teamOneScore = 0;
let teamTwoScore = 0;

// Calculate timing constants based off above variables
const totalHalfTime = startHalfTime * 60 * 100;
const totalSetTime = startSetTime * 60 * 100;
const minSetTime = minimumSetTime * 60 * 100;
const halfBreakTime = halftimeBreakTime * 60 * 100;

// Calculate timings based off above variables
let halfTime = totalHalfTime;
let setTime = totalSetTime;
let matchPaused = true;
let setPaused = true;
let halfBreak = false;

// Get elements from html
const teamOneScoreText = document.getElementById('team-one-score');
const teamTwoScoreText = document.getElementById('team-two-score');

const matchCountdownElem = document.getElementById('match-countdown');
const matchMillisecElem = document.getElementById('match-millisecond-countdown');
const setCountdownElem = document.getElementById('set-countdown');
const setMillisecElem = document.getElementById('set-millisecond-countdown');
const breakCountdownElem = document.getElementById('break-countdown');
const breakMillisecElem = document.getElementById('break-millisecond-countdown');

const pauseButton = document.getElementById('play-pause-button');
const pauseBackupButton = document.getElementById('pause-backup-button');
const newSetButton = document.getElementById('new-set-button');
const endHalfButton = document.getElementById('end-half-button');
const endBreakButton = document.getElementById('end-break-button');
const endMatchButton = document.getElementById('end-match-button');

const halfTimerContainer = document.getElementById('half-timer-container');
const setTimerContainer = document.getElementById('set-timer-container');
const halftimeBreakTimerContainer = document.getElementById('halftime-break-timer-container');

const headerText = document.getElementById('header-text');

// Hide unneeded by default
pauseBackupButton.style.display = "none";
endBreakButton.style.display = "none";
halftimeBreakTimerContainer.style.display = "none";
endMatchButton.style.display = "none";


// Set intervals for timer methods
setInterval(updateMatchCountdown, 10);
setInterval(updateSetCountdown, 10);

// Methods to increase team scores
function plusScoreOne(){
  teamOneScore++;
  teamOneScoreText.innerHTML = teamOneScore;
}

function plusScoreTwo(){
  teamTwoScore++;
  teamTwoScoreText.innerHTML = teamTwoScore;
}

function minusScoreOne(){
  teamOneScore = teamOneScore > 0 ? teamOneScore - 1 : teamOneScore;
  teamOneScoreText.innerHTML = teamOneScore;
}

function minusScoreTwo(){
  teamTwoScore = teamTwoScore > 0 ? teamTwoScore - 1 : teamTwoScore;
  teamTwoScoreText.innerHTML = teamTwoScore;
}

// Method that changes match timer every 10ms
function updateMatchCountdown(){

  // Calculate mins & secs from milliseconds
  const minutes = Math.floor(halfTime/6000);
  let seconds = Math.floor(halfTime % 6000 / 100);
  let milliseconds = halfTime % 100;

  // Keep zeros in seconds and milliseconds tickers
  seconds = seconds < 10 ? '0' + seconds : seconds;
  milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;

  // Format and update timer display
  matchCountdownElem.innerHTML = `${minutes}:${seconds}`;
  matchMillisecElem.innerHTML = `:${milliseconds}`;

  // Repeat for break timer (as it is reused)
  breakCountdownElem.innerHTML = `${minutes}:${seconds}`;
  breakMillisecElem.innerHTML = `:${milliseconds}`;

  // If match not paused and time not zero, reduce timer by 10ms
  if (matchPaused == false && halfTime > 0){
    halfTime--;
  }

  // If time zero, change display of timer to red
  if (halfTime == 0){
    matchCountdownElem.classList.replace("timer-text", "timer-text-red");
    matchMillisecElem.classList.replace("timer-text-small", "timer-text-small-red");

    // Also change display for break timer (as it is reused)
    breakCountdownElem.classList.replace("timer-text", "timer-text-red");
    breakMillisecElem.classList.replace("timer-text-small", "timer-text-small-red");
  }

}

// Method that changes set timer every 10ms
function updateSetCountdown(){

  // Calculate mins & secs from milliseconds
  const minutes = Math.floor(setTime/6000);
  let seconds = Math.floor(setTime % 6000 / 100);
  let milliseconds = setTime % 100;

  // Keep zeros in seconds and milliseconds tickers
  seconds = seconds < 10 ? '0' + seconds : seconds;
  milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;

  // Format and update timer display
  setCountdownElem.innerHTML = `${minutes}:${seconds}`;
  setMillisecElem.innerHTML = `:${milliseconds}`;

  // If set not paused and time not zero, reduce timer by 10ms
  if (setPaused == false && setTime > 0){
    setTime--;
  }

  // If half timer is less than 1 set length and paused, set equal to match time
  if (setPaused == true && halfTime < totalSetTime && halfTime == setTime - 1){
    setTime = halfTime;
  }

  // If time zero, change display of timer to red
  if (setTime == 0){
    setCountdownElem.classList.replace("timer-text", "timer-text-red");
    setMillisecElem.classList.replace("timer-text-small", "timer-text-small-red");
  }

}

// Method to pause and play timers
function changePauseState(){

  // Get button element from html
  const pauseButton = document.getElementById('play-pause-button');

  // Hide backup pause button
  pauseBackupButton.style.display = "none";

  // Pause and unpause logic
  if (setPaused == false){
    matchPaused = true;
    setPaused = true;
    pauseButton.innerHTML = '<i class="fa-solid fa-play"></i> <span class="button-text">start</span>';
  } else {
    matchPaused = false;
    setPaused = false;
    pauseButton.innerHTML = '<i class="fa-solid fa-pause"></i> <span class="button-text">pause</span>';
  }

}

// Method to reset set timer with various conditions
function resetSetTimer(){

  // Get button element from html
  pauseButton.innerHTML = '<i class="fa-solid fa-play"></i> <span class="button-text">start</span>'

  // Format timer colours to default on reset
  matchCountdownElem.classList.replace("timer-text-red", "timer-text");
  matchMillisecElem.classList.replace("timer-text-small-red", "timer-text-small");
  setCountdownElem.classList.replace("timer-text-red", "timer-text");
  setMillisecElem.classList.replace("timer-text-small-red", "timer-text-small");

  // Check if match timer is less than a full set
  if (halfTime <= (totalSetTime)){
    
    if (halfTime <= minSetTime){
      matchPaused = true;
      setTime = minSetTime;
      halfTime = minSetTime;
      pauseBackupButton.style.display = "none";
    } else {
      setTime = halfTime;
      lowTime = true;
      if (matchPaused == false)
        pauseBackupButton.style.display = "block";
    }
  } else {
    setTime = totalSetTime;
    if (matchPaused == false)
      pauseBackupButton.style.display = "block";
  }

  setPaused = true;

}

function backupPause(){
  matchPaused = true;
  pauseBackupButton.style.display = "none";
}

function endHalf(){

  // Hide unneeded elements
  pauseBackupButton.style.display = "none";
  newSetButton.style.display = "none";
  endHalfButton.style.display = "none";
  halfTimerContainer.style.display = "none";
  setTimerContainer.style.display = "none";

  // Show new elements
  halftimeBreakTimerContainer.style.display = "flex";
  endBreakButton.style.display = "block";

  // Change button icon to play
  pauseButton.innerHTML = '<i class="fa-solid fa-play"></i> <span class="button-text">start</span>';

  // Change header text
  headerText.innerHTML = "Half Time";

  // Set timer colours
  breakCountdownElem.classList.replace("timer-text-red", "timer-text");
  breakMillisecElem.classList.replace("timer-text-small-red", "timer-text-small");

  // Manage timers
  setPaused = true;
  matchPaused = true;
  halfTime = halfBreakTime;
  halfBreak = true;

}

function endBreak(){
  // Hide unneeded elements
  halftimeBreakTimerContainer.style.display = "none";
  endBreakButton.style.display = "none";
  pauseBackupButton.style.display = "none";

  // Show new elements
  newSetButton.style.display = "block";
  endMatchButton.style.display = "block";
  halfTimerContainer.style.display = "flex";
  setTimerContainer.style.display = "flex";

  // Change header text
  headerText.innerHTML = "Second Half";

  // Set timer colours
  matchCountdownElem.classList.replace("timer-text-red", "timer-text");
  matchMillisecElem.classList.replace("timer-text-small-red", "timer-text-small");
  setCountdownElem.classList.replace("timer-text-red", "timer-text");
  setMillisecElem.classList.replace("timer-text-small-red", "timer-text-small");

  // Manage timers
  setPaused = true;
  matchPaused = true;
  halfBreak = false;
  setTime = totalSetTime;
  halfTime = totalHalfTime;
}

function endMatch(){

  // Hide unneeded elements
  newSetButton.style.display = "none";
  endMatchButton.style.display = "none";
  pauseButton.style.display = "none";
  halfTimerContainer.style.display = "none";
  setTimerContainer.style.display = "none";

  // Change header text
  headerText.innerHTML = "Full Time";

  // Manage timers
  setTime = 0;
  halfTime = 0;

}

// Method to reset all timers
function resetAll(){

  // Reset and pause timers
  setPaused = true;
  matchPaused = true;
  halfBreak = false;
  setTime = totalSetTime;
  halfTime = totalHalfTime;

  // Change button icon to play
  pauseButton.innerHTML = '<i class="fa-solid fa-play"></i> <span class="button-text">start</span>';

  // Reset team scores
  teamOneScore = 0;
  teamTwoScore = 0;
  teamOneScoreText.innerHTML = teamOneScore;
  teamTwoScoreText.innerHTML = teamTwoScore;

  // Show and hide relevant buttons
  pauseBackupButton.style.display = "none";
  endBreakButton.style.display = "none";
  endMatchButton.style.display = "none";
  newSetButton.style.display = "block";
  endHalfButton.style.display = "block";
  pauseButton.style.display = "block";

  // Show and hide relevant timer containers
  halftimeBreakTimerContainer.style.display = "none"
  halfTimerContainer.style.display = "flex";
  setTimerContainer.style.display = "flex";

  // Reset header text
  headerText.innerHTML = "First Half";

  // Reset timer colours
  matchCountdownElem.classList.replace("timer-text-red", "timer-text");
  matchMillisecElem.classList.replace("timer-text-small-red", "timer-text-small");
  setCountdownElem.classList.replace("timer-text-red", "timer-text");
  setMillisecElem.classList.replace("timer-text-small-red", "timer-text-small");
  breakCountdownElem.classList.replace("timer-text-red", "timer-text");
  breakMillisecElem.classList.replace("timer-text-small-red", "timer-text-small");

}