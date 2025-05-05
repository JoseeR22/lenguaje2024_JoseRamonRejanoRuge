const zona = document.getElementById("zona");
const circulo = document.getElementById("circulo");
const historial = document.getElementById("historial");
const limpiarBtn = document.getElementById("limpiar");

// Función para registrar eventos
function registrarEvento(tipo, mensaje, icono) {
    const li = document.createElement("li");
    li.classList.add("evento");
    const hora = new Date().toLocaleTimeString();
    li.innerHTML = `<span>${icono}</span> [${hora}] ${mensaje}`;
    historial.prepend(li); // Agrega al inicio
}

// Eventos de interacción con la zona
zona.addEventListener("mouseenter", () =>
    registrarEvento("info", "El cursor entró en el div", "🟦")
);
zona.addEventListener("mouseleave", () =>
    registrarEvento("info", "El cursor salió del div", "⬜")
);
zona.addEventListener("click", (e) => {
    if (e.button === 0) {
        registrarEvento("click", "Click izquierdo dentro del div", "🟢");
    } else if (e.button === 2) {
        registrarEvento("click", "Click derecho dentro del div", "🔴");
    }
});

// Soporte para botón derecho
zona.addEventListener("contextmenu", (e) => e.preventDefault());

// Evento de recarga
registrarEvento("info", "La página se ha recargado", "🔄");

// Redimensionamiento de ventana
window.addEventListener("resize", () =>
    registrarEvento("resize", "La ventana ha cambiado de tamaño", "🔵")
);

// Eventos de arrastrar el círculo
circulo.addEventListener("dragstart", () =>
    registrarEvento("drag", "El círculo está siendo arrastrado", "🟡")
);

circulo.addEventListener("dragend", (e) => {
    const rect = zona.getBoundingClientRect();
    const dentro =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

    if (dentro) {
        registrarEvento("drop", "El círculo fue soltado dentro del div de interacción", "✅");
    } else {
        registrarEvento("drop", "El círculo fue soltado fuera del div", "❌");
    }
});

// Botón limpiar
limpiarBtn.addEventListener("click", () => {
    historial.innerHTML = "";
    registrarEvento("limpiar", "Historial limpiado", "🧹");
});

// Eventos cuando se entra o sale de la ventana
window.addEventListener("blur", () =>
    registrarEvento("ventana", "Se ha abandonado la ventana", "🚫")
);
window.addEventListener("focus", () =>
    registrarEvento("ventana", "Se ha vuelto a la ventana", "✅")
);
