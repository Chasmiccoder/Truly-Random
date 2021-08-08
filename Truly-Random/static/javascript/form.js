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
    // change variable name of e to currentOp


    if ( previous != e ) {
        // alert(previous);
        if ( previous == "integer" ) {
            var parent = document.getElementById("formInteger");
            parent.removeChild( document.getElementById("parameterSpan") );
            parent.removeChild( document.getElementById("id_submitButton") );
        }

        if ( previous == "float" ) {
            var parent = document.getElementById("formFloat");
            parent.removeChild( document.getElementById("parameterSpan") );
            parent.removeChild( document.getElementById("id_submitButton") );
        }

        if ( previous == "coin_toss" ) {
            var parent = document.getElementById("formCoinToss");
            parent.removeChild( document.getElementById("parameterSpan") );
            parent.removeChild( document.getElementById("id_submitButton") );
        }

        if ( previous == "n_digit_int" ) {
            var parent = document.getElementById("formNDigitInt");
            parent.removeChild( document.getElementById("parameterSpan") );
            parent.removeChild( document.getElementById("id_submitButton") );
        }

        if ( previous == "fraction" ) {
            var parent = document.getElementById("formFraction");
            parent.removeChild( document.getElementById("parameterSpan") );
            parent.removeChild( document.getElementById("id_submitButton") );
        }

        if ( previous == "n_digit_binary" ) {
            var parent = document.getElementById("formNDigitBinary");
            parent.removeChild( document.getElementById("parameterSpan") );
            parent.removeChild( document.getElementById("id_submitButton") );
        }

        // remove this entire if else series and use generateParameterForm directly using the value in string e
        if ( e == "coin_toss" ) {
            generateParameterForm(e, "generateCoinToss()");
        }

        else if ( e == "integer" ) {
            // fetchInteger();
            generateParameterForm(e,"generateInt()" );
        }

        else if ( e == "float" ) {
            generateParameterForm(e, "generateFloat()" );
        }

        else if ( e == "n_digit_int" ) {
            generateParameterForm(e, "generateNDigitInt()" );
        }

        else if ( e == "fraction" ) {
            generateParameterForm(e, "generateFraction()" );
        }

        else if ( e == "n_digit_binary" ) {
            generateParameterForm(e, "generateNDigitBinary()" );
        }
    
        previous = e;

        
    }

}


function generateParameterForm(operation, functionPassed) {
    /*
    generates the parameter form for each type of operation
    For integer and float generation, it generates 3 fields: 
    lower limit, upper limit and the number of numbers to be generated
    
    For Coin Toss and Fraction, it generates 1 field for the number of coin tosses / fractional nums generated
    For n digit int and binary, it generates 2 fields for: n, number of numbers

    */

    if ( operation == "integer" || operation == "float" ) {

        // First we need to get the lower and upper bounds
        var r = document.createElement('span'); // root?
        var lower_limit = document.createElement('INPUT'); // lower limit
        var upper_limit = document.createElement('INPUT'); // lower limit
        var how_many = document.createElement('INPUT'); // How many random ints to create within the range

        increment();

        lower_limit.setAttribute("type", "text");
        lower_limit.setAttribute("placeholder", "Lower Limit"); // Lower limit
        lower_limit.setAttribute("name", "textelement_" + i);
        lower_limit.setAttribute("id", "lowerLimitField");
        
        increment();

        upper_limit.setAttribute("type", "text");
        upper_limit.setAttribute("placeholder", "Upper Limit");
        upper_limit.setAttribute("name", "textelement_" + i);
        upper_limit.setAttribute("id", "upperLimitField");

        increment();
        
        how_many.setAttribute("type", "text");
        how_many.setAttribute("placeholder", "How Many"); // Lower limit
        how_many.setAttribute("name", "textelement_" + i);
        how_many.setAttribute("id", "howMany");

        increment();
    
    
        r.appendChild(lower_limit);
        r.appendChild(upper_limit);
        r.appendChild(how_many);
        // r.setAttribute("id", "id_" + i); // redundant
        r.setAttribute("id", "parameterSpan");

        if ( operation == "integer" ) {
            document.getElementById("formInteger").appendChild(r);
        }
        else {
            document.getElementById("formFloat").appendChild(r);
        }



        var r2 = document.createElement('span');
        // submit
        var sub = document.createElement("INPUT");
        sub.setAttribute("type", "submit");
        
        increment();
        sub.setAttribute("name", "textelement_" + i);
        sub.setAttribute("onsubmit", functionPassed); // line may not be needed


        r2.appendChild(sub);

        r2.setAttribute("id", "id_submitButton");

        // increment()
        if ( operation == "integer" ) {
            document.getElementById("formInteger").appendChild(r2);
        }
        // Float
        else {
            document.getElementById("formFloat").appendChild(r2);
        }
        
    }

    else if ( operation == "coin_toss" || operation == "fraction" ) {
        var r = document.createElement('span');
        var how_many = document.createElement('INPUT'); // how many

        increment();
        
        how_many.setAttribute("type", "text");
        how_many.setAttribute("placeholder", "How Many"); // Lower limit
        how_many.setAttribute("name", "textelement_" + i);
        how_many.setAttribute("id", "howMany");

        increment();
    
        r.appendChild(how_many);
        // r.setAttribute("id", "id_" + i);
        r.setAttribute("id", "parameterSpan");

        if ( operation == "coin_toss" ) {
            document.getElementById("formCoinToss").appendChild(r); 
        }
        else {
            document.getElementById("formFraction").appendChild(r); 
        }
        

        var r2 = document.createElement('span');
        // submit
        var sub = document.createElement("INPUT");
        sub.setAttribute("type", "submit");
        
        increment();
        sub.setAttribute("name", "textelement_" + i);
        sub.setAttribute("onsubmit", functionPassed);

        r2.appendChild(sub);

        // increment()
        r2.setAttribute("id", "id_submitButton");

        if ( operation == "coin_toss" ) {
            document.getElementById("formCoinToss").appendChild(r2); 
        }
        else {
            document.getElementById("formFraction").appendChild(r2); 
        }
        

    }

    else if ( operation == "n_digit_int" || operation == "n_digit_binary" ) {

        // First we need to get the lower and upper bounds
        var r = document.createElement('span');
        var n_value = document.createElement('INPUT'); // length of integer / binary
        var how_many = document.createElement('INPUT'); // How many random ints to create within the range

        increment();

        n_value.setAttribute("type", "text");
        n_value.setAttribute("placeholder", "N"); // N number of digits
        n_value.setAttribute("name", "textelement_" + i);
        n_value.setAttribute("id", "nValue");
        
        increment();
        
        how_many.setAttribute("type", "text");
        how_many.setAttribute("placeholder", "How Many"); // Lower limit
        how_many.setAttribute("name", "textelement_" + i);
        how_many.setAttribute("id", "howMany");

        increment();
    
        r.appendChild(n_value);
        r.appendChild(how_many);
        r.setAttribute("id", "parameterSpan");

        if ( operation == "n_digit_int" ) {
            document.getElementById("formNDigitInt").appendChild(r);
        }
        else {
            document.getElementById("formNDigitBinary").appendChild(r);
        }
        

        var r2 = document.createElement('span');
        var sub = document.createElement("INPUT");
        sub.setAttribute("type", "submit");
        
        increment();
        sub.setAttribute("name", "textelement_" + i);
        sub.setAttribute("onsubmit", functionPassed); // redundant?


        r2.appendChild(sub);

        // increment()
        r2.setAttribute("id", "id_submitButton");

        if ( operation == "n_digit_int" ) {
            document.getElementById("formNDigitInt").appendChild(r2); 
        }
        else {
            document.getElementById("formNDigitBinary").appendChild(r2); 
        }
    
    }

    else {
        alert("Invalid Operation!");
    }
}




// const form = document.getElementById('mainform');
// form.onsubmit = displayNumber;

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


function generateInt(event) {
    /*
    Sends a POST request (using AJAX) to the python backend and fetches a random integer between
    the upper and lower limits
    */

    event.preventDefault(); // won't update the url / go to a new page on submit

    var ll = document.getElementById('lowerLimitField').value;
    var ul = document.getElementById('upperLimitField').value;
    var how_many = document.getElementById('howMany').value;

    ll = parseInt(ll);
    ul = parseInt(ul);
    how_many = parseInt(how_many);
    
    // Use AJAX to make a post request to python backend and fetch n random numbers
    // Create field to accept n (number of numbers to generate in one single backend call)

    // generateInt(ll, ul, how_many);

    var xml = new XMLHttpRequest();

    // xml.open("POST", "{{url_for(func)}} ", true); // func is name of function that fetches integer
    xml.open("POST", "/funcInteger", true);
    // passing true to make the process asynchronous

    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xml.onload = function() {
        // alert("REACHED");
        // this is where we fetch the data from the back end
        var dataReply = JSON.parse(this.responseText);
        // console.log(dataReply);
        // alert("RandInt: " + dataReply["numbers"]);
        generatedNums = dataReply["numbers"];
        updateOutput(generatedNums);
    }; // endfunction


    dataSend = {
        "lowerLimit" : ll,
        "upperLimit" : ul,
        "howMany" : how_many
        };
        
    // this is where we send the upper and lower limits


    xml.send(JSON.stringify(dataSend)); // sends the JSON file as 1 single string
}


function generateFloat(event) {
    /*
    Sends a POST request (using AJAX) to the python backend and fetches a random integer between
    the upper and lower limits
    */

    event.preventDefault();

    var ll = document.getElementById('lowerLimitField').value;
    var ul = document.getElementById('upperLimitField').value;
    var how_many = document.getElementById('howMany').value;

    ll = parseInt(ll);
    ul = parseInt(ul);
    how_many = parseInt(how_many);
    
    var xml = new XMLHttpRequest();

    xml.open("POST", "/funcFloat", true);
    // passing true to make the process asynchronous

    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xml.onload = function() {
        // alert("REACHED");
        // this is where we fetch the data from the back end
        var dataReply = JSON.parse(this.responseText);
        // console.log(dataReply);
        // alert("RandInt: " + dataReply["numbers"]);
        generatedNums = dataReply["numbers"];
        updateOutput(generatedNums);
    }; // endfunction


    dataSend = {
        "lowerLimit" : ll,
        "upperLimit" : ul,
        "howMany" : how_many
        };
        
    // this is where we send the upper and lower limits

    xml.send(JSON.stringify(dataSend)); // sends the JSON file as 1 single string
}


function generateCoinToss(event) {
    /*
    Sends a POST request (using AJAX) to the python backend and performs n coin tosses
    */

    event.preventDefault();

    var how_many = document.getElementById('howMany').value;

    how_many = parseInt(how_many);
    

    var xml = new XMLHttpRequest();

    xml.open("POST", "/funcCoinToss", true);
    // passing true to make the process asynchronous

    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xml.onload = function() {
        
        var dataReply = JSON.parse(this.responseText);
        
        generatedNums = dataReply["numbers"];
        updateOutput(generatedNums);
    }; // endfunction


    dataSend = {
        "howMany" : how_many
        };
        
    // this is where we send the upper and lower limits


    xml.send(JSON.stringify(dataSend)); // sends the JSON file as 1 single string
}


function generateNDigitInt(event) {
    /*
    Sends a POST request (using AJAX) to the python backend and fetches a random integer between
    the upper and lower limits
    */

    event.preventDefault(); // won't update the url / go to a new page on submit

    var n_value = document.getElementById('nValue').value;
    var how_many = document.getElementById('howMany').value;

    n_value = parseInt(n_value);
    how_many = parseInt(how_many);
    
    var xml = new XMLHttpRequest();

    xml.open("POST", "/funcNDigitInt", true);
    // passing true to make the process asynchronous

    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xml.onload = function() {
       
        var dataReply = JSON.parse(this.responseText);
        
        generatedNums = dataReply["numbers"];
        updateOutput(generatedNums);
    }; // endfunction


    dataSend = {
        "nValue" : n_value,
        "howMany" : how_many
        };
        
    // this is where we send the upper and lower limits


    xml.send(JSON.stringify(dataSend)); // sends the JSON file as 1 single string
}


function generateFraction(event) {
    /*
    Sends a POST request (using AJAX) to the python backend and fetches floats between 0 and 1
    */

    event.preventDefault(); // won't update the url / go to a new page on submit

    var how_many = document.getElementById('howMany').value;

    how_many = parseInt(how_many);
    
    // Use AJAX to make a post request to python backend and fetch n random numbers
    // Create field to accept n (number of numbers to generate in one single backend call)

    // generateInt(ll, ul, how_many);

    var xml = new XMLHttpRequest();

    // xml.open("POST", "{{url_for(func)}} ", true); // func is name of function that fetches integer
    xml.open("POST", "/funcFraction", true);
    // passing true to make the process asynchronous

    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xml.onload = function() {
        
        var dataReply = JSON.parse(this.responseText);
        
        generatedNums = dataReply["numbers"];
        updateOutput(generatedNums);
    }; // endfunction


    dataSend = {
        "howMany" : how_many
        };
        
    // this is where we send the upper and lower limits


    xml.send(JSON.stringify(dataSend)); // sends the JSON file as 1 single string
}

function generateNDigitBinary(event) {
    /*
    Sends a POST request (using AJAX) to the python backend and fetches a random integer between
    the upper and lower limits
    */

    event.preventDefault(); // won't update the url / go to a new page on submit

    var n_value = document.getElementById('nValue').value;
    var how_many = document.getElementById('howMany').value;

    n_value = parseInt(n_value);
    how_many = parseInt(how_many);
    
    var xml = new XMLHttpRequest();

    xml.open("POST", "/funcNDigitBinary", true);
    // passing true to make the process asynchronous

    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xml.onload = function() {
       
        var dataReply = JSON.parse(this.responseText);
        
        generatedNums = dataReply["numbers"];
        updateOutput(generatedNums);
    }; // endfunction


    dataSend = {
        "nValue" : n_value,
        "howMany" : how_many
        };
        
    // this is where we send the upper and lower limits


    xml.send(JSON.stringify(dataSend)); // sends the JSON file as 1 single string
}





function updateOutput(generatedNums) {
    /*
    Takes an array of integers and adds them to the output field
    */
    // alert("REACHED!");
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