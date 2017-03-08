var canvas = document.getElementById("ballCanvas");
var context = canvas.getContext("2d");

canvas.width = 1350;
canvas.height = 400;

var ballBox=[], bulletBox=[],index= 0,b_index= 0,attacker_position = canvas.height/ 2,hits_no=0,balls_no=0,bullets_no= 0,attack = 0;

document.onkeydown = function(event) {
    switch(event.keyCode) {
        case 38:
            attacker_position = attacker_position - 12 ;
            break;
        case 40:
            attacker_position = attacker_position + 12;
            break;
        case 32:
            bulletBox[b_index] = new Bullet(50+newAttacker.width,attacker_position+18+newAttacker.height/2);
            b_index = b_index + 1 ;
            bullets_no = bullets_no +1;
            break;
    }
};

var newbg  = new Image();
newbg.src  = "images/space.png";
var newAttacker = new Image();
newAttacker.src = "images/attacker.png";


var timOut = setTimeout(function(){animated();},2005);
intVal = setInterval(function(){initAttack();},2000);