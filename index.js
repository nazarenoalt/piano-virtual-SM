const cover = document.getElementById('cover');
const difficultSwitch = document.getElementById('difficult-switch');
const DO = document.getElementById('DO');
const RE = document.getElementById('RE');
const MI = document.getElementById('MI');
const FA = document.getElementById('FA');
const SOL = document.getElementById('SOL');
const LA = document.getElementById('LA');
const SI = document.getElementById('SI');
const DOs = document.getElementById('DOs');
const REs = document.getElementById('REs');
const MIs = document.getElementById('MIs');
const SOLs = document.getElementById('SOLs');
const LAs = document.getElementById('LAs');
const MAX_LEVEL = 10;

class Game {

    constructor() {
        this.turnOnSequence = this.turnOnSequence.bind(this);
        this.addClickEvents = this.addClickEvents.bind(this);
        this.chooseKey = this.chooseKey.bind(this);
        this.start = this.start.bind(this);
        this.start();
        this.generateSequence();
        this.nextLevel();
    }

    start() {
        this.toggleButtonStart();
        this.level = 1;
        this.KEYS = {DO, RE, MI, FA, SOL, LA, SI};
        if(difficultSwitch.dataset.status === 'difficult') {
            this.KEYS = {
                DO, RE, MI, FA, SOL, LA, SI, DOs, REs, MIs, SOLs, LAs
            }
        }
        this.keysLength = Object.keys(this.KEYS).length;
    }

    generateSequence() {
        this.sequence = new Array(10).fill(0).map(() => Math.floor(Math.random() * this.keysLength ));
    }

    nextLevel() {
        this.sublevel = 0;
        this.turnOnSequence();
        this.addClickEvents();
    }
    
    turnOnSequence() {
        for(let i = 0; i < this.level; i++) {
            let key = this.transformNumberToKey(this.sequence[i]);
            setTimeout(() => this.turnOnKey(key), 700*i);
        }
    }

    transformKeyToNumber(key) {
        switch(key) {
            case 'DO':
               return 1
            case 'RE':
               return 2
            case 'MI':
               return 3
            case 'FA':
               return 4
            case 'SOL':
               return 5
            case 'LA':
               return 6
            case 'SI':
               return 7
            case 'DOs':
               return 8
            case 'REs':
               return 9
            case 'MIs':
               return 10
            case 'SOLs':
               return 11
            case 'LAs':
               return 12           
        }
    }
    transformNumberToKey(num) {
        switch(num) {
            case 1:
                return 'DO'
            case 2:
                return 'RE'
            case 3:
                return 'MI'
            case 4:
                return 'FA'
            case 5:
                return 'SOL'
             case 6:
                return 'LA'
            case 7:
                return 'SI'
            case 8:
                return 'DOs'
            case 9:
                return 'REs'
            case 10:
                return 'MIs'
            case 11:
                return 'SOLs'
            case 12:          
                return 'LAs'
        }
    }
    turnOnKey(key) {
        if(this.KEYS[key].classList.contains('white-key')) {
            this.KEYS[key].classList.add('light-white-key');
            setTimeout(() => this.KEYS[key].classList.remove('light-white-key'), 350)
        } else {
            this.KEYS[key].classList.add('light-black-key');
            setTimeout(() => this.KEYS[key].classList.remove('light-black-key'), 350)
        }
    }

    addClickEvents() {
        DO.addEventListener('click', this.chooseKey);
        RE.addEventListener('click', this.chooseKey);
        MI.addEventListener('click', this.chooseKey);
        FA.addEventListener('click', this.chooseKey);
        SOL.addEventListener('click', this.chooseKey);
        LA.addEventListener('click', this.chooseKey);
        SI.addEventListener('click', this.chooseKey);
        DOs.addEventListener('click', this.chooseKey);
        REs.addEventListener('click', this.chooseKey);
        MIs.addEventListener('click', this.chooseKey);
        SOLs.addEventListener('click', this.chooseKey);
        LAs.addEventListener('click', this.chooseKey);
    }

    removeClickEvents() {
        DO.removeEventListener('click', this.chooseKey);
        RE.removeEventListener('click', this.chooseKey);
        MI.removeEventListener('click', this.chooseKey);
        FA.removeEventListener('click', this.chooseKey);
        SOL.removeEventListener('click', this.chooseKey);
        LA.removeEventListener('click', this.chooseKey);
        SI.removeEventListener('click', this.chooseKey);
        DOs.removeEventListener('click', this.chooseKey);
        REs.removeEventListener('click', this.chooseKey);
        MIs.removeEventListener('click', this.chooseKey);
        SOLs.removeEventListener('click', this.chooseKey);
        LAs.removeEventListener('click', this.chooseKey);
    }

    chooseKey(ev) {
        let keyName = ev.target.dataset.key;
        let keyNumber = this.transformKeyToNumber(keyName);
        this.turnOnKey(keyName)
        if(keyNumber === this.sequence[this.sublevel]) {
            this.sublevel++
            if(this.sublevel === this.level) {
                this.level++
                this.removeClickEvents();
                if(this.level === (MAX_LEVEL + 1)) {
                    this.gameWon();
                } else {
                    setTimeout(() => this.nextLevel(), 1000)
                }
            }

        } else {
            this.gameLost();
        }
    }

    toggleButtonStart() {
        cover.classList.contains('hide')
            ? cover.classList.remove('hide')
            : cover.classList.add('hide');
    }

    gameWon() {
        swal('Ganaste!', '', 'success')
            .then(() => this.start());
        
    }
    gameLost() {
        swal('Perdiste!', '', 'error')
            .then(() => {
                this.removeClickEvents();
                this.start();
            })
        
    }
}

function startGame() {
    game = new Game();

}