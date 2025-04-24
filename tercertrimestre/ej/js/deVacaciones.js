const unicornio = document.getElementById("unicornio");
const destinos = document.querySelectorAll(".destino");
const mensaje = document.querySelector(".mensaje");

unicornio.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", unicornio.id);
    setTimeout(() => {
        unicornio.style.display = "none";
    }, 0);
});

unicornio.addEventListener("dragend", () => {
    unicornio.style.display = "block";
});

destinos.forEach((destino) => {
    destino.addEventListener("dragover", (e) => {
        
        e.preventDefault(); 
        destino.classList.add("dragover");
    });

    destino.addEventListener("dragleave", () => {
        destino.classList.remove("dragover");
    });

    destino.addEventListener("drop", (e) => {
        e.preventDefault();
        destino.classList.remove("dragover");

        destino.appendChild(unicornio);
        unicornio.style.display = "block";
        unicornio.style.position = "absolute";
        unicornio.style.top = "50%";
        unicornio.style.left = "50%";
        unicornio.style.transform = "translate(-50%, -50%)";

        const lugar = destino.dataset.lugar;
        mensaje.textContent = `¡El unicornio se ha ido a la ${lugar.toLowerCase()}!`;

        unicornio.classList.add("brillo");
        setTimeout(() => {
            unicornio.classList.remove("brillo");
        }, 600);
    });
});
