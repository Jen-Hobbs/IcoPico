// first page contains easter egg
let date = new Date();
let day = date.getDay();
let clicked = true;

let dayOfWeek = new Array(7);
dayOfWeek[0] = "Sunday";
dayOfWeek[1] = "Monday";
dayOfWeek[2] = "Tuesday";
dayOfWeek[3] = "Wednesday";
dayOfWeek[4] = "Thursday";
dayOfWeek[5] = "Friday";
dayOfWeek[6] = "Saturday";


function easterEgg() {
    if (dayOfWeek[day] == "Wednesday" && clicked == true) {

        //  create a jquery 
        console.log("Its " + dayOfWeek[day] + " my dudes");

        var div = "<div id = 'div_egg' ></div>";
        var div_css = {
            "backgroundColor": "white",
            "width": "16em",
            "height": "5em",
            "textAlign": "center",
            "paddingLeft": "2em",
            "marginLeft": "50%",
            "marginTop": "4em",
            "clipPath": "polygon(100% 0, 100% 100%, 12% 100%, 12% 71%, 0 71%, 12% 49%, 12% 0)"
        }

        var p_css = {
            "fontSize": "2em",
            "color": "blue"
        }

        $("#box_inner").append(div);
        $("#div_egg").append($("<p id = 'p_text'>").html("Its " + dayOfWeek[day] + " my dudes"));
        $("#div_egg").css(div_css);
        $("#p_text").css(p_css);
        clicked = false;

    } else {
        console.log("no");
    }
}