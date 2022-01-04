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
let Turno1 = true;

let player_actual = PLAYER_1;

let celdas = document.querySelectorAll(".celdas");
let resultado = document.querySelector(".resultado");
let ganador = document.getElementById("ganador");
let reiniciar = document.getElementById("restart");

Iniciar_Juego();

function Iniciar_Juego() {
    celdas.forEach(celda => {
        celda.addEventListener("click", jugada, { once: true })
    });
};

function Terminar_Juego() {
    celdas.forEach(celda => {
        celda.innerText = "";
        resultado.style.display = "none";
        celda.removeEventListener("click", jugada, { once: true })
    });
}

function jugada(celda) {
    let marcar = celda.target;
    if (Turno1) {
        marcar.innerText = PLAYER_1;
        if (Checkear_Ganador(player_actual) || Empate()) {
            Mostrar_Resultado(player_actual);
        }
        Turno1 = false;
        player_actual = Turno1 ? PLAYER_1 : PLAYER_2
    } else {
        marcar.innerText = PLAYER_2;
        if (Checkear_Ganador(player_actual) || Empate()) {
            Mostrar_Resultado(player_actual);
        }
        Turno1 = true;
        player_actual = Turno1 ? PLAYER_1 : PLAYER_2
    }
};

function Checkear_Ganador(player_actual) {
    return COMBINACIONES_GANAR.some(combinacion => {
        return combinacion.every(index => {
            return celdas[index].innerText.includes(player_actual);
        });
    });
};

function Empate() {
    return [...celdas].every(celda => {
        return celda.innerText.includes(PLAYER_1) || celda.innerText.includes(PLAYER_2);
    })
};

function Mostrar_Resultado(player_actual) {
    if (Empate()){
        ganador.innerText = "HA HABIDO UN EMPATE";
        resultado.style.display = "flex";
    }
    else if (player_actual === "X") {
        ganador.innerText = "GANA EL PLAYER 1";
        resultado.style.display = "flex";
    } else if (player_actual === "0"){
        ganador.innerText = "GANA EL PLAYER 2";
        resultado.style.display = "flex";
    }
}

reiniciar.addEventListener("click", () => {
    Terminar_Juego();
    Iniciar_Juego();
    Turno1 = true;
});