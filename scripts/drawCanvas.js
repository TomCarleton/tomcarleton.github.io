var dataURL = "";
const downloadBtn = document.getElementById("download");

function updateImg() {
  const canvas = document.getElementById('thumb');
  drawCanvas1(canvas);
}

function createImg() {
  const canvas = document.getElementById('thumbnail');
  canvas.parentElement.style.display = "unset";
  drawCanvas1(canvas);
}

function updateTeamLogo(element) {
  const filePath = "DodgeResources/" + element.value + ".png";
  var imgBox = "";
  if (element.id == "selectTeam1"){
    imgBox = document.getElementById("team1Img");
  } else {
    imgBox = document.getElementById("team2Img");
  }
  imgBox.src = filePath;
}

function getTeamInfo(team) {
  if (team == 1){
    const selectTeam1 = document.getElementById("selectTeam1");
    const teamLabel = selectTeam1.options[selectTeam1.selectedIndex].label;
    return teamList.find(t => {
      return t.displayName == teamLabel
    })
  } else {
    const selectTeam2 = document.getElementById("selectTeam2");
    const teamLabel = selectTeam2.options[selectTeam2.selectedIndex].label;
    return teamList.find(t => {
      return t.displayName == teamLabel
    })
  }
}

function getCompInfo() {
  const selectComp = document.getElementById("selectComp");
  const selectRound = document.getElementById("selectRound");
  const compLabel = selectComp.options[selectComp.selectedIndex].label;
  const roundValue = selectRound.options[selectRound.selectedIndex].value;
  if (compLabel == ""){
    return "";
  }
  if (roundValue == 0){
    return compLabel;
  } else {
    return compLabel + " - Round " + roundValue;
  }
}

function drawCanvas1(canvas) {
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
  console.log(txt);

  // Clear canvas
  cv.clearRect(0, 0, w, h);
  
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
  var grad1 = cv.createLinearGradient(0, 0, 0, h);
  grad1.addColorStop(0.1, team1Info.color1);
  grad1.addColorStop(1, team1Info.color2);
  var grad2 = cv.createLinearGradient(0, 0, 0, h);
  grad2.addColorStop(0.1, team2Info.color1);
  grad2.addColorStop(1, team2Info.color2);
  cv.shadowColor = "rgba(0, 0, 0, 0.4)";
  cv.fillStyle = grad1;
  cv.fillRect(0.069 * w, 0.115 * h, 0.426 * w, 0.65 * h);
  cv.fillStyle = grad2;
  cv.fillRect(0.505 * w, 0.115 * h, 0.426 * w, 0.65 * h);

  // Draw team logo gradient vignettes
  grad1 = cv.createRadialGradient(0.28 * w, 0.4 * h, w * 0.1, 0.28 * w, 0.4 * h, 0.7 * w);
  grad1.addColorStop(0,"transparent");
  grad1.addColorStop(1,"black");
  cv.fillStyle = grad1;
  cv.fillRect(0.069 * w, 0.115 * h, 0.426 * w, 0.65 * h);

  grad2 = cv.createRadialGradient(0.72 * w, 0.4 * h, w * 0.1, 0.72 * w, 0.4 * h, 0.7 * w);
  grad2.addColorStop(0,"transparent");
  grad2.addColorStop(1,"black");
  cv.fillStyle = grad2;
  cv.fillRect(0.505 * w, 0.115 * h, 0.426 * w, 0.65 * h);

  // Draw team logos
  cv.shadowColor = "rgba(255, 255, 255, 0.4)";
  cv.shadowBlur = 8;
  cv.drawImage(img1, 0.18 * w, 0.18 * h, 0.2 * w, 0.2 * w);
  cv.drawImage(img2, 0.62 * w, 0.18 * h, 0.2 * w, 0.2 * w);

  // Draw team text
  cv.shadowColor = "black";
  cv.shadowBlur = 5;
  cv.fillStyle = "white";
  cv.textAlign = "center";
  cv.font = txt + "px Montserrat";
  cv.fillText(team1Info.displayName.toUpperCase(), 0.28 * w, 0.68 * h, 0.35 * w);
  cv.fillText(team2Info.displayName.toUpperCase(), 0.715 * w, 0.68 * h, 0.35 * w);

  // Draw league & round text
  cv.shadowColor = "rgba(0, 0, 0, 0.2)";
  cv.shadowBlur = 2;
  cv.fillStyle = "#1A1A1A";
  cv.font = txt * 0.8 + "px Montserrat";
  cv.fillText(compInfo.toUpperCase(), 0.5 * w, 0.852 * h, 0.8 * w);

  // Draw vs text
  cv.shadowColor = "rgba(0, 0, 0, 0.4)";
  cv.shadowBlur = 10;
  cv.fillStyle = "white";
  cv.fillRect(0.46 * w, 0.38 * h, 0.08 * w, 0.12 * h);

  cv.shadowColor = "transparent";
  cv.font = txt * 1.2 + "px Montserrat";
  cv.fillStyle = "#1A1A1A";
  cv.fillText("VS", 0.5 * w, 0.467 * h, 0.1 * w);

  console.log("Draw complete");
}