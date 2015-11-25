function main(id){
  //Variabllendeklaration
  var spieler1colK = document.getElementById("spieler1colK").value;
  var spieler1colF = document.getElementById("spieler1colF").value;
  var spieler2colK = document.getElementById("spieler2colK").value;
  var spieler2colF = document.getElementById("spieler2colF").value;
  var spieler1name = document.getElementById("spieler1eingabe").value;
  var spieler2name = document.getElementById("spieler2eingabe").value;
  var naechster = 1;
  var naechstebox = 0;
  var siegespieler1 = 0;
  var siegespieler2 = 0;
  var b_id3 = 1;
  var erster = 1;

  var feld = new Array(10);
  for(a=1; a<=9; a++){
     feld[a] = new Array(10);
     for(b=0; b<=9; b++){
        feld[a][b] = 0;
      }
  }

  draw();
  /*document.getElementById("0").style = "visibility:visible";
  document.getElementById("spielstand").style = "visibility:visible";
  document.getElementById("tabelle").style = "visibility:hidden";*/

  document.getElementById("links").style = "background-color:" + spieler1colK;
  document.getElementById("rechts").style = "background-color:" + spieler2colK;

  document.getElementById("links").firstChild.nodeValue = spieler1name + ": " + siegespieler1;
  document.getElementById("rechts").firstChild.nodeValue = spieler2name + ": " + siegespieler2;

function draw() {
  //print table "spielstand"
  document.write('<table id="spielstand" cellspacing="10" cellpadding="10" align="center">'+
                    '<tr>'+
                    '<td id="links" style="background-color:'+ spieler1colK +'">'+
                    'Spieler1: '+ siegespieler1 +
                    '</td>'+
                    '<td id="rechts" style="background-color:'+ spieler2colK +'">'+
                    'Spieler2: '+ siegespieler2 +
                    '</td>'+
                    '</tr>'+
                 '</table>');

  //print table "0"
  document.write('<table id="0" border="5" cellspacing="10" cellpadding="10" align="center" frame="void">');
  for(a = 0; a < 3; a++){
     document.write('<tr>');

     for(b = 1; b <= 3; b++){
        b_id = 3*a+b;
        document.write('<td>' + '<table id="'+ b_id +'" border="1" cellspacing="5">');

        for(c = 0; c < 3; c++){
           document.write('<tr>');

           for(d = 1; d <= 3; d++){
              k_id = 10*b_id+3*c+d;
              document.write('<td id="'+ k_id +'" class="Zelle" bgcolor="#dddddd" height="50" width="50" onclick="klick('+ k_id +');"><p>' + k_id + '</p>');
           }
           document.write('</tr>');
        }
        document.write('</table>' + '</td>');
     }
     document.write('</tr>');
  }
  document.write('</table>');

  /*for (var i = 0; i < k_id; i++) {
    var currentCell = document.getElementById(i);
    currentCell.onclick = function(){klick(i);};
  }*/
  var cells = document.getElementsByTagName("td");
  for (var i = 0; i < cells.length; i++) {
    /*for(w = 0; w < 3; w++)
      for (x = 1; x <= 3; x++) {
        x_id = 3*w+x;
        for (y = 0; y < 3; y++) {
          for (z = 1; z <= 3; z++) {
            var index[] = new Array(k_id);
            for (var v = 1; v <= k_id; v++) {
              index [v] =
              //c_id = 10*x_id+3*y+z;
            }
           }
        }
      }*/
    cells[i].onclick = function(){klick(i);};
  }
}

function klick(eingabe) {
console.log(eingabe);
  /*
   k_id2 = eingabe%10
   b_id2 = Math.floor(eingabe/10)

   if(naechstebox == 0)
      abbruch = 0;
      else abbruch = 1

   if(feld[b_id2][k_id2] == 0 && naechstebox == b_id2*abbruch){

      feld[b_id2][k_id2] = naechster;
      naechstebox = k_id2;
      document.getElementById(b_id2).style = "border-color:undefined";
      document.getElementById(b_id3).style = "border-color:undefined";
      bgcakt(b_id2);
      bgcakt(b_id3);
      b_id3 = k_id2;
//die ständigen Farb-wiederherstellungen sind nötig, weil sich Hintergrundfarbe und Randfarbe gegenseitig überschreiben
      if(naechster == 1){
         document.getElementById(eingabe).style = "background-color:" + spieler1;
         boxsieg(1,b_id2);
         document.getElementById(k_id2).style = "border-color:" + spieler2;
         naechster = 2;
         spielsieg(1);
      }
      else{
         document.getElementById(eingabe).style = "background-color:" + spieler2;
         boxsieg(2,b_id2);
         document.getElementById(k_id2).style = "border-color:" + spieler1;
         naechster = 1;
         spielsieg(2);
      }
      if(feldvoll(k_id2) == 1)
         naechstebox = 0;
   }*/
}

function neu(){
   for(a=1; a<=9; a++){
      document.getElementById(a).style = "background-color:undefined";
      document.getElementById(a).style = "border-color:undefined";
      feld[a][0] = 0;
      for(b=1; b<=9; b++){
         feld[a][b] = 0;
         document.getElementById(10*a+b).style = "background-color:undefined";
      }
   }
   if(erster == 1)
      erster = 2
      else
         erster = 1
   naechster = erster;
   naechstebox = 0;
   b_id3 = 1;
}

function feldvoll(f){
   ergebnis = 1
   for(a=1; a<=9; a++)
      if(feld[f][a] == 0)
         ergebnis = 0
   return ergebnis
}

function boxx(box2,s,a,b,c){
   if(feld[box2][a]==s&&feld[box2][b]==s&&feld[box2][c]==s)
      return s
}

function boxsieg(bs,box){
   if(feld[box][0]==0 && (boxx(box,bs,1,2,3)==bs||boxx(box,bs,4,5,6)==bs||boxx(box,bs,7,8,9)==bs||boxx(box,bs,1,4,7)==bs||boxx(box,bs,2,5,8)==bs||boxx(box,bs,3,6,9)==bs||boxx(box,bs,1,5,9)==bs||boxx(box,bs,3,5,7)==bs)){
      feld[box][0] = bs;
      if(bs == 1){
         document.getElementById(box).style = "background-color:" + spieler1colF;
      }
      else{
         document.getElementById(box).style = "background-color:" + spieler2colF;
      }
   }
}

function spiell(s,a,b,c){
   if(feld[a][0]==s&&feld[b][0]==s&&feld[c][0]==s)
      return s
}

function spielsieg(ss){
      if(spiell(ss,1,2,3)==ss||spiell(ss,4,5,6)==ss||spiell(ss,7,8,9)==ss||spiell(ss,1,4,7)==ss||spiell(ss,2,5,8)==ss||spiell(ss,3,6,9)==ss||spiell(ss,1,5,9)==ss||spiell(ss,3,5,7)==ss){
         if(ss == 1){
            document.getElementById(0).style = "border-color:" + spieler1;
            siegespieler1 = siegespieler1 + 1;
            document.getElementById("links").firstChild.nodeValue = spieler1name + ": " + siegespieler1;
         }
         else{
            document.getElementById(0).style = "border-color:" + spieler2;
            siegespieler2 = siegespieler2 + 1;
            document.getElementById("rechts").firstChild.nodeValue = spieler2name + ": " + siegespieler2;
         }
         neu()
      }
}

function feldvoll(f){
   ergebnis = 1
   for(a=1; a<=9; a++){
      if(feld[f][a] == 0)
         ergebnis = 0
   }
   return ergebnis
}

function bgcakt(box3){
   if(feld[box3][0] == 1)
      document.getElementById(box3).style = "background-color:" + spieler1colF;
   if(feld[box3][0] == 2)
      document.getElementById(box3).style = "background-color:" + spieler2colF;
}

}
window.onload = main;

/* notes
* remove "window.onload = main";
*/
