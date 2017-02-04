var playerSign;
var cpuSign;
var turnCount = 0;
var available = [1,2,3,4,5,6,7,8,9];
var winMessage = "";
var gameOver = false;

function startGame(){
  $('#main-menu').animate({
    opacity: 0,
    bottom: "+=50px"
  }, 500);
  setTimeout(function(){
    $('#main-menu').hide();
    //animate the next screen here
    $('#game-screen').show();
    $('#game-screen').animate({
      opacity: 1
    }, 500);
  }, 500);
  setTimeout(function(){
    processGame();
  });
}

function processGame(){
  if(gameOver) return;
  //show playerSign on grid upon hover, if grid is not occupied
  if(playerSign == 'O'){
    cpuTurn();
  }

  var tempEmpty;
  $('.grid').hover(function(){
    var empty = $(this).html() == '&nbsp;' ? true : false;
    tempEmpty = empty;
    if(tempEmpty){
      $(this).html(playerSign);
      if(playerSign === 'X'){
        $(this).addClass('sign-x');
      } else {
        $(this).addClass('sign-o');
      }
      $(this).css('opacity', '0.3');
    }
  }, function(){
    if(tempEmpty){
      $(this).html('&nbsp;');
      $(this).removeClass('sign-x sign-o');
      $(this).css('opacity', '1');
    }
  });

  $('.grid').click(function(){
    if(tempEmpty){
      //if it's empty, mark the grid with playerSign
      $(this).html(playerSign);
      tempEmpty = false; //set tempEmpty to false so the mouseExit event won't be called
      if(playerSign === 'X'){
        $(this).addClass('sign-x');
        $(this).css('opacity', '1');
      } else {
        $(this).addClass('sign-o');
        $(this).css('opacity', '1');
      }
      var takenGrid = $(this).attr('id').charAt(4);

      available.splice(available.indexOf(parseInt(takenGrid)), 1); //remove from available array
      console.log('End of player turn');
      console.log('player taken:' + takenGrid);
      console.log('available: ' + available);
      turnCount++;
      checkWin();
      cpuTurn();
    }
  });
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function cpuTurn(){
  if (gameOver) return;
  //just take random cell
  var cpuAction = available[getRandomIntInclusive(0, available.length-1)];
  var takenGrid = 'grid'+cpuAction;

  $('#'+takenGrid).html(cpuSign);
  tempEmpty = false; //set tempEmpty to false so the mouseExit event won't be called
  if(cpuSign === 'X'){
    $('#'+takenGrid).addClass('sign-x');
    $('#'+takenGrid).css('opacity', '1');
  } else {
    $('#'+takenGrid).addClass('sign-o');
    $('#'+takenGrid).css('opacity', '1');
  }
  available.splice(available.indexOf(cpuAction), 1); //remove from available array
  console.log('End of cpu turn');
  console.log('cpu taken:' + cpuAction);
  console.log('available: ' + available);
  turnCount++;
  checkWin();
}

function checkWin(){
    var g1 = $('#grid1').html();
    var g2 = $('#grid2').html();
    var g3 = $('#grid3').html();
    var g4 = $('#grid4').html();
    var g5 = $('#grid5').html();
    var g6 = $('#grid6').html();
    var g7 = $('#grid7').html();
    var g8 = $('#grid8').html();
    var g9 = $('#grid9').html();

    if(g1 === g2 && g2 === g3 || g1 === g4 && g4 === g7 || g1 === g5 && g5 === g9){
        //winning condition met involving g1
        if(g1 != '&nbsp;'){
          if(g1 == playerSign){
            winMessage = 'You won!';
          } else {
            winMessage = 'You lost...';
          }
          gameOver = true;
        }
    } else if (g2 === g5 && g5 === g8 ||  g7 === g8 && g8 === g9){
      //winning condition met involving g8
      if(g8 != '&nbsp;'){
        if(g8 == playerSign){
          winMessage = 'You won!';
        } else {
          winMessage = 'You lost...';
        }
        gameOver = true;
      }
    } else if (g3 === g6 && g6 === g9 || g3 === g5 && g5 === g7){
      //winning condition met involving g3
      if(g3 != '&nbsp;'){
        if(g3 == playerSign){
          winMessage = 'You won!';
        } else {
          winMessage = 'You lost...';
        }
        gameOver = true;
      }
    } else if (g4 === g5 && g5 === g6){
      //winning condition met involving g4
      if(g4 != '&nbsp;'){
        if(g4 == playerSign){
          winMessage = 'You won!';
        } else {
          winMessage = 'You lost...';
        }
        gameOver = true;
      }
    } else if(turnCount == 9){
      //turncount = 9 with no winning condition met
      winMessage = "It's a draw...";
      gameOver = true;
    }

    if(gameOver){
      $('#win-message').show();

      $('#win-message').html(winMessage);
      $('#win-message').animate({
        opacity:1
      }, 500);
        setTimeout(function(){
        restartGame();
      },2000);
    }
}

function restartGame(){
  playerSign;
  cpuSign;
  turnCount = 0;
  available = [1,2,3,4,5,6,7,8,9];
  winMessage = "";
  gameOver = false;
  $('#grid1').html('&nbsp;');
  $('#grid2').html('&nbsp;');
  $('#grid3').html('&nbsp;');
  $('#grid4').html('&nbsp;');
  $('#grid5').html('&nbsp;');
  $('#grid6').html('&nbsp;');
  $('#grid7').html('&nbsp;');
  $('#grid8').html('&nbsp;');
  $('#grid9').html('&nbsp;');

  $('#grid1').removeClass('sign-x sign-o');
  $('#grid2').removeClass('sign-x sign-o');
  $('#grid3').removeClass('sign-x sign-o');
  $('#grid4').removeClass('sign-x sign-o');
  $('#grid5').removeClass('sign-x sign-o');
  $('#grid6').removeClass('sign-x sign-o');
  $('#grid7').removeClass('sign-x sign-o');
  $('#grid8').removeClass('sign-x sign-o');
  $('#grid9').removeClass('sign-x sign-o');

  $('#win-message').animate({
    opacity: 0
  }, 500);
  setTimeout(function(){
    $('#win-message').hide();
  });

  $('#game-screen').animate({
    opacity: 0
  }, 500);
  setTimeout(function(){
    $('#game-screen').hide();
    $('#main-menu').show();
    $('#main-menu').animate({
      opacity: 1,
      bottom: "-=50px"
    }, 500);
  }, 500);
}
$(document).ready(function() {
  $('#choose-sign-x').click(function(){
    playerSign = 'X';
    cpuSign = 'O';
    startGame();
  });
  $('#choose-sign-o').click(function(){
    playerSign = 'O';
    cpuSign = 'X';
    startGame();
  });

  $('.c100').click(toggleTimer);
  $('#btn-session-decr').click(decrSession);
  $('#btn-session-incr').click(incrSession);
  $('#btn-break-decr').click(decrBreak);
  $('#btn-break-incr').click(incrBreak);

});