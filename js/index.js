const code = "123";

function submitForm(event){
event.preventDefault();
let input = document.getElementById("code-entered").value;
let message;
if(input === code){
    window.location.replace("./home.html");
}
else{
    message = "Invalid code";
    document.getElementById("error-message").innerHTML = message;
}
console.log(input);
}