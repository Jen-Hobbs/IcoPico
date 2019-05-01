var displayWidth;
var displayHeight;

$.getScript("LayoutSwitcher.js", function() {
    alert("Script loaded.");
 });

$(document).ready(function(){
    //change width of display
    displayWidth = $(window).width();
    displayHeight = $(window).height();

    // calls mediaQuery function whenever the window is resized
    $(window).resize(function () {mediaQuery()});

    //drives the changes to css based on screen width
    function mediaQuery(onload) {
        if (!onload && $(window).width() == displayWidth) return;
        if (!onload && $(window).height() == displayHeight) return;
        displayWidth = $(window).width();
        displayHeight = $(window).height();
        if (window.matchMedia('(max-width: 768px)').matches) {
            $("body").css("background-color","red");
            console.log('Mobile');
            switchToMobileLayout(); 
        } else {    
            $("body").css("background-color","teal");
            console.log('Desktop');
            switchToDesktopLayout(); 
        }
    }
    // do a media query once on load
    $(function () {
        mediaQuery(true);
    });
});
