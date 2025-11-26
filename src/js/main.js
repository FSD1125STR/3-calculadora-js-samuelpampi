const display = document.getElementById("screen-current");
var allowOperator = false;

//Maneja las teclas de los numeros
function clickNumber(button){
    console.log("Se ha pulsado un numero: " + button.textContent);

    //Añadimos el numero al display
    display.textContent = display.textContent + button.textContent;
    allowOperator = true; //Reiniciamos para saber que se puede escribir un operador
}

//Maneja las teclas de los operadores
function clickOperator(button){
    
    console.log("Se ha pulsado un operador: " + button.textContent);

    //Comprobamos si se ha añadido un operador
    if(allowOperator){
        //Se puede escribir un operador porque no se ha escrito ninguno justo antes
        //Añadimos el operador al display
        display.textContent = display.textContent + button.textContent;
        allowOperator = false;

    } else{
        //No se puede escribir un operador porque se ha escrito uno justo antes -> Lo sustituimos por el nuevo
        display_array = Array.from(display.textContent);
        //Cambiamos el ultimo operador por el nuevo
        display_array.pop()
        display_array.push(button.textContent);
        //Convertimos el array a string nuevamente y lo metemos en el display
        new_display_text = display_array.join("");
        display.textContent = new_display_text

    }
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
