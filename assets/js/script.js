/*index.html Global Constants */
const welcomeArea = document.getElementById('welcomeArea');
const nameRequest = document.getElementById('nameRequest');

//Goal: Get name input of user
let username = document.getElementById('nameField')

nameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    username = event.target[0].value;
    nameRequest.classList.add('hide');
    welcomeArea.classList.remove('hide');
    document.document.getElementById('welcomeArea').innerHTML = "Welcome, " + username + "!" + "<br>" + "Click on the middle button to get to the Radical Quiz!" + "<br>" + "Click on the middle button to get to the Kanji Quiz!"; 
});
//Goal: Make fox call the user by name



//Optional goal: Create multiple text boxes

//Goal: Save associations of users for radicals

//Goal: Save association in array

//Goal: Change radical for question

//Goal: Create radical array

//Goal: Display feedback site

//Goal: Save association of users for kanji

//Goal: Save association in array

//Goal: Change kanji for question

//Goal: Create 10 kanji arrays

//Goal: Display feedback site