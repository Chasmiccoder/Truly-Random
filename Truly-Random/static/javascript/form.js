// Global iterator i
var i = 0; // what is the point of this?
function increment() {
    i += 1;
}
var previous = ""; // prevents additional dialogue boxes from being created
// find a better way of doing this instead of using global vars
var numbers = [];
var numberOfNumbersGenerated = 0;

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
            fetchCoinToss();
        }

        else if ( e == "integer" ) {
            fetchInteger();
        }

        else if ( e == "float" ) {
            fetchFloat();
        }

        else if ( e == "n_digit_int" ) {
            fetchNDigitInt();
        }

        else if ( e == "fraction" ) {
            fetchFraction();
        }

        else if ( e == "n_digit_binary" ) {
            fetchNDigitBinary();
        }
    
        previous = e;

        
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
    // sub.setAttribute("value", "Generate!");
    // sub.innerHTML = "Generate!";
    increment();
    sub.setAttribute("name", "textelement_" + i);
    sub.setAttribute("onsubmit", "displayNumber()");


    // For the submit button animation
    sub.setAttribute("class", "submit-button state-0");

    var submitButtonSpan = document.createElement('span');
    submitButtonSpan.setAttribute("class", "pre-state-msg hide");
    submitButtonSpan.innerHTML = "Generate!";

    var submitButtonSpan2 = document.createElement('span');
    submitButtonSpan2.setAttribute("class", "current-state-msg hide");
    submitButtonSpan2.innerHTML = "Generating...";

    var submitButtonSpan3 = document.createElement('span');
    submitButtonSpan3.setAttribute("class", "done-state-msg hide");
    submitButtonSpan3.innerHTML = "Done!";



    r.appendChild(sub);

    increment()
    r.setAttribute("id", "id_submitButton");

   


    document.getElementById("mainform").appendChild(r);

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

// change function name to setNumber or something
function displayNumber(event) {
    event.preventDefault();

    var ll = document.getElementById('lowerLimitField').value;
    var ul = document.getElementById('upperLimitField').value;

    ll = parseInt(ll);
    ul = parseInt(ul);
    
    var num = (ll+ul)/2;

    updateOutput(num);
    // outputHere
    // document.getElementById('outputHere').innerHTML = tmp;
}

function updateOutput(num) {
    // alert("REACHED!");

    numberOfNumbersGenerated += 1;
    // numbers += [num];
    numbers.push(num);

    // alert(numbers[numberOfNumbersGenerated-1]);

    var r = document.createElement('span');

    for ( var i = 0; i < numberOfNumbersGenerated; i++ ) {
        var oneNumber = document.createElement('p');
        oneNumber.setAttribute("id", "outputPTag" + i );

        r.appendChild(oneNumber);
        
    }

    document.getElementById("usage_output").appendChild(r);

    for ( var i = 0; i < numberOfNumbersGenerated; i++ ) {
        document.getElementById("outputPTag" + i).innerHTML = numbers[i];
    }

}

