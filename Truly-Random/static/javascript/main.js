// Global iterator i that helps keep track of the id's of elements
var i = 0;
function increment() {
    i += 1;
}

// Keeps track of the previous operation performed
// (in order to clear the input field elements when needed, and to prevent additional fields from being created)
var previous = "";

// Keeps track of the numbers generated
var numbers = [];
var numberOfNumbersGenerated = 0;

// Forms that get displayed when the respective operation is chosen
const formInteger = document.getElementById("formInteger");
formInteger.onsubmit = generateInt;

const formFloat = document.getElementById("formFloat");
formFloat.onsubmit = generateFloat;

const formCoinToss = document.getElementById("formCoinToss");
formCoinToss.onsubmit = generateCoinToss;

const formNDigitInt = document.getElementById("formNDigitInt");
formNDigitInt.onsubmit = generateNDigitInt;

const formFraction = document.getElementById("formFraction");
formFraction.onsubmit = generateFraction;

const formNDigitBinary = document.getElementById("formNDigitBinary");
formNDigitBinary.onsubmit = generateNDigitBinary;


function getOperation() {
    /*
    Activates when the user chooses the operation and initiates the generation of the parameter form
    */

    var currentOp = document.getElementById("operation_select").value;

    if ( previous != currentOp ) {
        document.getElementById("enter-values-tag").innerHTML = "Enter Values!";
        
        if ( previous == "integer" ) {
            var parent = document.getElementById("formInteger");
            parent.removeChild( document.getElementById("parameterSpan") );
        }

        if ( previous == "float" ) {
            var parent = document.getElementById("formFloat");
            parent.removeChild( document.getElementById("parameterSpan") );
        }

        if ( previous == "coin_toss" ) {
            var parent = document.getElementById("formCoinToss");
            parent.removeChild( document.getElementById("parameterSpan") );
        }

        if ( previous == "n_digit_int" ) {
            var parent = document.getElementById("formNDigitInt");
            parent.removeChild( document.getElementById("parameterSpan") );
        }

        if ( previous == "fraction" ) {
            var parent = document.getElementById("formFraction");
            parent.removeChild( document.getElementById("parameterSpan") );
        }

        if ( previous == "n_digit_binary" ) {
            var parent = document.getElementById("formNDigitBinary");
            parent.removeChild( document.getElementById("parameterSpan") );
        }

        generateParameterForm(currentOp);    
        previous = currentOp;      
    }
}


function generateParameterForm(operation) {
    /*
    Generates the parameter form for each type of operation
    For integer generation, it generates 3 fields: 
    lower limit, upper limit and the number of numbers to be generated
    For float generation it generates the same integer fields along with a precision field
    
    For Coin Toss, it generates 1 field for the number of coin tosses

    For Fraction, it generates 2 fields for the number of numbers to generate, and the precision 
    (number of digits after decimal)

    For n digit int and binary, it generates 2 fields for: n, number of numbers
    */

    if ( operation == "integer" || operation == "float" ) {

        // First we need to get the lower and upper bounds
        var r = document.createElement('span');
        var lower_limit = document.createElement('INPUT');
        var upper_limit = document.createElement('INPUT');

         // How many random nums to create within the range
        var how_many = document.createElement('INPUT');

        var submit = document.createElement("INPUT");
        submit.setAttribute("type", "submit");
        
        
        increment();

        lower_limit.setAttribute("type", "number");
        lower_limit.setAttribute("placeholder", "Lower Limit");
        lower_limit.setAttribute("name", "textelement_" + i);
        lower_limit.setAttribute("id", "lowerLimitField");
        
        increment();

        upper_limit.setAttribute("type", "number");
        upper_limit.setAttribute("placeholder", "Upper Limit");
        upper_limit.setAttribute("name", "textelement_" + i);
        upper_limit.setAttribute("id", "upperLimitField");

        increment();
        
        how_many.setAttribute("type", "number");
        how_many.setAttribute("placeholder", "How Many"); 
        how_many.setAttribute("name", "textelement_" + i);
        how_many.setAttribute("id", "howMany");

        submit.style.setProperty("margin", "10px");
        lower_limit.style.setProperty("margin", "10px");
        upper_limit.style.setProperty("margin", "10px");
        how_many.style.setProperty("margin", "10px");

        r.appendChild(lower_limit);
        r.appendChild(upper_limit);
        r.appendChild(how_many);
        
        // Collect number of decimals for floats
        if ( operation == "float" ) {
            var precision = document.createElement('INPUT');

            increment();

            precision.setAttribute("type", "number");
            precision.setAttribute("placeholder", "Precision"); 
            precision.setAttribute("name", "textelement_" + i);
            precision.setAttribute("id", "precisionField");

            precision.style.setProperty("margin", "10px");

            r.appendChild(precision);
        }

        r.appendChild(submit);
        r.setAttribute("id", "parameterSpan");

        if ( operation == "integer" ) {
            document.getElementById("formInteger").appendChild(r);
        }
        else {
            document.getElementById("formFloat").appendChild(r);
        }        
    }

    else if ( operation == "coin_toss" || operation == "fraction" ) {
        var r = document.createElement('span');
        var how_many = document.createElement('INPUT'); // how many
        var submit = document.createElement("INPUT");
        submit.setAttribute("type", "submit");
      
        increment();
        
        how_many.setAttribute("type", "number");
        how_many.setAttribute("placeholder", "How Many"); // Lower limit
        how_many.setAttribute("name", "textelement_" + i);
        how_many.setAttribute("id", "howMany");

        increment();

        submit.style.setProperty("margin", "10px");
        how_many.style.setProperty("margin", "10px");
    
        r.appendChild(how_many);

        // Collect number of decimals for floats
        if ( operation == "fraction" ) {
            var precision = document.createElement('INPUT');

            increment();

            precision.setAttribute("type", "number");
            precision.setAttribute("placeholder", "Precision"); 
            precision.setAttribute("name", "textelement_" + i);
            precision.setAttribute("id", "precisionField");
            precision.style.setProperty("margin", "10px");

            r.appendChild(precision);
        }

        r.appendChild(submit);
        r.setAttribute("id", "parameterSpan");

        if ( operation == "coin_toss" ) {
            document.getElementById("formCoinToss").appendChild(r); 
        }
        else {
            document.getElementById("formFraction").appendChild(r); 
        }
    }

    else if ( operation == "n_digit_int" || operation == "n_digit_binary" ) {

        // First we need to get the lower and upper bounds
        var r = document.createElement('span');
        var n_value = document.createElement('INPUT'); // length of integer / binary
        var how_many = document.createElement('INPUT'); // How many random ints to create within the range

        var submit = document.createElement("INPUT");
        submit.setAttribute("type", "submit");
    
        increment();

        n_value.setAttribute("type", "number");
        n_value.setAttribute("placeholder", "N"); // N number of digits
        n_value.setAttribute("name", "textelement_" + i);
        n_value.setAttribute("id", "nValue");
        
        increment();
        
        how_many.setAttribute("type", "number");
        how_many.setAttribute("placeholder", "How Many"); // Lower limit
        how_many.setAttribute("name", "textelement_" + i);
        how_many.setAttribute("id", "howMany");

        increment();

        submit.style.setProperty("margin", "10px");
        n_value.style.setProperty("margin", "10px");
        how_many.style.setProperty("margin", "10px");
    
        r.appendChild(n_value);
        r.appendChild(how_many);
        r.appendChild(submit);
        r.setAttribute("id", "parameterSpan");

        if ( operation == "n_digit_int" ) {
            document.getElementById("formNDigitInt").appendChild(r);
        }
        else {
            document.getElementById("formNDigitBinary").appendChild(r);
        }
    }
    else {
        alert("Invalid Operation!");
    }
}


function generateInt(event) {
    /*
    Sends a POST request (via an AJAX call) to the python backend and fetches a random integer between
    the upper and lower limits
    */

    event.preventDefault(); // won't update the url, or go to a new page on submit

    var ll = document.getElementById('lowerLimitField').value;
    var ul = document.getElementById('upperLimitField').value;
    var how_many = document.getElementById('howMany').value;

    ll = parseInt(ll);
    ul = parseInt(ul);
    how_many = parseInt(how_many);

    var xml = new XMLHttpRequest();

    xml.open("POST", "/funcInteger", true);
    // passing true to make the process asynchronous

    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xml.onload = function() {
        // Gets executed once python sends a response (aka the numbers)
        var dataReply = JSON.parse(this.responseText);
        generatedNums = dataReply["numbers"];
        updateOutput(generatedNums);
    };

    dataSend = {
        "lowerLimit" : ll,
        "upperLimit" : ul,
        "howMany" : how_many
        };
    
    xml.send(JSON.stringify(dataSend)); // sends the JSON file as 1 single string
}


function generateFloat(event) {
    event.preventDefault();

    var ll = document.getElementById('lowerLimitField').value;
    var ul = document.getElementById('upperLimitField').value;
    var how_many = document.getElementById('howMany').value;
    var precision = document.getElementById('precisionField').value;

    ll = parseInt(ll);
    ul = parseInt(ul);
    how_many = parseInt(how_many);
    precision = parseInt(precision);
    
    var xml = new XMLHttpRequest();
    xml.open("POST", "/funcFloat", true);
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    xml.onload = function() {    
        var dataReply = JSON.parse(this.responseText);
        generatedNums = dataReply["numbers"];
        updateOutput(generatedNums);
    };

    dataSend = {
        "lowerLimit" : ll,
        "upperLimit" : ul,
        "howMany" : how_many,
        "precision" : precision
        };
    
    xml.send(JSON.stringify(dataSend));
}


function generateCoinToss(event) {
    event.preventDefault();

    var how_many = document.getElementById('howMany').value;
    how_many = parseInt(how_many);

    var xml = new XMLHttpRequest();
    xml.open("POST", "/funcCoinToss", true);
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xml.onload = function() {
        var dataReply = JSON.parse(this.responseText);
        generatedNums = dataReply["numbers"];
        updateOutput(generatedNums);
    };

    dataSend = {
        "howMany" : how_many
        };

    xml.send(JSON.stringify(dataSend));
}


function generateNDigitInt(event) {
    event.preventDefault(); 

    var n_value = document.getElementById('nValue').value;
    var how_many = document.getElementById('howMany').value;

    n_value = parseInt(n_value);
    how_many = parseInt(how_many);
    
    var xml = new XMLHttpRequest();
    xml.open("POST", "/funcNDigitInt", true);
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xml.onload = function() {
        var dataReply = JSON.parse(this.responseText);
        generatedNums = dataReply["numbers"];
        updateOutput(generatedNums);
    };

    dataSend = {
        "nValue" : n_value,
        "howMany" : how_many
        };
        
    xml.send(JSON.stringify(dataSend));
}


function generateFraction(event) {
    event.preventDefault(); 

    var how_many = document.getElementById('howMany').value;
    var precision = document.getElementById('precisionField').value;

    how_many = parseInt(how_many);
    precision = parseInt(precision);
    
    var xml = new XMLHttpRequest();
    xml.open("POST", "/funcFraction", true);
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xml.onload = function() {
        var dataReply = JSON.parse(this.responseText);
        generatedNums = dataReply["numbers"];
        updateOutput(generatedNums);
    };

    dataSend = {
        "howMany" : how_many,
        "precision" : precision
        };
        
    xml.send(JSON.stringify(dataSend));
}

function generateNDigitBinary(event) {
    event.preventDefault(); 

    var n_value = document.getElementById('nValue').value;
    var how_many = document.getElementById('howMany').value;

    n_value = parseInt(n_value);
    how_many = parseInt(how_many);
    
    var xml = new XMLHttpRequest();
    xml.open("POST", "/funcNDigitBinary", true);
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xml.onload = function() {
        var dataReply = JSON.parse(this.responseText);
        generatedNums = dataReply["numbers"];
        updateOutput(generatedNums);
    };

    dataSend = {
        "nValue" : n_value,
        "howMany" : how_many
        };
        
    xml.send(JSON.stringify(dataSend)); // sends the JSON file as 1 single string
}


function updateOutput(generatedNums) {
    /*
    Takes an array of integers and adds them to the output field
    */
    

    // Everytime the output gets updated, we need to refresh the text in the copy button
    document.getElementById('clipboardCopy').innerHTML = "Copy";

    howMany = generatedNums.length;
    for ( var i = 0; i < howMany; i++ ) {
        numberOfNumbersGenerated += 1;
        numbers.push(generatedNums[i]);
    }

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


document.getElementById('clipboardCopy').addEventListener('click', clipboardCopy);
async function clipboardCopy() {
    var text = "";

    for ( var i = 0; i < numberOfNumbersGenerated; i++ ) {
        text += numbers[i];
        if ( i != numberOfNumbersGenerated - 1 ) {
            text += " ";
        }
    }

    console.log(text);
    await navigator.clipboard.writeText(text);
    document.getElementById('clipboardCopy').innerHTML = "Copied!";
}