
 function validateUser() 
{ 
var inputName = document.getElementById("login_name");
var inputPassword = document.getElementById("login_password");    
var passw= /^(?=.*[0-9])(?=.*[()*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
var storedName = localStorage.getItem("name");
var storedPassword = localStorage.getItem("password");
//console.log(inputPassword.value.match(passw));
console.log((storedName.includes(inputName.value)));
console.log(storedPassword.includes(inputPassword.value));
//inputPassword.value.match(passw)
if(inputPassword.value.match(passw) && storedName.includes(inputName.value) && storedPassword.includes(inputPassword.value))
{
   console.log("something");
   window.location.href="expenseTracker.html";
}
else
{
    console.log("wrong");
    
}
return false;
}