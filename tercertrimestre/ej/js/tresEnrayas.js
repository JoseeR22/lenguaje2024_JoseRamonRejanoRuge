let jugador = 1; // La variable jugador controla controla el turno y se guarda en el tablero cuadno hace click
let casillas = document.querySelectorAll(".casilla");
let tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let ganador = false;
let contadorGanadorJ1 = 0;
let contadorGanadorJ2 = 0;
let combinaciones = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];
añadirGanador();
function jugada(num) {

    if (!ganador && tablero[num - 1] === 0) {
        tablero[num - 1] = jugador;
        casillas[num - 1].classList.add("jugador" + jugador);
        if (comprobarGanador()) {
            ganador = true;
            if (jugador === 1) {
                contadorGanadorJ1++;
            } else {
                contadorGanadorJ2++;
            }
            añadirGanador();
            mostrarPopup();

        } else if (comprobarEmpate()) {
            alert("Empate");
            ganador = true;
        } else {
            cambiarJugador();
        }
    }
}

function cambiarJugador() {
    jugador = jugador === 1 ? 2 : 1;
}


function comprobarGanador() {
    for (let i = 0; i < combinaciones.length; i++) {
        const combinacion = combinaciones[i];
        let ganador = true;
        mostrarPopup();
        for (let j = 0; j < combinacion.length; j++) {
            const casilla = combinacion[j];
            if (tablero[casilla] !== jugador) {
                ganador = false;
                break;
            }
        }
        if (ganador) {
            return true;
        }
    }
    return false;
}

function comprobarEmpate() {
    return !tablero.includes(0);
}

function añadirGanador() {
    const jugador1 = document.getElementById("jugador1");
    const jugador2 = document.getElementById("jugador2");
    jugador1.innerHTML = `
        
    Lleva ${contadorGanadorJ1} victorias
  
  
`;
    jugador2.innerHTML = `
        
Lleva ${contadorGanadorJ2} victorias`;

};


function reset() {
    contadorGanadorJ1 = 0;
    contadorGanadorJ2 = 0;


}

function otra() {

}

function mostrarPopup() {
    const dialog = document.getElementsByClassName("dialog");
    dialog.innerHTML = `
  "Jugador ${jugador} + " ha ganado"
  
`;
}
