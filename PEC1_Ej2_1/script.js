const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const age = document.getElementById('age');
const url = document.getElementById('url');


function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkEmail(email) {
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(res.test(email.value.trim())){
        showSuccess(email);
    } else {
        showError(email, 'Email is not valid');
    }
}

function checkRequired(inputArr) {
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input)
        }
    });
}

function checkLength(input, min, max) {
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

function checkPasswordMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Passwords do not match');
    }
}

function checkAge(ageInput){
    if(ageInput.value < 0){
        showError(ageInput, `${getFieldName(ageInput)} must be at least 0`);
    } else if(ageInput.value > 999) {
        showError(ageInput, `${getFieldName(ageInput)} must be less than 999`);
    }
}

function checkAge(ageInput){
    if(ageInput.value < 0){
        showError(ageInput, `${getFieldName(ageInput)} must be at least 0`);
    } else if(ageInput.value > 999) {
        showError(ageInput, `${getFieldName(ageInput)} must be less than 999`);
    }
}

function checkUrl(urlInput){
    var res = urlInput.value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res === null){
        showError(urlInput, `Enter a valid url`);
    }
}

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    checkRequired([username, email, password, password2, age, url]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
    checkAge(age);
    checkUrl(url);
});