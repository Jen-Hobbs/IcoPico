/**
 * Create Game
 *
**/
var config = {

    parent: 'wrapper',
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1236,
        height: 681,
        type: Phaser.AUTO,
        autoCenter: Phaser.Scale.autoCenter

    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [ShowMenu, Shop, Task, Purchase, Pethub, PethubOverlay, Time]

};

var game = new Phaser.Game(config);
var player;
var display;

console.log("game is loaded");
