var desktopConfig = {

    parent: 'wrapper',
    scale: {
        // mode: Phaser.Scale.FIT ,
        width:800,
        height:400,
        type: Phaser.AUTO,
        autoCenter: Phaser.Scale.autoCenter
               
    },
    scene: [Shop]
};

var mobileConfig = {

    parent: 'wrapper',
    scale: {
        // mode: Phaser.Scale.FIT ,
        width:800,
        height:400,
        type: Phaser.AUTO,
        autoCenter: Phaser.Scale.autoCenter
               
    },
    scene: [Shop2]
};

function switchToDesktopLayout()
{
    game.scene.start("Shop");
    game.scene.stop("Shop2");
}

function switchToMobileLayout()
{
    game.scene.start("Shop2");
    game.scene.stop("Shop");
}
