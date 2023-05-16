// Game main class that handles game logic 
class Game {
    constructor(buttonColours, animationDuration, gameOverDelay) {
        this.buttonColours = buttonColours;
        this.animationDuration = animationDuration;
        this.gameOverDelay = gameOverDelay;
        this.gamePattern = [];
        this.userClickedPattern = [];
        this.level = 0;
        this.gameIsStarted = false;
        this.ui = new UI(); 
        this.audioPlayer = new AudioPlayer();
    }

   
    start() {
        //display level to user with ui
        this.ui.displayLevel(`Level ${this.level}`);
        //generate color sequence 
        this.generateColorSequence();
        this.gameIsStarted = true;
    }

    generateNextColorSequence() {
        this.userClickedPattern = [];
        this.level++;
        this.ui.displayLevel(`Level ${this.level}`);
        const randomNumber = Math.floor(Math.random() * this.buttonColors.length);
        const randomChosenColor = this.buttonColors[randomNumber];
        this.gamePattern.push(randomChosenColor);
        this.ui.animateButtonPress(randomChosenColor);
        this.audioPlayer.playAudioForColor(randomChosenColor);
    }

    validateUserAnswer(currentLevel) {
        //Here I will validate user answers
    }

    handleButtonClick(clickedColor) {
        //function to react for button clicks
        this.ui.animateButtonPress(clickedColor);
        this.userClickedPattern.push(clickedColor);
        this.ui.fadeButtonInAndOut(clickedColor, this.animationDuration);
        this.audioPlayer.playAudioColor(clickedColor);
        //validate answer call
        
    }
}

class UI {
    constructor() {
        this.levelTitleElement = $('#level-title');
    }

    displayLevel() {
        this.levelTitleElement.text('Game over!');
    }

    animateButtonPress(currentColor) {
        this.addAndRemoveClassWithDelay(currentColor, 'pressed', 100);
    }

    addAndRemoveClassWithDelay(selector, className, time) {
        $(`.${selector}`).addClass(className);
        setTimeout(() => {
          $(`.${selector}`).removeClass(className);
        }, time);
    }

    fadeButtonInAndOut(buttonColor, animationDuration) {
        $(`#${buttonColor}`)
      .fadeIn(animationDuration)
      .fadeOut(animationDuration)
      .fadeIn(animationDuration);
    }
}

class AudioPlayer {
    playAudioColor(name) {
        const audio = new Audio(`./sounds/${name}.mp3`);
        audio.play();
    }
}

$(window).on('load',() => {

})