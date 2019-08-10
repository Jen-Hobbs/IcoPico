// game startup configure game
// TODO properally size game
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
    scene: [ShowMenu, Shop, Task, Purchase, Pethub, PethubOverlay, Time, ChoosePet]

};

var game = new Phaser.Game(config);
var player;
var display;
