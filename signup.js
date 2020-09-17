
var submit = document.getElementById("signup");

submit.addEventListener("click",function()
{ 
        var passw= /^(?=.*[0-9])(?=.*[()*])[a-zA-Z0-9!@#$%^&*]{4,6}$/;
        var inputUsername= document.getElementById("signup_name");
        var inputPassword= document.getElementById("signup_password");
        if (inputPassword.value.match(passw))
        {
        
        
        var name=JSON.parse(localStorage.getItem("name"));
        if(name==null)
                name=[];
        name.push(inputUsername.value);
        localStorage.setItem("name", JSON.stringify(name));
        
         
       
       var password=JSON.parse(localStorage.getItem("password"));
       if(password==null)
                password=[];
        password.push(inputPassword.value)
        localStorage.setItem("password", JSON.stringify(password));
       
       
        }   
       
});


