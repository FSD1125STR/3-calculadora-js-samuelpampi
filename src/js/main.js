//Maneja las teclas de los numeros
function clickNumber(button){
    console.log("Se ha pulsado un numero: " + button.textContent);
}

//Maneja las teclas de los operadores
function clickOperator(button){
    console.log("Se ha pulsado un operador: " + button.textContent);
}

//Maneja las teclas de los comandos
function clickCommand(button){
    console.log("Se ha pulsado un comando: " + button.textContent);
}

//Esta funcion manejará los clicks diferenciando entre botones
function handleClick(elementButton){
    //Botones que simbolizan un operador
    const operadores = ["btn-div", "btn-mult", "btn-subs", "btn-add", "btn-module"] 
    //Botones que simbolizan una operacion especial
    const specialbuttons = ["btn-del", "btn-reset", "btn-sign", "btn-decimal", "btn-result"];

    const numbers = Array(10).fill().map((_, i) => `btn-${i}`);

    //Analizamos que tecla ha pulsado para poder manejarla
    if(numbers.includes(elementButton.id)) clickNumber(elementButton);
    else if(operadores.includes(elementButton.id)) clickOperator(elementButton);
    else if(specialbuttons.includes(elementButton.id)) clickCommand(elementButton);    
}

//Inicia los eventos principales para capturar los clicks de los botones
function addEvents(){
    //Recupero todos los botones en forma de array
    var buttons = Array.from(document.getElementsByClassName("button")); 

    //Recorro todo el array de botones para añadir un evento que maneje los clicks
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            handleClick(button); //Cuando se hace click se envia a un manejador de eventos
        });
    });

}

addEventListener("DOMContentLoaded", (event) => { 
    addEvents();
});
