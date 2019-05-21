var config = {

    parent: 'wrapper',
    scale: {
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600,
        type: Phaser.AUTO,

    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [ShowMenu, Shop, Task, Purchase, Pethub, PethubOverlay, Time, UpdateDB]

};

var game = new Phaser.Game(config);
var player;
var display;
