document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector(".inventory-table tbody");
    const searchInput = document.getElementById("searchInput");
    const cardHombre = document.getElementById("btnDotacionHombre");
    const cardMujer = document.getElementById("btnDotacionMujer");

    // Función genérica para renderizar los datos en la tabla
    function renderTable(data) {
        tableBody.innerHTML = "";
        data.forEach(prod => {
            const badgeClass = prod.gender.toLowerCase() === "hombre" ? "male" : "female";
            const stockClass = prod.quantity > 0 ? "in-stock" : "out-of-stock";

            const fila = `
                <tr>
                 <td>#${prod.id}</td>
                 <td><span class="badge ${badgeClass}">${prod.gender}</span></td>
                 <td><strong>${prod.type}</strong></td>
                 <td>${prod.color}</td>
                 <td>${prod.size}</td>
                 <td><span class="stock-status ${stockClass}">${prod.quantity} unds</span></td>
                <td><button class="btn-action" onclick="editar('${prod.id}', '${prod.type}', '${prod.color}', '${prod.size}', ${prod.quantity})">Edit</button></td>
                </tr>
             `;
            tableBody.innerHTML += fila;
        });
        window.scrollTo({ top: 0, behavior: 'auto' });
    }

    // Función para cambiar los estilos activos de las tarjetas
    function setActiveCard(cardToActivate) {
        cardHombre.classList.remove("alert");
        cardMujer.classList.remove("alert");
        
        cardToActivate.classList.add("alert");
    }

    // --- CARGA INICIAL (Por defecto: Hombre) ---
    // --- CARGA INICIAL Y EVENTO: Dotación Hombre ---
    async function cargarHombre() {
        // 1. Cambia el color de la tarjeta y muestra el mensaje de carga de INMEDIATO
        setActiveCard(cardHombre);
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Cargando inventario de hombres...</td></tr>`;

        try {
            const response = await fetch("http://localhost/Basic_Api/?accion=all");
            if (!response.ok) throw new Error('Error al obtener datos de hombres');
            
            const data = await response.json();
            renderTable(data); // Pinta los datos cuando llegan
        } catch (error) {
            console.error("Error al cargar inventario de hombres:", error);
            tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--error);">Error al cargar los datos del servidor.</td></tr>`;
        }
    }

    // Ejecutar carga inicial al abrir la página
    cargarHombre();

    // --- EVENTO: Click en Dotación Hombre ---
    cardHombre.addEventListener("click",async () => {
        cargarHombre();
    });

    // --- EVENTO: Click en Dotación Mujer ---
    cardMujer.addEventListener("click", async () => {
        try {
            const response = await fetch('./Js/Womandata.json', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) throw new Error('Ocurrió un error al obtener los datos de mujer');

            const data = await response.json();
            renderTable(data);
            setActiveCard(cardMujer); // Marca la tarjeta de mujer como activa y quita la de hombre
        } catch (error) {
            console.error('Error en la petición de mujeres:', error);
        }
    });

    // --- LÓGICA DEL FILTRO EN TIEMPO REAL ---
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const term = searchInput.value.toLowerCase().trim();
            const rows = tableBody.querySelectorAll("tr");

            rows.forEach(row => {
                const prenda = row.cells[2]?.textContent.toLowerCase() || "";
                const color = row.cells[3]?.textContent.toLowerCase() || "";
                
                if (prenda.includes(term) || color.includes(term)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });
    }
});


function editarx(id) {
    alert(`Editar producto con ID: ${id}`);
    // Aquí agregas la lógica para abrir tu modal de edición o cargar los datos
}



// Abrir el modal y rellenar los inputs con los datos actuales
function editar(id, type, color, size, quantity) {

    console.log(id);
    
    document.getElementById('editId').value = id;
    document.getElementById('editType').value = type;
    document.getElementById('editColor').value = color;
    document.getElementById('editSize').value = size;
    document.getElementById('editQuantity').value = quantity;

    document.getElementById('editModal').style.display = 'flex';
}

// Cerrar el modal
function cerrarModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Manejar el envío del formulario de edición
async function  guardarEdicion(event) {
    event.preventDefault(); // Evita que recargue la página

    const id = document.getElementById('editId').value;
    const type = document.getElementById('editType').value;
    const color = document.getElementById('editColor').value;
    const size = document.getElementById('editSize').value;
    const quantity = document.getElementById('editQuantity').value;

    console.log("Guardando cambios para el producto:", { id, type, color, size, quantity });

  const productoModificado = {
        id: id,
        type: type,
        color: color,
        size: size,
        quantity: quantity
    };

    try {
        // Ajusta la URL según la ruta de tu API en PHP
        const response = await fetch(`http://localhost/Basic_Api/?accion=actualizar&id=${id}`, {
            method: 'POST', // O 'POST' si tu API de PHP usa POST para actualizar
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoModificado)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el producto en el servidor');
        }

        const resultado = await response.json();
        console.log('Respuesta del servidor:', resultado);

        // 1. Cierra el modal
        cerrarModal();

        // 2. Opcional: Recarga la tabla de hombres o actualiza la vista para ver los cambios
        cargarHombre(); 

    } catch (error) {
        console.error('Error en la petición de actualización:', error);
        alert('No se pudo actualizar el producto.');
    }

    cerrarModal();
}