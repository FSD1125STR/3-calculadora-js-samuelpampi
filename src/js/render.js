

//Renderizamos las teclas de los operadores
function renderOperators(){
    // Recuperamos el contenedor de los botones
    var operatorsContainer = document.getElementById("operator-buttons");

    //Definimos los tipos de botones
    const operatorButtons = [
        { id: "btn-div", label: "÷" }, 
        { id: "btn-mult", label: "×" },
        { id: "btn-subs", label: "-" },
        { id: "btn-add", label: "+" },
        { id: "btn-result", label: "=" },
    ];

    //Rellenamos los botones de operadores
    operatorButtons.forEach(operator => {
        //Creamos el elemento html con los ids y clases correspondientes
        let operatorButton = document.createElement("button");
        operatorButton.id = operator.id;
        operatorButton.classList.add("button", "operator");
        operatorButton.textContent = operator.label;

        //Añadimos el elemento HTML al contenedor
        operatorsContainer.appendChild(operatorButton);
    });
}

//Renderizamos las teclas de los comandos
function renderCommands(){
    // Recuperamos el contenedor de los botones
    var commandContainer = document.getElementById("command-buttons");

    //Definimos los tipos de botones
    const commandButtons = [
        { id: "btn-reset", label: "AC" },
        { id: "btn-sign", label: "⁺/₋" },
        { id: "btn-module", label: "%" },
    ]

    //Rellenamos los botones de comandos
    commandButtons.forEach(command => {
        //Creamos el elemento html con los ids y clases correspondientes
        let commandButton = document.createElement("button");
        commandButton.id = command.id;
        commandButton.classList.add("button", "command");
        commandButton.textContent = command.label;

        //Añadimos el elemento HTML al contenedor
        commandContainer.appendChild(commandButton);
    });

}


//Renderizamos las teclas de los numeros
function renderNumbers(){
    // Recuperamos el contenedor de los botones
    var numbersContainer = document.getElementById("number-buttons");

    //Layout de las teclas en el orden correcto
    const layout = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

    //Rellenamos los botones de numeros    
    for(let i=0; i<10; i++){
        //Creamos el elemento html con los ids y clases correspondientes
        let numberButton = document.createElement("button");
        numberButton.id = `btn-${layout[i]}`;
        numberButton.classList.add("button", "number");
        numberButton.textContent = layout[i];

        //Añadimos el elemento HTML al contenedor
        numbersContainer.appendChild(numberButton);
    }

    //Colocamos elemento de la coma
    let decimalButton = document.createElement("button");
    decimalButton.id = 'btn-decimal';
    decimalButton.classList.add("button", "number");
    decimalButton.textContent = ',';
    numbersContainer.appendChild(decimalButton);

}


//Renderiza la calculadora
function renderCalculator(){
    renderOperators();
    renderCommands();
    renderNumbers();
}

//Cuando cargue el dom, renderizamos la calculadora

addEventListener("DOMContentLoaded", (event) => { 
    renderCalculator();
});
