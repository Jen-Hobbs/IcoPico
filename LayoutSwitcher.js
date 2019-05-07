//run, stop
var desktopScenes = ["Rock", "Potato"];
var mobileScenesHorizontal = ["Rock_m_h", "Potato_m_h"];
var mobileScenesVertical = ["Rock_m_v", "Potato_m_v"]

function switchToDesktopLayout()
{
    disableAllMobileHorizontal();
    disableAllMobileVertical();
    enableAllDesktop();
}

function switchToMobileLayout()
{
    disableAllDesktop();
    enableAllMobileVertical();
}

//Stop Scenes 
function disableAllDesktop()
{
    for (i = 0; i < desktopScenes.length; i++)
    { 
        game.scene.stop(desktopScenes[i]);
    }
}

function disableAllMobileHorizontal()
{
    for (i = 0; i < desktopScenes.length; i++)
    { 
        game.scene.stop(mobileScenesHorizontal[i]);
    }
}

function disableAllMobileVertical()
{
    for (i = 0; i < desktopScenes.length; i++)
    { 
        game.scene.stop(mobileScenesVertical[i]);
    }
}

//Start scenes
function enableAllDesktop()
{
    for(i = 0; i < desktopScenes.length; i++)
    {
        game.scene.run(desktopScenes[i]);
    }
}

function enableAllMobileHorizontal()
{
    for(i = 0; i < mobileScenesHorizontal.length; i++)
    {
        game.scene.run(mobileScenesHorizontal[i]);
    }
}

function enableAllMobileVertical()
{
    for(i = 0; i < mobileScenesVertical.length; i++)
    {
        game.scene.run(mobileScenesVertical[i]);
    }
}