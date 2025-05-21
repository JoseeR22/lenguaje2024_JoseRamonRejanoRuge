// Al recargar, limpiamos todo
localStorage.clear();


const colores = ['blanco', 'amarillo', 'verde', 'rojo', 'azul'];
let conteo = JSON.parse(localStorage.getItem('conteo')) || {};
document.querySelectorAll('#formas-iniciales .forma').forEach(forma => {
    forma.addEventListener('mousedown', (e) => {
        e.preventDefault(); // ← evita que se intente arrastrar el original

        const original = e.target;
        const copia = original.cloneNode(true);
        copia.classList.add('forma');
        copia.dataset.forma = original.dataset.forma;
        copia.style.position = 'absolute';

        // Posicionar inicialmente donde está el cursor
        const zonaJuego = document.getElementById('zona-juego');
        const zonaRect = zonaJuego.getBoundingClientRect();

        // Centrar el clon con el cursor dentro del área de juego
        copia.style.left = (e.clientX - zonaRect.left - 20) + 'px';
        copia.style.top = (e.clientY - zonaRect.top - 20) + 'px';

        // Agregar eventos
        copia.addEventListener('mousedown', iniciarDrag);
        copia.addEventListener('click', cambiarColor);

        zonaJuego.appendChild(copia);

        // Iniciar arrastre inmediato
        iniciarDrag({ target: copia, clientX: e.clientX, clientY: e.clientY });
    });
});



function cambiarColor(e) {
    e.stopPropagation();
    const figura = e.target;
    let colorActual = colores.find(c => figura.classList.contains(c));
    let nuevoColor = colores[(colores.indexOf(colorActual) + 1) % colores.length];

    figura.classList.remove(colorActual);
    figura.classList.add(nuevoColor);

    actualizarConteo(figura.dataset.forma, colorActual, nuevoColor);
    guardarEstado();
    actualizarTabla();
}

function iniciarDrag(e) {
    const forma = e.target;

    // Guardamos si es una forma plantilla
    const esPlantilla = forma.parentElement.id === 'formas-iniciales';



    let shiftX = e.clientX - forma.getBoundingClientRect().left;
    let shiftY = e.clientY - forma.getBoundingClientRect().top;

    forma.style.position = 'absolute';
    document.body.append(forma);

    function mover(pageX, pageY) {
        forma.style.left = pageX - shiftX + 'px';
        forma.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(e) {
        mover(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    forma.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        forma.onmouseup = null;

        if (esPlantilla) {
            restaurarFormaPlantilla(forma);
        }

        guardarEstado();
    };
}



function actualizarConteo(forma, colorViejo, colorNuevo) {
    conteo[forma] = conteo[forma] || {};
    if (colorViejo && conteo[forma][colorViejo] > 0) {
        conteo[forma][colorViejo]--;
    }
    conteo[forma][colorNuevo] = (conteo[forma][colorNuevo] || 0) + 1;
}


function actualizarTabla() {
    const tabla = document.getElementById('tabla-conteo');
    tabla.innerHTML = '';
    ['cuadrado', 'circulo', 'triangulo'].forEach(f => {
        let row = `<tr><td>${f.charAt(0).toUpperCase() + f.slice(1)}</td>`;
        colores.forEach(c => {
            row += `<td>${conteo[f]?.[c] || 0}</td>`;
        });
        row += '</tr>';
        tabla.innerHTML += row;
    });
}

function guardarEstado() {
    localStorage.setItem('conteo', JSON.stringify(conteo));
    const formas = [...document.querySelectorAll('.forma')].map(f => ({
        tipo: f.dataset.forma,
        color: colores.find(c => f.classList.contains(c)),
        left: f.style.left,
        top: f.style.top
    }));
    localStorage.setItem('formas', JSON.stringify(formas));
}

function restaurarEstado() {
    const formas = JSON.parse(localStorage.getItem('formas')) || [];
    formas.forEach(f => {
        const div = document.createElement('div');
        div.classList.add('forma', f.tipo, f.color);
        div.dataset.forma = f.tipo;
        div.style.left = f.left;
        div.style.top = f.top;
        div.addEventListener('click', cambiarColor);
        div.addEventListener('mousedown', iniciarDrag);
        document.getElementById('zona-juego').appendChild(div);
    });
    actualizarTabla();
}

restaurarEstado();
