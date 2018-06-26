//Questionn array

const questions = [
    {question: "Enter Your first name"},
    {question: "Enter Your last name"},
    {question: "Enter Your email", pattern: /\S+@\S+\.\S+/},
    {question: "Create a Pssword", type: "password"},
];

//Transition time
const shakeTime = 100; //shake transition time
const switchTime = 200; // transition between questions

// Initialize Position at First question
let position = 0;

//Init DOM elements;
const formBox = document.querySelector("#form-box");
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const inputGroup = document.querySelector("#input-group");
const inputField = document.querySelector("#input-field");
const inputLabel = document.querySelector("#input-label");
const inputProgress = document.querySelector("#input-progress");
const progress = document.querySelector("#progress-bar");

//EVENTS

//Get question on DOM Load
document.addEventListener("DOMContentLoaded", getQuestion);


//Next Button Click
nextBtn.addEventListener("click", validate);

//Input field enter click

inputField.addEventListener("keyup", e => {
    if(e.keyCode == 13){
        validate();
    }
});
//FUNCTIONS

// Get questions from array 
// and add to mark up
function getQuestion(){
    inputLabel.innerHTML = questions[position].question;
    
    //Get Current type
    inputField.type = questions[position].type || "text";
    
    //Get current answer
    inputField.value = questions[position].answer || "";

    //Focus on element
    inputField.focus();

    //Set progress bar width - variable to the questions length
    progress.style.width = (position * 100)/ questions.length + "%";

    //Add user icon on OR Back arrow depending on question
    prevBtn.className = position ? 'fas fa-arrow-left': 'fas fa-user';

    showQuestion();
}

// Display question to user
function showQuestion(){
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = "";
    inputProgress.style.width = "100%";
}

// Hide question from user
function hideQuestion(){
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = "none";
    inputGroup.style.border = null;

}

// Transform to Create shake motion
function transform(x, y){
    formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate field
function validate(){
    // Make sure pattern matches if there is one
    if(!inputField.value.match (questions[position].pattern || /.+/)){
        inputFail();
    }else{
        inputPass();
    }
}

// Field input fail
function inputFail(){
    formBox.className = 'error';

    //Repeat shake motion - set i to number of shakes
    for(let i=0; i < 6; i ++){
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 -1)* 20, 0);
        setTimeout(transform, shakeTime * 6, 0, 0);
        inputField.focus();
    
    }
}

// Field input pass
function inputPass(){
    formBox.className = "";
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    //Store answers in array

    questions[position].answer = inputField.value;
    //Increment the position
    position ++;

    //if new question, Hide current and get next
    if(questions[position]){
        hideQuestion();
        getQuestion();
    }else{
        // Remove if no question
        hideQuestion();
        formBox.className = "close";
        progress.style.width = "100%";

        //Form complete
        formComplete();
    }

}

//All fields complete - show h1 end
function formComplete(){
    console.log(questions);
    const h1 = document.createElement("h1");
    h1.classList.add("end");
    h1.appendChild(document.createTextNode(
        `Thanks 
        ${questions[0].answer
        } You are registered and will get an email shortly `
    )
);
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => (h1.style.opacity = 1), 50);
    }, 1000);
}