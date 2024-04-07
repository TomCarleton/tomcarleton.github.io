// Get last selected countries
var selectedCountries = localStorage.getItem("selectedCountries");
if (selectedCountries == null) {
  selectedCountries = [1, 1, 1];
} else {
  sc = [];
  for (let i = 0; i < ((selectedCountries.length + 1) / 2); i++){
    sc[i] = selectedCountries[2 * i];
  }
  selectedCountries = sc;
  for (let i = 0; i < selectedCountries.length; i++){
    const selector = document.getElementById("country" + (i + 1));
    if (selectedCountries[i] == 0)
      selector.classList.add("inactive");
  }
}

// New team function
function newTeamData(x,y,z1,z2,a){
  var team = {
    displayName: x,
    fileName: y,
    color1: z1,
    color2: z2,
    country: a
  }
  return team;
}

// New competition function
function newCompData(x,y,z){
  var comp = {
    displayName: x,
    fileName: y,
    country: z
  }
  return comp;
}

// New country function
function newCountryData(x,y,z){
  var country = {
    displayName: x,
    shortName: y,
    id: z
  }
  return country;
}

// Toggle countries
function toggleCountry(country) {
  var selectedId = countryList.find(c => {return c.shortName == country}).id;
  var selector = document.getElementById("country" + (parseInt(selectedId) + 1));
  if (selectedCountries[selectedId] == 0){
    selector.classList.remove("inactive");
    selectedCountries[selectedId] = 1;
  } else {
    selector.classList.add("inactive");
    selectedCountries[selectedId] = 0;
  }
  localStorage.setItem("selectedCountries", selectedCountries);
  dropdownPopulate();
}

// Create blank country list
var countryList = [];

// Register countries
countryList.push(newCountryData("England", "eng", "0"));
countryList.push(newCountryData("Northern Ireland", "ni", "1"));
countryList.push(newCountryData("Scotland", "sco", "2"));

// Create blank comp list
var compList = [];

// BD National Leagues

// English
compList.push(newCompData("English Men's Superleague", "engMSuperLeague", "eng"));
compList.push(newCompData("English Men's League 1", "engMLeague1", "eng"));
compList.push(newCompData("English Men's League 2", "engMLeague2", "eng"));
compList.push(newCompData("English Men's League 3", "engMLeague3", "eng"));
compList.push(newCompData("English Men's League 4", "engMLeague4", "eng"));
compList.push(newCompData("English Women's Superleague", "engWSuperLeague", "eng"));
compList.push(newCompData("English Women's League 1", "engWLeague1", "eng"));

// NI
compList.push(newCompData("NI Men's Superleague", "nIMSuperLeague", "ni"));
compList.push(newCompData("NI Women's Superleague", "nIWSuperLeague", "ni"));

// Scottish
compList.push(newCompData("Scottish Superleague", "scoSuperLeague", "sco"));


// BD Mixed Leagues

// English
compList.push(newCompData("North Mixed Superleague", "engNMixedSuperLeague", "eng"));
compList.push(newCompData("North Mixed League 1", "engNMixedLeague1", "eng"));
compList.push(newCompData("South Mixed Superleague", "engSMixedSuperLeague", "eng"));

// NI
compList.push(newCompData("NI Mixed League", "nIMixedLeague", "ni"));

// Create blank team list
var teamList = [];

teamList.push(newTeamData("Ballyhackamore Amazons", "balBarbarians", "#5B008C", "black", "ni"));
teamList.push(newTeamData("Ballyhackamore Barbarians", "balBarbarians", "#5B008C", "black", "ni"));
teamList.push(newTeamData("Ballyhackamore Vikings", "balBarbarians", "#5B008C", "black", "ni"));

teamList.push(newTeamData("Bedford Mighty Eagles", "bedEagles", "#B9A668", "#231F20", "eng"));

teamList.push(newTeamData("Bedford Rangers", "bedRangers", "teal", "black", "eng"));
teamList.push(newTeamData("Bedford Rangers 2", "bedRangers", "teal", "black", "eng"));

teamList.push(newTeamData("Berkshire Royals", "berRoyals", "#4d4dff", "yellow", "eng"));

teamList.push(newTeamData("Black Widows", "blaWidows", "black", "red", "ni"));

teamList.push(newTeamData("Brayford Beasts", "brayBeasts", "black", "#731527", "eng"));

teamList.push(newTeamData("Buchan Sharks", "bucSharks", "#018184", "white", "sco"));
teamList.push(newTeamData("Buchan Stingrays", "bucSharks", "#018184", "white", "sco"));

teamList.push(newTeamData("Burton Panthers", "burtPanthers", "#3795D1", "black", "eng"));

teamList.push(newTeamData("Canterbury Crocodiles", "cantCrocodiles", "#0E6538", "#548F4B", "eng"));

teamList.push(newTeamData("Carmarthen Wizards", "carWizards", "white", "#2E0051", "eng"));

teamList.push(newTeamData("Chippenham Chargers", "chipChargers", "red", "black", "eng"));

teamList.push(newTeamData("Coventry Silverbacks", "covSilverbacks", "grey", "black", "eng"));
teamList.push(newTeamData("Coventry Silverbacks 2", "covSilverbacks", "grey", "black", "eng"));
teamList.push(newTeamData("Coventry Silverbacks 3", "covSilverbacks", "grey", "black", "eng"));

teamList.push(newTeamData("Crossfire", "croCannons", "red", "white", "ni"));
teamList.push(newTeamData("Crossfire Cannons", "croCannons", "red", "white", "ni"));
teamList.push(newTeamData("Crossfire Cheetahs", "croCannons", "red", "white", "ni"));

teamList.push(newTeamData("Derby Phantoms", "derPhantoms", "purple", "black", "eng"));
teamList.push(newTeamData("Derby Phantoms 2", "derPhantoms", "purple", "black", "eng"));
teamList.push(newTeamData("Derby Phantoms 3", "derPhantoms", "purple", "black", "eng"));

teamList.push(newTeamData("East Anglia Valkyries", "eaVikings", "black", "#27D8FF", "eng"));
teamList.push(newTeamData("East Anglia Vikings", "eaVikings", "black", "#27D8FF", "eng"));

teamList.push(newTeamData("Edinburgh Dodgeball", "ediFireworks", "black", "red", "sco"));

teamList.push(newTeamData("Essex Swords", "essSwords", "white", "red", "eng"));

teamList.push(newTeamData("GCG Insurgents", "graGuerrillas", "#001946", "black", "sco"));
teamList.push(newTeamData("GCG Ladies", "graGuerrillas", "#001946", "black", "sco"));

teamList.push(newTeamData("Granite City Guerrillas", "graGuerrillas", "#001946", "black", "sco"));

teamList.push(newTeamData("Hartlepool Mavericks", "hartMavericks", "#1690C1", "white", "eng"));

teamList.push(newTeamData("Kapow", "kapow", "red", "black", "ni"));

teamList.push(newTeamData("Kelvin Rapids", "kelRapids", "#082255", "#9CD0FF", "sco"));
teamList.push(newTeamData("Kelvin Swifts", "kelRapids", "#082255", "#9CD0FF", "sco"));

teamList.push(newTeamData("Kings of Queen's", "queAces", "#0248AA", "black", "ni"));

teamList.push(newTeamData("KWAK", "kwak", "#ffff82", "#5da4f0", "eng"));

teamList.push(newTeamData("Leamington Spartans", "leamSpartans", "#A11E23", "#E0362A", "eng"));
teamList.push(newTeamData("Leamington Spartans 2", "leamSpartans", "#A11E23", "#E0362A", "eng"));
teamList.push(newTeamData("Leamington Spartans 3", "leamSpartans", "#A11E23", "#E0362A", "eng"));

teamList.push(newTeamData("Leeds Barn Owls", "leedsOwls", "#333EE8", "#44BA7E", "eng"));
teamList.push(newTeamData("Leeds Owls", "leedsOwls", "#333EE8", "#44BA7E", "eng"));

teamList.push(newTeamData("Leicester Mustangs", "leiMustangs", "#24398A", "white", "eng"));
teamList.push(newTeamData("Leicester Mustangs 2", "leiMustangs", "#24398A", "white", "eng"));
teamList.push(newTeamData("Leicester Mustangs 3", "leiMustangs", "#24398A", "white", "eng"));

teamList.push(newTeamData("Leicester White Tigers", "leiTigers", "white", "black", "eng"));

teamList.push(newTeamData("Lincoln Royals", "linRoyals", "#1E1B36", "yellow", "eng"));

teamList.push(newTeamData("London Saints", "lonSaints", "white", "#880D17", "eng"));

teamList.push(newTeamData("London Storm", "londStorm", "black", "white", "eng"));
teamList.push(newTeamData("London Storm 2", "londStorm", "black", "white", "eng"));
teamList.push(newTeamData("London Storm 3", "londStorm", "black", "white", "eng"));

teamList.push(newTeamData("Lutterworth Meteors", "lutMeteors", "red", "black", "eng"));
teamList.push(newTeamData("M.U.D.S.", "muds", "#7A288C", "white", "eng"));

teamList.push(newTeamData("MK Cyclones", "mkCyclones", "#752F79", "#E53498", "eng"));
teamList.push(newTeamData("MK Cyclones 2", "mkCyclones", "#752F79", "#E53498", "eng"));

teamList.push(newTeamData("Manchester Honey Bees", "mancBees", "yellow", "#7F7F00", "eng"));
teamList.push(newTeamData("Manchester Honey Workers", "mancBees", "yellow", "#7F7F00", "eng"));
teamList.push(newTeamData("Manchester Killer Bees", "mancBees", "yellow", "#7F7F00", "eng"));
teamList.push(newTeamData("Manchester Killer Queens", "mancBees", "yellow", "#7F7F00", "eng"));
teamList.push(newTeamData("Manchester Queen Bees", "mancBees", "yellow", "#7F7F00", "eng"));
teamList.push(newTeamData("Manchester Soldier Bees", "mancBees", "yellow", "#7F7F00", "eng"));
teamList.push(newTeamData("Manchester Worker Bees", "mancBees", "yellow", "#7F7F00", "eng"));

teamList.push(newTeamData("Norwich Nighthawks", "norNighthawks", "grey", "black", "eng"));
teamList.push(newTeamData("Norwich Nighthawks 2", "norNighthawks", "grey", "black", "eng"));

teamList.push(newTeamData("Nottingham Sheriffs", "notSheriffs", "green", "black", "eng"));
teamList.push(newTeamData("Nottingham Sheriffs 2", "notSheriffs", "green", "black", "eng"));

teamList.push(newTeamData("PB Dodgeball", "pbDodge", "black", "#8104F8", "eng"));

teamList.push(newTeamData("Queen's Aces", "queAces", "#0248AA", "black", "ni"));
teamList.push(newTeamData("Queen's Comets", "queComets", "black", "#1C6031", "ni"));
teamList.push(newTeamData("Queen's Quasers", "queAces", "#0248AA", "black", "ni"));
teamList.push(newTeamData("Queen's Shooting Stars", "queAces", "#0248AA", "black", "ni"));
teamList.push(newTeamData("Queens of Hearts", "queAces", "#0248AA", "black", "ni"));
teamList.push(newTeamData("Queens of Queen's", "queAces", "#0248AA", "black", "ni"));

teamList.push(newTeamData("Rhondda Dragons", "rhoDragons", "#2e0000", "#cc0000", "eng"));

teamList.push(newTeamData("Sheffield Bovines", "shefBovines", "black", "white", "eng"));

teamList.push(newTeamData("Something Dumb", "someDumb", "white", "#62C5EF", "eng"));

teamList.push(newTeamData("Stafford Raptors", "stafRaptors", "black", "red", "eng"));
teamList.push(newTeamData("Stafford Raptors 2", "stafRaptors", "black", "red", "eng"));

teamList.push(newTeamData("Thunderdodge", "thunDodge", "black", "#E1860B", "eng"));

teamList.push(newTeamData("Virtue Empire", "virEmpire", "#FC650C", "#314C83", "eng"));
teamList.push(newTeamData("Virtue Slayers", "virEmpire", "#FC650C", "#314C83", "eng"));

teamList.push(newTeamData("Warwick Warriors", "warWarriors", "red", "white", "eng"));

teamList.push(newTeamData("Wessex Wolves", "wesWolves", "black", "#FFCC00", "eng"));
teamList.push(newTeamData("Wessex Wolves 2", "wesWolves", "black", "#FFCC00", "eng"));
teamList.push(newTeamData("Wessex Wolves 3", "wesWolves", "black", "#FFCC00", "eng"));

teamList.push(newTeamData("West Lothian Lightning", "wlLightning", "#715E4F", "#2D2D2D", "sco"));

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
function dropdownPopulate(){
  // Gather and clear dropdowns
  const selectTeam1 = document.getElementById("selectTeam1");
  const selectTeam2 = document.getElementById("selectTeam2");
  selectTeam1.innerHTML = "";
  selectTeam2.innerHTML = "";
  teamList.forEach(team => {
    // Check toggle filters
    if (selectedCountries[countryList.find(c => {return c.shortName == team.country}).id] == 0)
      return;
    // Assign option variables
    const selectTemplate = document.createElement("option");
    selectTemplate.label = team.displayName;
    selectTemplate.value = team.fileName;
    const selectTemplate2 = selectTemplate.cloneNode();
    // Add options to dropdowns
    selectTeam1.appendChild(selectTemplate);
    selectTeam2.appendChild(selectTemplate2);
  });
  // Gather and clear dropdowns
  const selectComp = document.getElementById("selectComp");
  selectComp.innerHTML = `<option value="0" label="" selected></option>`;
  compList.forEach(comp => {
    // Check toggle filters
    if (selectedCountries[countryList.find(c => {return c.shortName == comp.country}).id] == 0)
      return;
    // Assign option variables
    const selectTemplate = document.createElement("option");
    selectTemplate.label = comp.displayName;
    selectTemplate.value = comp.fileName;
    // Add options to dropdowns
    selectComp.appendChild(selectTemplate);
  });
  
  const selectRound = document.getElementById("selectRound");
  selectRound.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const selectTemplate = document.createElement("option");
    selectTemplate.label = "Rnd " + (i + 1);
    selectTemplate.value = (i + 1);
    // Add options to dropdowns
    selectRound.appendChild(selectTemplate);
  }
}

dropdownPopulate();