var drawingArea;
var player, nextField, currentField, currentBox, color;
var field, wonFields;
var first = 1;
var count = 1;
var leaderboard;
var winner, player1, player2, playerTemp;
var newPlayer;
var table, numberOfRows, row;

function init() {
  leaderboard = [];
}

function startGame() {
  document.getElementById("menu").className = "invisible";
  document.getElementById("startTable").className = "";
}

function main(){
  //Variablendeklaration
  player1 = {
    name:document.info1.player1Name.value,
    color:document.getElementById("spieler1colK").value,
    colorBack:document.getElementById("spieler1colF").value
  };
  player2 = {
    name:document.info2.player2Name.value,
    color:document.getElementById("spieler2colK").value,
    colorBack:document.getElementById("spieler2colF").value
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

  draw();
}

function toggle(id) {
  if (document.getElementById(id).className === "") {
    document.getElementById(id).className = "invisible";
  }
  else {
    document.getElementById(id).className = "";
  }
}

function draw() {
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

  if (player == 1) {
    color = player2.color;
    colorBack = player1.colorBack;
  }
  else {
    color = player1.color;
    colorBack = player2.colorBack;
  }

  if (first) {
    field[currentField][currentBox] = player;
    document.getElementById(id).style.background = color;
    player = ((player + 1) % 2);
    nextField = currentBox;
    document.getElementById(nextField).style.background = colorBack;

    if (player == 1) {
      document.getElementById("turn1").style.background = "";
      document.getElementById("turn2").style.background = player2.color;
    }
    else {
      document.getElementById("turn1").style.background = player1.color;
      document.getElementById("turn2").style.background = "";
    }

    first = 0;
  }
  else {
    if (check()) {
      count++;
      field[currentField][currentBox] = player;
      document.getElementById(id).style.background = color;

      if (player == 1) {
        document.getElementById("turn1").style.background = player1.color;
        document.getElementById("turn2").style.background = "";
      }
      else {
        document.getElementById("turn1").style.background = "";
        document.getElementById("turn2").style.background = player2.color;
      }

      if (fieldWon()) {
        document.getElementById("field" + currentField).style.background = color;
        if (gameWon()) {
          gameOver();
          return 0;
        }
      }

      player = ((player + 1) % 2);
      nextField = currentBox;
      document.getElementById(currentField).style.background = "#4f5b66";
      document.getElementById(nextField).style.background = colorBack;

      if (count >= 81 && !gameWon()) {
        tie();
      }
    }
  }
}

function check() {
  if (currentField == nextField) {
    if (field[currentField][currentBox] === "x") {
      return true;
    }
  }
  else {
    return false;
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
        if (field[currentField][5] == field[currentField][1] && field[currentField][1] == field[currentField][3] && field[currentField][5] != "x") {
          wonFields[currentField] = player;
          return true;
        }
        else if (field[currentField][5] == field[currentField][3] && field[currentField][3] == field[currentField][7] && field[currentField][5] != "x") {
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
  document.getElementById("winner").innerHTML = "Unentschieden!";
}

function gameOver() {
  console.log("hex");
  if (player === 0) {
    winner = player1.name;
    document.body.style.background = player1.color;
  }
  else {
    winner = player2.name;
    document.body.style.background = player2.color;
  }
  generateLeaderboard();
  document.getElementById("winner").innerHTML = winner + " hat gewonnen!";
  document.getElementById("drawingArea").className = "invisible";
  document.getElementById("turn").className = "invisible";
  document.getElementById("gameOver").className = "";
  document.getElementById("leaderboard").className = "";
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
  }
}

function newGame() {
  for(a = 1; a <= 9; a++){
     for(b = 1; b <= 9; b++){
       document.getElementById(10 * a + b).style.background = "#c0c5ce";
      }
  }
  document.body.style.background = "#4f5b66";

  document.getElementById("menu").className = "invisible";
  document.getElementById("gameOver").className = "invisible";
  document.getElementById("leaderboard").className = "invisible";
  document.getElementById("startTable").className = "";
}

window.onload = init();
