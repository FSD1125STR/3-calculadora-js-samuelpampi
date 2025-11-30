const display = document.getElementById("screen-current");
const displayPrev = document.getElementById("screen-previous");
const operatorChars = ['÷', '×', '-', '+', '%'];

//Comprueba si es un numero
function isNumber(text){
    return !isNaN(Number(text));
}

//Devuelve el indice del ultimo operador
function lastIndexOfOperator(display_text){
    //Buscamos la ultima aparicion de cualquier operador
    let lastOpIndex = -1;

    for(let operator of operatorChars){
        let index = display_text.lastIndexOf(operator); //Devuelve el ultimo indice del operador
        if(index > lastOpIndex) lastOpIndex = index; //Si está despues, actualizamos para devolver el ultimo
    }

    return lastOpIndex;
}

//Comprueba si es posible escribir una coma
function allowDecimal(display_text){
    //Extraemos el ultimo operador
    let lastOperator = lastIndexOfOperator(display_text);
    
    //El ultimo numero es el que esta despues del ultimo operador
    let currentNumber = display_text.slice(lastOperator + 1);

    return !currentNumber.includes(',');
}

//Comprueba si es posible escribir un operador
function allowOperator(display_text, new_op){
    /**
     * Si el ultimo caracter es un operador no se puede escribir otro operador, al no
     * ser que se intente escribir un - detras de una multiplicacion, division o modulo
     */
    //Extraemos el ultimo operador
    let lastOperator = lastIndexOfOperator(display_text);
    let allow = false;

    //Si el ultimo caracter no es un operador, se puede escribir
    if(lastOperator != (display_text.length - 1)) return true;

    //Si es el ultimo comprobamos el caso de que se quiera escribir un '-' despues de un '+': Caso especial
    if(new_op.id == "btn-subs"){
        return display_text[lastOperator] != "+";
    }

    //Si llegamos aqui significa que el ultimo caracter es un operador y que no se intenta escribir un '-'. Sustituimos siempre
    return false;
}

//Resetea la calculadora
function resetCalcualtor(){
    display.textContent = "0";
    displayPrev.textContent = "";
}

//Borra el ultimo caracter, es necesario comprobar las validaciones
function deleteCharacter(){
    display_array = Array.from(display.textContent);

    //Eliminamos el ultimo caracter si hay texto
    if(display_array.length > 0){
        deleted_char = display_array.pop();

        //Convertimos el array a string nuevamente y lo metemos en el display
        new_display_text = display_array.join("");
        display.textContent = new_display_text

        //Si no queda nada dejamos un 0
        if(display_array.length == 0) display.textContent = "0";
    }
}

//Escribe la coma en el numero si es posible, y lo bloquea para no escribir dos comas en el mismo numero
function writeDecimal(){
    //Añadimos la coma al numero y bloqueamos su escritura 
    if(allowDecimal(display.textContent)){
        //Primero comprobamos si el ultimo elemento es un numero, si no lo es ponemos un 0
        display_array = Array.from(display.textContent);

        console.log("Ultimo caracter " + Number(display_array[display_array.length - 1]))

        if(isNaN(Number(display_array[display_array.length - 1]))){ //No es un numero
            display.textContent = display.textContent + "0,";
        } else{
            display.textContent = display.textContent + ",";
        }
    }
}

//Cambia el signo del ultimo numero
function changeSign(){
    //Extraemos el ultimo operador
    let display_text = display.textContent;
    let lastOperatorIndex = lastIndexOfOperator(display_text);
    let lastOperator = display_text[lastOperatorIndex];

    /**
     * Aqui hay que analizar 4 casos posibles
     * 1: Si el ultimo operador es - y antes hay otro operador eliminamos el signo -
     * 2: Si el ulimo operador es - y antes hay un "(" eliminamos el parentesis y el signo -
     * 3: Si el ultimo operador es - y antes hay un numero, cambiamos al signo +
     * 4: Si el ultimo operador es diferente de - colocamos el - entre parentesis
     */

    
    //CASO 1: EL ULTIMO OPERADOR ES UN SIGNO '-'
    if(lastOperator == "-"){
        let beforeOperator = display_text[lastOperatorIndex - 1] ?? null; //Guardamos el cracter anterior si existe

        //1) Si justo antes hay otro operador quitamos el signo '-'
        if(beforeOperator && operatorChars.includes(beforeOperator)){
            console.log("Antes hay un operador: " + beforeOperator);
            display.textContent = display_text.slice(0, lastOperatorIndex) + display_text.slice(lastOperatorIndex + 1);
            return;
        }

        //2) Si justo antes hay un '(' -> estamos en un (-numero), debemos quitar todo el bloque
        if(beforeOperator == "("){
            console.log("Antes hay un parentesis: " + beforeOperator);
            let positiveNumber = display_text.slice(lastOperatorIndex + 1, -1); //Cogemos el numero dentro del parentesis sin signo
            display.textContent = display_text.slice(0, lastOperatorIndex - 1) + positiveNumber;
            return;
        }

        //3) Si antes hay un numero
        if(isNumber(beforeOperator)){
            console.log("Antes hay un numero: " + beforeOperator);
            let positiveNumber = display_text.slice(lastOperatorIndex + 1); //Cogemos el numero sin el signo
            display.textContent = display_text.slice(0, lastOperatorIndex) + "+" + positiveNumber;
            return;
        }

    }
    //CASO 2: EL ULTIMO OPERADOR ES UN SIGNO DIFERENTE '-'
    else {
        let lastNumber = display_text.slice(lastOperatorIndex + 1);
        display.textContent = display_text.slice(0, lastOperatorIndex + 1) + "(-" + lastNumber + ")";

    }

}

//Maneja las teclas de los numeros para escribirlos en el display
function clickNumber(button){
    console.log("Se ha pulsado un numero: " + button.textContent);

    //Añadimos el numero al display
    display.textContent = display.textContent + button.textContent;

    //Si el primer elemento del array es un 0 y despues hay otro numero
    display_array = Array.from(display.textContent);
    if(display_array[0] == "0" && !isNaN(Number(display_array[1]))) display_array.shift(); //Elimina el primer elemento
    new_display_text = display_array.join("");
    display.textContent = new_display_text;
    display.scrollLeft = display.scrollWidth; //Ajusta el scroll horizontal

}

//Maneja las teclas de los operadores de forma que se asegura de como escribirlo en el display
function clickOperator(button){
    
    console.log("Se ha pulsado un operador: " + button.textContent);

    //Comprobamos si se ha añadido un operador
    if(allowOperator(display.textContent, button)){
        //Se puede escribir un operador porque no se ha escrito ninguno justo antes
        //Añadimos el operador al display
        display.textContent = display.textContent + button.textContent;

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

    display.scrollLeft = display.scrollWidth; //Ajusta el scroll horizontal
}

//Calcula el resultado final de lo que hay escrito en el display
function calculateResult(){
    let display_text = display.textContent;
    //Sustituimos caracteres
    let transoformedText = display_text.replaceAll("÷", "/").replaceAll("×", "*").replaceAll(",", ".");
    let result = math.evaluate(transoformedText);

    //Actualizamos el display
    displayPrev.textContent = display_text;
    display.textContent = result;  
    
    displayPrev.scrollLeft = displayPrev.scrollWidth; //Ajusta el scroll horizontal
}

//Maneja las teclas de los comandos
function clickCommand(button){
    console.log("Se ha pulsado un comando: " + button.textContent);

    switch(button.id){
        case "btn-del": deleteCharacter(); break;
        case "btn-reset": resetCalcualtor(); break;
        case "btn-sign": changeSign(); break;
        case "btn-decimal": writeDecimal(); break;
        case "btn-result": calculateResult(); break;
        default: break;
    }

    display.scrollLeft = display.scrollWidth; //Ajusta el scroll horizontal
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
    displayPrev.addEventListener('click', () => {
        //Pasamos la operacion anterior al display
        display.textContent = displayPrev.textContent; 
        displayPrev.textContent = "";
    })

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
