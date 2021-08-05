// Global iterator i
var i = 0; // what is the point of this?
function increment() {
    i += 1;
}
var previous = ""; // prevents additional dialogue boxes from being created
// find a better way of doing this instead of using global vars
var numbers = [];

function getOperation() {
    var e = document.getElementById("operation_select").value;
    var num = 0; // Random Number Generated
    // change variable name of e

    if ( previous == e ) {
        // something
        console.log("same op");
    }

    else if ( previous != e ) {

        // clear function that deletes previous fields

        if ( e == "coin_toss" ) {
            num = fetchCoinToss();
        }

        else if ( e == "integer" ) {
            num = fetchInteger();
        }

        else if ( e == "float" ) {
            num = fetchFloat();
        }

        else if ( e == "n_digit_int" ) {
            num = fetchNDigitInt();
        }

        else if ( e == "fraction" ) {
            num = fetchFraction();
        }

        else if ( e == "n_digit_binary" ) {
            num = fetchNDigitBinary();
        }
    
        previous = e;

        


        numbers += [num];
    }

}


function fetchCoinToss() {
    return 1000;
}


function fetchInteger() {

    // First we need to get the lower and upper bounds
    var r = document.createElement('span'); // root?
    var lower_limit = document.createElement('INPUT'); // lower limit
    var upper_limit = document.createElement('INPUT'); // lower limit

    increment()

    lower_limit.setAttribute("type", "text");
    lower_limit.setAttribute("placeholder", "Lower Limit"); // Lower limit
    lower_limit.setAttribute("name", "textelement_" + i);
    lower_limit.setAttribute("id", "lowerLimitField");
    
    increment()

    upper_limit.setAttribute("type", "text");
    upper_limit.setAttribute("placeholder", "Upper Limit");
    upper_limit.setAttribute("name", "textelement_" + i);
    upper_limit.setAttribute("id", "upperLimitField");
    
    
    r.appendChild(lower_limit);
    r.appendChild(upper_limit);
    r.setAttribute("id", "id_" + i);

    document.getElementById("mainform").appendChild(r);


    var r = document.createElement('span');
    // submit
    var sub = document.createElement("INPUT");
    sub.setAttribute("type", "submit");
    sub.setAttribute("value", "Generate!");
    sub.innerHTML = "Generate!";
    increment();
    sub.setAttribute("name", "textelement_" + i);
    sub.setAttribute("onsubmit", "displayNumber()");

    r.appendChild(sub);

    increment()
    r.setAttribute("id", "id_submitButton");
    document.getElementById("mainform").appendChild(r);


    


    return 2000;
}

function fetchFloat() {
    return 3000;
}

function fetchNDigitInt() {
    return 4000;
}

function fetchFraction() {
    return 5000;
}

function fetchNDigitBinary() {
    return 6000;
}


const form = document.getElementById('mainform');
form.onsubmit = displayNumber;

function displayNumber(event) {
    event.preventDefault();

    // document.getElementById("id_submitButton").addEventListener("click", function(event){
    //     event.preventDefault();
    // });

    var ll = document.getElementById('lowerLimitField').value;
    var ul = document.getElementById('upperLimitField').value;

    alert("Activated!" + ll);
    // console.log("Activated!");

    ll = parseInt(ll);
    ul = parseInt(ul);
    

    var tmp = (ll+ul)/2;
    // outputHere
    document.getElementById('outputHere').innerHTML = "HERE!:" + tmp;
}
    
