const GestorDeAmigos = (function () {
    const nombres = [];
    const input = document.getElementById('amigo');
    const listaAmigos = document.getElementById('listaAmigos');
    const resultado = document.getElementById('resultado');

    function mensajeError(mensaje) {
        alert(`Error: ${mensaje}`);
    }

    function mostrarNombres() {
        listaAmigos.innerHTML = '';
        nombres.forEach(nombre => {
            const li = document.createElement('li');
            li.textContent = nombre;
            listaAmigos.appendChild(li);
        });
    }

    function agregarAmigo() {
        const nombre = input.value.trim();

        if (!nombre) {
            mensajeError('El nombre está vacío.');
            return;
        }

        if (nombres.includes(nombre)) {
            mensajeError('Este nombre ya fue ingresado.');
            return;
        }

        nombres.push(nombre);
        mostrarNombres();
        input.value = '';
        input.focus();
    }

    function sortearAmigo() {
        if (nombres.length < 2) {
            mensajeError('Necesitas al menos 2 amigos para hacer el sorteo.');
            return;
        }

        const asignaciones = asignarAmigos([...nombres]);
        mostrarResultado(asignaciones);
    }

    function asignarAmigos(lista) {
        const asignaciones = [];
        const receptores = [...lista];

        // Desordenar receptores para hacer el sorteo aleatorio
        receptores.sort(() => 0.5 - Math.random());

        for (let i = 0; i < lista.length; i++) {
            // Asegura que nadie se asigne a sí mismo
            if (lista[i] === receptores[i]) {
                return asignarAmigos(lista); // Reintenta si alguien se asignó a sí mismo
            }
            asignaciones.push(`${lista[i]} → ${receptores[i]}`);
        }

        return asignaciones;
    }

    function mostrarResultado(asignaciones) {
        resultado.innerHTML = '';
        asignaciones.forEach(asignacion => {
            const li = document.createElement('li');
            li.textContent = asignacion;
            resultado.appendChild(li);
        });
    }

    return {
        agregarAmigo,
        sortearAmigo
    };
})();
