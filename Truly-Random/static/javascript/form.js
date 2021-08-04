// Global iterator i
var i = 0; // what is the point of this?
function increment() {
    i += 1;
}
var previous = ""; // prevents additional dialogue boxes from being created
// find a better way of doing this instead of using global vars
var numbers = [];

// Put these following lines in a function?
// const formWrapper = document.querySelector('.formWrapper');
// const form = formWrapper.querySelectorAll('.formClass');
// const submitInput = form[0].querySelector('input[type="submit"]');

// // Parameter e is an event
// function getDataForm(e) {
//     e.preventDefault(); // prevent default submit behaviour on clicking the button
//     console.log("lknfknlq");
//     // looks through all the form fields and collects the data present in them
//     var formData = new FormData(form[0]);

//     alert( formData.get('lowerLimitField') + ' - ' + formData.get('upperLimitField') );

// }

// Create an event listener that will trigger getDataForm(e)
// document.addEventListener('DOMContentLoaded', function(){
//     console.log("REACHED");
//     submitInput.addEventListener( 'click', getDataForm, false ); 
//  }, false);
 




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

        
        // var r = document.createElement('span');
        // // submit
        // var sub = document.createElement("INPUT");
        // sub.setAttribute("type", "submit");
        // sub.setAttribute("value", "Generate!");
        // increment();
        // sub.setAttribute("name", "textelement_" + i);

        // r.appendChild(sub);

        // increment()
        // r.setAttribute("id", "id_" + i);
        // document.getElementById("mainform").appendChild(r);


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
    var sub = document.createElement("BUTTON");
    // sub.setAttribute("type", "button");
    // sub.setAttribute("value", "Generate!");
    sub.innerHTML = "Generate!";
    increment();
    sub.setAttribute("name", "textelement_" + i);
    sub.setAttribute("onClick", "displayNumber");

    r.appendChild(sub);

    increment()
    r.setAttribute("id", "id_" + i);
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




function displayNumber() {
    var ll = document.getElementById('lowerLimitField').value;
    var ul = document.getElementById('upperLimitField').value;

    tmp = (ll+ul)/2;
    // outputHere
    document.getElementById('outputHere').value = tmp;
}
