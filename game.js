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
        this.ui.displayLevel(`Level ${this.level}`);
        this.generateNextColorSequence();
        this.gameIsStarted = true;
    }

    generateNextColorSequence() {
        this.userClickedPattern = [];
        this.level++;
        this.ui.displayLevel(`Level ${this.level}`);
        const randomNumber = Math.floor(Math.random() * this.buttonColours.length);
        const randomChosenColor = this.buttonColours[randomNumber];
        this.gamePattern.push(randomChosenColor);
        this.ui.animateButtonPress(randomChosenColor);
        this.audioPlayer.playAudioForColor(randomChosenColor);
    }

    validateUserAnswer(currentLevel) {
        if (
          this.gamePattern[currentLevel] === this.userClickedPattern[currentLevel]
        ) {
          if (this.userClickedPattern.length === this.gamePattern.length) {
            setTimeout(() => {
              this.generateNextColorSequence();
            }, 1000);
          }
        } else {
          this.audioPlayer.playAudioForColor('wrong');
          this.ui.displayGameOver();
          this.ui.addAndRemoveClassWithDelay(
            'body',
            'game-over',
            this.gameOverDelay
          );
          setTimeout(() => {
            this.resetGame();
          }, 500);
        }
      }

    handleButtonClick(clickedColor) {
        this.ui.animateButtonPress(clickedColor);
        this.userClickedPattern.push(clickedColor);
        this.ui.fadeButtonInAndOut(clickedColor, this.animationDuration);
        this.audioPlayer.playAudioForColor(clickedColor);
        this.validateUserAnswer(this.userClickedPattern.length - 1);
    }

    resetGame() {
        this.gamePattern = [];
        this.userClickedPattern = [];
        this.level = 0;
        this.gameIsStarted = false;
        this.ui.displayLevel('Press A Key to Start');
      }
}

//This class responsibility is handling the everything that related to user interface
class UI {
    constructor() {
        this.levelTitleElement = $('#level-title');
    }

    displayLevel(levelText) {
        this.levelTitleElement.text(levelText);
    }

    displayGameOver() {
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

//This class responsible for playing sounds
class AudioPlayer {
    playAudioForColor(name) {
        const audio = new Audio(`./sounds/${name}.mp3`);
        audio.play().catch((error) => {
            console.error('Error playing audio:', error);
        });
    }
}

$(window).on('load',() => {
    const buttonColors = ['red', 'blue', 'green', 'yellow'];
    const animationDuration = 100;
    const gameOverDelay = 200;
    const game = new Game(buttonColors, animationDuration, gameOverDelay);

    $(document).on('keypress', () => {

    if (!game.gameIsStarted) {
        game.start();
    }
    });

    $('.btn').on('click', function () {
        const clickedColor = $(this).attr('id');
        game.handleButtonClick(clickedColor);
    });

});