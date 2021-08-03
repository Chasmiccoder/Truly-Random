// Global iterator i
var i = 0; // what is the point of this?
function increment() {
    i += 1;
}
var previous = ""; // prevents additional dialogue boxes from being created
// find a better way of doing this instead of using global vars


function getOperation() {
    var e = document.getElementById("operation_select").value;
    var number = 0; // Random Number Generated

    if ( previous == e ) {
        // something
        console.log("same op");
    }

    else if ( previous != e ) {

        // clear function that deletes previous fields

        if ( e == "coin_toss" ) {
            number = fetchCoinToss();
        }

        else if ( e == "integer" ) {
            number = fetchInteger();
        }

        else if ( e == "float" ) {

        }

        else if ( e == "n_digit_int" ) {

        }

        else if ( e == "fraction" ) {

        }

        else if ( e == "n_digit_binary" ) {

        }
    }
    previous = e;

    /*
    <form action="#" id="mainform" method="get" name="mainform">
                <span id="myForm"></span>
                <p></p><input type="submit" value="Generate!">
                </form>

*/
    var r = document.createElement('span');
    // submit
    var sub = document.createElement("INPUT");
    sub.setAttribute("type", "submit");
    sub.setAttribute("value", "Generate!");
    increment();
    sub.setAttribute("Name", "textelement_" + i); // what is this

    r.appendChild(sub);
    r.setAttribute("id", "id_" + i);
    document.getElementById("mainform").appendChild(r);
    

}


function fetchCoinToss() {
    return 1;
}


function fetchInteger() {

    // First we need to get the lower and upper bounds
    var r = document.createElement('span'); // root?
    var lower_limit = document.createElement('INPUT'); // lower limit
    var upper_limit = document.createElement('INPUT'); // lower limit

    increment()

    lower_limit.setAttribute("type", "text");
    lower_limit.setAttribute("placeholder", "Lower Limit"); // Lower limit
    lower_limit.setAttribute("Name", "textelement_" + i);
    
    // increment()

    upper_limit.setAttribute("type", "text");
    upper_limit.setAttribute("placeholder", "Upper Limit");
    upper_limit.setAttribute("Name", "textelement_" + i)
    
    
    r.appendChild(lower_limit);
    r.appendChild(upper_limit);
    r.setAttribute("id", "id_" + i);

    document.getElementById("mainform").appendChild(r);

    


    return 0;
}








