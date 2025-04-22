fetch('tareas.json')
  .then(res => res.json())
  .then(tareas => {
    const lista = document.getElementById('listaTareas');
    tareas.forEach(tarea => {
      lista.innerHTML += `
        <li>
          <input type="checkbox" ${tarea.completada ? "checked" : ""}>
          ${tarea.titulo}
        </li>
      `;
    });
  });
