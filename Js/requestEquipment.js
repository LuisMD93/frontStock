document.addEventListener("DOMContentLoaded", async () => {
     
listenForFormSubmission();
});



function listenForFormSubmission() {
    const requestForm = document.getElementById("requestForm");
    if (!requestForm) return;

    requestForm.addEventListener("submit", (event) => {
        // Evitamos que la página se recargue automáticamente
        event.preventDefault();

        // Capturamos los elementos select
        const uniformType = document.getElementById("uniformType");
        const uniformColor = document.getElementById("uniformColor");
        const uniformSize = document.getElementById("uniformSize");

        // Construimos el objeto con los IDs numéricos requeridos por tu base de datos
        // Nota: Asumimos una cantidad de 1 para la solicitud (puedes cambiarla según tu lógica)
        const datosPedido = {
            category_id: parseInt(uniformType.value),
            color_id: parseInt(uniformColor.value),
            size_id: parseInt(uniformSize.value),
            quantity: 1 
        };
        console.log(datosPedido);
        
        // Validamos rápidamente que no se envíen campos vacíos
        if (isNaN(datosPedido.category_id) || isNaN(datosPedido.color_id) || isNaN(datosPedido.size_id)) {
            alert("Por favor, selecciona todos los campos requeridos.");
            return;
        }

        // Enviamos los datos ordenados al servidor
        enviarPedidoAlServidor(datosPedido);
    });
}

// --- FUNCIÓN B: REALIZAR LA PETICIÓN POST AL SERVIDOR ---
function enviarPedidoAlServidor(datos) {
    // REEMPLAZA esta URL por la dirección real de tu API externa
    const urlApi = "http://localhost/Basic_Api/"; 

    fetch(urlApi, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos) // Convertimos el objeto JS a un string JSON limpio
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor al procesar el guardado.");
        }
        return response.json();
    })
    .then(resultado => {
        console.log("Servidor responde exitosamente:", resultado);
        alert("¡Petición enviada con éxito! Registro ID: " + resultado.id);
        
        // Opcional: Reiniciar el formulario visualmente después de un envío exitoso
        document.getElementById("requestForm").reset();
        // Bloquear los selects hijos nuevamente hasta que elijan otra prenda
        bloquearSelectsPorEspera(document.getElementById("uniformColor"), document.getElementById("uniformSize"));
    })
    .catch(error => {
        console.error("Hubo un fallo al enviar los datos:", error);
        alert("No se pudo conectar con el servidor para guardar la petición.");
    });
}
