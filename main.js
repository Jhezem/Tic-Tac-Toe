const COMBINACIONES_GANAR = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const PLAYER_1 = "X";
const PLAYER_2 = "0";
//let Turno1 = true;

let playerActual = PLAYER_1;

let celdas = document.querySelectorAll(".celdas");
let resultado = document.querySelector(".resultado");
let ganador = document.getElementById("ganador");
let reiniciar = document.getElementById("restart");

iniciarJuego();

function iniciarJuego() {
    celdas.forEach(celda => {
        celda.addEventListener("click", jugada, { once: true })
    });
};

function terminarJuego() {
    celdas.forEach(celda => {
        celda.innerText = "";
        resultado.style.display = "none";
        celda.removeEventListener("click", jugada, { once: true })
    });
    playerActual = PLAYER_1;
};


function jugada(celda){
    let marcar = celda.target;
    marcar.innerText = playerActual;

    if(checkearGanador(playerActual)){
        mostrarGanador(playerActual);
    } else if (empate()){
        mostrarEmpate();
    }

    cambiarTurnos();
}

function cambiarTurnos(){
    return playerActual = playerActual == PLAYER_1 ? PLAYER_2 : PLAYER_1;

}

function checkearGanador(playerActual) {
    return COMBINACIONES_GANAR.some(combinacion => {
        return combinacion.every(index => {
            return celdas[index].innerText.includes(playerActual);
        });
    });
};

function empate() {
    return [...celdas].every(celda => {
        return celda.innerText.includes(PLAYER_1) || celda.innerText.includes(PLAYER_2);
    })
};

function mostrarGanador(playerActual){
    if (playerActual === "X") {
        ganador.innerText = "GANA EL PLAYER 1";
        resultado.style.display = "flex";
    } else if (playerActual === "0"){
        ganador.innerText = "GANA EL PLAYER 2";
        resultado.style.display = "flex";
    }
};

function mostrarEmpate() {
        ganador.innerText = "HA HABIDO UN empate";
        resultado.style.display = "flex";
};

reiniciar.addEventListener("click", () => {
    terminarJuego();
    iniciarJuego();
    Turno1 = true;
});