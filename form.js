
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');

const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const mobnumber=document.getElementById('mobnumber')
//Show input error messages
function showError(input, message) {
const formControl = input.parentElement;
formControl.className = 'form-control error';
const small = formControl.querySelector('small');
small.innerText = message;
}

//show success colour
function showSucces(input) {
const formControl = input.parentElement;
formControl.className = 'form-control success';
}

//check email is valid
function checkEmail(input) {
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if(re.test(input.value.trim())) {
showSucces(input)
}else {
showError(input,'Email is not invalid');
}
}


//checkRequired fields
function checkRequired(inputArr) {
inputArr.forEach(function(input){
if(input.value.trim() === ''){
showError(input,`${getFieldName(input)} is required`)
}else {
showSucces(input);
}
});
}

// check phoneNumber
function checkmobnumber(input){
    if(input.value.length!=10) {
        showError(input, `${getFieldName(input)} must be 10 characters`);    
    }else {
        showSucces(input);
        }
}


//check input Length
function checkLength(input, min ,max) {
if(input.value.length < min) {
showError(input, `${getFieldName(input)} must be at least ${min} characters`);
}else if(input.value.length > max) {
showError(input, `${getFieldName(input)} must be les than ${max} characters`);
}else {
showSucces(input);
}
}

//get FieldName
function getFieldName(input) {
return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// check passwords match
function checkPasswordMatch(input1, input2) {
if(input1.value !== input2.value) {
showError(input2, 'Passwords do not match');
}
}


//Event Listeners
form.addEventListener('submit',function(e) {
e.preventDefault();

checkRequired([username, email, password, password2,mobnumber]);
checkLength(username,3,15);
checkLength(password,6,25);
checkEmail(email);
checkPasswordMatch(password, password2);
checkmobnumber(mobnumber);

});

// Password Strengthbar
let passwordInput = document.querySelector('#passwordInput input[type="password"]');
let passwordStrength= document.getElementById('passwordStrength');
let poor = document.querySelector('#passwordStrength #poor');
let weak = document.querySelector('#passwordStrength #weak');
let strong = document.querySelector('#passwordStrength #strong');
let passwordInfo = document.getElementById('passwordInfo');
let poorRegExp = /[a-z]/;
let weakRegExp = /(?=.*?[0-9])/;;
let strongRegExp = /(?=.*?[#?!@$%^&*-])/;
let whitespaceRegExp = /^$|\s+/;
passwordInput.oninput= function(){
 let passwordValue= passwordInput.value;
 let passwordLength= passwordValue.length;
 let poorPassword= passwordValue.match(poorRegExp);
 let weakPassword= passwordValue.match(weakRegExp);
 let strongPassword= passwordValue.match(strongRegExp);
 let whitespace= passwordValue.match(whitespaceRegExp);
if(passwordValue != ""){
passwordStrength.style.display = "block";
passwordStrength.style.display = "flex";
passwordInfo.style.display = "block";
passwordInfo.style.color = "black";
if(whitespace)
{
passwordInfo.textContent = "whitespaces are not allowed";
}else{
poorPasswordStrength(passwordLength, poorPassword, weakPassword, strongPassword);
weakPasswordStrength(passwordLength, poorPassword, weakPassword, strongPassword);
strongPasswordStrength(passwordLength, poorPassword, weakPassword, strongPassword);
}
}else{
passwordStrength.style.display = "none";
passwordInfo.style.display = "none";
}
}
function poorPasswordStrength(passwordLength, poorPassword, weakPassword, strongPassword){
if(passwordLength <= 3 && (poorPassword || weakPassword || strongPassword))
{
poor.classList.add("active");
passwordInfo.style.display = "block";
passwordInfo.style.color = "red";
passwordInfo.textContent = "Your password is too Poor";
passwordInfo.style.marginLeft = "6%";   
}
}
function weakPasswordStrength(passwordLength, poorPassword, weakPassword, strongPassword){
if(passwordLength>= 5 && poorPassword && (weakPassword || strongPassword))
{
weak.classList.add("active");
passwordInfo.textContent = "Your password is Weak";
passwordInfo.style.color = "orange";
passwordInfo.style.marginLeft = "6%";
}else{
weak.classList.remove("active");
}
}
function strongPasswordStrength(passwordLength, poorPassword, weakPassword, strongPassword){
if(passwordLength >= 8 && (poorPassword && weakPassword) && strongPassword)
{
poor.classList.add("active");
weak.classList.add("active");
strong.classList.add("active");
passwordInfo.textContent = "Your password is strong";
passwordInfo.style.color = "green";
passwordInfo.style.marginLeft = "6%";
}else{
strong.classList.remove("active");
}
}
let showHide = document.querySelector('#passwordInput #showHide');
showHide.onclick = function(){
showHidePassword()
}
function showHidePassword(){
if(passwordInput.type == "password"){
passwordInput.type = "text";
showHide.textContent = "HIDE";
showHide.style.color = "green";
}else{
passwordInput.type = "password";
showHide.textContent = "SHOW";
showHide.style.color = "red";
}
}