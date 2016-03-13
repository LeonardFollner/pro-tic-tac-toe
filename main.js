var drawingArea;
var player, nextField, currentField, currentBox, color;
var field, wonFields, leaderboard;
var first, last, count, fieldCount;
var winner, player1, player2, playerTemp;
var wonFieldsPlayer1 = 0;
var wonFieldsPlayer2 = 0;
var newPlayer;
var table, numberOfRows, row;
var fieldCookie, leaderboardCookie, wonFieldsCookie, allCookies;

function checkGameRunning() {
  if (getCookie("gameRunning") == 1) {
    document.getElementById("continueButton").className = "pointer buttonSimple center";
  }
  else {
    document.getElementById("continueButton").className = "pointer buttonSimple center invisible";
  }
}

function startGame() {
  if (getCookie("gameRunning") === "1") {
    document.getElementById("confirm").className = "";
    document.getElementById("menu").className = "invisible";
    document.getElementById("leaderboard").className = "invisible";
  }
  else {
    for(a = 1; a <= 9; a++){
      document.getElementById(a).style.background = "#4f5b66";
      for(b = 1; b <= 9; b++){
        document.getElementById(a * 10 + b).style.background = "#c0c5ce";
      }
    }
    for(c = 1; c <= 9; c++) {
      document.getElementById("field" + c).style.background = "#4f5b66";
    }
    document.getElementById("confirm").className = "invisible";
    document.getElementById("menu").className = "invisible";
    document.getElementById("leaderboard").className = "invisible";
    document.getElementById("startTable").className = "";
  }
}

function startReset() {
  document.getElementById("confirmResetLeaderboard").className = "";
  document.getElementById("leaderboard").className = "invisible";
  document.getElementById("gameOver").className = "invisible";
}

function confirm(what, status) {
  if (what == "resetGame") {
    if (status) {
     resetGame();
     for(a = 1; a <= 9; a++){
       document.getElementById(a).style.background = "#4f5b66";
       for(b = 1; b <= 9; b++){
         document.getElementById(a * 10 + b).style.background = "#c0c5ce";
       }
     }
     for(c = 1; c <= 9; c++) {
       document.getElementById("field" + c).style.background = "#4f5b66";
     }
     document.getElementById("confirm").className = "invisible";
     document.getElementById("menu").className = "invisible";
     document.getElementById("leaderboard").className = "invisible";
     document.getElementById("startTable").className = "";
   }
   else {
     document.getElementById("confirm").className = "invisible";
     document.getElementById("menu").className = "";
   }
  }
  else if (what == "resetLeaderboard") {
    if (status == 1) {
      resetLeaderboard();
    }
    document.getElementById("confirmResetLeaderboard").className = "invisible";
    document.getElementById("leaderboard").className = "";
  }
}

function continueGame(){
  document.getElementById("menu").className = "invisible";
  document.getElementById("leaderboard").className = "invisible";
  draw();
  saveCookies(1);
}

function init() {
  if (getCookie("firstGame") === "") {
    player1 = {
      name:"Spieler1",
      color:"#ab4143",
      colorBack:"#cc7a7c"
    };
    player2 = {
      name:"Spieler2",
      color:"#448eb3",
      colorBack:"#7ab1cc"
    };

    player = (Math.ceil(Math.random()*2)-1);

    field = new Array(10);
    for(a = 1; a <= 9; a++){
       field[a] = new Array(10);
       for(b = 1; b <= 9; b++){
          field[a][b] = "x";
        }
    }

    wonFields = new Array(10);
    for(c = 1; c <= 9; c++) {
      wonFields[c] = "x";
    }

    leaderboard = [];
    first = 1;
    last = 0;
    count = 1;
  }
  else {
    loadVariables();
  }
}

function loadVariables() {
  player1 = {
    name:"",
    color:"",
    colorBack:"",
  };
  player2 = {
    name:"",
    color:"",
    colorBack:"",
  };

  player1.name = getCookie("player1.name");
  player1.color = getCookie("player1.color");
  player1.colorBack = getCookie("player1.colorBack");

  player2.name = getCookie("player2.name");
  player2.color = getCookie("player2.color");
  player2.colorBack = getCookie("player2.colorBack");

  document.info1.player1Name.value = player1.name;
  document.getElementById("spieler1colK").value = player1.color;
  document.getElementById("spieler1colF").value = player1.colorBack;

  document.info2.player2Name.value = player2.name;
  document.getElementById("spieler2colK").value = player2.color;
  document.getElementById("spieler2colF").value = player2.colorBack;

  if (getCookie("gameRunning") == 1){
    getField();
    getWonFields();
    player = getCookie("player");
    count = getCookie("count");
    last = getCookie("lastTurn");
    nextField = getCookie("nextField");
    if (player === "0") {
      document.getElementById(nextField).style.background = player1.colorBack;
    }
    else {
      if (player == 1) {
        document.getElementById(nextField).style.background = player2.colorBack;
      }
    }
  }
  else {
    field = new Array(10);
    for(a = 1; a <= 9; a++){
       field[a] = new Array(10);
       for(b = 1; b <= 9; b++){
          field[a][b] = "x";
        }
    }

    wonFields = new Array(10);
    for(c = 1; c <= 9; c++) {
      wonFields[c] = "x";
    }

    player = (Math.ceil(Math.random()*2)-1);
    count = 1;
    first = 1;
    last = 0;
  }
  getLeaderboard();
}

function getField() {
  fieldCookie = getCookie("field").split(",");
  field = new Array(10);
  for (a = 1; a <= 9; a++){
    field[a] = new Array(10);
    for(b = 1; b <= 9; b++){
      field[a][b] = fieldCookie[(a-1) * 10 + (b+1)];
      if (field[a][b] != "x") {
        if (field[a][b] === "0") {
          document.getElementById(a * 10 + b).style.background = player1.color;
        }
        else {
          if (field[a][b] == 1) {
            document.getElementById(a * 10 + b).style.background = player2.color;
          }
        }
      }
      else {
        document.getElementById(a * 10 + b).style.background = "#c0c5ce";
      }
    }
  }
}

function getLeaderboard() {
  leaderboardCookie = getCookie("leaderboard").split(",");
  if (leaderboardCookie.length === 1) {
    leaderboard = [];
  }
  else {
    leaderboard = new Array(leaderboardCookie.length / 3);
    for (a = 0; a < leaderboardCookie.length / 3; a++) {
      leaderboard[a] = new Array(3);
      for (b = 0; b < 3; b++) {
        leaderboard[a][b] = leaderboardCookie[(a * 3) + b];
      }
    }
  }
}

function getWonFields() {
  wonFieldsCookie = getCookie("wonFields").split(",");
  wonFields = new Array(10);
  for(c = 1; c <= 9; c++) {
    wonFields[c] = wonFieldsCookie[c];
    if (wonFields[c] === "0") {
      document.getElementById("field" + c).style.background = player1.color;
    }
    else {
      if (wonFields[c] == 1){
        document.getElementById("field" + c).style.background = player2.color;
      }
    }
  }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
    }
    return "";
}

function toggle(id) {
  if (id == "leaderboard") {
    if (document.getElementById(id).className === "") {
      document.getElementById(id).className = "invisible";
    }
    else {
      document.getElementById(id).className = "";
      document.getElementById("menu").className = "invisible";
    }
  }
  else {
    if (document.getElementById(id).className === "") {
      document.getElementById(id).className = "invisible";
    }
    else {
      document.getElementById(id).className = "";
    }
  }
}

function showMenu() {
  document.getElementById("confirm").className = "invisible";
  document.getElementById("confirmResetLeaderboard").className = "invisible";
  document.getElementById("startTable").className = "invisible";
  document.getElementById("drawingArea").className = "invisible";
  document.getElementById("turn").className = "invisible";
  document.getElementById("gameOver").className = "invisible";
  document.getElementById("leaderboard").className = "invisible";
  document.getElementById("menu").className = "";
  document.body.style.background = "#4f5b66";
}

function draw() {
  player1.name = document.info1.player1Name.value;
  player1.color = document.getElementById("spieler1colK").value;
  player1.colorBack = document.getElementById("spieler1colF").value;

  player2.name = document.info2.player2Name.value;
  player2.color = document.getElementById("spieler2colK").value;
  player2.colorBack = document.getElementById("spieler2colF").value;

  document.getElementById("startTable").className = "invisible";
  toggle("drawingArea");
  document.getElementById("turn").className = "";
  document.getElementById("turn1").innerHTML = player1.name;
  document.getElementById("turn2").innerHTML = player2.name;

  if (player == 1) {
    document.getElementById("turn1").style.background = "";
    document.getElementById("turn2").style.background = player2.color;
  }
  else {
    document.getElementById("turn1").style.background = player1.color;
    document.getElementById("turn2").style.background = "";
  }
}

function klick(id) {
    currentField = (Math.floor(id / 10));
    currentBox = (id % 10);

  if (last == 0 && check()) {
    if (player == 1) {
      color = player2.color;
      colorBack = player1.colorBack;
    }
    else {
      color = player1.color;
      colorBack = player2.colorBack;
    }

    if (first || !getCookie("gameRunning")) {
      field[currentField][currentBox] = player;
      document.getElementById(id).style.background = color;
      player = ((player + 1) % 2);
      nextField = currentBox;
      document.getElementById(nextField).style.background = colorBack;
      document.getElementById(currentField).style.background = "#4f5b66";

      first = 0;
      document.getElementById("turn").className = "invisible";
      var d = new Date();
      d.setTime(d.getTime() + (365*10*24*60*60*1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = "firstGame=false; " + expires;
    }
    else {
      count++;
      field[currentField][currentBox] = player;
      document.getElementById(id).style.background = color;

      if (fieldWon()) {
        document.getElementById("field" + currentField).style.background = color;
        if (gameWon()) {
          last = 1;
          gameOver();
          return 0;
        }
      }

      player = ((player + 1) % 2);
      nextField = currentBox;
      document.getElementById(currentField).style.background = "#4f5b66";
      document.getElementById(nextField).style.background = colorBack;
      fieldFull(nextField);
      document.getElementById("turn").className = "invisible";

      if (count >= 81 && !gameWon()) {
        last = 1;
        tie();
        gameOver();
        return 0;
      }
    }
    saveCookies(1);
  }
}

function check() {
  if (first) {
    if (field[currentField][currentBox] === "x") {
      return true;
    }
    else {
      return false;
    }
  }
  else if (currentField == nextField) {
    if (field[currentField][currentBox] === "x") {
      return true;
    }
    else {
      return false;
    }
  }
}

function fieldFull(nr) {
  fieldCount = 0;
  for (var e = 1; e <= 9; e++) {
    if(field[nr][e] !== "x") {
      fieldCount++;
    }
  }
  if (fieldCount == 9) {
    first = 1;
    for(a = 1; a <= 9; a++){
      document.getElementById(a).style.background = "#4f5b66";
    }
  }
}

function fieldWon() {
  switch (currentBox) {
    case 1:
      if (wonFields[currentField] === "x") {
        if (field[currentField][1] == field[currentField][2] && field[currentField][2] == field[currentField][3] && field[currentField][1] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else if (field[currentField][1] == field[currentField][5] && field[currentField][5] == field[currentField][6] && field[currentField][1] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else if (field[currentField][1] == field[currentField][4] && field[currentField][4] == field[currentField][7] && field[currentField][1] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else{
          return false;
        }
      }
      else {
        return false;
      }
      break;
    case 2:
      if (wonFields[currentField] === "x") {
        if (field[currentField][2] == field[currentField][1] && field[currentField][1] == field[currentField][3] && field[currentField][2] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else if (field[currentField][2] == field[currentField][5] && field[currentField][5] == field[currentField][8] && field[currentField][2] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else{
          return false;
        }
      }
      break;
    case 3:
      if (wonFields[currentField] === "x") {
        if (field[currentField][3] == field[currentField][1] && field[currentField][1] == field[currentField][2] && field[currentField][3] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else if (field[currentField][3] == field[currentField][5] && field[currentField][5] == field[currentField][7] && field[currentField][3] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else if (field[currentField][3] == field[currentField][6] && field[currentField][6] == field[currentField][9] && field[currentField][3] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else{
          return false;
        }
      }
      break;
    case 4:
      if (wonFields[currentField] === "x") {
        if (field[currentField][4] == field[currentField][1] && field[currentField][1] == field[currentField][7] && field[currentField][4] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else if (field[currentField][4] == field[currentField][5] && field[currentField][5] == field[currentField][6] && field[currentField][4] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else{
          return false;
        }
      }
      break;
    case 5:
      if (wonFields[currentField] === "x") {
        if (field[currentField][5] == field[currentField][1] && field[currentField][1] == field[currentField][9] && field[currentField][5] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else if (field[currentField][5] == field[currentField][3] && field[currentField][3] == field[currentField][7] && field[currentField][5] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else if (field[currentField][5] == field[currentField][4] && field[currentField][4] == field[currentField][6] && field[currentField][5] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else if (field[currentField][5] == field[currentField][2] && field[currentField][2] == field[currentField][8] && field[currentField][5] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else{
          return false;
        }
      }
      break;
    case 6:
      if (wonFields[currentField] === "x") {
        if (field[currentField][6] == field[currentField][3] && field[currentField][3] == field[currentField][9] && field[currentField][6] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else if (field[currentField][6] == field[currentField][4] && field[currentField][4] == field[currentField][5] && field[currentField][6] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else{
          return false;
        }
      }
      break;
    case 7:
      if (wonFields[currentField] === "x") {
        if (field[currentField][7] == field[currentField][3] && field[currentField][3] == field[currentField][5] && field[currentField][7] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else if (field[currentField][7] == field[currentField][1] && field[currentField][1] == field[currentField][4] && field[currentField][7] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else if (field[currentField][7] == field[currentField][8] && field[currentField][8] == field[currentField][9] && field[currentField][7] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else{
          return false;
        }
      }
      break;
    case 8:
      if (wonFields[currentField] === "x") {
        if (field[currentField][8] == field[currentField][7] && field[currentField][7] == field[currentField][9] && field[currentField][8] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else if (field[currentField][8] == field[currentField][2] && field[currentField][2] == field[currentField][5] && field[currentField][8] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else{
          return false;
        }
      }
      break;
    case 9:
      if (wonFields[currentField] === "x") {
        if (field[currentField][9] == field[currentField][1] && field[currentField][1] == field[currentField][5] && field[currentField][9] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else if (field[currentField][9] == field[currentField][3] && field[currentField][3] == field[currentField][6] && field[currentField][9] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else if (field[currentField][9] == field[currentField][7] && field[currentField][7] == field[currentField][8] && field[currentField][9] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else{
          return false;
        }
      }
      break;
  }
}

function gameWon() {
  switch (currentField){
    case 1:
      if (wonFields[1] == wonFields[2] && wonFields[2] == wonFields[3] && wonFields[1] != "x") {
        return true;
      }
      else if (wonFields[1] == wonFields[5] && wonFields[5] == wonFields[6] && wonFields[1] != "x") {
        wonFields[currentField] = player;
        return true;
      }
      else if (wonFields[1] == wonFields[4] && wonFields[4] == wonFields[7] && wonFields[1] != "x") {
        wonFields[currentField] = player;
        return true;
      }
      else{
        return false;
      }
      break;
    case 2:
      if (wonFields[2] == wonFields[1] && wonFields[1] == wonFields[3] && wonFields[2] != "x") {
        return true;
      }
      else if (wonFields[2] == wonFields[5] && wonFields[5] == wonFields[8] && wonFields[2] != "x") {
        wonFields[currentField] = player;
        return true;
      }
      else{
        return false;
      }
      break;
    case 3:
      if (wonFields[3] == wonFields[1] && wonFields[1] == wonFields[2] && wonFields[3] != "x") {
        return true;
      }
      else if (wonFields[3] == wonFields[5] && wonFields[5] == wonFields[7] && wonFields[3] != "x") {
        wonFields[currentField] = player;
        return true;
      }
      else if (wonFields[3] == wonFields[6] && wonFields[6] == wonFields[9] && wonFields[3] != "x") {
        wonFields[currentField] = player;
        return true;
      }
      else{
        return false;
      }
      break;
    case 4:
      if (wonFields[4] == wonFields[1] && wonFields[1] == wonFields[7] && wonFields[4] != "x") {
        return true;
      }
      else if (wonFields[4] == wonFields[5] && wonFields[5] == wonFields[6] && wonFields[4] != "x") {
        wonFields[currentField] = player;
        return true;
      }
      else{
        return false;
      }
      break;
    case 5:
      if (wonFields[5] == wonFields[1] && wonFields[1] == wonFields[3] && wonFields[5] != "x") {
        return true;
      }
      else if (wonFields[5] == wonFields[3] && wonFields[3] == wonFields[7] && wonFields[5] != "x") {
        wonFields[currentField] = player;
        return true;
      }
      else{
        return false;
      }
      break;
    case 6:
      if (wonFields[6] == wonFields[3] && wonFields[3] == wonFields[9] && wonFields[6] != "x") {
        return true;
      }
      else if (wonFields[6] == wonFields[4] && wonFields[4] == wonFields[5] && wonFields[6] != "x") {
        wonFields[currentField] = player;
        return true;
      }
      else{
        return false;
      }
      break;
    case 7:
      if (wonFields[7] == wonFields[3] && wonFields[3] == wonFields[5] && wonFields[7] != "x") {
        return true;
      }
      else if (wonFields[7] == wonFields[1] && wonFields[1] == wonFields[4] && wonFields[7] != "x") {
        wonFields[currentField] = player;
        return true;
      }
      else if (wonFields[7] == wonFields[8] && wonFields[8] == wonFields[9] && wonFields[7] != "x") {
        wonFields[currentField] = player;
        return true;
      }
      else{
        return false;
      }
      break;
    case 8:
      if (wonFields[8] == wonFields[7] && wonFields[7] == wonFields[9] && wonFields[8] != "x") {
        return true;
      }
      else if (wonFields[8] == wonFields[2] && wonFields[2] == wonFields[5] && wonFields[8] != "x") {
        wonFields[currentField] = player;
        return true;
      }
      else{
        return false;
      }
      break;
    case 9:
      if (wonFields[9] == wonFields[1] && wonFields[1] == wonFields[5] && wonFields[9] != "x") {
        return true;
      }
      else if (wonFields[9] == wonFields[3] && wonFields[3] == wonFields[6] && wonFields[9] != "x") {
        wonFields[currentField] = player;
        return true;
      }
      else if (wonFields[9] == wonFields[7] && wonFields[7] == wonFields[8] && wonFields[9] != "x") {
        wonFields[currentField] = player;
        return true;
      }
      else{
        return false;
      }
      break;
  }
}

function tie() {
  for(c = 1; c <= 9; c++) {
    if (wonFields[c] == 0) {
      wonFieldsPlayer1++;
    }
    else if (wonFields[c] == 1) {
      wonFieldsPlayer2++;
    }
  }

  if (wonFieldsPlayer1 > wonFieldsPlayer2) {
    document.getElementById("winner").innerHTML = player1.name + " hat mit " + wonFieldsPlayer1 + " Feldern gewonnen!";
    player = 0;
  }
  else if (wonFieldsPlayer2 > wonFieldsPlayer1) {
    document.getElementById("winner").innerHTML = player2.name + " hat mit " + wonFieldsPlayer2 + " Feldern gewonnen!";
    player = 1;
  }
  else if (wonFieldsPlayer2 == wonFieldsPlayer1) {
    document.getElementById("winner").innerHTML = "Unentschieden!";
  }
}

function gameOver() {
  if (player === 0) {
    winner = player1.name;
    document.body.style.background = player1.color;
  }
  else {
    winner = player2.name;
    document.body.style.background = player2.color;
  }
  generateLeaderboard();
  resetGame();
  last = 1;
  saveCookies(0);

  document.getElementById("winner").innerHTML = winner + " hat gewonnen!";
  document.getElementById("drawingArea").className = "invisible";
  document.getElementById("turn").className = "invisible";
  document.getElementById("gameOver").className = "";
}

function resetGame() {
  for(a = 1; a <= 9; a++){
    for(b = 1; b <= 9; b++){
      field[a][b] = "x";
    }
  }
  for(c = 1; c <= 9; c++) {
    wonFields[c] = "x";
  }
  player = (Math.ceil(Math.random()*2)-1);
  count = 1;
  first = 1;
  last = 0;
}

function resetLeaderboard() {
  leaderboard = [];
  document.cookie = "leaderboard=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  renderLeaderboard();
}

function generateLeaderboard() {
  updateLeaderboard(player1.name);
  updateLeaderboard(player2.name);
  leaderboard.sort(sortLeaderboard);
  renderLeaderboard();
}

function sortLeaderboard(a, b) {
  var diff = (b[1] / b[2]) - (a[1] / a[2]);
  if (diff === 0) {
    return b[2] - a[2];
  }
  else {
    return diff;
  }
}

function updatePlayer(playerEnd, i) {
  if (winner == playerEnd) {
    leaderboard[i][1]++;
  }
  leaderboard[i][2]++;
}

function insertNewPlayer(playerEnd) {
  playerTemp = new Array(3);
  playerTemp[0] = playerEnd;
  if (winner == playerEnd) {
    playerTemp[1] = 1;
  }
  else {
    playerTemp[1] = 0;
  }
  playerTemp[2] = 1;

  leaderboard.push(playerTemp);
  newPlayer = false;
}

function updateLeaderboard(playerEnd) {
  if (leaderboard.length >= 2) {
    for (var i = 0; i < leaderboard.length; i++) {
      if (playerEnd == leaderboard[i][0]) {
        updatePlayer(playerEnd, i);
        newPlayer = false;
        break;
      }
      else {
        newPlayer = true;
      }
    }
  }
  else {
    newPlayer = true;
  }
  if (newPlayer) {
    insertNewPlayer(playerEnd);
  }
}

function renderLeaderboard() {
  table = document.getElementById("leaderboardTable");
  numberOfRows = table.children[0].children.length;

  if (numberOfRows > 1) {
    for (var k = 1; k < numberOfRows; k++) {
      table.deleteRow(1);
    }
  }
  for (var j = 0; j < leaderboard.length; j++) {
    row = table.insertRow(j+1);
    placeCell = row.insertCell(0);
    nameCell = row.insertCell(1);
    wonCell = row.insertCell(2);
    playedCell = row.insertCell(3);

    placeCell.innerHTML = j+1 + ".";
    nameCell.innerHTML = leaderboard[j][0];
    wonCell.innerHTML = leaderboard[j][1];
    playedCell.innerHTML = leaderboard[j][2];

    wonCell.className = "rightText";
    playedCell.className = "rightText";
  }
}

function saveCookies(gameRunning) {
  var d = new Date();
  d.setTime(d.getTime() + (365*10*24*60*60*1000));
  var expires = "expires="+d.toUTCString();

  document.cookie = "leaderboard=" + leaderboard + "; " + expires;

  document.cookie = "player1.name=" + player1.name + "; " + expires;
  document.cookie = "player1.color=" + player1.color + "; " + expires;
  document.cookie = "player1.colorBack=" + player1.colorBack + "; " + expires;

  document.cookie = "player2.name=" + player2.name + "; " + expires;
  document.cookie = "player2.color=" + player2.color + "; " + expires;
  document.cookie = "player2.colorBack=" + player2.colorBack + "; " + expires;

  if (gameRunning === 1) {
    document.cookie = "gameRunning=1; " + expires;
    document.cookie = "nextField=" + nextField + "; " + expires;
    document.cookie = "count=" + count + "; " + expires;
    document.cookie = "lastTurn=" + last + "; " + expires;
    document.cookie = "player=" + player + "; " + expires;
    document.cookie = "field=" + field + "; " + expires;
    document.cookie = "wonFields=" + wonFields + "; " + expires;
  }
  else {
    document.cookie = "gameRunning=0; " + expires;
    document.cookie = "lastTurn=" + last + "; " + expires;
    document.cookie = "nextField=; " + expires;
    document.cookie = "count=; " + expires;
    document.cookie = "player=;" + expires;
    document.cookie = "field=;" + expires;
    document.cookie = "wonFields=; " + expires;
  }
}

function clearAllCookies() {
  document.cookie = "firstGame=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "gameRunning=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "nextField=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "count=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "lastTurn=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "player=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

  document.cookie = "leaderboard=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "field=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "wonFields=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

  document.cookie = "player1.name=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "player1.color=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "player1.colorBack=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

  document.cookie = "player2.name=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "player2.color=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "player2.colorBack=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

function allCookiesToCommandLine() {
  allCookies = document.cookie;
  console.log(allCookies);
}

function reset() {
  document.info1.player1Name.value = "Spieler1";
  document.getElementById("spieler1colK").value = "#ab4143";
  document.getElementById("spieler1colF").value = "#cc7a7c";

  document.info2.player2Name.value = "Spieler2";
  document.getElementById("spieler2colK").value = "#448eb3";
  document.getElementById("spieler2colF").value = "#7ab1cc";
}

function newGame() {
  resetGame();
  saveCookies(0);
  document.body.style.background = "#4f5b66";
  for(a = 1; a <= 9; a++){
    document.getElementById(a).style.background = "#4f5b66";
    for(b = 1; b <= 9; b++){
      document.getElementById(a * 10 + b).style.background = "#c0c5ce";
    }
  }
  for(c = 1; c <= 9; c++) {
    document.getElementById("field" + c).style.background = "#4f5b66";
  }

  document.getElementById("drawingArea").className = "invisible";
  document.getElementById("menu").className = "invisible";
  document.getElementById("gameOver").className = "invisible";
  document.getElementById("leaderboard").className = "invisible";
  document.getElementById("startTable").className = "";
}

function main() {
  checkGameRunning();
  init();
  renderLeaderboard();
}

window.onload = main;
