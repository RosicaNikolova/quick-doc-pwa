
function onIconClick(event){
    //console.log(event.target.id);
    let icons = document.querySelectorAll('i');
   // console.log(icons[1]);
    value = event.target.id;
    icons.forEach(element => {
        if(element.id != value){
            console.log(value);
            element.style.color = "grey";
            
        }
        if(element.id === value){
            element.style.color = "#0957DE";
        }
    });
}