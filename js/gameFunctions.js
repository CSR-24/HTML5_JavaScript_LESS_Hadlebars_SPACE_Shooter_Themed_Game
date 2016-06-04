var scoreBoard = {
    f_szie:'16px',
    f_color:'white',
    headColor:'lightgreen',
    TBallGen: 0,
    TBullGen: 0,
    THits: 0,
    TBull: 0,
    OrgStock: 100
};


var controlPanel = [
    {labelID:"Ball Size", inType: "range", nameID:"ballSize", minV:0, maxV:20},
    {labelID:"Bullet Size",inType: "range", nameID:"bulletSize", minV:0 , maxV:8},
    // {labelID:"Bullet Speed",inType: "range", nameID:"bulletSpeed", minV:0 , maxV:20}, // cannot control it right now !
    {labelID:"Ball Speed",inType: "range", nameID:"ballSpeed", minV:1 , maxV:15}
];



var themePanel = [
    {labelID:"Document Body Color", inType: "range", nameID:"DBC",minV:0,maxV:4},
    {labelID:"Header Container Color", inType: "range", nameID:"OCC",minV:0,maxV:4},
    {labelID:"Footer Container Color", inType: "range", nameID:"FCC",minV:0,maxV:4},
    {labelID:"Control Panel Color", inType: "range", nameID:"CPC",minV:0,maxV:4},
    {labelID:"Instruction Panel Color", inType: "range", nameID:"IPC",minV:0,maxV:4},
    {labelID:"Theme Panel Color", inType: "range", nameID:"TPC",minV:0,maxV:4}
];


var source2   = $("#scoreBoardTemplate").html();
var source3   = $("#controlPanelTemplate").html();

var template2 = Handlebars.compile(source2);
var template3 = Handlebars.compile(source3);

var output2 = template2(scoreBoard);
var output3 = template3(controlPanel);
var output4 = template3(themePanel);

document.getElementById("gameControlPanel").innerHTML = output3;
document.getElementById("gameThemePanel").innerHTML = output4;


function Ball(xCord,yCord,coloR){
    this.bs=document.getElementById("ballSize").value;
    this.x=xCord;
    this.y=yCord;
    this.coloR = coloR;
    this.howFast = document.getElementById("ballSpeed").value;
}


function Bullet(xCord,yCord){
    this.bs=document.getElementById("bulletSize").value;
    this.x=xCord;
    this.y=yCord;
    //this.howFast = document.getElementById("bulletSpeed").value;
    this.howFast = 10;
}


function drawAttacker(){
    context.drawImage(newAttacker,50,attacker_position);
}


function drawBalls(){
    for(var i=0;i<ballBox.length;i++){
        context.beginPath();
        context.fillStyle = ballBox[i].coloR;
        context.arc(ballBox[i].x, ballBox[i].y, ballBox[i].bs, 0, 360);
        context.fill();
        context.closePath();
    }
}


function drawBullet() {
    for(var i=0;i<bulletBox.length;i++){
        context.beginPath();
        context.fillStyle = "red";
        context.arc(bulletBox[i].x, bulletBox[i].y, bulletBox[i].bs, 0, 360);
        context.fill();
        context.closePath();
    }
}

function randomAttack() {
    return Math.random() * (500 - 20) + 20;
}

function initAttack() {
    ballBox[index] = new Ball(canvas.width, randomAttack(), "blue");
    index++;
    scoreBoard.TBallGen++;
}

var sound = new Audio("audio.wav");

function animated() {
    context.fillStyle = context.createPattern(newbg,"");
    context.fillRect(0, 0,canvas.width,canvas.height);

    context.beginPath();

    scoreBoard.TBullGen = bullets_no;
    scoreBoard.TBull=scoreBoard.OrgStock - bullets_no;
    output2 = template2(scoreBoard);
    document.getElementById("gameHeader").innerHTML = output2;


    if(scoreBoard.TBull == 0 || scoreBoard.THits == 25) {
        if (scoreBoard.THits == 25) {
            clearInterval(intVal);
            if (window.confirm("You Won ! Window will be closed Now.")) {
                window.close();
            }
        }
        else if (scoreBoard.TBull == 0) {
            clearInterval(intVal);
            if (window.confirm("You Lost. Window will be closed Now.")) {
                window.close();
            }
        }
    }


    drawBalls();
    drawAttacker();
    
    if(bulletBox.length > 0) {
        drawBullet();
        while(true){
            for(var match=0;match<ballBox.length;match++){
                if(((ballBox[match].x - 12) <= bulletBox[attack].x) && (bulletBox[attack].x <= (ballBox[match].x + 12)) &&
                    ((ballBox[match].y - 12) <= bulletBox[attack].y) && (bulletBox[attack].y <= (ballBox[match].y + 12))
                ){
                    sound.currentTime = 10;
                    sound.play();
                    ballBox.splice(match,1);
                    bulletBox.splice(attack,1);

                    index--;
                    b_index--;
                    hits_no++;
                    scoreBoard.THits=hits_no;
                    attack = 0;
                    break;
                }
            }
            attack++;
            if(attack==b_index){
                attack=0;
                break;
            }
        }
    }


    for(var i=0;i<ballBox.length;i++) {
        if (ballBox[i].x !==0) {
            ballBox[i].x = ballBox[i].x - ballBox[i].howFast;
        }
        if(ballBox[i].x == 0){
            ballBox.splice(i,1);
            index--;
        }
    }

    if(bulletBox.length > 0) {
        for (var bul = 0; bul < bulletBox.length; bul++) {
            bulletBox[bul].x = bulletBox[bul].x +bulletBox[bul].howFast;
        }
    }

    requestAnimationFrame(animated);
}


var defaultColor = {
    DBC: document.getElementById("docBody").style.backgroundColor,
    OCC: document.getElementById("gameHeader").style.backgroundColor,
    FCC: document.getElementById("gameFooter").style.backgroundColor,
    CPC: document.getElementById("gameControlPanel").style.backgroundColor,
    IPC: document.getElementById("instructionContainer").style.backgroundColor,
    TPC: document.getElementById("gameThemePanel").style.backgroundColor
};


//Approach II: Using javascript to change styling
function changeStyle(eID,rangeValue,dC){
    var color = document.getElementById(eID).style.backgroundColor;
    if(rangeValue == 0){ color = "orange";}
    else if(rangeValue == 1){ color = "yellow";}
    else if(rangeValue == 2){ color = dC; }
    else if(rangeValue == 3){ color = "cornflowerblue";}
    else if(rangeValue == 4){ color = "white"; }
    document.getElementById(eID).style.backgroundColor = color;
}

$("#DBC").change(function(){
    changeStyle("docBody",document.getElementById("DBC").value,defaultColor.DBC);
});


$("#OCC").change(function(){
    changeStyle("gameHeader",document.getElementById("OCC").value,defaultColor.OCC);
});

$("#FCC").change(function(){
    changeStyle("gameFooter",document.getElementById("FCC").value,defaultColor.FCC);
});

$("#CPC").change(function(){
    changeStyle("gameControlPanel",document.getElementById("CPC").value,defaultColor.CPC);
});

$("#IPC").change(function(){
    changeStyle("instructionContainer",document.getElementById("IPC").value,defaultColor.IPC);
});

$("#TPC").change(function(){
    changeStyle("gameThemePanel",document.getElementById("TPC").value,defaultColor.TPC);
});


/*
//Approach 1: Using Less and compiling on the fly. Working with firefox but not with Chrome due to security features in Chrome for accessing local files.
$("#OCC").change(function(){
    document.getElementById("OCC").style.backgroundColor = "RED";
    var a = document.getElementById("OCC").value;
    if(a == 0){less.modifyVars({'@background_Color_GH':'yellow'});}
    else if(a == 1){less.modifyVars({'@background_Color_GH':'orange'});}
    else if(a == 2){less.modifyVars({'@background_Color_GH':'lightgreen'});}
    else if(a == 3){less.modifyVars({'@background_Color_GH':'magenta'});}
    else if(a == 4){less.modifyVars({'@background_Color_GH':'white'});}
});

$("#CPC").change(function(){
    var a = document.getElementById("CPC").value;
    if(a == 0){less.modifyVars({'@color_controlPanel':'yellow'});}
    else if(a == 1){less.modifyVars({'@color_controlPanel':'orange'});}
    else if(a == 2){less.modifyVars({'@color_controlPanel':'lightgreen'});}
    else if(a == 3){less.modifyVars({'@color_controlPanel':'magenta'});}
    else if(a == 4){less.modifyVars({'@color_controlPanel':'white'});}
});

$("#IPC").change(function(){
    var a = document.getElementById("IPC").value;
    if(a == 0){less.modifyVars({'@color_instructionPanel':'yellow'});}
    else if(a == 1){less.modifyVars({'@color_instructionPanel':'orange'});}
    else if(a == 2){less.modifyVars({'@color_instructionPanel':'lightgreen'});}
    else if(a == 3){less.modifyVars({'@color_instructionPanel':'magenta'});}
    else if(a == 4){less.modifyVars({'@color_instructionPanel':'white'});}
});

$("#TPC").change(function(){
    var a = document.getElementById("TPC").value;
    if(a == 0){less.modifyVars({'@color_themePanel':'yellow'});}
    else if(a == 1){less.modifyVars({'@color_themePanel':'orange'});}
    else if(a == 2){less.modifyVars({'@color_themePanel':'lightgreen'});}
    else if(a == 3){less.modifyVars({'@color_themePanel':'magenta'});}
    else if(a == 4){less.modifyVars({'@color_themePanel':'white'});}
});
*/