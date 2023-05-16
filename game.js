// I am going to create Game class that will be responsible for handling game logic 
class Game {
    constructor(buttonColours, animationDuration, gameOverDelay) {
        this.buttonColours = buttonColours;
        this.animationDuration = animationDuration;
        this.gameOverDelay = gameOverDelay;
        this.gamePattern = [];
        this.userClickedPattern = [];
        this.level = 0;
        this.gameIsStarted = false;
        //Here will be ui instance later

        //Here will be audio player instance later

    }

    //Method for starting game
    start() {
        //display level to user with ui

        //generate color sequence 

        this.gameIsStarted = true;
    }

    generateColorSequence() {
        this.userClickedPattern = [];
        this.level++;
        //display user that he got to another lvl

        //make rundom selection of color

        //make animation for button from ui

        //play audio for specific color
    }


}