// NOTE!: Something wrong with this code. Incorrect final target

function smoothScroll( target, duration ) {
    var target = document.querySelector(target);

    var targetPosition = target.getBoundingClientRect().top; 
    var startPosition = window.pageYOffset; // The coordinate of the top of what the user sees

    var distance = targetPosition - startPosition;
    var startTime = null;   

    function animation( currentTime ) {
        if ( startTime == null ) {
            startTime = currentTime;
            
        }
        var timeElapsed = currentTime - startTime;
        var run = ease( timeElapsed, startPosition, distance, duration );
        window.scrollTo(0,run); // First argument = 0, since we only want to scroll along the y axis
        if ( timeElapsed < duration ) {
            requestAnimationFrame(animation);
        }

    }

    function ease(t,s,c,d) {
        /*
        t = Time Elapsed
        s = Start Position
        c = Distance
        d = Duration

        */
        t /= d / 2;
        if ( t < 1 ) {
            return c / 2 * t * t + s;
        }
        t--;
        return -c / 2 * (t * (t - 2) - 1) + s;
    }

    // This is used to update the animation onscreen
    // Will loop through animation() about 60 times per second
    requestAnimationFrame(animation); 
}

// var tp_usage = document.querySelector('#tp_nav_usage');
// var tp_about = document.querySelector('#tp_nav_about'); // Uncomment this for scroll to work

// If the user clicks, run the function given below
// tp_usage.addEventListener('click', function() {
//     smoothScroll('#tp_usage', 1000);

// });

// tp_about.addEventListener('click', function() {
//     smoothScroll('#tp_usage', 1000);
// })