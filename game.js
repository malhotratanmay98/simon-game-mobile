var buttonColors=["red", "blue", "green", "yellow" ];
var userClickedPattern=[];
var gamePattern=[];



var gameStarted=false;      //we have to click A key to start
var level=0;


$(document).keypress(function() {        //$("h1").click(function() this is for click function
  if (!gameStarted) {

    //3. The h1 title starts out saying "Press Any Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});



$(".btn").click(function(){   //it will search for all the attributes with btn class and add the function


  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  //console.log(userClickedPattern);
checkAnswer(userClickedPattern.length-1);

});



function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      //console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

    //  console.log("wrong");

      // In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
     playSound("wrong");

     // In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
     $("body").addClass("game-over");
     setTimeout(function () {
       $("body").removeClass("game-over");
     }, 200);

     // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
     $("#level-title").text("Game Over, press any key to Restart");



   // Call startOver() if the user gets the sequence wrong.
   startOver();


    }

}



function nextSequence(){


  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
userClickedPattern = [];

level++;
$("#level-title").text("Level " + level);



  var randomNumber=Math.floor(Math.random()*4);    //random number generates from 0 to 3

var randomChosenColour=buttonColors[randomNumber];   //assigning number to color
playSound(randomChosenColour);
gamePattern.push(randomChosenColour);   //putting that color to the pattern
$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);   //selecting the button ID and animating


}

function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3"); //playing the sound effect related to that color
   audio.play()
}


function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


//1. Create a new function called startOver().
function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
