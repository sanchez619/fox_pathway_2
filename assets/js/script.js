/*index.html Global Constants */
const welcomeArea = document.getElementById('welcomeArea');
const nameRequest = document.getElementById('nameRequest');

//Goal: Get name input of user
let username;

nameRequest.addEventListener('submit', function(event) {
    event.preventDefault();
    username = event.target[0].value;
    if (username !== ''){
    nameRequest.classList.add('hide');
    welcomeArea.classList.remove('hide');
    document.getElementById('welcomeArea').innerHTML = "Welcome, " + username + "!" + "<br>" + "Click on the lower box to get to the Radical Quiz!";
    } else {
        alert('I could not hear you. Could you tell me your name again?');
    }
});