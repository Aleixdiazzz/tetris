const canvas = document.getElementById("my-canvas");
const lienzo = canvas.getContext("2d");

const filas = 20;
const columnas = 10;
const tileSie = 30;

let tablero = [[]];
const c = new Pieza("c", [[1,1,1], [1,0,1]], 0.20, "red");
const l = new Pieza("l", [[1,0], [1,0], [1,0], [1,1]], 0.10, "green");
const i = new Pieza("i", [[1], [1], [1], [1]], 0.05, "blue");
const j = new Pieza("j", [[0,1], [0,1], [0,1], [1,1]], 0.03, "yellow");
const t = new Pieza("t", [[1,1,1], [0,1,0]], 0.02, "pink");
const s = new Pieza("s", [[0,1,1], [1,1,0]], 0.30, "purple");
const z = new Pieza("z", [[1,1,0], [0,1,1]], 0.16, "turquoise");
const o = new Pieza("o", [[1,1], [1,1]], 0.14, "green");

let piezas = [c, l, i, j, t, s, z, o];
piezas = piezas.sort((a,b) => a.probabilidad - b.probabilidad);

console.log(piezas);

function Pieza(nombre, forma, probabilidad, color){
    this.nombre = nombre;
    this.forma = forma;
    this.probabilidad = probabilidad;
    this.color = color;
}



function generarPieza(){

    //Retorna la pieza a generar en base a la probabilidad que tiene cada una

    let randomNumber = Math.random();
    let cummulative = 0;

    for (let i = 0; i < piezas.length, i++;){
        cummulative = cummulative + piezas[i].probabilidad;

        if (cummulative >= randomNumber){
            return piezas[i];
        }
    }


}

function posicionaPieza(pieza, x, y){

    //Coloca la pieza en el tablero

}

function actualizar(){

    //CONTROLA LA LOGICA DE JUEGO

}
function jugar(){
    //actualiza el estado del juego, luego borra el tablero para
    //volver a dibujarlo entero, este proceso debe repetirse cda medio segundo
}



