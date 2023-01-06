// Registration Form
const formOne = document.getElementById("formOne");
const name = document.getElementById("name");
const username = document.getElementById("username");
const password = document.getElementById("password");
const verfy_spassword = document.getElementById("verfy-password");
const reset = document.getElementById("reset");

formOne.addEventListener('click', (e)=>{
    e.preventDefault();

    if(name.value == "" || name.value.length < 3){
        alert("invalid Name");
    }
    else if(username.value == "" || username.value.length < 8){
        alert("invalid username");
    }
    else if(password.value == "" && verfy_spassword.value == ""){
        alert("Password should not be blank")
    }
    else if(password.value.length < 8 && verfy_spassword.value.length < 8){
        alert("Password should not be less than 8 char")
    }
    else if(password.value != verfy_spassword.value){
        alert("password does not match")
    }
    else{
        console.log("Form Submitted");
    }
})


// Login Form
const formTwo = document.getElementById("formTwo");
const loginUsername = document.getElementById("loginUsername");
const LoginPassword = document.getElementById("LoginPassword");

formTwo.addEventListener('click', (e)=>{
    e.preventDefault();
    
    if(loginUsername.value == ""){
        alert("Username Should not be blank");
    }
    else if(LoginPassword.value == ""){
        alert("Password Should not be blank")
    }
    else{
        alert("Login Sucessfully")
    }
})