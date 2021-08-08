# Truly-Random
Generate true Random Numbers using the Hadamard  Quantum Gate


====================

## Work in Progress!

====================

<br>
<br>
<br>

### Resources

Background Images by <br>
<a href="https://pixabay.com/users/insspirito-1851261/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1280081">Garik Barseghyan (insspirito)</a>
<br>
<a href="https://pixabay.com/users/thedigitalartist-202249/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1147253">Pete Linforth</a>
<br>
<a href="https://pixabay.com/users/elchinator-10722855/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4711302">Elchinator</a>
<br>
<a href="https://pixabay.com/users/lumina_obscura-4128746/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3608029">Lumina Obscura</a>
<br>
<a href="https://pixabay.com/users/wikiimages-1897/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=74005">Deutsch</a>


<!-- 
Other Resources:
http://www.gizma.com/easing/
https://www.youtube.com/watch?v=oUSvlrDTLi4

 -->





 

Make note of all the requirements and project components (For example python version, flask version, etc)

If the server is not updating, perform hard refresh (ctrl + shift + r)

Example of filter query

form.opts.query = Choice.query.filter( Choice.id > 1 )


Resources
https://qiskit.org/documentation/index.html


Other similar projects:
https://www.random.org/ (But uses Atmospheric Noise to generate random numbers)





To Do:
https://www.youtube.com/watch?v=r-xe8XJqy7U
Add media queries (end part of this vid) Also, Choose an Operation is not aligned properly
Add go to the top option
Reconfirm image credits, pixabay
Remove link to Ion Icon and make the entire project independent of external scripts (Ion Icon not working)
Fix navbar tp
option to generate .csv file with random numbers
create a statistics.html page to compare the quantum random numbers with the numbers
generated using the normal random library in python
Make comparison with python's random library, and this Quantum RNG
Use Chi Squared Test in Statistics to test for authenticity of our app
Print QUantum Circuit option
delete rng.js (not used)

JS runs on client side (web browser), but python needs a server to run. So we need to incorporate 
a database anyways (with flask_wtf). Create a system that flushes the db every 5 minutes or so
to prevent memory overload.
Document properly with a process diagram


Add feature to copy / open numbers in new page as raw data / download as csv
Add feature to set the number of numbers to generate 
(instead of pressing "generate!" button 5 times, let the user set val = 5)

Create a main.js and use that
Handle all warnings
Put restriction for text fields as integers / floats only (no alphabets)

