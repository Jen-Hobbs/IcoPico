// game startup configure game
// TODO properally size game
console.log('game loading');

function startGame() {
    console.log("starting game");
    game = new Phaser.Game(config);
}

var config = {
    
    parent: 'wrapper',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 1600,
        type: Phaser.AUTO,

    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Pethub, Shop, Task, ShowMenu, Purchase, Time, ChoosePet]

};

var game;

var player;
var display;
