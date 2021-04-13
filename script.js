const up_div =  document.getElementById("up");
const down_div =  document.getElementById("d");
const restart_div =  document.getElementById("rs");
const score_span =  document.getElementById("s");
const highscore_span =  document.getElementById("hs");
const field = document.getElementById('field');

const rows = 5;
const cols = 30;
var num;
var currentPID = 301;
var newPid = currentPID;
var score = 0;
var highscore = 0;
var num2;
var cell_list = [];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function stoppers(){
  
  const cr = Math.floor(Math.random()*rows)+1;
  let cell = (cr*100) + cols  ;
  console.log('--------cell:',cell);

  while( cell >= (cr * 100) ){
    await sleep(100);
    const comp_cell = document.getElementById(cell);
    comp_cell.classList.add('comp');    
    setTimeout( function() { comp_cell.classList.remove('comp') } , 100);    
    cell--;
  }

  updatescore(score);
  /* return cell; */
}

function playerMovement(userInput){
  
  var temp = newPid;
  
  switch(userInput){
    case 'u':    
    if( temp >=201) {  
      newPid = temp - 100;  
      }    
    break;
    case 'd': 
    if (temp <= 401){     
      newPid = temp + 100;  }    
    break;
    case 'rs':
    newPid = currentPID;
     
  }
  //console.log('temp',temp);
  document.getElementById(temp).classList.remove('player');
  document.getElementById(newPid).classList.add('player');
  console.log(document.getElementById(newPid).classList);
  // checkcolide(newPid);
}


async function checkcolide(newPid){
  if (document.getElementById(newPid).classList.contains('comp')){
      console.log('game over');
      // await sleep(5000);
      clearInterval(num);
      clearInterval(num2);
    if( highscoreUpdate(score) == 1 ){
        field.innerHTML = `<tr class="col-sm-12"><td><h1>Well Played !!</h1></td> </tr><br><tr><td><h1>Your High Score ${ Math.round(score)}</h1></td></tr>`;
      }
      else{
        field.innerHTML = `<tr class="col-sm-12"><td><h1>Game over</h1></td></tr><br><tr><td><h1>Your Score ${ Math.round(score)}</h1></td></tr>`;
      }
      score = 0;
      document.getElementById(temp).classList.remove('player');
      temp = currentPID;
  } 
 
}

function highscoreUpdate(Score){
  if (Score > highscore){
    highscore = Score;
    highscore_span.innerHTML = Score;
    return 1;
  }
  else{
    return 0;
  }
}

// function game(userInput){
  
//   playerMovement(userInput);
 
// }

function creategrid( r, c){
  var s = '';
  for (let i = 1 ;i<= r;i++){
    s += `<tr id ="${i}">`;
    for (let j=0; j <= c; j++){
      s+=` <td id="${(i*100) +j}" class=""><span> - - </span> </td>`;
    }
    s+=`</tr>`;
  }
  // console.log(s);
  return s;
}



function updatescore(Score){
  score = Score + 1;
  score_span.innerHTML = score;
}

function startGame(){
  field.innerHTML = creategrid( rows, cols);
  const currentEl = document.getElementById('301');
  // currentEl.classList.add('player');
  // var currentPID = 301;
  
  num = setInterval(function(){ checkcolide(newPid); }, 20);
  num2 = setInterval(function(){ stoppers(); }, 800);
  // var newPid = currentPID;  
}

function keyPush(evt){
  switch(evt.keyCode){
    case 38: //up 
        playerMovement('u');
        console.log("up");
        break;
    case 87: // w
        playerMovement('u');
        console.log("up");
        break;
    case 40: //down
        playerMovement('d');
        console.log("down" , newPid);
        break;
    case 83: //s
      playerMovement('d');
      console.log("down" , newPid);
      break;
    case 13: //Enter
        timmer();
      break;
  }
}

function timmer(){
  var timeleft = 10;
  var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
      clearInterval(downloadTimer);
      restart();

    } else {
      
      field.innerHTML = `<tr><td><h1 class="choice">Will Start in : ${ timeleft }</h1></td></tr>`;
    }
    timeleft -= 1;
  }, 300);
}


function restart(){
    console.log("restart");
    clearInterval(num);
    clearInterval(num2);
    score = 0;
    startGame();   
  }

function main() {
   
  startGame();
  
  up_div.addEventListener('click', function(){
    playerMovement('u');
    console.log("up");
  });

  down_div.addEventListener('click', function(){
    playerMovement('d');
    console.log("down" , newPid);
  });

  document.addEventListener('keydown', keyPush);  


  restart_div.addEventListener('click', timmer);
  
 
}
main();// javascript
