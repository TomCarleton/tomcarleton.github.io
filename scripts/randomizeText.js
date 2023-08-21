const letters = "abcdefghijklmnopqrstuvwxyz"
const defaultText = "tomcarleton.dev"
var intervalId;

window.onload = function(){ 
  document.getElementById("title-box").onmouseover = event => {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      var resultString = event.target.innerText.split("").map(letter => letters[Math.floor(Math.random() * 26)]);
      resultString[11] = ".";
      event.target.innerText = resultString.join("");
    }, 50);
  }

  document.getElementById("title-box").onmouseleave = event => {
    let iterations = 0;
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      var resultString = event.target.innerText.split("")
      .map((letter, index) => {
        if (index < iterations){
          return defaultText[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      });
      resultString[11] = ".";
      event.target.innerText = resultString.join("");
      iterations++;

      if (iterations >= 16){
        clearInterval(intervalId);
      }
    }, 35);
  }
};