// Define match times (in minutes)
let startHalfTime = 15; // Half length
let startSetTime = 3; // Max set length
let minimumSetTime = 1;  // Min set length
let halftimeBreakTime = 3;  // Halftime break length
let maxTimeoutTime = 1; // Timeout length

// Calculate timing constants based off above variables
let totalHalfTime = startHalfTime * 60 * 100;
let totalSetTime = startSetTime * 60 * 100;
let minSetTime = minimumSetTime * 60 * 100;
let halfBreakTime = halftimeBreakTime * 60 * 100;
let totalTimeoutTime = maxTimeoutTime * 60 * 100;

// Initialize team scores
let teamOneScore = 0;
let teamTwoScore = 0;

// Initialise match phase
let matchPhase = "first-half";

// Initialise card count
let blueCardCount = 0;
let yellowCardCount = 0;
let redCardCount = 0;

// Calculate timings based off above variables
let halfTime = totalHalfTime;
let setTime = totalSetTime;
let timeoutTime = totalTimeoutTime;
let matchPaused = true;
let setPaused = true;
let timeoutPaused = true;
let halfBreak = false;

// Settings options
let setTimerFadeAmount = 0.5; // Toggle set timer fade when inactive

// Calculate window width adjustments
let settingMenuOffset = "0px"
if (window.innerWidth < 450){
  settingMenuOffset = "40px";
} else {
  settingMenuOffset = "0px";
}

// Get elements from html
const startHalfTimeInput = document.getElementById('start-half-time');
const startSetTimeInput = document.getElementById('start-set-time');
const minimumSetTimeInput = document.getElementById('minimum-set-time');
const halftimeBreakTimeInput = document.getElementById('halftime-break-time');
const maxTimeoutTimeInput = document.getElementById('max-timeout-time');

const teamOneName = document.getElementById('team-one-name');
const teamTwoName = document.getElementById('team-two-name');
const teamOneScoreText = document.getElementById('team-one-score');
const teamTwoScoreText = document.getElementById('team-two-score');
const teamOneBox = document.getElementById('team-one-container');
const teamTwoBox = document.getElementById('team-two-container');

const colourButtonOne = document.getElementById('grey-colour-button-one');
const colourButtonTwo = document.getElementById('grey-colour-button-two');
const colourSelectors = document.getElementById('colour-selector');
const cardButtonOne = document.getElementById('grey-card-button-one');
const cardButtonTwo = document.getElementById('grey-card-button-two');
const cardSelectors = document.getElementById('card-selector');
const colourOneTop = document.getElementById('colour-one-top');
const colourOneBottom = document.getElementById('colour-one-bottom');
const colourTwoTop = document.getElementById('colour-two-top');
const colourTwoBottom = document.getElementById('colour-two-bottom');
const timeoutButtonOne = document.getElementById('grey-timeout-button-one');
const timeoutButtonTwo = document.getElementById('grey-timeout-button-two');

const matchCountdownElem = document.getElementById('match-countdown');
const matchMillisecElem = document.getElementById('match-millisecond-countdown');
const setCountdownElem = document.getElementById('set-countdown');
const setMillisecElem = document.getElementById('set-millisecond-countdown');
const breakCountdownElem = document.getElementById('break-countdown');
const breakMillisecElem = document.getElementById('break-millisecond-countdown');
const timeoutCountdownElem = document.getElementById('timeout-countdown');
const timeoutMillisecElem = document.getElementById('timeout-millisecond-countdown');
const finalSetAlert = document.getElementById('final-set-alert');

const pauseButton = document.getElementById('play-pause-button');
const pauseBackupButton = document.getElementById('pause-backup-button');
const timeoutPauseButton = document.getElementById('timeout-play-pause-button');
const newSetButton = document.getElementById('new-set-button');
const endHalfButton = document.getElementById('end-half-button');
const endBreakButton = document.getElementById('end-break-button');
const endMatchButton = document.getElementById('end-match-button');
const endTimeoutButton = document.getElementById('end-timeout-button');

const timeoutTimerContainer = document.getElementById('timeout-timer-container');
const halfTimerContainer = document.getElementById('half-timer-container');
const setTimerContainer = document.getElementById('set-timer-container');
const halftimeBreakTimerContainer = document.getElementById('halftime-break-timer-container');

const halfTimerCogs = document.getElementById('half-timer-cogs');
const setTimerCogs = document.getElementById('set-timer-cogs');
const halftimeBreakTimerCogs = document.getElementById('halftime-break-timer-cogs');
const timeoutTimerCogs = document.getElementById('timeout-timer-cogs');

const headerText = document.getElementById('header-text');

// Set sidebar invisible;
const sideBar = document.getElementById('left-sidebar');
sideBar.style.left = "-300px";
sideBar.style.display = "none";

// Assign set timer inactivity opacity
const setTimerElem = document.getElementById('set-timer-text-container');
setTimerElem.style.opacity = setTimerFadeAmount;

// Set default team names
teamOneName.value = "Team Blue";
teamTwoName.value = "Team Red";

// Set default time settings values
startHalfTimeInput.value = startHalfTime;
startSetTimeInput.value = startSetTime;
minimumSetTimeInput.value = minimumSetTime;
halftimeBreakTimeInput.value = halftimeBreakTime;
maxTimeoutTimeInput.value = maxTimeoutTime;

// Set default grey button colours
colourButtonOne.style.backgroundColor = "rgb(55, 55, 55)";
colourButtonTwo.style.backgroundColor = "rgb(55, 55, 55)";
cardButtonOne.style.backgroundColor = "rgb(55, 55, 55)";
cardButtonTwo.style.backgroundColor = "rgb(55, 55, 55)";
halfTimerCogs.style.backgroundColor = "rgb(40, 40, 40)";
setTimerCogs.style.backgroundColor = "rgb(40, 40, 40)";
halftimeBreakTimerCogs.style.backgroundColor = "rgb(40, 40, 40)";
timeoutTimerCogs.style.backgroundColor = "rgb(40, 40, 40)";

// Set default colour button colours
colourOneTop.value = "#3161ff";
colourOneBottom.value = "#4040f8";
colourTwoTop.value = "#dd2222";
colourTwoBottom.value = "#c53f3f";

// Hide unneeded by default
pauseBackupButton.style.display = "none";
timeoutPauseButton.style.display = "none";
endBreakButton.style.display = "none";
timeoutTimerContainer.style.display = "none";
halftimeBreakTimerContainer.style.display = "none";
endMatchButton.style.display = "none";
endTimeoutButton.style.display = "none";
colourSelectors.style.display = "none";
cardSelectors.style.display = "none";

// Set intervals for timer methods
setInterval(updateMatchCountdown, 10);
setInterval(updateMatchCountdownSlow, 1000);

// Method to calculate match timings
function calculateTimings(){
  // Calculate timing constants based off above variables
  totalHalfTime = startHalfTimeInput.value * 60 * 100;
  totalSetTime = startSetTimeInput.value * 60 * 100;
  minSetTime = minimumSetTimeInput.value * 60 * 100;
  halfBreakTime = halftimeBreakTimeInput.value * 60 * 100;
  totalTimeoutTime = maxTimeoutTimeInput.value * 60 * 100;
}

// Method to show/hide sidebar
function toggleSidebar(element){
  // Cog animation
  element.animate({
    transform: "rotate(180deg)"
    }, {duration: 250, easing: "cubic-bezier(.5,0,.5,1)"});

  if (element.style.backgroundColor == "rgb(40, 40, 40)" || element.style.backgroundColor == ""){
    // Open timer settings
    sideBar.style.display = "flex";
    element.style.backgroundColor = "rgb(75, 75, 75)";

    // Munu animation
    sideBar.animate({
      left: "0"
      }, {duration: 250, easing: "cubic-bezier(.21,.52,.61,.91)"}).onfinish = function(){
        sideBar.style.left = "0";
      };

  } else {
    // Close timer settings
    element.style.backgroundColor = "rgb(40, 40, 40)";

    // Menu animation
    sideBar.animate({
      left: "-300px"
      }, {duration: 250, easing: "cubic-bezier(.52,.21,.91,.61)"}).onfinish = function(){
        sideBar.style.left = "-300px",
        sideBar.style.display = "none";
      };
  }
}

function clothLeagueSettings(){
  startHalfTimeInput.value = 15;
  startSetTimeInput.value = 3;
  minimumSetTimeInput.value = 1;
  halftimeBreakTimeInput.value = 3;
  maxTimeoutTimeInput.value = 1;
}

function clothOpenSettings(){
  startHalfTimeInput.value = 8;
  startSetTimeInput.value = 3;
  minimumSetTimeInput.value = 0.5;
  halftimeBreakTimeInput.value = 2;
  maxTimeoutTimeInput.value = 1;
}

// Method to manage display on window resize
function resizeEvent(){
  teamOneName.style.height = "0";
  teamOneName.style.height = (teamOneName.scrollHeight) + "px";
  teamTwoName.style.height = "0";
  teamTwoName.style.height = (teamTwoName.scrollHeight) + "px";

  if (window.innerWidth < 450){
    settingMenuOffset = "40px";
  } else {
    settingMenuOffset = "0px";
  }
  colourSelectors.style.top = settingMenuOffset;
  cardSelectors.style.top = settingMenuOffset;
}

// Methods to edit team score displays
function editNameOne(){
  teamOneName.select();
}

function editNameTwo(){
  teamTwoName.select();
}

// Method to show/hide colour selectors
function toggleColours(){
  if (colourButtonOne.style.backgroundColor === "rgb(55, 55, 55)"){

    if(colourButtonOne.style.backgroundColor === "rgb(90, 90, 90)" || cardButtonOne.style.backgroundColor === "rgb(90, 90, 90)"){
      // Open colour selector
      showColours();
      colourSelectors.style.top = settingMenuOffset;
      // Close card selector
      hideCards();
    } else {
      showColours();
      colourSelectors.style.top = "-45px";
      colourSelectors.animate({
      top: settingMenuOffset
      }, {duration: 150, easing: "cubic-bezier(.31,.84,.42,.98)"}).onfinish = function(){
        colourSelectors.style.top = settingMenuOffset;
      };
    }
  } else {
    colourSelectors.style.top = settingMenuOffset;
    colourSelectors.animate({
      top: "-45px"
      }, {duration: 150, easing: "cubic-bezier(.31,.84,.42,.98)"}).onfinish = function(){
        colourSelectors.style.top = "-45px";
        hideColours();
      };
  }
}

function showColours(){
  colourButtonOne.style.backgroundColor = "rgb(90, 90, 90)";
  colourButtonTwo.style.backgroundColor = "rgb(90, 90, 90)";
  colourSelectors.style.display = "flex";
}

function hideColours(){
  colourButtonOne.style.backgroundColor = "rgb(55, 55, 55)";
  colourButtonTwo.style.backgroundColor = "rgb(55, 55, 55)";
  colourSelectors.style.display = "none";
}

// Methods to select colour picker on button click
function editColourOneTop(){
  colourOneTop.click();
}

function editColourOneBottom(){
  colourOneBottom.click();
}

function editColourTwoTop(){
  colourTwoTop.click();
}

function editColourTwoBottom(){
  colourTwoBottom.click();
}

// Method to update team colours
function colourUpdate(){
  teamOneBox.style.backgroundImage = `linear-gradient(${colourOneTop.value}, ${colourOneBottom.value})`;
  teamTwoBox.style.backgroundImage = `linear-gradient(${colourTwoTop.value}, ${colourTwoBottom.value})`;
}

function resetTeamOne(){
  teamOneName.value = "Team Blue";
  teamOneBox.style.backgroundImage = "linear-gradient(rgb(49, 97, 255), rgb(64, 64, 248))";
  colourOneTop.value = "#3161ff";
  colourOneBottom.value = "#4040f8";
}

function resetTeamTwo(){
  teamTwoName.value = "Team Red";
  teamTwoBox.style.backgroundImage = "linear-gradient(rgb(221, 34, 34), rgb(197, 63, 63))";
  colourTwoTop.value = "#dd2222";
  colourTwoBottom.value = "#c53f3f";
}

// Method to show/hide card selectors
function toggleCards(){
  if (cardButtonOne.style.backgroundColor === "rgb(55, 55, 55)"){

    if(colourButtonOne.style.backgroundColor === "rgb(90, 90, 90)" || cardButtonOne.style.backgroundColor === "rgb(90, 90, 90)"){
      // Open card selector
      showCards();
      cardSelectors.style.top = settingMenuOffset;
      // Close colour selector
      hideColours();
    } else {
      showCards();
      cardSelectors.style.top = "-45px";
      cardSelectors.animate({
      top: settingMenuOffset
      }, {duration: 150, easing: "cubic-bezier(.31,.84,.42,.98)"}).onfinish = function(){
        cardSelectors.style.top = settingMenuOffset;
      };
    }
  } else {
    cardSelectors.style.top = settingMenuOffset;
    cardSelectors.animate({
      top: "-45px"
      }, {duration: 150, easing: "cubic-bezier(.31,.84,.42,.98)"}).onfinish = function(){
        cardSelectors.style.top = "-45px";
        hideCards();
      };
  }
}

function showCards(){
  cardButtonOne.style.backgroundColor = "rgb(90, 90, 90)";
  cardButtonTwo.style.backgroundColor = "rgb(90, 90, 90)";
  cardSelectors.style.display = "flex";
}

function hideCards(){
  cardButtonOne.style.backgroundColor = "rgb(55, 55, 55)";
  cardButtonTwo.style.backgroundColor = "rgb(55, 55, 55)";
  cardSelectors.style.display = "none";
}

// Method to toggle close button visibility on card containers
function toggleCloseButton(element){
  // Find child close icon element
  closeIcon = element.querySelector("#close-card");

  // Hide or display icon
  if (closeIcon.style.display == "none" || closeIcon.style.display == ""){
    closeIcon.style.display = "block";
  } else {
    closeIcon.style.display = "none";
  }
}

// Method to delete cards
function deleteCard(element){
  // Get card element and reduce card counter
  cardContainer = element.parentNode
  switch (cardContainer.id){
    case 'blue-card-container':
      blueCardCount--;
      break;
    case 'yellow-card-container':
      yellowCardCount--;
      break;
    case 'red-card-container':
      redCardCount--;
      break;
  }
  // Remove card div
  element.parentNode.remove();
}

// Methods to add new cards
function teamOneBlueCard(){
  blueCard = document.getElementById('blue-card-container-one');
  newCard = blueCard.cloneNode(true);
  newCard.style.display = "flex";
  newCard.id = "blue-card-container";
  newCard.classList.add('blue-card-counter');
  blueCard.parentNode.appendChild(newCard);
  hideCards();
  blueCardCount++;
}

function teamOneYellowCard(){
  yellowCard = document.getElementById('yellow-card-container-one');
  newCard = yellowCard.cloneNode(true);
  newCard.style.display = "flex";
  newCard.id = "yellow-card-container";
  newCard.classList.add('yellow-card-timer');
  yellowCard.parentNode.appendChild(newCard);
  hideCards();
  yellowCardCount++;
}

function teamOneRedCard(){
  redCard = document.getElementById('red-card-container-one');
  newCard = redCard.cloneNode(true);
  newCard.style.display = "flex";
  newCard.id = "red-card-container";
  redCard.parentNode.appendChild(newCard);
  hideCards();
  redCardCount++;
}

function teamTwoBlueCard(){
  blueCard = document.getElementById('blue-card-container-two');
  newCard = blueCard.cloneNode(true);
  newCard.style.display = "flex";
  newCard.id = "blue-card-container";
  newCard.classList.add('blue-card-counter');
  blueCard.parentNode.appendChild(newCard);
  hideCards();
  blueCardCount++;
}

function teamTwoYellowCard(){
  yellowCard = document.getElementById('yellow-card-container-two');
  newCard = yellowCard.cloneNode(true);
  newCard.style.display = "flex";
  newCard.id = "yellow-card-container";
  newCard.classList.add('yellow-card-timer');
  yellowCard.parentNode.appendChild(newCard);
  hideCards();
  yellowCardCount++;
}

function teamTwoRedCard(){
  redCard = document.getElementById('red-card-container-two');
  newCard = redCard.cloneNode(true);
  newCard.style.display = "flex";
  newCard.id = "red-card-container";
  redCard.parentNode.appendChild(newCard);
  hideCards();
  redCardCount++;
}

// Methods to start timeouts
function timeoutStart(element){
  // Change header text
  if (!headerText.innerHTML.includes("Timeout"))
    headerText.innerHTML += " (Timeout)";

  // Change timeout timer colours
  timeoutCountdownElem.classList.replace("timer-text-red", "timer-text");
  timeoutMillisecElem.classList.replace("timer-text-small-red", "timer-text-small");

  // Reduce timeout counter to 0
  if (element.innerHTML == '<i class="fa-solid fa-stopwatch"></i> 1')
    element.innerHTML = '<i class="fa-solid fa-stopwatch"></i> 0';

  // Manage timers
  matchPaused = true;
  setPaused = true;
  timeoutTime = totalTimeoutTime;
  timeoutPaused = false;

  // Hide relevent elements
  setTimerContainer.style.display = "none";
  halftimeBreakTimerContainer.style.display = "none";
  endHalfButton.style.display = "none";
  endBreakButton.style.display = "none";
  endMatchButton.style.display = "none";
  newSetButton.style.display = "none";
  pauseButton.style.display = "none";
  pauseBackupButton.style.display = "none";

  // Show relevent elements
  timeoutTimerContainer.style.display = "flex";
  endTimeoutButton.style.display = "block";
  timeoutPauseButton.style.display = "block";
  timeoutPauseButton.innerHTML = '<i class="fa-solid fa-pause"></i> <span class="button-text">pause</span>';
}

// Method to auto increase height of team name box
function auto_grow(element) {
  element.style.height = "0";
  element.style.height = (element.scrollHeight) + "px";
}

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

// Method that changes timers every 10ms
function updateMatchCountdown(){

  // Update yellow card timers
  updateYellowCardCountdown();

  // Calculate mins & secs from milliseconds
  const halfMinutes = Math.floor(halfTime / 6000);
  let halfSeconds = Math.floor(halfTime % 6000 / 100);
  let halfMilliseconds = halfTime % 100;

  const setMinutes = Math.floor(setTime / 6000);
  let setSeconds = Math.floor(setTime % 6000 / 100);
  let setMilliseconds = setTime % 100;

  const timeoutMinutes = Math.floor(timeoutTime / 6000);
  let timeoutSeconds = Math.floor(timeoutTime % 6000 / 100);
  let timeoutMilliseconds = timeoutTime % 100;

  // Keep zeros in seconds and milliseconds tickers
  halfSeconds = halfSeconds < 10 ? '0' + halfSeconds : halfSeconds;
  halfMilliseconds = halfMilliseconds < 10 ? '0' + halfMilliseconds : halfMilliseconds;

  setSeconds = setSeconds < 10 ? '0' + setSeconds : setSeconds;
  setMilliseconds = setMilliseconds < 10 ? '0' + setMilliseconds : setMilliseconds;

  timeoutSeconds = timeoutSeconds < 10 ? '0' + timeoutSeconds : timeoutSeconds;
  timeoutMilliseconds = timeoutMilliseconds < 10 ? '0' + timeoutMilliseconds : timeoutMilliseconds;

  // Format and update half timer display
  matchCountdownElem.innerHTML = `${halfMinutes}:${halfSeconds}`;
  matchMillisecElem.innerHTML = `:${halfMilliseconds}`;

  // Format and update set timer display
  setCountdownElem.innerHTML = `${setMinutes}:${setSeconds}`;
  setMillisecElem.innerHTML = `:${setMilliseconds}`;

  // Repeat for break timer (as it is reused)
  breakCountdownElem.innerHTML = `${halfMinutes}:${halfSeconds}`;
  breakMillisecElem.innerHTML = `:${halfMilliseconds}`;

  // Format and update timeout timer display
  timeoutCountdownElem.innerHTML = `${timeoutMinutes}:${timeoutSeconds}`;
  timeoutMillisecElem.innerHTML = `:${timeoutMilliseconds}`;

  // If match not paused and time not zero, reduce timer by 10ms
  if (matchPaused == false && halfTime > 0 && !document.hidden){
    halfTime--;
  }

  if (setPaused == false && setTime > 0 && !document.hidden){
    setTime--;
  }

  if (timeoutPaused == false && timeoutTime > 0 && !document.hidden){
    timeoutTime--;
  }

  // If half timer is less than 1 set length and paused, set equal to match time
  if (setPaused == true && halfTime < totalSetTime && halfTime == setTime - 1){
    if (halfTime == minSetTime){
      setTime = halfTime;
      pauseBackupButton.style.display = "none";
      matchPaused = true;
      finalSetAlert.style.display = "block"
    }
    setTime = halfTime;
  }

  // If time zero, change display of timer to red
  if (halfTime == 0){
    matchCountdownElem.classList.replace("timer-text", "timer-text-red");
    matchMillisecElem.classList.replace("timer-text-small", "timer-text-small-red");

    // Also change display for break timer (as it is reused)
    breakCountdownElem.classList.replace("timer-text", "timer-text-red");
    breakMillisecElem.classList.replace("timer-text-small", "timer-text-small-red");
  }

  if (setTime == 0){
    setCountdownElem.classList.replace("timer-text", "timer-text-red");
    setMillisecElem.classList.replace("timer-text-small", "timer-text-small-red");
  }

  if (timeoutTime == 0){
    timeoutCountdownElem.classList.replace("timer-text", "timer-text-red");
    timeoutMillisecElem.classList.replace("timer-text-small", "timer-text-small-red");
  }
}

// Method that changes timers every 1000ms when untabbed
function updateMatchCountdownSlow(){
 // If match not paused and time not zero, reduce timer by 10ms
 if (matchPaused == false && halfTime > 0 && document.hidden){
  halfTime = halfTime >= 100 ? halfTime - 100 : 0;
}

if (setPaused == false && setTime > 0 && document.hidden){
  setTime = setTime >= 100 ? setTime - 100 : 0;
}

if (timeoutPaused == false && timeoutTime > 0 && document.hidden){
  timeoutTime = timeoutTime >= 100 ? timeoutTime - 100 : 0;
}
}

// Method to update countdown timer for yellow cards
function updateYellowCardCountdown(){
  // If no active yellow cards, return
  if (yellowCardCount == 0)
    return;

  // Reduce timer for all yellow cards by 1 if match timer is active
  if (matchPaused == false && matchPhase != "half-time"){
    // Gather all active yellow cards
    const currentYellowCards = document.getElementsByClassName('yellow-card-timer');

    for (let currentYellowCard of currentYellowCards){
      // Select yellow card hidden time variable
      const currentYellowCardTime = currentYellowCard.querySelector('#yellow-card-time');

      // Reduce counter by 1
      if (!document.hidden)
        currentYellowCardTime.innerHTML = parseInt(currentYellowCardTime.innerHTML) - 1;
      else
        currentYellowCardTime.innerHTML = parseInt(currentYellowCardTime.innerHTML) >= 100 ? parseInt(currentYellowCardTime.innerHTML) - 100 : 0;

      // Calculate and display time in minutes and seconds
      const yellowMinutes = Math.floor(currentYellowCardTime.innerHTML / 6000);
      let yellowSeconds = Math.floor(currentYellowCardTime.innerHTML % 6000 / 100);
      yellowSeconds = yellowSeconds < 10 ? '0' + yellowSeconds : yellowSeconds;
      currentYellowCard.querySelector('#yellow-card-time-display').innerHTML = `${yellowMinutes}:${yellowSeconds}`;

      // Delete card if timer hits zero
      if (currentYellowCardTime.innerHTML == 0){
        currentYellowCard.remove();
        yellowCardCount--;
      }
    }
  }
}

function updateBlueCardCount(){
  if (blueCardCount == 0)
    return;

  // Gather all active blue cards
  const currentBlueCards = document.getElementsByClassName('blue-card-counter');
  let removalCount = 0;

  for (let currentBlueCard of currentBlueCards){
    // Select yellow card hidden time variable
    const currentBlueCardCounter = currentBlueCard.querySelector('#blue-card-count');

    // Reduce counter by 1
    currentBlueCardCounter.innerHTML = parseInt(currentBlueCardCounter.innerHTML) - 1;

    // Calculate updated remaining set amount
    currentBlueCard.querySelector('#blue-card-count-display').innerHTML = `${currentBlueCardCounter.innerHTML} set`;

    // Flag zero set cards for removal
    if (currentBlueCard.querySelector('#blue-card-count').innerHTML == 0){
    currentBlueCard.classList.add('blue-removed');
    removalCount++;
    }
  }

  // Collect cards for removal
  let removedBlueCards = document.getElementsByClassName('blue-removed');
  console.log(removedBlueCards);

  // Remove cards
  for (let i = 0; i < removalCount; i++){
    removedBlueCards[0].remove();
    blueCardCount--;
  }
}

function toggleHalfTimerSettings(){
  if (halfTimerCogs.style.backgroundColor == "rgb(40, 40, 40)"){
    // Open timer settings
    settingsElem = document.getElementById('half-timer-settings');
    settingsElem.style.display = "flex";
    halfTimerCogs.style.backgroundColor = "rgb(75, 75, 75)";

    // Animation
    settingsElem.style.marginLeft = "-83px"
    settingsElem.animate({
      marginLeft: "-5px"
      }, {duration: 150, easing: "cubic-bezier(.31,.84,.42,.98)"}).onfinish = function(){
        settingsElem.style.marginLeft = "-5px"
      };
  } else {
    // Close timer settings
    settingsElem = document.getElementById('half-timer-settings');
    halfTimerCogs.style.backgroundColor = "rgb(40, 40, 40)";

    // Animation
    settingsElem.style.marginLeft = "-5px"
    settingsElem.animate({
      marginLeft: "-83px"
      }, {duration: 150, easing: "cubic-bezier(.31,.84,.42,.98)"}).onfinish = function(){
        settingsElem.style.marginLeft = "-83px"
        settingsElem.style.display = "none";
      };
  }
}

function toggleSetTimerSettings(){
  if (setTimerCogs.style.backgroundColor == "rgb(40, 40, 40)"){
    // Open timer settings
    settingsElem = document.getElementById('set-timer-settings');
    settingsElem.style.display = "flex";
    setTimerCogs.style.backgroundColor = "rgb(75, 75, 75)";

    // Animation
    settingsElem.style.marginLeft = "-83px"
    settingsElem.animate({
      marginLeft: "-5px"
      }, {duration: 150, easing: "cubic-bezier(.31,.84,.42,.98)"}).onfinish = function(){
        settingsElem.style.marginLeft = "-5px"
      };
  } else {
    // Close timer settings
    settingsElem = document.getElementById('set-timer-settings');
    setTimerCogs.style.backgroundColor = "rgb(40, 40, 40)";

    // Animation
    settingsElem.style.marginLeft = "-5px"
    settingsElem.animate({
      marginLeft: "-83px"
      }, {duration: 150, easing: "cubic-bezier(.31,.84,.42,.98)"}).onfinish = function(){
        settingsElem.style.marginLeft = "-83px"
        settingsElem.style.display = "none";
      };
  }
}

function toggleHalftimeBreakTimerSettings(){
  if (halftimeBreakTimerCogs.style.backgroundColor == "rgb(40, 40, 40)"){
    // Open timer settings
    settingsElem = document.getElementById('halftime-break-timer-settings');
    settingsElem.style.display = "flex";
    halftimeBreakTimerCogs.style.backgroundColor = "rgb(75, 75, 75)";

    // Animation
    settingsElem.style.marginLeft = "-83px"
    settingsElem.animate({
      marginLeft: "-5px"
      }, {duration: 150, easing: "cubic-bezier(.31,.84,.42,.98)"}).onfinish = function(){
        settingsElem.style.marginLeft = "-5px"
      };
  } else {
    // Close timer settings
    settingsElem = document.getElementById('halftime-break-timer-settings');
    halftimeBreakTimerCogs.style.backgroundColor = "rgb(40, 40, 40)";

    // Animation
    settingsElem.style.marginLeft = "-5px"
    settingsElem.animate({
      marginLeft: "-83px"
      }, {duration: 150, easing: "cubic-bezier(.31,.84,.42,.98)"}).onfinish = function(){
        settingsElem.style.marginLeft = "-83px"
        settingsElem.style.display = "none";
      };
  }
}

function toggleTimeoutTimerSettings(){
  if (timeoutTimerCogs.style.backgroundColor == "rgb(40, 40, 40)"){
    // Open timer settings
    settingsElem = document.getElementById('timeout-timer-settings');
    settingsElem.style.display = "flex";
    timeoutTimerCogs.style.backgroundColor = "rgb(75, 75, 75)";

    // Animation
    settingsElem.style.marginLeft = "-83px"
    settingsElem.animate({
      marginLeft: "-5px"
      }, {duration: 150, easing: "cubic-bezier(.31,.84,.42,.98)"}).onfinish = function(){
        settingsElem.style.marginLeft = "-5px"
      };
  } else {
    // Close timer settings
    settingsElem = document.getElementById('timeout-timer-settings');
    timeoutTimerCogs.style.backgroundColor = "rgb(40, 40, 40)";

    // Animation
    settingsElem.style.marginLeft = "-5px"
    settingsElem.animate({
      marginLeft: "-83px"
      }, {duration: 150, easing: "cubic-bezier(.31,.84,.42,.98)"}).onfinish = function(){
        settingsElem.style.marginLeft = "-83px"
        settingsElem.style.display = "none";
      };
  }
}

// Methods to pause and play timers
function changePauseState(){
  // Hide backup pause button
  pauseBackupButton.style.display = "none";

  // Pause and unpause logic
  if (setPaused == false && timeoutPaused == true){
    matchPaused = true;
    setPaused = true;
    pauseButton.innerHTML = '<i class="fa-solid fa-play"></i> <span class="button-text">start</span>';
    setTimerElem.style.opacity = setTimerFadeAmount;
  } else {
    matchPaused = false;
    setPaused = false;
    pauseButton.innerHTML = '<i class="fa-solid fa-pause"></i> <span class="button-text">pause</span>';
    setTimerElem.style.opacity = 1;
  }
}

function changeTimeoutPauseState(){
  // Pause and unpause logic
  if (timeoutPaused == false){
    timeoutPaused = true;
    timeoutPauseButton.innerHTML = '<i class="fa-solid fa-play"></i> <span class="button-text">start</span>';
  } else {
    timeoutPaused = false;
    timeoutPauseButton.innerHTML = '<i class="fa-solid fa-pause"></i> <span class="button-text">pause</span>';
  }
}

// Method to reset set timer with various conditions
function resetSetTimer(){
  // Reduce blue card counters
  updateBlueCardCount();

  // Get button element from html
  pauseButton.innerHTML = '<i class="fa-solid fa-play"></i> <span class="button-text">start</span>'

  // Format timer colours to default on reset
  matchCountdownElem.classList.replace("timer-text-red", "timer-text");
  matchMillisecElem.classList.replace("timer-text-small-red", "timer-text-small");
  setCountdownElem.classList.replace("timer-text-red", "timer-text");
  setMillisecElem.classList.replace("timer-text-small-red", "timer-text-small");

  // Change set timer inactivity opacity
  setTimerElem.style.opacity = setTimerFadeAmount;

  // Check if match timer is less than a full set
  if (halfTime <= (totalSetTime)){
    
    if (halfTime <= minSetTime){
      matchPaused = true;
      setTime = minSetTime;
      halfTime = minSetTime;
      pauseBackupButton.style.display = "none";
      finalSetAlert.style.display = "block";
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
  // Change match phase
  matchPhase = "half-time";

  // Reduce blue card counters
  updateBlueCardCount();

  // Hide unneeded elements
  pauseBackupButton.style.display = "none";
  newSetButton.style.display = "none";
  endHalfButton.style.display = "none";
  halfTimerContainer.style.display = "none";
  setTimerContainer.style.display = "none";
  finalSetAlert.style.display = "none";

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

  // Change set timer inactivity opacity
  setTimerElem.style.opacity = setTimerFadeAmount;

  // Manage timers
  setPaused = true;
  matchPaused = false;
  halfTime = halfBreakTime;
  halfBreak = true;

}

function endBreak(){
  // Change match phase
  matchPhase = "second-half";

  // Hide unneeded elements
  halftimeBreakTimerContainer.style.display = "none";
  endBreakButton.style.display = "none";
  pauseBackupButton.style.display = "none";
  finalSetAlert.style.display = "none";

  // Show new elements
  newSetButton.style.display = "block";
  endMatchButton.style.display = "block";
  halfTimerContainer.style.display = "flex";
  setTimerContainer.style.display = "flex";

  // Change button icon to play
  pauseButton.innerHTML = '<i class="fa-solid fa-play"></i> <span class="button-text">start</span>';

  // Change header text
  headerText.innerHTML = "Second Half";

  // Set timer colours
  matchCountdownElem.classList.replace("timer-text-red", "timer-text");
  matchMillisecElem.classList.replace("timer-text-small-red", "timer-text-small");
  setCountdownElem.classList.replace("timer-text-red", "timer-text");
  setMillisecElem.classList.replace("timer-text-small-red", "timer-text-small");

  // Change set timer inactivity opacity
  setTimerElem.style.opacity = setTimerFadeAmount;

  // Manage timers
  setPaused = true;
  matchPaused = true;
  halfBreak = false;
  setTime = totalSetTime;
  halfTime = totalHalfTime;
}

function endTimeout(){
  // Manage timers
  timeoutPaused = true;

  // Hide relevent elements
  timeoutTimerContainer.style.display = "none";
  endTimeoutButton.style.display = "none";
  timeoutPauseButton.style.display = "none";
  
  // Show relevent elements
  switch (matchPhase){
    case "first-half":
      headerText.innerHTML = "First Half";
      setTimerContainer.style.display = "flex";
      endHalfButton.style.display = "block";
      newSetButton.style.display = "block";
      pauseButton.style.display = "block";
      pauseButton.innerHTML = '<i class="fa-solid fa-play"></i> <span class="button-text">start</span>';
      break;
    case "half-time":
      headerText.innerHTML = "Half Time";
      halftimeBreakTimerContainer.style.display = "flex";
      endBreakButton.style.display = "block";
      pauseButton.style.display = "block";
      pauseButton.innerHTML = '<i class="fa-solid fa-play"></i> <span class="button-text">start</span>';
      break;
    case "second-half":
      headerText.innerHTML = "Second Half";
      setTimerContainer.style.display = "flex";
      endMatchButton.style.display = "block";
      newSetButton.style.display = "block";
      pauseButton.style.display = "block";
      pauseButton.innerHTML = '<i class="fa-solid fa-play"></i> <span class="button-text">start</span>';
      break;
  }
}

function endMatch(){
  // Change match phase
  matchPhase = "full-time";

  // Reduce blue card counters
  updateBlueCardCount();

  // Hide unneeded elements
  newSetButton.style.display = "none";
  endMatchButton.style.display = "none";
  pauseButton.style.display = "none";
  pauseBackupButton.style.display = "none";
  halfTimerContainer.style.display = "none";
  setTimerContainer.style.display = "none";
  finalSetAlert.style.display = "none";

  // Change header text
  headerText.innerHTML = "Full Time";

  // Manage timers
  setTime = 0;
  halfTime = 0;
  setPaused = true;
  matchPaused = true;

}

// Method to reset all timers
function resetAll(){
  // Change match phase
  matchPhase = "first-half";

  // Reset and pause timers
  calculateTimings();
  setPaused = true;
  matchPaused = true;
  timeoutPaused = true;
  halfBreak = false;
  setTime = totalSetTime;
  halfTime = totalHalfTime;

  // Change button icon to play
  pauseButton.innerHTML = '<i class="fa-solid fa-play"></i> <span class="button-text">start</span>';

  // Change set timer inactivity opacity
  setTimerElem.style.opacity = setTimerFadeAmount;

  // Reset team scores
  teamOneScore = 0;
  teamTwoScore = 0;
  teamOneScoreText.innerHTML = teamOneScore;
  teamTwoScoreText.innerHTML = teamTwoScore;

  // Reset timeout counts
  timeoutButtonOne.innerHTML = '<i class="fa-solid fa-stopwatch"></i> 1';
  timeoutButtonTwo.innerHTML = '<i class="fa-solid fa-stopwatch"></i> 1';

  // Remove all cards
  while (blueCardCount > 0){
    document.getElementById('blue-card-container').remove();
    blueCardCount--;
  }
  while (yellowCardCount > 0){
    document.getElementById('yellow-card-container').remove();
    yellowCardCount--;
  }
  while (redCardCount > 0){
    document.getElementById('red-card-container').remove();
    redCardCount--;
  }

  // Show and hide relevant buttons
  pauseBackupButton.style.display = "none";
  timeoutPauseButton.style.display = "none";
  endBreakButton.style.display = "none";
  endMatchButton.style.display = "none";
  endTimeoutButton.style.display = "none";
  newSetButton.style.display = "block";
  endHalfButton.style.display = "block";
  pauseButton.style.display = "block";

  // Show and hide relevant timer containers
  halftimeBreakTimerContainer.style.display = "none";
  timeoutTimerContainer.style.display = "none";
  halfTimerContainer.style.display = "flex";
  setTimerContainer.style.display = "flex";
  finalSetAlert.style.display = "none";

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