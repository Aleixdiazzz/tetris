# Tetris JS - README

## Descripción General
Este documento explica las funciones clave utilizadas en una implementación del juego Tetris. Cada función maneja una lógica específica del juego, como la rotación de piezas, detección de colisiones, seguimiento de puntuación y más.

---

## Funciones

### 1. `CrearArrayCoordenadas`
- **Propósito:** Genera una matriz de coordenadas (`arrayCoordenadas`) donde cada elemento es un objeto `Coordinates` con valores `x` y `y`. Estos valores incrementan en pasos de 23 píxeles, creando una cuadrícula regular.
- **Cómo funciona:** 
    - Recorre las posiciones horizontales y verticales, almacenando las coordenadas correspondientes en la matriz.
    - La matriz final contiene coordenadas distribuidas uniformemente en el espacio de juego.

### 2. `DibujarTablero`
- **Propósito:** Dibuja el tablero de juego y la interfaz en el lienzo del canvas.
- **Pasos:**
    - Inicializa el canvas y su contexto 2D.
    - Rellena el fondo con blanco y dibuja un borde negro alrededor del área de juego.
    - Muestra información del juego: "RECORD", "PUNTUACIÓN", "NIVEL", y "ESTADO" en el lado derecho, con los valores actuales de estas variables.
    - Muestra las instrucciones de control (por ejemplo, "A: Izquierda", "D: Derecha", "S: Abajo", "W: Rotar", "P: Pausa").
    - Añade un escuchador de eventos para detectar las teclas presionadas, llamando a la función `jugar` para manejar las acciones del juego.
    - Prepara el juego creando las piezas, generando una nueva pieza, y llenando el array de coordenadas.
    - Llama a la función `DibujarPieza` para dibujar la pieza actual en el canvas.

### 3. `DibujarPieza`
- **Propósito:** Dibuja la pieza activa actual en el canvas.
- **Cómo funciona:** 
    - Recorre los bloques de la pieza activa y calcula sus posiciones sumando las coordenadas de la pieza con las coordenadas de inicio.
    - Marca la posición como ocupada en el array del tablero.
    - Dibuja cada bloque de la pieza con su color respectivo en el canvas.

### 4. `jugar`
- **Propósito:** Maneja las acciones del jugador basadas en las teclas presionadas.
- **Cómo funciona:** 
    - Si el juego no está en "Game Over" y no está en pausa, verifica qué tecla se ha presionado.
    - Mueve la pieza a la izquierda o derecha si no hay colisiones, o hacia abajo si se presiona la tecla hacia abajo.
    - Rota la pieza cuando se presiona la tecla de rotación.
    - Pausa o reanuda el juego si se presiona la tecla "P".

### 5. `moverPiezaAbajo`
- **Propósito:** Mueve la pieza activa hacia abajo en el tablero.
- **Cómo funciona:** 
    - Establece la dirección de la pieza como "abajo".
    - Utiliza `ChequearColisionesVerticales` para verificar si la pieza puede moverse hacia abajo sin chocar con otras piezas o el borde inferior.
    - Si no hay colisiones, incrementa la posición Y de la pieza y la dibuja en la nueva posición.

### 6. `setVelocidad`
- **Propósito:** Establece la velocidad a la que la pieza se mueve hacia abajo.
- **Cómo funciona:** 
    - Utiliza `window.setInterval` para ejecutar una acción repetitiva a intervalos regulares.
    - El intervalo se determina por la variable `velocidad`, que ajusta la frecuencia de ejecución.
    - Verifica que el juego no esté en pausa y que el estado del juego no sea "Game Over" antes de llamar a `moverPiezaAbajo`.

### 7. `BorrarTetromino`
- **Propósito:** Elimina la pieza actual del tablero.
- **Cómo funciona:** 
    - Calcula la posición de cada bloque de la pieza sumando sus coordenadas con las coordenadas de inicio.
    - Actualiza el array del tablero para marcar esa posición como vacía (0).
    - Dibuja un rectángulo blanco sobre la ubicación de la pieza para "borrarla" visualmente.

### 8. `CrearPiezas`
- **Propósito:** Inicializa un array de piezas de Tetris con diferentes tipos y características.
- **Cómo funciona:** 
    - Cada pieza tiene un nombre, una forma definida por coordenadas relativas, una probabilidad de aparición y un color.
    - El array de piezas se ordena según la probabilidad de aparición.

### 9. `tocandoPared`
- **Propósito:** Verifica si la pieza actual está tocando las paredes del tablero, a la izquierda o a la derecha.
- **Cómo funciona:** 
    - Recorre cada bloque de la pieza y calcula su posición en el eje X sumando las coordenadas relativas al inicio.
    - Si la pieza se mueve hacia la izquierda y la posición calculada es <= 0, o si se mueve hacia la derecha y la posición calculada es >= el límite derecho del tablero, retorna `true`.

### 10. `ChequearColisionesVerticales`
- **Propósito:** Verifica si la pieza actual colisiona al moverse hacia abajo en el tablero.
- **Cómo funciona:** 
    - Crea una copia de la pieza actual y simula el movimiento hacia abajo incrementando la coordenada Y.
    - Verifica si el bloque colisiona con otro bloque detenido en el tablero o si llega al borde inferior.
    - Si ocurre una colisión, la pieza se detiene y se verifican las líneas completas.

### 11. `ChequearColisionesHorizontales`
- **Propósito:** Verifica si la pieza actual colisiona al moverse hacia la izquierda o derecha.
- **Cómo funciona:** 
    - Crea una copia de la pieza actual y ajusta la coordenada X según la dirección de movimiento (izquierda o derecha).
    - Verifica si la nueva posición está ocupada por otro bloque.
    - Retorna `true` si se detecta una colisión, impidiendo que la pieza se mueva más en esa dirección.

### 12. `EliminarLinea`
- **Propósito:** Elimina las líneas completas del tablero y actualiza la puntuación y el nivel.
- **Cómo funciona:** 
    - Recorre el tablero y verifica si todas las celdas en una fila están ocupadas (sin espacios vacíos).
    - Si encuentra una línea completa, la elimina y actualiza la puntuación.
    - Si la puntuación supera el récord, se actualiza el récord en `localStorage`.
    - Si la puntuación alcanza un múltiplo de un valor (subirNivel), aumenta la velocidad del juego y el nivel.

### 13. `BajarFilas`
- **Propósito:** Desplaza las filas del tablero hacia abajo después de eliminar una o más filas completas.
- **Cómo funciona:** 
    - Recorre las filas superiores a las eliminadas y las desplaza hacia abajo.
    - Actualiza los arreglos del tablero y repinta las celdas correspondientes en el lienzo.

### 14. `RotarPieza`
- **Propósito:** Rota la pieza actual.
- **Cómo funciona:** 
    - Calcula las nuevas coordenadas de los bloques basándose en una rotación de 90 grados en sentido horario.
    - Verifica si la rotación es válida y, si no, revierte la rotación y deja la pieza en su estado original.

### 15. `encontrarUltimaX`
- **Propósito:** Encuentra la coordenada X más a la derecha de la pieza actual.
- **Cómo funciona:** 
    - Recorre los bloques de la pieza actual y compara sus coordenadas X.
    - Devuelve el valor más alto encontrado, que representa la posición más a la derecha de la pieza.

