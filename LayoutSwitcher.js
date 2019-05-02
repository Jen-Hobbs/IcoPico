function switchToDesktopLayout()
{
    game.scene.start("Scene1");
    game.scene.stop("Scene2");
}

function switchToMobileLayout()
{
    game.scene.start("Scene2");
    game.scene.stop("Scene1");
}
