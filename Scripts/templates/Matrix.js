/*
function amountemployees(){

}

*/

var cols = 10;// = amountemployees
var rows = 10;// = amountemployees

var colors = [];

function setup(){
    createCanvas(300,300);
    for(var i=0; i< cols; i++){
        colors[i]=[];
         for(var j=0; j< cols; j++){
         colors[i][j] = random(255);
         }
     }
}

function DrawMatrix(){
    background(51);

    for (var i=0; i< cols; i++) {
        for (var j=0; j< cols; j++) {
        var x = i * 30;
        var y = j * 30;

        fill(colors[i][j]);
        stroke(0);
        fill(255);
        rect(x,y,30,30);
        }
    }
}