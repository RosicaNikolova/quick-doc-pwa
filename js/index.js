const code = "123";

function submitForm(event){
event.preventDefault();
console.log("submit");
let input = document.getElementById("code-entered").value;
let message;
if(input === code){
    console.log(code);
    window.location.replace("./home.html");
}
else{
    message = "Invalid code";
    document.getElementById("error-message").innerHTML = message;
}
console.log(input);
}