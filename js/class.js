/* ****** Cria o Genius ******
 * Class Genius
 * ação: define a estrutura do Genius
 * entrada: callbackInterval, callbackStartInterval, allowClick, geniusShortcut, round
 */
class Genius {
    constructor() {
            this.error = new Audio("sounds/geniusGameOver.mp3"),
            this.startAudio = new Audio("sounds/geniusStart.mp3"),
            this.winAudio = new Audio("sounds/geniusWin.mp3"),
            this.strictAudio = new Audio("sounds/geniusStrict.mp3"),
            this.errorselect = new Audio("sounds/SelectModes.mp3"),

            this.blueAudio = new Audio("sounds/geniusBlue.mp3"),
            this.greenAudio = new Audio("sounds/geniusGreen.mp3"),
            this.redAudio = new Audio("sounds/geniusRed.mp3"),
            this.yellowAudio = new Audio("sounds/geniusYellow.mp3"),

            this.colors = ['yellow', 'red', 'green', 'blue'],
            this.startAnimationSequence = ['red', 'blue', 'green', 'blue', 'yellow', 'red', 'yellow', 'green', 'blue'],

            this.sequence = [],
            this.sequenceIndex,
            this.geniusRound,
            this.internalGenius,
            this.geniusShortcut,
            this.time = 6,
            this.timing,
            this.mode,
            this.maxRound,

            this.callbackInterval,
            this.callbackStartInterval,
            this.callbackRemoveClick,
            this.callbackAllowClick,
            this.callbackDifficulty,
            this.callbackMode,
            this.callbackGeniusTime
    }

    setSequence() {
        this.callbackDifficulty();
        while (this.sequence.length < this.maxRound) {
            let colorIndex = Math.floor(Math.random() * this.colors.length);
            this.sequence.push(this.colors[colorIndex]);
        }
    }

    setRound(_round) {
        this.geniusRound = _round;
    }

    setCallBackDifficulty(_callbackDifficulty) {
        this.callbackDifficulty = _callbackDifficulty;
    }

    setCallBackMode(_callbackMode) {
        this.callbackMode = _callbackMode;
    }

    setCallBackInterval(_callbackInterval) {
        if (_callbackInterval) this.callbackInterval = _callbackInterval;
        else this.callbackInterval = () => { throw "The callback is not defined!" };
    }

    setCallBackRemoveClick(_callbackRemoveClick) {
        this.callbackRemoveClick = _callbackRemoveClick;
    }

    setCallBackGeniusTime(_callbackGeniusTime) {
        this.callbackGeniusTime = _callbackGeniusTime;
    }

    setCallbackStartInterval(_callbackStartInterval) {
        if (_callbackStartInterval) this.callbackStartInterval = _callbackStartInterval;
        else this.callbackStartInterval = () => { throw "The callbackStart is not defined!" };
    }

    setAllowClick(_callBackAllowClick) {
        this.callbackAllowClick = _callBackAllowClick;
    }

    setGeniusShortcut(_shortcut) {
        this.geniusShortcut = _shortcut;
    }

    geniusInterval() {
        if (this.geniusRound <= 7) return 700;
        else if (this.geniusRound <= 20) return 600;
        else return 450;
    }

    geniusClearTime() {
        this.time = 6;
        clearInterval(this.timing);
        return;
    }

    start() {
        this.sequenceIndex = 0;

        if (this.sequenceIndex < this.startAnimationSequence.length) {
            this.internalGenius = setInterval(() => {
                this.callbackStartInterval();
                this.sequenceIndex++;

                if (this.sequenceIndex >= this.startAnimationSequence.length) {
                    () => { return };
                    clearInterval(this.internalGenius);
                }
            }, 310);
        }
    }

    round() {
        this.geniusClearTime();
        this.sequenceIndex = 0;

        if (this.sequenceIndex < this.geniusRound) {
            this.internalGenius = setInterval(() => {
                this.callbackInterval();
                
                this.sequenceIndex++;

                if (this.sequenceIndex >= this.geniusRound) {
                    () => { return };
                    clearInterval(this.internalGenius);
                    this.callbackAllowClick();
                    this.geniusShortcut();
                    this.callbackGeniusTime();
                }
            }, this.geniusInterval());
        }
    }
}

/* ****** Cria o Player ******
 * Class Player
 * ação: define a estrutura do Player
 * entrada: callbackRound
 */
class Player {
    constructor() {
        this.sequence = [],
        this.hits = 0,
        this.score = 0,
        this.callbackRound
    }

    setCallbackRound(_callbackRound) {
        this.callbackRound = _callbackRound;
    }

    round(_color) {
        this.sequence.push(_color);
        this.callbackRound();
        genius.geniusClearTime();
        genius.callbackGeniusTime();
    }
}

const genius = new Genius;
const player = new Player;