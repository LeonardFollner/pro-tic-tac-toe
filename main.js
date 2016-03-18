//variabledeclaration
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

/* ----------------------------------------------------------------------------
  Vor allem anderen, laden der Variablen, Darstellung, ...
  ----------------------------------------------------------------------------*/

function main() {                                                               //wird nach Laden der Seite ausgeführt
  checkGameRunning();
  init();
  renderLeaderboard();
}

function checkGameRunning() {                                                   //kontrolliert, ob in den Cookies ein laufendes Spiel gespeichert ist
  if (getCookie("gameRunning") == 1) {
    document.getElementById("continueButton").className = "pointer buttonSimple center";            //zeigt Button zum Fortsetzen an
  }
  else {
    document.getElementById("continueButton").className = "pointer buttonSimple center invisible";  //blendet Button zum Fortsetzen aus
  }
}

function init() {                                                               //erstellt oder lädt Variablen
  if (getCookie("firstGame") === "") {                                          //nur beim aller ersten Laden der Seite werden alle Variablen neu angelegt
    player1 = {                                                                 //Objekt für Spieler 1
      name:"Spieler1",                                                          //mit Name,
      color:"#ab4143",                                                          //HighlightFarbe,
      colorBack:"#cc7a7c"                                                       //und Hintergrundfarbe
    };
    player2 = {                                                                 //Das gleiche für Spieler 2
      name:"Spieler2",
      color:"#448eb3",
      colorBack:"#7ab1cc"
    };

    player = (Math.ceil(Math.random()*2)-1);                                    //zufällig einen ersten Spieler wählen (0 steht für Spieler 1; 1 steht für Spieler 2)

    field = new Array(10);                                                      //neu Anlegen eines Arrays in dem das Spiel gespeichert wird
    for(a = 1; a <= 9; a++){
       field[a] = new Array(10);                                                //neu Anlegen von Arrays zum Speichern der kleinen Kästchen
       for(b = 1; b <= 9; b++){
          field[a][b] = "x";                                                    //Kästchen keinem Spieler zuweisen
        }
    }

    wonFields = new Array(10);                                                  //neu Anlegen eines Arrays zum Speichern der gewonnenen großen Kästchen
    for(c = 1; c <= 9; c++) {
      wonFields[c] = "x";                                                       //große Kästchen keinem Spieler zuweisen
    }
                                                                                //Anlegen neuer Spielvariablen für:
    leaderboard = [];                                                           //Bestenliste
    first = 1;                                                                  //ersten Spielzug
    last = 0;                                                                   //letzten Spielzug
    count = 1;                                                                  //Zahl der bereits ausgefüllten Kästchen
    wonFieldsPlayer1 = 0;                                                       //Zahl der gewonnen Felder für Spieler 1
    wonFieldsPlayer2 = 0;                                                       //Zahl der gewonnen Felder für Spieler 2
  }
  else {                                                                        //wenn es nicht der erste Aufruf der Seite ist
    loadVariables();                                                            //Variablen aus dem Speicher laden
  }
}

function loadVariables() {                                                      //lädt bestehende Variablen
  player1 = {                                                                   //Anlegen von leeren Objekten für Spieler 1
    name:"",
    color:"",
    colorBack:"",
  };
  player2 = {                                                                   //und Spieler 2
    name:"",
    color:"",
    colorBack:"",
  };

  player1.name = getCookie("player1.name");                                     //Auslesen der Cookies und Speichern in den jeweiligen Objekteigenschaften
  player1.color = getCookie("player1.color");
  player1.colorBack = getCookie("player1.colorBack");

  player2.name = getCookie("player2.name");
  player2.color = getCookie("player2.color");
  player2.colorBack = getCookie("player2.colorBack");

  document.info1.player1Name.value = player1.name;                              //Formularfelder auf die gespeicherten Werte setzen
  document.getElementById("spieler1colK").value = player1.color;
  document.getElementById("spieler1colF").value = player1.colorBack;

  document.info2.player2Name.value = player2.name;
  document.getElementById("spieler2colK").value = player2.color;
  document.getElementById("spieler2colF").value = player2.colorBack;

  if (getCookie("gameRunning") == 1){                                           //wenn ein Spiel unterbrochen und gespeichert wurde
    getField();                                                                 //Laden des Feldes
    getWonFields();                                                             //Laden der gewonnenen Felder
    player = getCookie("player");                                               //Laden, welcher Spieler am Zug ist
    count = getCookie("count");                                                 //Anzahl ausgefüllter Kästchen laden
    last = getCookie("lastTurn");                                               //Laden, ob es der letzte Zug ist
    nextField = getCookie("nextField");                                         //Laden, wo als nächstes gesetzt werden muss
    if (player === "0") {                                                       //Färben des nächsten Feldes entsprechend des Spielers
      document.getElementById(nextField).style.background = player1.colorBack;
    }
    else {
      if (player == 1) {
        document.getElementById(nextField).style.background = player2.colorBack;
      }
    }
  }
  else {                                                                        //wenn kein laufendes Spiel gespeichert wurde
    field = new Array(10);                                                      //Anlegen der Variablen wie beim ersten Mal (siehe function init())
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
  wonFieldsPlayer1 = 0;                                                         //Zahl der gewonnen Felder für Spieler 1 zurück setzen
  wonFieldsPlayer2 = 0;                                                         //Zahl der gewonnen Felder für Spieler 2 zurück setzen
  getLeaderboard();                                                             //unabhängig davon, ob ein Spiel gespeichert wurde muss die Bestenliste geladen werden
}

/* ----------------------------------------------------------------------------
  Display
  ----------------------------------------------------------------------------*/

function toggle(id) {                                                           //Aus-/Einblenden eines Elementes
  if (id == "leaderboard") {                                                    //wenn es sich um die Bestenliste handelt
    if (document.getElementById(id).className === "") {
      document.getElementById(id).className = "invisible";
    }
    else {
      document.getElementById(id).className = "";
      document.getElementById("menu").className = "invisible";                  //muss zusätzlich das Menu ausgeblendet werden
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

function showMenu() {                                                           //Einblenden des Menus
  document.getElementById("confirm").className = "invisible";                   //Ausblenden aller anderen Teile
  document.getElementById("confirmResetLeaderboard").className = "invisible";
  document.getElementById("startTable").className = "invisible";
  document.getElementById("drawingArea").className = "invisible";
  document.getElementById("turn").className = "invisible";
  document.getElementById("gameOver").className = "invisible";
  document.getElementById("leaderboard").className = "invisible";
  document.getElementById("menu").className = "";
  document.body.style.background = "#4f5b66";                                   //Zurücksetzen der Hintergrundfarbe
}

/* ----------------------------------------------------------------------------
  Spielbeginn
  ----------------------------------------------------------------------------*/

function startGame() {                                                          //leitet den Start ein
  if (getCookie("gameRunning") === "1") {                                       //wenn ein Spiel noch läuft
    document.getElementById("confirm").className = "";                          //einblenden des Bestätigungsdialoges
    document.getElementById("menu").className = "invisible";                    //ausblenden von allem anderen
    document.getElementById("leaderboard").className = "invisible";
  }
  else {                                                                        //ansonsten
    for(a = 1; a <= 9; a++){                                                    //Farben der Spielfläche zurücksetzen
      document.getElementById(a).style.background = "#4f5b66";
      for(b = 1; b <= 9; b++){
        document.getElementById(a * 10 + b).style.background = "#c0c5ce";
      }
    }
    for(c = 1; c <= 9; c++) {
      document.getElementById("field" + c).style.background = "#4f5b66";
    }
    document.getElementById("confirm").className = "invisible";                 //alles ausblenden
    document.getElementById("menu").className = "invisible";
    document.getElementById("leaderboard").className = "invisible";
    document.getElementById("startTable").className = "";                       //Eingabefeld einblenden
  }
}

function draw() {                                                               //letzte Checks, Anzeigen der Spielfläche
  player1.name = document.info1.player1Name.value;                              //Abspeichern der Eingaben in Variablen
  player1.color = document.getElementById("spieler1colK").value;
  player1.colorBack = document.getElementById("spieler1colF").value;

  player2.name = document.info2.player2Name.value;
  player2.color = document.getElementById("spieler2colK").value;
  player2.colorBack = document.getElementById("spieler2colF").value;

  if (player1.name == player2.name) {                                           //Namen müssen sich unterscheiden
    alert("Bitte unterschiedliche Namen wählen.");                              //Hinweis
    return 0;                                                                   //Abbruch
  }
  if (player1.color == player2.color || player1.color == player1.colorBack || player2.color == player2.colorBack || player1.color == player2.colorBack || player2.color == player1.colorBack) { //Farben müssen sich unterscheiden
    alert("Bitte unterschiedliche Farben wählen.");                             //Hinweis
    return 0;                                                                   //Abbruch
  }

  document.getElementById("startTable").className = "invisible";                //Ausblenden des Formulars
  toggle("drawingArea");                                                        //Anzeigen des Spiels

  document.getElementById("turn1").innerHTML = player1.name;                    //Ausfüllen der Namen in die Tabelle, wer am Zug ist
  document.getElementById("turn2").innerHTML = player2.name;

  if (player == 1) {                                                            //Spieler, der am Zug ist farblich hinterlegen
    document.getElementById("turn1").style.background = "";
    document.getElementById("turn2").style.background = player2.color;
  }
  else {
    document.getElementById("turn1").style.background = player1.color;
    document.getElementById("turn2").style.background = "";
  }
  document.getElementById("turn").className = "";                               //Anzeigen der Tabelle wer am Zug ist
}

function continueGame(){                                                        //Spiel fortsetzen
  document.getElementById("menu").className = "invisible";                      //Ausblenden aller Bedienelemente
  document.getElementById("leaderboard").className = "invisible";
  draw();                                                                       //Spiel einleiten
  saveCookies(1);                                                               //Spiel als laufend speichern
}

/* ----------------------------------------------------------------------------
  eigentliche Spielmechanik
  ----------------------------------------------------------------------------*/

function klick(id) {                                                            //eigentliche Spielmechanik (id übergibt das geklickte Kästchen)
    currentField = (Math.floor(id / 10));                                       //Speichern des geklickten großen Feldes als eigene Variable
    currentBox = (id % 10);                                                     //Speichern des geklickten Kästchens im geklickten Feld als eigene Variable

  if (last == 0 && check()) {                                                   //nur wenn der letzte Zug noch nicht gesetzt wurde UND es ein erlaubter Zug ist
    if (player == 1) {                                                          //Variablen für Farbe und Hintergrundfarbe je nach Spieler festlegen
      color = player2.color;
      colorBack = player1.colorBack;
    }
    else {
      color = player1.color;
      colorBack = player2.colorBack;
    }

    if (first || !getCookie("gameRunning")) {                                   //wenn es der erste Zug ist oder das Spiel noch nicht als laufend gespeichert wurde, 'first' gibt auch an, dass der Zug frei gesetzt werden darf, zB wenn auf ein volles Feld verwiesen wurde
      field[currentField][currentBox] = player;                                 //speichern, von welchem Spieler das Feld angeklickt wurde
      document.getElementById(id).style.background = color;                     //Färben des Kästchens
      player = ((player + 1) % 2);                                              //Ändern der Spielervariable zum nächsten Spieler
      nextField = currentBox;                                                   //Speichern, wo der nächste Zug hingesetzt werden muss
      document.getElementById(nextField).style.background = colorBack;          //Färben des nächsten Feldes
      document.getElementById(currentField).style.background = "#4f5b66";       //Zurücksetzen der Farbe des aktuellen Feldes

      first = 0;                                                                //first verbieten
      document.getElementById("turn").className = "invisible";                  //verstecken der Tabelle, wer am Zug ist. Das sollte eindeutig sein
      var d = new Date();
      d.setTime(d.getTime() + (365*10*24*60*60*1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = "firstGame=false; " + expires;                          //speichern, dass es nicht mehr das erste Spiel ist
    }
    else {                                                                      //wenn der Zug nicht frei gesetzt werden darf
      count++;                                                                  //Zahl der ausgefüllten Felder erhöhen
      field[currentField][currentBox] = player;                                 //speichern, von welchem Spieler das Feld angeklickt wurde
      document.getElementById(id).style.background = color;                     //Färben des Kästchens

      if (fieldWon()) {                                                         //wenn mit dem aktuellen Zug das Feld gewonnen wurde
        document.getElementById("field" + currentField).style.background = color; //Färben des Feldes
        if (gameWon()) {                                                        //wenn mit dem gewonnenen Feld das Spiel gewonnen wurde
          last = 1;                                                             //aktivieren, dass der letzte Zug gesetzt wurde
          gameOver();                                                           //Spielende einleiten
          return 0;                                                             //Funktionsabbruch
        }
      }

      player = ((player + 1) % 2);                                              //Ändern der Spielervariable zum nächsten Spieler
      nextField = currentBox;                                                   //Speichern, wo der nächste Zug hingesetzt werden muss
      document.getElementById(currentField).style.background = "#4f5b66";       //Zurücksetzen der Farbe des aktuellen Feldes
      document.getElementById(nextField).style.background = colorBack;          //Färben des nächsten Feldes
      fieldFull(nextField);                                                     //kontrollieren, ob das nächste Feld voll ist
      document.getElementById("turn").className = "invisible";                  //verstecken der Tabelle, wer am Zug ist. Das sollte eindeutig sein

      if (count >= 81 && !gameWon()) {                                          //wenn alle Kästchen ausgfüllt wurden und das Spiel noch nicht gewonnen wurde
        last = 1;                                                               //aktivieren, dass der letzte Zug gesetzt wurde
        tie();                                                                  //Spiel als unentschieden auswerten
        gameOver();                                                             //Spielende einleiten
        return 0;                                                               //Funktionsabbruch
      }
    }
    saveCookies(1);                                                             //Spiel als laufend speichern
  }
}

function check() {                                                              //kontrollieren, ob ein Spielzug regelkonform ist
  if (first) {                                                                  //wenn der Zug frei gesetzt werden darf
    if (field[currentField][currentBox] === "x") {                              //und das Feld unbesetzt ist
      return true;                                                              //Zug freigeben
    }
    else {                                                                      //wenn Feld bereits besetzt
      return false;                                                             //Zug blockieren
    }
  }
  else if (currentField == nextField) {                                         //wenn Klick im nächsten Feld erfolgt ist
    if (field[currentField][currentBox] === "x") {                              //kontrollieren, ob das Kästchen unbesetzt ist
      return true;                                                              //Zug freigeben
    }
    else {                                                                      //wenn Feld besetzt ist
      return false;                                                             //Zug blockieren
    }
  }
  else {
    return false;                                                               //Zug blockieren
  }
}

function fieldWon() {                                                           //kontrollieren, ob das Feld mit dem aktuellen Klick gewonnen wurde
  switch (currentBox) {                                                         //kontrolle für das jeweils gerade geklickte kleine Kästchen
    case 1:                                                                     //es folgen für jedes mögliche geklickte Kästchen alle Möglichkeiten es zu gewinnen
      if (wonFields[currentField] === "x") {                                    //nur kontrollieren, wenn das Feld noch nicht gewonnen wurde
        if (field[currentField][1] == field[currentField][2] && field[currentField][2] == field[currentField][3] && field[currentField][1] != "x") {
          wonFields[currentField] = player;                                     //als vom Spieler gewonnen abspeichern
          return true;                                                          //Gewinn zurück geben
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
          return false;                                                         //nicht gewonnen
        }
      }
      else {
        return false;                                                           //nicht gewonnen
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

function fieldFull(nr) {                                                        //kontrollieren, ob alle Kästchen im Feld schon besetzt sind
  fieldCount = 0;                                                               //Zählervariable zurücksetzen
  for (var e = 1; e <= 9; e++) {                                                //für alle 9 Kästchen
    if(field[nr][e] !== "x") {                                                  //kontrollieren, ob sie nicht leer sind
      fieldCount++;                                                             //Zähler erhöhen
    }
  }
  if (fieldCount == 9) {                                                        //wenn alle Kästchen besetzt sind
    first = 1;                                                                  //freies Setzen erlauben
    for(a = 1; a <= 9; a++){
      document.getElementById(a).style.background = "#4f5b66";                  //alle Kästchenfarben zurücksetzen
    }
  }
}

/* ----------------------------------------------------------------------------
  Spielende
  ----------------------------------------------------------------------------*/

function gameWon() {                                                            //kontrollieren, ob das Spiel gewonnen wurde
  switch (currentField){                                                        //eigentlich genau so, wie fieldWon() nur für Felder statt Kästchen
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

function tie() {                                                                //ein unentschiedenes Spiel auswerten
  for(c = 1; c <= 9; c++) {                                                     //für alle 9 Felder
    if (wonFields[c] == 0) {                                                    //wenn das Feld von Spieler 1 gewonnen wurde
      wonFieldsPlayer1++;                                                       //Zahl der gewonnen Felder für Spieler 1 erhöhen
    }
    else if (wonFields[c] == 1) {                                               //wenn das Feld von Spieler 1 gewonnen wurde
      wonFieldsPlayer2++;                                                       //Zahl der gewonnen Felder für Spieler 2 erhöhen
    }
  }

  if (wonFieldsPlayer1 > wonFieldsPlayer2) {                                    //wenn Spieler 1 mehr Felder gewonnen hat
    document.getElementById("winner").innerHTML = player1.name + " hat mit " + wonFieldsPlayer1 + " Feldern gewonnen!"; //Sieg Spieler 1 ausgeben
    player = 0;                                                                 //Spielervariable für gameOver() ändern
  }
  else if (wonFieldsPlayer2 > wonFieldsPlayer1) {
    document.getElementById("winner").innerHTML = player2.name + " hat mit " + wonFieldsPlayer2 + " Feldern gewonnen!"; //Sieg Spieler 2 ausgeben
    player = 1;                                                                 //Spielervariable für gameOver() ändern
  }
  else if (wonFieldsPlayer2 == wonFieldsPlayer1) {                              //wenn beide Spieler gleich viele Felder gewonnen haben
    document.getElementById("winner").innerHTML = "Unentschieden!";             //Unentschieden ausgeben
    player = 3;                                                                 //Spielervariable für gameOver() ändern
  }
}

function gameOver() {                                                           //Spiel beenden
  if (player === 0) {                                                           //wenn Spieler 1 gewonnen hat
    winner = player1.name;                                                      //Gewinner speichern
    document.body.style.background = player1.color;                             //Hintergrundfarbe des Dokuments dem Spieler entsprechend ändern
    document.getElementById("winner").innerHTML = winner + " hat gewonnen!";    //Gewinner anzeigen
  }
  else if (player == 1){                                                        //wenn Spieler 1 gewonnen hat
    winner = player2.name;                                                      //Gewinner speichern
    document.body.style.background = player2.color;                             //Hintergrundfarbe des Dokuments dem Spieler entsprechend ändern
    document.getElementById("winner").innerHTML = winner + " hat gewonnen!";    //Gewinner anzeigen
  }
  else {                                                                        //kommt nur bei einem echten Unentschieden vor
    winner = "";                                                                //kein Gewinner
  }

  generateLeaderboard();                                                        //Bestenliste erzeugen
  resetGame();                                                                  //alle Spielvariablen zurücksetzen
  last = 1;                                                                     //letzten Zug als gesetzt markieren
  saveCookies(0);                                                               //Spiel als beendet speichern

  document.getElementById("drawingArea").className = "invisible";               //Spielfläche ausblenden
  document.getElementById("turn").className = "invisible";
  document.getElementById("gameOver").className = "";                           //GameOver anzeigen
}

/* ----------------------------------------------------------------------------
  Bestenliste
  ----------------------------------------------------------------------------*/

function generateLeaderboard() {                                                //Bestenliste updaten
  updateLeaderboard(player1.name);                                              //Update für Spieler 1
  updateLeaderboard(player2.name);                                              //Update für Spieler 1
  leaderboard.sort(sortLeaderboard);                                            //Bestenliste mit sortLeaderboard() sortieren
  renderLeaderboard();                                                          //Bestenliste anzeigen
}

function updateLeaderboard(playerEnd) {                                         //Spieler in Bestenlist aktualisieren
  if (leaderboard.length >= 2) {                                                //nur wenn schon Einträge in der Bestenlist vorhanden sind
    for (var i = 0; i < leaderboard.length; i++) {                              //für alle Einträge in der Bestenliste
      if (playerEnd == leaderboard[i][0]) {                                     //wenn Spieler schon einen Eintrag in der Bestenliste hat
        updatePlayer(playerEnd, i);                                             //Spieler aktualisieren
        newPlayer = false;                                                      //Spieler wurde gefunden
        break;                                                                  //Funktionsabbruch
      }
      else {                                                                    //wenn Spieler nicht gefunden wurde
        newPlayer = true;                                                       //Spieler ist neu
      }
    }
  }
  else {                                                                        //wenn noch keine Einträge in der Bestenlist vorhanden sind
    newPlayer = true;                                                           //Spieler ist neu
  }
  if (newPlayer) {                                                              //wenn Spieler neu ist
    insertNewPlayer(playerEnd);                                                 //Spieler einfügen
  }
}

function updatePlayer(playerEnd, i) {                                           //existierenden Spieler aktualisieren
  if (winner == playerEnd) {                                                    //wenn Spieler gewonnen hat
    leaderboard[i][1]++;                                                        //erhöhen des gewonnen Counts
  }
  leaderboard[i][2]++;                                                          //erhöhen des Counts für gespielte Spiele (unabhängig von Sieg oder Niederlage)
}

function insertNewPlayer(playerEnd) {                                           //neuen Spieler in die Bestenliste einfügen
  playerTemp = new Array(3);                                                    //neues Array für den Spieler anlegen
  playerTemp[0] = playerEnd;                                                    //Array[0] ist Name
  if (winner == playerEnd) {                                                    //wenn neuer Spieler gewonnen hat
    playerTemp[1] = 1;                                                          //hat er ein Spiel gewonnen
  }                                                                             //Array[1] ist Anzahl Siege
  else {
    playerTemp[1] = 0;                                                          //ansonsten keins
  }
  playerTemp[2] = 1;                                                            //Array[2] ist Anzahl Spiele (gewonnen & verloren)

  leaderboard.push(playerTemp);                                                 //neuen Spieler an's Ende der Bestenliste anhängen
  newPlayer = false;                                                            //Variable zurück setzen
}

function sortLeaderboard(a, b) {                                                //Funktion nach der die Bestenlist sortiert wird
  var diff = (b[1] / b[2]) - (a[1] / a[2]);                                     //Differenz in den prozentualen Gewinnen von Spieler a und Spieler b berechnen
  if (diff === 0) {                                                             //wenn die Spieler prozentual gleich viele Spiele gewonnen haben
    return b[2] - a[2];                                                         //wird nach der Anzahl an gesamt gespielten Spielen sortiert
  }
  else {
    return diff;                                                                //ansonsten wird einfach nach der Prozentzahl gewonnnener Spiele sortiert
  }
}

function renderLeaderboard() {                                                  //Anzeigen der Bestenliste
  table = document.getElementById("leaderboardTable");                          //Variable für die Bestenliste
  numberOfRows = table.children[0].children.length;                             //Anzahl an bereits dargestellten Reihen

  if (numberOfRows > 1) {                                                       //wenn mehr als nur die Kopfzeile vorhanden ist
    for (var k = 1; k < numberOfRows; k++) {                                    //alle Zeilen
      table.deleteRow(1);                                                       //löschen
    }
  }
  for (var j = 0; j < leaderboard.length; j++) {                                //für alle Einträge in der Bestenliste
    row = table.insertRow(j+1);                                                 //neue Zeile anfügen
    placeCell = row.insertCell(0);                                              //Zellen für Platzierung,
    nameCell = row.insertCell(1);                                               //Name,
    wonCell = row.insertCell(2);                                                //gewonnene Spiele und
    playedCell = row.insertCell(3);                                             //gespielte Spiel anlegen

    placeCell.innerHTML = j+1 + ".";                                            //Platz einfügen
    nameCell.innerHTML = leaderboard[j][0];                                     //Name einfügen
    wonCell.innerHTML = leaderboard[j][1];                                      //gewonnene Spiele einfügen
    playedCell.innerHTML = leaderboard[j][2];                                   //gespielte Spiele einügen

    wonCell.className = "rightText";                                            //Zahlen rechtsbündig formatieren
    playedCell.className = "rightText";
  }
}

/* ----------------------------------------------------------------------------
  Cookies
  ----------------------------------------------------------------------------*/

function saveCookies(gameRunning) {                                             //speichert Variablen in Cookies
  var d = new Date();
  d.setTime(d.getTime() + (365*10*24*60*60*1000));                              //erstellen eines Verfallsdatums für Die zu speichernden Cookies
  var expires = "expires="+d.toUTCString();

  document.cookie = "leaderboard=" + leaderboard + "; " + expires;              //Speichern der Variablen in Cookies

  document.cookie = "player1.name=" + player1.name + "; " + expires;
  document.cookie = "player1.color=" + player1.color + "; " + expires;
  document.cookie = "player1.colorBack=" + player1.colorBack + "; " + expires;

  document.cookie = "player2.name=" + player2.name + "; " + expires;
  document.cookie = "player2.color=" + player2.color + "; " + expires;
  document.cookie = "player2.colorBack=" + player2.colorBack + "; " + expires;

  if (gameRunning === 1) {                                                      //wenn gespeichert wird, während ein Spiel läuft
    document.cookie = "gameRunning=1; " + expires;                              //Speichern der Variablen
    document.cookie = "nextField=" + nextField + "; " + expires;
    document.cookie = "count=" + count + "; " + expires;
    document.cookie = "lastTurn=" + last + "; " + expires;
    document.cookie = "player=" + player + "; " + expires;
    document.cookie = "field=" + field + "; " + expires;
    document.cookie = "wonFields=" + wonFields + "; " + expires;
  }
  else {                                                                        //ansonsten leere Cookies speichern
    document.cookie = "gameRunning=0; " + expires;
    document.cookie = "lastTurn=" + last + "; " + expires;
    document.cookie = "nextField=; " + expires;
    document.cookie = "count=; " + expires;
    document.cookie = "player=;" + expires;
    document.cookie = "field=;" + expires;
    document.cookie = "wonFields=; " + expires;
  }
}

function getCookie(cname) {                                                     //liest Inhalt eines Cookies aus
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
    }
    return "";
}

function getField() {                                                           //speichert in Cookie gespeichertes Spiel in Array
  fieldCookie = getCookie("field").split(",");                                  //Cookie in Teile teilen
  field = new Array(10);
  for (a = 1; a <= 9; a++){
    field[a] = new Array(10);
    for(b = 1; b <= 9; b++){
      field[a][b] = fieldCookie[(a-1) * 10 + (b+1)];                            //Abspeichern der Teile des Cookies in Array
      if (field[a][b] != "x") {                                                 //wenn jemand das Feld besetzt hat
        if (field[a][b] === "0") {                                              //wird das Feld je nach Spieler eingefärbt
          document.getElementById(a * 10 + b).style.background = player1.color;
        }
        else {
          if (field[a][b] == 1) {
            document.getElementById(a * 10 + b).style.background = player2.color;
          }
        }
      }
      else {                                                                    //ansonsten im StandardGrau
        document.getElementById(a * 10 + b).style.background = "#c0c5ce";
      }
    }
  }
}

function getWonFields() {                                                       //speichert in Cookie gespeicherte gewonnene Felder in Array
  wonFieldsCookie = getCookie("wonFields").split(",");                          //Cookie in Teile teilen
  wonFields = new Array(10);
  for(c = 1; c <= 9; c++) {
    wonFields[c] = wonFieldsCookie[c];                                          //Abspeichern der Teile des Cookies in Array
    if (wonFields[c] === "0") {                                                 //Färben der Felder je nach Besitzer
      document.getElementById("field" + c).style.background = player1.color;
    }
    else {
      if (wonFields[c] == 1){
        document.getElementById("field" + c).style.background = player2.color;
      }
    }
  }
}

function getLeaderboard() {                                                     //speichert in Cookie gespeicherte Bestenliste in Array
  leaderboardCookie = getCookie("leaderboard").split(",");                      //Cookie in Teile teilen
  if (leaderboardCookie.length === 1) {                                         //wenn Cookie leer
    leaderboard = [];                                                           //leere Variable anlegen
  }
  else {
    leaderboard = new Array(leaderboardCookie.length / 3);                      //neues Array mit entsprechender Länge anlegen
    for (a = 0; a < leaderboardCookie.length / 3; a++) {
      leaderboard[a] = new Array(3);
      for (b = 0; b < 3; b++) {
        leaderboard[a][b] = leaderboardCookie[(a * 3) + b];                     //Abspeichern der Teile des Cookies in Array
      }
    }
  }
}

function clearAllCookies() {                                                    //löscht ALLE Cookies
  document.cookie = "firstGame=; expires=Thu, 01 Jan 1970 00:00:00 UTC";        //ersetzen der Cookies durch einen gleichen Cookie mit Ablaufdatum in der Vergangenheit
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

function allCookiesToCommandLine() {                                            //as the name says
  allCookies = document.cookie;
  console.log(allCookies);
}

/* ----------------------------------------------------------------------------
  reset
  ----------------------------------------------------------------------------*/

function reset() {                                                              //zurücksetzen des Formulars
  document.info1.player1Name.value = "Spieler1";
  document.getElementById("spieler1colK").value = "#ab4143";
  document.getElementById("spieler1colF").value = "#cc7a7c";

  document.info2.player2Name.value = "Spieler2";
  document.getElementById("spieler2colK").value = "#448eb3";
  document.getElementById("spieler2colF").value = "#7ab1cc";
}

function startReset() {                                                         //Funktion vor dem Zurücksetzen der Bestenliste
  document.getElementById("confirmResetLeaderboard").className = "";            //Anzeigen des Bestätigungsdialogs
  document.getElementById("leaderboard").className = "invisible";
  document.getElementById("gameOver").className = "invisible";
}

function confirm(what, status) {                                                //Bestätigung für unwiderrufbare Aktionen erfordern (what = was bestätigt werden soll; status = (J/N))
  if (what == "resetGame") {                                                    //wenn das Spiel überschrieben werden soll
    if (status) {                                                               //Spiel soll zurück gesetzt werden
     resetGame();                                                               //Spiel zurück setzen
     for(a = 1; a <= 9; a++){                                                   //Farben zurück setzen
       document.getElementById(a).style.background = "#4f5b66";
       for(b = 1; b <= 9; b++){
         document.getElementById(a * 10 + b).style.background = "#c0c5ce";
       }
     }
     for(c = 1; c <= 9; c++) {
       document.getElementById("field" + c).style.background = "#4f5b66";
     }
     document.getElementById("confirm").className = "invisible";                //alles ausblenden
     document.getElementById("menu").className = "invisible";
     document.getElementById("leaderboard").className = "invisible";
     document.getElementById("startTable").className = "";                      //Eingabe einblenden
   }
   else {                                                                       //ansonsten nichts tun
     document.getElementById("confirm").className = "invisible";                //Dialog ausblenden
     document.getElementById("menu").className = "";                            //außer Menu wieder einzublenden
   }
  }
  else if (what == "resetLeaderboard") {                                        //wenn es um die Bestenliste geht
    if (status == 1) {                                                          //Bestenliste soll zurück gesetzt werden
      resetLeaderboard();                                                       //Bestenliste zurück setzen
    }
    document.getElementById("confirmResetLeaderboard").className = "invisible"; //Dialog ausblenden
    document.getElementById("leaderboard").className = "";                      //Bestenliste einblenden
  }
}

function resetLeaderboard() {                                                   //Bestenliste zurücksetzten
  leaderboard = [];                                                             //leeren der Variable
  document.cookie = "leaderboard=; expires=Thu, 01 Jan 1970 00:00:00 UTC";      //löschen des Cookies
  renderLeaderboard();                                                          //leeren der Tabelle
}

function resetGame() {                                                          //Spiel zurücksetzen
  for(a = 1; a <= 9; a++){
    for(b = 1; b <= 9; b++){
      field[a][b] = "x";                                                        //Leeren des Feldspeichers
    }
  }
  for(c = 1; c <= 9; c++) {
    wonFields[c] = "x";                                                         //Leeren des Speichers der gewonnenen Felder
  }
  player = (Math.ceil(Math.random()*2)-1);                                      //Zurücksetzen der Variablen
  count = 1;
  first = 1;
  last = 0;
}

function newGame() {                                                            //startet ein neues Spiel nachdem ein anderes entschieden wurde
  resetGame();
  saveCookies(0);
  document.body.style.background = "#4f5b66";                                   //zurücksetzen aller Farben
  for(a = 1; a <= 9; a++){
    document.getElementById(a).style.background = "#4f5b66";
    for(b = 1; b <= 9; b++){
      document.getElementById(a * 10 + b).style.background = "#c0c5ce";
    }
  }
  for(c = 1; c <= 9; c++) {
    document.getElementById("field" + c).style.background = "#4f5b66";
  }

  document.getElementById("drawingArea").className = "invisible";               //Ausblenden aller Teile und anzeigen der Starttabelle
  document.getElementById("menu").className = "invisible";
  document.getElementById("gameOver").className = "invisible";
  document.getElementById("leaderboard").className = "invisible";
  document.getElementById("startTable").className = "";
}

// ----------------------------------------------------------------------------

window.onload = main;
