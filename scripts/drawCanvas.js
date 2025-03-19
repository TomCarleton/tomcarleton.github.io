var dataURL = "";
const downloadBtn = document.getElementById("download");

// Get last selected template
let templateNum = localStorage.getItem("tempNum") || 1; // Default to 1 if null
const button = document.getElementById(`temp${templateNum}`);
button.classList.add("active");

function updateImg() {
  setTimeout(() => {
    const canvas = document.getElementById('thumb');
    drawCanvas(canvas, templateNum);
  }, 100);
}

function createImg() {
  const canvas = document.getElementById('thumbnail');
  canvas.parentElement.style.display = "unset";
  drawCanvas(canvas, templateNum);
}

function downloadImg() {
  const canvas = document.getElementById('thumbnail');
  drawCanvas(canvas, templateNum);

  // Get team names or default to "[unknown]"
  const getTeamName = (teamId) => {
    const team = getTeamInfo(teamId);
    return team === 0 ? "[unknown]" : team.displayName;
  };

  const team1 = getTeamName(1);
  const team2 = getTeamName(2);
  const filename = `${team1} vs ${team2}.png`;

  // Create and trigger download link
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL();
  link.click();
}

function hideImg() {
  const canvas = document.getElementById('thumbnail');
  canvas.parentElement.style.display = "none";
}

function lineCount(teamName, forceSplit = false) {
  if (teamName.length <= 16 && !forceSplit) {
    return [1, teamName]; // No split needed
  }

  const words = teamName.split(" ");
  const firstLine = words[0];
  const secondLine = words.slice(1).join(" "); // Join remaining words

  return [firstLine, secondLine];
}

function changeTemp(button) {
  // Remove active class from the current template button
  document.getElementById(`temp${templateNum}`).classList.remove("active");

  // Update template number and set it in localStorage
  templateNum = button.innerHTML;
  localStorage.setItem("tempNum", templateNum);

  // Add active class to the clicked button
  button.classList.add("active");

  // Update the preview image
  updateImg();
}

function updateTeamLogo(element) {
  const teamId = element.id === "selectTeam1" ? "team1" : "team2";
  const imgBox = document.getElementById(`${teamId}Img`);
  const textBox = document.getElementById(`${teamId}Name`);

  // Update team logo and name
  imgBox.src = `DodgeResources/${element.value}.png`;
  textBox.value = element.selectedOptions[0].label;

  // Update preview
  updateImg();
}

function updateComp() {
  const compNameInput = document.getElementById("compName");
  const selectedValue = document.getElementById("selectComp").value;

  // Toggle visibility of compName input
  compNameInput.style.display = selectedValue === "-1" ? "block" : "none";

  // Update preview
  updateImg();
}

function getTeamInfo(team) {
  const selectTeam = document.getElementById(`selectTeam${team}`);
  const selectedOption = selectTeam.options[selectTeam.selectedIndex];

  if (!selectedOption) return 0; // Return 0 if no option is selected

  const teamLabel = selectedOption.label;
  return teamList.find(t => t.displayName === teamLabel) || 0; // Return 0 if no match is found
}

function getCompInfo() {
  const compSelect = document.getElementById("selectComp");
  const roundValue = document.getElementById("selectRound").value;
  
  // Get competition label (use custom name if "Other" is selected)
  const compLabel = compSelect.value === "-1"
    ? document.getElementById("compName").value
    : compSelect.selectedOptions[0]?.label;

  if (!compLabel || compLabel === "--") return "";

  // Only show round if a valid round is selected
  return roundValue == 0
    ? compLabel
    : `${compLabel} - Round ${roundValue}`;
}

function drawCanvas(canvas, template) {

  const fontSelector = document.getElementById("selectFont");
  const selectedFont = fontSelector.options[fontSelector.selectedIndex].value;

  switch(template) {

    /////////// TEMPLATE 1 ///////////

    case "1":
      // Gather information about each team & competition
      var compInfo = getCompInfo();
      var team1Info = getTeamInfo(1);
      var team2Info = getTeamInfo(2);
      var img1 = document.getElementById("team1Img");
      var img2 = document.getElementById("team2Img");

      // Gather and clear canvas
      var cv = canvas.getContext("2d");

      // Calculate canvas variables
      var h = canvas.height;
      var w = canvas.width;
      var txt = canvas.width / 28;

      // Clear canvas
      cv.clearRect(0, 0, w, h);

      // Calculate y shift if no competition info
      var yShift = 0;
      if (compInfo == ""){
        yShift = 0.12 * h;
      }
      
      // Draw canvas background
      var grad = cv.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0,"#353535");
      grad.addColorStop(1,"#161616");
      cv.fillStyle = grad;
      cv.fillRect(0, 0, w, h);

      // Draw white center box
      cv.fillStyle = "white";
      cv.shadowColor = "rgba(0, 0, 0, 0.5)";
      cv.shadowBlur = 10;
      cv.fillRect(0.06 * w, 0.1 * h, 0.88 * w, 0.8 * h);

      // Draw team logo gradient backgrounds
      cv.shadowColor = "rgba(0, 0, 0, 0.4)";
      if (team1Info != 0){
        var grad1 = cv.createLinearGradient(0, 0, 0, h);
        grad1.addColorStop(0.1, team1Info.color1);
        grad1.addColorStop(1, team1Info.color2);
        cv.fillStyle = grad1;
        cv.fillRect(0.069 * w, 0.115 * h, 0.426 * w, 0.65 * h + yShift);
      }
      if (team2Info != 0){
        var grad2 = cv.createLinearGradient(0, 0, 0, h);
        grad2.addColorStop(0.1, team2Info.color1);
        grad2.addColorStop(1, team2Info.color2);
        cv.fillStyle = grad2;
        cv.fillRect(0.505 * w, 0.115 * h, 0.426 * w, 0.65 * h + yShift);
      }

      // Draw team logo faint overlay
      cv.shadowColor = "transparent";
      cv.globalAlpha = 0.02;
      cv.drawImage(img1, 150, 150, 500, 500, 0.069 * w, 0.115 * h, 0.426 * w, 0.65 * h + yShift);
      cv.drawImage(img2, 150, 150, 500, 500, 0.505 * w, 0.115 * h, 0.426 * w, 0.65 * h + yShift);

      // Draw team logo gradient vignettes
      cv.globalAlpha = 1;
      grad1 = cv.createRadialGradient(0.28 * w, 0.4 * h, w * 0.1, 0.28 * w, 0.4 * h, 0.7 * w);
      grad1.addColorStop(0,"transparent");
      grad1.addColorStop(1,"black");
      cv.fillStyle = grad1;
      cv.fillRect(0.069 * w, 0.115 * h, 0.426 * w, 0.65 * h + yShift);

      grad2 = cv.createRadialGradient(0.72 * w, 0.4 * h, w * 0.1, 0.72 * w, 0.4 * h, 0.7 * w);
      grad2.addColorStop(0,"transparent");
      grad2.addColorStop(1,"black");
      cv.fillStyle = grad2;
      cv.fillRect(0.505 * w, 0.115 * h, 0.426 * w, 0.65 * h + yShift);

      // Draw team logos
      cv.shadowColor = "rgba(255, 255, 255, 0.4)";
      cv.shadowBlur = 8;
      cv.drawImage(img1, 0.175 * w, 0.18 * h + yShift / 3, 0.2 * w, 0.2 * w);
      cv.drawImage(img2, 0.62 * w, 0.18 * h + yShift / 3, 0.2 * w, 0.2 * w);

      // Draw team text
      cv.shadowColor = "black";
      cv.shadowBlur = 5;
      cv.fillStyle = "white";
      cv.textAlign = "center";
      cv.font = txt + "px " + selectedFont;
      if (team1Info != 0){
        const teamName1 = document.getElementById("team1Name").value;
        const textLines = lineCount(teamName1);
        if (textLines[0] == 1){
          cv.fillText(teamName1.toUpperCase(), 0.28 * w, 0.68 * h + yShift / 2, 0.35 * w);
        } else {
          cv.fillText(textLines[0].toUpperCase(), 0.28 * w, 0.64 * h + yShift / 2, 0.35 * w);
          cv.fillText(textLines[1].toUpperCase(), 0.28 * w, 0.70 * h + yShift / 2, 0.35 * w);
        }
      }
      if (team2Info != 0){
        const teamName2 = document.getElementById("team2Name").value;
        const textLines = lineCount(teamName2);
        if (textLines[0] == 1){
          cv.fillText(teamName2.toUpperCase(), 0.717 * w, 0.68 * h + yShift / 2, 0.35 * w);
        } else {
          cv.fillText(textLines[0].toUpperCase(), 0.717 * w, 0.64 * h + yShift / 2, 0.35 * w);
          cv.fillText(textLines[1].toUpperCase(), 0.717 * w, 0.70 * h + yShift / 2, 0.35 * w);
        }
      }

      // Draw league & round text
      cv.shadowColor = "rgba(0, 0, 0, 0.2)";
      cv.shadowBlur = 2;
      cv.fillStyle = "#1A1A1A";
      cv.font = txt * 0.8 + "px " + selectedFont;
      cv.fillText(compInfo.toUpperCase(), 0.5 * w, 0.852 * h, 0.8 * w);

      // Draw vs text
      cv.shadowColor = "rgba(0, 0, 0, 0.4)";
      cv.shadowBlur = 10;
      cv.fillStyle = "white";
      cv.fillRect(0.46 * w, 0.38 * h + yShift / 2, 0.08 * w, 0.12 * h);

      cv.shadowColor = "transparent";
      cv.font = txt * 1.2 + "px " + selectedFont;
      cv.fillStyle = "#1A1A1A";
      cv.fillText("VS", 0.5 * w, 0.467 * h + yShift / 2, 0.1 * w);
      
      break;

    /////////// TEMPLATE 2 ///////////

    case "2":
      // Gather information about each team & competition
      var compInfo = getCompInfo();
      var team1Info = getTeamInfo(1);
      var team2Info = getTeamInfo(2);
      var img1 = document.getElementById("team1Img");
      var img2 = document.getElementById("team2Img");

      // Gather and clear canvas
      var cv = canvas.getContext("2d");

      // Calculate canvas variables
      var h = canvas.height;
      var w = canvas.width;
      var txt = canvas.width / 28;

      // Clear canvas
      cv.clearRect(0, 0, w, h);

      // Calculate x/y shift if no competition info
      var yShift = 0;
      var xShift = 0;
      if (compInfo == ""){
        yShift = 0.06 * h;
        xShift = 0.005 * w;
      }

      // Draw team logo gradient backgrounds
      if (team1Info != 0){
        var grad1 = cv.createLinearGradient(0, 0, 0, h);
        grad1.addColorStop(0.1, team1Info.color1);
        grad1.addColorStop(1, team1Info.color2);
        cv.fillStyle = grad1;
        
        // Custom shape
        cv.beginPath();
        cv.moveTo(0, 0);
        cv.lineTo(0.551 * w, 0);
        cv.lineTo(0.451 * w, h);
        cv.lineTo(0, h);
        cv.lineTo(0,0);
        cv.fill();
        cv.closePath();
      }
      if (team2Info != 0){
        var grad2 = cv.createLinearGradient(0, 0, 0, h);
        grad2.addColorStop(0.1, team2Info.color1);
        grad2.addColorStop(1, team2Info.color2);
        cv.fillStyle = grad2;

        // Custom shape
        cv.beginPath();
        cv.moveTo(w, 0);
        cv.lineTo(0.549 * w, 0);
        cv.lineTo(0.449 * w, h);
        cv.lineTo(w, h);
        cv.lineTo(w,0);
        cv.fill();
        cv.closePath();
      }

      // Draw team logo faint overlay
      cv.shadowColor = "transparent";
      cv.globalAlpha = 0.01;
      cv.drawImage(img1, 150, 0, 650, 800, 0, 0, 0.45 * w, h);
      cv.drawImage(img2, 0, 0, 650, 800, 0.55 * w, 0, 0.45 * w, h);

      // Draw vignette
      cv.globalAlpha = 1;
      grad1 = cv.createRadialGradient(0.5 * w, 0.5 * h, 0, 0.5 * w, 0.5 * h, 1.5 * w);
      grad1.addColorStop(0, "transparent");
      grad1.addColorStop(1, "black");
      cv.fillStyle = grad1;
      cv.fillRect(0, 0, w, h);

      // Draw team logos
      cv.shadowColor = "rgba(255, 255, 255, 0.4)";
      cv.shadowBlur = 8;
      cv.drawImage(img1, 0.12 * w, 0.12 * h + yShift, 0.24 * w, 0.24 * w);
      cv.drawImage(img2, 0.63 * w, 0.12 * h + yShift, 0.24 * w, 0.24 * w);

      // Draw team text
      cv.shadowColor = "black";
      cv.shadowBlur = 5;
      cv.fillStyle = "white";
      cv.textAlign = "center";
      cv.font = txt + "px " + selectedFont;
      if (team1Info != 0){
        const teamName1 = document.getElementById("team1Name").value;
        const textLines = lineCount(teamName1);
        if (textLines[0] == 1){
          cv.fillText(teamName1.toUpperCase(), 0.24 * w + xShift, 0.69 * h + yShift, 0.35 * w);
        } else {
          cv.fillText(textLines[0].toUpperCase(), 0.24 * w + xShift, 0.66 * h + yShift, 0.35 * w);
          cv.fillText(textLines[1].toUpperCase(), 0.24 * w + xShift, 0.72 * h + yShift, 0.35 * w);
        }
      }
      if (team2Info != 0){
        const teamName2 = document.getElementById("team2Name").value;
        const textLines = lineCount(teamName2);
        if (textLines[0] == 1){
          cv.fillText(teamName2.toUpperCase(), 0.754 * w - xShift, 0.69 * h + yShift, 0.35 * w);
        } else {
          cv.fillText(textLines[0].toUpperCase(), 0.754 * w - xShift, 0.66 * h + yShift, 0.35 * w);
          cv.fillText(textLines[1].toUpperCase(), 0.754 * w - xShift, 0.72 * h + yShift, 0.35 * w);
        }
      }

      // Central divider line
      cv.shadowColor = "transparent";
      cv.beginPath();
      cv.moveTo(0.551 * w, 0);
      cv.quadraticCurveTo(0.508 * w, 0.5 * h, 0.451 * w, h);
      cv.lineTo(0.449 * w, h);
      cv.quadraticCurveTo(0.492 * w, 0.5 * h, 0.549 * w, 0);
      cv.lineTo(0.551 * w, 0);
      cv.fillStyle = "white";
      cv.fill();
      cv.closePath();

      // Draw league & round white box
      if (compInfo != ""){
        cv.fillStyle = "white";
        cv.shadowColor = "rgba(0, 0, 0, 0.5)";
        cv.shadowBlur = 5;
        cv.fillRect(0.15 * w, 0.825 * h, 0.7 * w, 0.1 * h);
      }

      // Draw league & round text
      cv.shadowColor = "rgba(0, 0, 0, 0.2)";
      cv.shadowBlur = 2;
      cv.fillStyle = "#1A1A1A";
      cv.font = txt * 0.8 + "px " + selectedFont;
      cv.fillText(compInfo.toUpperCase(), 0.5 * w, 0.892 * h, 0.65 * w);

      // Draw vs text
      cv.shadowColor = "rgba(0, 0, 0, 0.4)";
      cv.shadowBlur = 10;
      cv.fillStyle = "white";
      cv.fillRect(0.46 * w, 0.42 * h, 0.08 * w, 0.12 * h);

      cv.shadowColor = "transparent";
      cv.font = txt * 1.2 + "px " + selectedFont;
      cv.fillStyle = "#1A1A1A";
      cv.fillText("VS", 0.5 * w, 0.507 * h, 0.1 * w);

      //Draw white border
      // cv.strokeStyle = "white";
      // cv.lineWidth = 0.03 * w;
      // cv.strokeRect(0, 0, w, h);

      break;

    /////////// TEMPLATE 3 ///////////

    case "3":
      // Gather information about each team & competition
      var compInfo = getCompInfo();
      var team1Info = getTeamInfo(1);
      var team2Info = getTeamInfo(2);
      var img1 = document.getElementById("team1Img");
      var img2 = document.getElementById("team2Img");

      // Gather and clear canvas
      var cv = canvas.getContext("2d");

      // Calculate canvas variables
      var h = canvas.height;
      var w = canvas.width;
      var txt = canvas.width / 28;

      // Clear canvas
      cv.clearRect(0, 0, w, h);

      // Calculate x/y shift if no competition info
      var yShift = 0.04 * h;
      var xShift = 0;
      if (compInfo == ""){
        yShift = 0.06 * h;
        xShift = 0.005 * w;
      }

      // Draw canvas background
      var grad = cv.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0,"#121212");
      grad.addColorStop(1,"#161616");
      cv.fillStyle = grad;
      cv.fillRect(0, 0, w, h);

      var grad = cv.createRadialGradient(-0.1 * w, 0.1 * h, 0.7 * w, -0.1 * w, 0.1 * h, 0);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(1, team1Info.color1);
      cv.fillStyle = grad;
      cv.fillRect(0, 0, w, h);

      var grad = cv.createRadialGradient(-0.1 * w, 0.9 * h, 0.7 * w, -0.1 * w, 0.9 * h, 0);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(1, team1Info.color2);
      cv.fillStyle = grad;
      cv.fillRect(0, 0, w, h);

      var grad = cv.createRadialGradient(1.1 * w, 0.1 * h, 0.7 * w, 1.1 * w, 0.1 * h, 0);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(1, team2Info.color1);
      cv.fillStyle = grad;
      cv.fillRect(0, 0, w, h);

      var grad = cv.createRadialGradient(1.1 * w, 0.9 * h, 0.7 * w, 1.1 * w, 0.9 * h, 0);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(1, team2Info.color2);
      cv.fillStyle = grad;
      cv.fillRect(0, 0, w, h);

      // Draw team logo faint overlay
      // cv.shadowColor = "transparent";
      // cv.globalAlpha = 0.01;
      // cv.drawImage(img1, -1.1 * h, -0.5 * h, 2 * h, 2 * h);
      // cv.drawImage(img2, -0.9 * h + w, -0.5 * h, 2 * h, 2 * h);

      // Draw vignette
      cv.globalAlpha = 1;
      grad1 = cv.createRadialGradient(0.5 * w, 0.5 * h, 0, 0.5 * w, 0.5 * h, 1.5 * w);
      grad1.addColorStop(0, "transparent");
      grad1.addColorStop(1, "black");
      cv.fillStyle = grad1;
      cv.fillRect(0, 0, w, h);

      // Draw team logos
      cv.shadowColor = "black";
      cv.shadowBlur = 8;
      cv.drawImage(img1, 0.08 * w, 0.04 * h + yShift, 0.30 * w, 0.30 * w);
      cv.drawImage(img2, 0.62 * w, 0.04 * h + yShift, 0.30 * w, 0.30 * w);

      // Draw team text
      cv.shadowColor = "black";
      cv.shadowBlur = 5;
      cv.fillStyle = "white";
      cv.textAlign = "center";
      cv.font = txt + "px " + selectedFont;
      if (team1Info != 0){
        const teamName1 = document.getElementById("team1Name").value;
        const textLines = lineCount(teamName1);
        if (textLines[0] == 1){
          cv.fillText(teamName1.toUpperCase(), 0.225 * w + xShift, 0.73 * h + yShift, 0.35 * w);
        } else {
          cv.fillText(textLines[0].toUpperCase(), 0.225 * w + xShift, 0.70 * h + yShift, 0.35 * w);
          cv.fillText(textLines[1].toUpperCase(), 0.225 * w + xShift, 0.76 * h + yShift, 0.35 * w);
        }
      }
      if (team2Info != 0){
        const teamName2 = document.getElementById("team2Name").value;
        const textLines = lineCount(teamName2);
        if (textLines[0] == 1){
          cv.fillText(teamName2.toUpperCase(), 0.775 * w - xShift, 0.73 * h + yShift, 0.35 * w);
        } else {
          cv.fillText(textLines[0].toUpperCase(), 0.775 * w - xShift, 0.70 * h + yShift, 0.35 * w);
          cv.fillText(textLines[1].toUpperCase(), 0.775 * w - xShift, 0.76 * h + yShift, 0.35 * w);
        }
      }

      // Draw league & round white box
      if (compInfo != ""){
        cv.shadowColor = "rgba(0, 0, 0, 0.2)";
      cv.shadowBlur = 2;
      cv.fillStyle = "white";
      cv.font = txt * 0.8 + "px " + selectedFont;
      cv.fillText(compInfo.toUpperCase(), 0.5 * w, 0.94 * h, 0.65 * w);
      }

      // Draw vs text
      cv.shadowColor = "transparent";
      cv.font = txt * 1.9 + "px " + selectedFont;
      cv.fillStyle = "white";
      cv.fillText("VS", 0.5 * w, 0.52 * h, 0.1 * w);

      //Draw white border
      // cv.strokeStyle = "white";
      // cv.lineWidth = 0.03 * w;
      // cv.strokeRect(0, 0, w, h);

      break;

  }
}