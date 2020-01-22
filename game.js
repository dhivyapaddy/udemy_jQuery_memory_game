alert("Game Instructions! Memorize the 1st color that pops and press the same color, in next level memorize the 2nd color and press the sequence of 1st color and 2nd color and level goes on till your memory crashes!");

var buttonColours = ["green","red","yellow","blue"];
var gamePattern = [];
var userClickedPattern = [];
var startGame = false;
var level = 0;

$(document).keydown(function() {
if(!startGame) {
  // $("#level-title").text("Level " + level);
  nextSequence();
  startGame = true;
}
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (gamePattern.length === userClickedPattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
  } else {
      playSound("wrong");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      },200);
      startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  startGame = false;
}
