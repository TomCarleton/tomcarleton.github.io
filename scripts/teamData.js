// New team function
function newTeamData(x,y,z1,z2){
  var team = {
    displayName: x,
    fileName: y,
    color1: z1,
    color2: z2
  }
  return team;
}

// New competition function
function newCompData(x,y){
  var comp = {
    displayName: x,
    fileName: y
  }
  return comp;
}

// Create blank comp list
var compList = [];

// BD National Leagues
compList.push(newCompData("English Men's Superleague", "mSuperLeague"));
compList.push(newCompData("English Men's League 1", "mLeague1"));
compList.push(newCompData("English Men's League 2", "mLeague2"));
compList.push(newCompData("English Men's League 3", "mLeague3"));
compList.push(newCompData("English Men's League 4", "mLeague4"));
compList.push(newCompData("English Women's Superleague", "wSuperLeague"));
compList.push(newCompData("English Women's League 1", "wLeague1"));

// Create blank team list
var teamList = [];

// BD Men's Superleague
teamList.push(newTeamData("Leamington Spartans", "leamSpartans", "#E0362A", "#A11E23"));
teamList.push(newTeamData("Lutterworth Meteors", "lutMeteors", "red", "black"));
teamList.push(newTeamData("Manchester Killer Bees", "mancBees", "yellow", "#7F7F00"));
teamList.push(newTeamData("London Storm", "londStorm", "black", "white"));
teamList.push(newTeamData("Bedford Rangers", "bedRangers", "teal", "black"));
teamList.push(newTeamData("Nottingham Sheriffs", "notSheriffs", "green", "black"));
teamList.push(newTeamData("Derby Phantoms", "derPhantoms", "purple", "black"));
teamList.push(newTeamData("Coventry Silverbacks", "covSilverbacks", "grey", "black"));
teamList.push(newTeamData("London Storm 2", "londStorm", "black", "white"));
teamList.push(newTeamData("Wessex Wolves", "wesWolves", "black", "#FFCC00"));

// BD Men's League 1
teamList.push(newTeamData("Norwich Nighthawks", "norNighthawks", "black", "white"));
teamList.push(newTeamData("Manchester Worker Bees", "mancBees", "yellow", "#7F7F00"));
teamList.push(newTeamData("MK Cyclones", "mkCyclones", "#752F79", "#B86BC4"));
teamList.push(newTeamData("Leamington Spartans 2", "leamSpartans", "#E0362A", "#A11E23"));
teamList.push(newTeamData("Bedford Mighty Eagles", "bedEagles", "#B9A668", "#231F20"));
teamList.push(newTeamData("Bedford Rangers 2", "bedRangers", "teal", "black"));
teamList.push(newTeamData("Leeds Owls", "leedsOwls", "#333EE8", "#44BA7E"));
teamList.push(newTeamData("Thunderdodge", "thunDodge", "black", "#E1860B"));
teamList.push(newTeamData("Nottingham Sheriffs 2", "notSheriffs", "green", "black"));
teamList.push(newTeamData("Virtue Empire", "virEmpire", "#FC650C", "#314C83"));

// BD Men's League 2
teamList.push(newTeamData("Rhondda Dragons", "rhoDragons", "black", "red"));
teamList.push(newTeamData("Coventry Silverbacks 2", "covSilverbacks", "grey", "black"));
teamList.push(newTeamData("London Storm 3", "londStorm", "black", "white"));
teamList.push(newTeamData("Leicester Mustangs", "leiMustangs", "#24398A", "white"));
teamList.push(newTeamData("Stafford Raptors", "stafRaptors", "black", "red"));
teamList.push(newTeamData("Carmarthen Wizards", "carWizards", "white", "#2E0051"));
teamList.push(newTeamData("Derby Phantoms 2", "derPhantoms", "purple", "black"));
teamList.push(newTeamData("Wessex Wolves 2", "wesWolves", "black", "#FFCC00"));
teamList.push(newTeamData("MK Cyclones 2", "mkCyclones", "#752F79", "#B86BC4"));
teamList.push(newTeamData("Manchester Soldier Bees", "mancBees", "yellow", "#7F7F00"));

// BD Men's League 3
teamList.push(newTeamData("Sheffield Bovines", "shefBovines", "black", "white"));
teamList.push(newTeamData("London Saints", "lonSaints", "white", "#880D17"));
teamList.push(newTeamData("Canterbury Crocodiles", "cantCrocodiles", "#0E6538", "#548F4B"));
teamList.push(newTeamData("Norwich Nighthawks 2", "norNighthawks", "black", "white"));
teamList.push(newTeamData("Hartlepool Mavericks", "hartMavericks", "#1690C1", "white"));
teamList.push(newTeamData("Stafford Raptors 2", "stafRaptors", "black", "red"));
teamList.push(newTeamData("Virtue Slayers", "virEmpire", "#FC650C", "#314C83"));
teamList.push(newTeamData("Burton Panthers", "burtPanthers", "#3795D1", "black"));

// BD Men's League 4
teamList.push(newTeamData("Essex Swords", "essSwords", "white", "red"));
teamList.push(newTeamData("Leamington Spartans 3", "leamSpartans", "#E0362A", "#A11E23"));
teamList.push(newTeamData("Brayford Beasts", "brayBeasts", "black", "#731527"));
teamList.push(newTeamData("Chippenham Chargers", "chipChargers", "red", "black"));
teamList.push(newTeamData("Leicester Mustangs 2", "leiMustangs", "#24398A", "white"));
teamList.push(newTeamData("Coventry Silverbacks 3", "covSilverbacks", "grey", "black"));
teamList.push(newTeamData("Leicester Mustangs 3", "leiMustangs", "#24398A", "white"));
teamList.push(newTeamData("Leeds Barn Owls", "leedsOwls", "#333EE8", "#44BA7E"));

// BD Women's Superleague
teamList.push(newTeamData("East Anglia Valkyries", "eaVikings", "black", "#27D8FF"));
teamList.push(newTeamData("Manchester Queen Bees", "mancBees", "yellow", "#7F7F00"));

// BD Women's League 1
teamList.push(newTeamData("Leicester White Tigers", "leiTigers", "white", "black"));
teamList.push(newTeamData("Manchester Honey Bees", "mancBees", "yellow", "#7F7F00"));

// Define sort function
function compare( a, b ) {
  if ( a.displayName < b.displayName ){
    return -1;
  }
  if ( a.displayName > b.displayName ){
    return 1;
  }
  return 0;
}

// Sort lists alphabetically
teamList.sort(compare);
compList.sort(compare);

// Populate dropdown boxes
const selectTeam1 = document.getElementById("selectTeam1");
const selectTeam2 = document.getElementById("selectTeam2");
teamList.forEach(team => {
  // Assign option variables
  const selectTemplate = document.createElement("option");
  selectTemplate.label = team.displayName;
  selectTemplate.value = team.fileName;
  const selectTemplate2 = selectTemplate.cloneNode();
  // Add options to dropdowns
  selectTeam1.appendChild(selectTemplate);
  selectTeam2.appendChild(selectTemplate2);
});

const selectComp = document.getElementById("selectComp");
compList.forEach(comp => {
  // Assign option variables
  const selectTemplate = document.createElement("option");
  selectTemplate.label = comp.displayName;
  selectTemplate.value = comp.fileName;
  // Add options to dropdowns
  selectComp.appendChild(selectTemplate);
});

const selectRound = document.getElementById("selectRound");
for (let i = 0; i < 10; i++) {
  const selectTemplate = document.createElement("option");
  selectTemplate.label = "Rnd " + (i + 1);
  selectTemplate.value = (i + 1);
  // Add options to dropdowns
  selectRound.appendChild(selectTemplate);
}