let canvas;
let lienzo;
let gBArrayHeight = 20;
let gBArrayWidth = 12;
let startX = 4;
let startY = 0;
let puntuacion = 0;
let nivel = 1;
let subirNivel = 20;
let velocidad = 1;
let timer;
let estadoJuego = "Jugando";
let pausa = false;
let record = 0;

let piezas = [];

localStorage.setItem('record', 0);
if (localStorage.getItem('record')) {
    record = localStorage.getItem('record');
} else {
    localStorage.setItem('record', 0);
}

let arrayCoordenadas = [...Array(gBArrayHeight)].map(e => Array(gBArrayWidth).fill(0));

let curTetromino = [[1, 0], [0, 1], [1, 1], [2, 1]];

let colorTetromino;

let arrayTablero = [...Array(20)].map(e => Array(12).fill(0));

let arrayFiguraParada = [...Array(20)].map(e => Array(12).fill(0));

let DIRECCION = {
    IDLE: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
};
let direccion;

let KEYS = {
    LEFT: 65,
    RIGHT: 68,
    DOWN: 83,
    ROTATE: 87,
    PAUSE: 80
}

class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

document.addEventListener('DOMContentLoaded', dibujarTablero);


function CrearArrayCoordenadas() {
    let i = 0, j = 0;
    for (let y = 9; y <= 446; y += 23) {
        for (let x = 11; x <= 264; x += 23) {
            arrayCoordenadas[i][j] = new Coordinates(x, y);
            i++;
        }
        j++;
        i = 0;
    }
}

function dibujarTablero() {
    canvas = document.getElementById('my-canvas');
    lienzo = canvas.getContext('2d');
    canvas.width = 936;
    canvas.height = 956;

    lienzo.scale(1, 1);

    lienzo.fillStyle = 'white';
    lienzo.fillRect(0, 0, canvas.width, canvas.height);

    lienzo.strokeStyle = 'black';
    lienzo.strokeRect(8, 8, 280, 462);


    lienzo.fillStyle = 'gray';
    lienzo.font = '21px Arial';

    lienzo.fillText("RECORD", 300, 100);
    lienzo.strokeRect(300, 105, 160, 25);
    lienzo.fillText(record.toString(), 305, 125);

    lienzo.fillText("PUNTUACION", 300, 155);
    lienzo.strokeRect(300, 160, 160, 25);
    lienzo.fillText(puntuacion.toString(), 305, 180);


    lienzo.fillText("NIVEL", 300, 210);
    lienzo.strokeRect(300, 215, 160, 25);
    lienzo.fillText(nivel.toString(), 305, 235);


    lienzo.fillText("ESTADO", 300, 265);
    lienzo.strokeRect(300, 270, 160, 25);
    lienzo.fillText(estadoJuego, 305, 288);

    lienzo.fillText("CONTROLES", 300, 335);
    lienzo.strokeRect(300, 341, 160, 129);
    lienzo.font = '19px Arial';
    lienzo.fillText("A: Izquierda", 305, 363);
    lienzo.fillText("D: Derecha", 305, 388);
    lienzo.fillText("S: Abajo", 305, 413);
    lienzo.fillText("W: Rotar", 305, 438);
    lienzo.fillText("P: Pausa", 305, 463);

    document.addEventListener('keydown', jugar);


    CrearPiezas();

    CrearPieza();

    CrearArrayCoordenadas();

    DibujarPieza();
}


function DibujarPieza() {

    for (let i = 0; i < curTetromino.length; i++) {

        let x = curTetromino[i][0] + startX;
        let y = curTetromino[i][1] + startY;

        arrayTablero[x][y] = 1;

        let coorX = arrayCoordenadas[x][y].x;
        let coorY = arrayCoordenadas[x][y].y;

        lienzo.fillStyle = colorTetromino;
        lienzo.fillRect(coorX, coorY, 21, 21);
    }
}

function jugar(e) {
    if (estadoJuego != "Game Over") {
        let key = e.keyCode;

        if (key === KEYS.LEFT && !pausa) {
            direccion = DIRECCION.LEFT;
            if (!tocandoPared() && !ChequearColisionesHorizontales()) {
                BorrarTetromino();
                startX--;
                DibujarPieza();
            }


        } else if (key === KEYS.RIGHT && !pausa) {

            direccion = DIRECCION.RIGHT;
            if (!tocandoPared() && !ChequearColisionesHorizontales()) {
                BorrarTetromino();
                startX++;
                DibujarPieza();
            }

        } else if (key === KEYS.DOWN && !pausa) {
            moverPiezaAbajo();

        } else if (key === KEYS.ROTATE && !pausa) {
            RotarPieza();

        } else if (key === KEYS.PAUSE) {
            pausa = !pausa;
        }
    }
}

function moverPiezaAbajo() {

    direccion = DIRECCION.DOWN;

    if (!ChequearColisionesVerticales()) {
        BorrarTetromino();
        startY++;
        DibujarPieza();
    }
}

function setVelocidad(velocidad) {
    timer = window.setInterval(() => {
        if (!pausa) {
            if (estadoJuego != "Game Over") {
                moverPiezaAbajo();
            }
        }
    }, 1000 / velocidad);
}

setVelocidad(velocidad);


function BorrarTetromino() {
    for (let i = 0; i < curTetromino.length; i++) {
        let x = curTetromino[i][0] + startX;
        let y = curTetromino[i][1] + startY;

        arrayTablero[x][y] = 0;

        let coorX = arrayCoordenadas[x][y].x;
        let coorY = arrayCoordenadas[x][y].y;
        lienzo.fillStyle = 'white';
        lienzo.fillRect(coorX, coorY, 21, 21);
    }
}


function CrearPiezas() {

    piezas.push(new Pieza("t", [[1, 0], [0, 1], [1, 1], [2, 1]], 0.20, "red"));
    piezas.push(new Pieza("i", [[0, 0], [1, 0], [2, 0], [3, 0]], 0.05, "blue"));
    piezas.push(new Pieza("j", [[0, 0], [0, 1], [1, 1], [2, 1]], 0.03, "yellow"));
    piezas.push(new Pieza("o", [[0, 0], [1, 0], [0, 1], [1, 1]], 0.14, "green"));
    piezas.push(new Pieza("l", [[2, 0], [0, 1], [1, 1], [2, 1]], 0.10, "green"));
    piezas.push(new Pieza("s", [[1, 0], [2, 0], [0, 1], [1, 1]], 0.30, "purple"));
    piezas.push(new Pieza("z", [[0, 0], [1, 0], [1, 1], [2, 1]], 0.16, "turquoise"));
    piezas.push(new Pieza("z", [[0, 0], [1, 0], [1, 1], [2, 1]], 0.16, "turquoise"));

    piezas = piezas.sort((a, b) => a.probabilidad - b.probabilidad);

}

function CrearPieza() {

    let randomTetromino = Math.floor(Math.random() * piezas.length);
    curTetromino = piezas[randomTetromino].forma;
    colorTetromino = piezas[randomTetromino].color;


}

function tocandoPared() {
    for (let i = 0; i < curTetromino.length; i++) {
        let nuevaX = curTetromino[i][0] + startX;
        if (nuevaX <= 0 && direccion === DIRECCION.LEFT) {
            return true;
        } else if (nuevaX >= 11 && direccion === DIRECCION.RIGHT) {
            return true;
        }
    }
    return false;
}

function ChequearColisionesVerticales() {
    let copiaTetromino = curTetromino;

    let colision = false;

    for (let i = 0; i < copiaTetromino.length; i++) {
        let square = copiaTetromino[i];

        let x = square[0] + startX;
        let y = square[1] + startY;

        if (direccion === DIRECCION.DOWN) {
            y++;
        }


        if (typeof arrayFiguraParada[x][y + 1] === 'string') {
            BorrarTetromino();
            startY++;
            DibujarPieza();
            colision = true;
            break;
        }
        if (y >= 20) {
            colision = true;
            break;
        }
    }
    if (colision) {

        if (startY <= 2) {
            estadoJuego = "Game Over";
            lienzo.fillStyle = 'white';
            lienzo.fillRect(305, 272, 140, 22);
            lienzo.fillStyle = 'gray';
            lienzo.fillText(estadoJuego, 305, 288);

            alert("Game Over, Este Juego ha sido desarrollado por Aleix Díaz");
        } else {

            for (let i = 0; i < copiaTetromino.length; i++) {
                let square = copiaTetromino[i];
                let x = square[0] + startX;
                let y = square[1] + startY;
                arrayFiguraParada[x][y] = colorTetromino;
            }

            EliminarLinea();

            CrearPieza();

            direccion = DIRECCION.IDLE;
            startX = 4;
            startY = 0;
            DibujarPieza();
        }

    }
}

function ChequearColisionesHorizontales() {

    var copiaTetromino = curTetromino;
    var colision = false;

    for (var i = 0; i < copiaTetromino.length; i++) {

        var square = copiaTetromino[i];
        var x = square[0] + startX;
        var y = square[1] + startY;

        if (direccion == DIRECCION.LEFT) {
            x--;
        } else if (direccion == DIRECCION.RIGHT) {
            x++;
        }

        var stoppedShapeVal = arrayFiguraParada[x][y];

        if (typeof stoppedShapeVal === 'string') {
            colision = true;
            break;
        }
    }

    return colision;
}

function EliminarLinea() {

    let filasABorrar = 0;
    let inicioBorrado = 0;

    for (let y = 0; y < gBArrayHeight; y++) {
        let completed = true;
        for (let x = 0; x < gBArrayWidth; x++) {
            let square = arrayFiguraParada[x][y];

            if (square === 0 || (typeof square === 'undefined')) {
                completed = false;
                break;
            }
        }


        if (completed) {
            if (inicioBorrado === 0) inicioBorrado = y;
            filasABorrar++;

            for (let i = 0; i < gBArrayWidth; i++) {

                arrayFiguraParada[i][y] = 0;
                arrayTablero[i][y] = 0;

                let coorX = arrayCoordenadas[i][y].x;
                let coorY = arrayCoordenadas[i][y].y;

                lienzo.fillStyle = 'white';
                lienzo.fillRect(coorX, coorY, 21, 21);
            }
        }
    }
    if (filasABorrar > 0) {
        puntuacion += 10;

        if (puntuacion > localStorage.getItem('record')) {
            localStorage.setItem('record', puntuacion);
            lienzo.fillStyle = 'white';
            lienzo.fillRect(301, 109, 140, 20);
            lienzo.fillStyle = 'gray';
            lienzo.fillText(puntuacion.toString(), 305, 125);
        }

        lienzo.fillStyle = 'white';
        lienzo.fillRect(301, 162, 140, 20);
        lienzo.fillStyle = 'gray';
        lienzo.fillText(puntuacion.toString(), 305, 180);
        BajarFilas(filasABorrar, inicioBorrado);


        if (puntuacion % subirNivel == 0) {
            velocidad++;
            nivel++;
            lienzo.fillStyle = 'white';

            lienzo.fillRect(302, 218, 150, 20);

            lienzo.fillStyle = 'gray';
            lienzo.fillText(nivel.toString(), 305, 235);
            clearInterval(timer);
            setVelocidad(velocidad);
        }
    }
}


function BajarFilas(filasABorrar, inicioBorrado) {
    for (var i = inicioBorrado - 1; i >= 0; i--) {
        for (var x = 0; x < gBArrayWidth; x++) {
            var y2 = i + filasABorrar;
            var square = arrayFiguraParada[x][i];
            var nextSquare = arrayFiguraParada[x][y2];

            if (typeof square === 'string') {
                nextSquare = square;
                arrayTablero[x][y2] = 1;
                arrayFiguraParada[x][y2] = square;


                let coorX = arrayCoordenadas[x][y2].x;
                let coorY = arrayCoordenadas[x][y2].y;
                lienzo.fillStyle = nextSquare;
                lienzo.fillRect(coorX, coorY, 21, 21);

                square = 0;
                arrayTablero[x][i] = 0;
                arrayFiguraParada[x][i] = 0;
                coorX = arrayCoordenadas[x][i].x;
                coorY = arrayCoordenadas[x][i].y;
                lienzo.fillStyle = 'white';
                lienzo.fillRect(coorX, coorY, 21, 21);
            }
        }
    }
}

function RotarPieza() {
    let nuevaRotacion = new Array();
    let copiaTetromino = curTetromino;
    let curTetrominoBU;

    for (let i = 0; i < copiaTetromino.length; i++) {

        curTetrominoBU = [...curTetromino];

        let x = copiaTetromino[i][0];
        let y = copiaTetromino[i][1];
        let nuevaX = (encontrarUltimaX() - y);
        let nuevaY = x;
        nuevaRotacion.push([nuevaX, nuevaY]);
    }
    BorrarTetromino();


    try {
        curTetromino = nuevaRotacion;
        DibujarPieza();
    }

    catch (e) {
        if (e instanceof TypeError) {
            curTetromino = curTetrominoBU;
            BorrarTetromino();
            DibujarPieza();
        }
    }
}


function encontrarUltimaX() {
    let ultimaX = 0;
    for (let i = 0; i < curTetromino.length; i++) {
        let square = curTetromino[i];
        if (square[0] > ultimaX)
            ultimaX = square[0];
    }
    return ultimaX;
}


function Pieza(nombre, forma, probabilidad, color){
    this.nombre = nombre;
    this.forma = forma;
    this.probabilidad = probabilidad;
    this.color = color;
}
