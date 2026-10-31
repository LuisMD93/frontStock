// document.addEventListener("DOMContentLoaded", async () => {
//      inicializarFiltroUniforme();
// });



// // --- CONFIGURACIÓN E INICIALIZACIÓN ---
// function inicializarFiltroUniforme() {
//     const uniformType = document.getElementById("uniformType");
//     const uniformColor = document.getElementById("uniformColor");
//     const uniformSize = document.getElementById("uniformSize");

//     if (!uniformType || !uniformColor || !uniformSize) return;

//     bloquearSelectsPorEspera(uniformColor, uniformSize);

//     cargarPrendasIniciales(uniformType);

//     uniformType.addEventListener("change", () => {
//         const opcionSeleccionada = uniformType.options[uniformType.selectedIndex];
//         const categoryId = opcionSeleccionada.value;
//         const typeText = opcionSeleccionada.dataset.type;

//         mostrarPantallaDeCarga(uniformColor, uniformSize);

//         cargarVariantesDinamicas(categoryId, typeText, uniformColor, uniformSize);
//     });
// }

// // --- FUNCIÓN 1: CARGAR EL PRIMER SELECT (CATEGORÍAS) ---
// function cargarPrendasIniciales(selectPrendas) {
//     fetch("http://localhost/Basic_Api/?accion=obtenerOpciones=All")
//         .then(response => response.json())
//         .then(inventario => {
//             selectPrendas.innerHTML = '<option value="" disabled selected>Seleccione prenda...</option>';
            
//             // Diccionario para asignar el ID correcto según el insert de tu base de datos
//             const idMapeo = { "Camibuso": 1, "Camiseta": 2, "Jeans": 3, "Botas": 4 };
//             const prendasProcesadas = new Set();

//             inventario.forEach(item => {
//                 if (!prendasProcesadas.has(item.type)) {
//                     prendasProcesadas.add(item.type);

//                     const option = document.createElement("option");
//                     option.value = idMapeo[item.type] || item.type; // Guarda el ID de la categoría
//                     option.dataset.type = item.type;               // Guarda el nombre en texto (ej. "Botas")
//                     option.textContent = `${item.type} (${item.gender})`;
//                     selectPrendas.appendChild(option);
//                 }
//             });
//         })
//         .catch(error => console.error("Error al obtener prendas iniciales:", error));
// }

// // --- FUNCIÓN 2: CONSULTAR COLORES Y TALLAS AL SERVIDOR ---
// function cargarVariantesDinamicas(categoryId, typeText, selectColor, selectSize) {
//     const url = ` http://localhost/Basic_Api/?accion=obtenerOpciones&category_id=${categoryId}&type=${encodeURIComponent(typeText)}`;

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             renderizarColores(data.colores, selectColor);
//             renderizarTallas(data.tallas, selectSize);
//         })
//         .catch(error => {
//             console.error("Error al cargar variantes de la BD:", error);
//             selectColor.innerHTML = '<option disabled>Error</option>';
//             selectSize.innerHTML = '<option disabled>Error</option>';
//         });
// }

// // --- FUNCIÓN 3: DIBUJAR LOS COLORES Y APLICAR BLOQUEOS ---
// function renderizarColores(listaColores, selectColor) {
//     selectColor.innerHTML = '<option value="" disabled selected>Sleccione un color...</option>';
    
//     // Verificamos si el único color disponible es "N/A" (como pasa con Jeans o Botas)
//     const tieneSoloNA = listaColores.length === 1 && listaColores[0].color === "N/A";

//     if (tieneSoloNA) {
//         const option = document.createElement("option");
//         option.value = listaColores[0].id; // ID del color (ej. 5)
//         option.textContent = "N/A";
//         selectColor.appendChild(option);
        
//         selectColor.value = listaColores[0].id; // Seleccionar "N/A" automáticamente
//         selectColor.disabled = true;           // Bloquear el campo
//     } else {
//         selectColor.disabled = false;          // Habilitar si hay colores reales
//         listaColores.forEach(c => {
//             const option = document.createElement("option");
//             option.value = c.id;
//             option.textContent = c.color;
//             selectColor.appendChild(option);
//         });
//     }
// }

// // --- FUNCIÓN 4: DIBUJAR LAS TALLAS ---
// function renderizarTallas(listaTallas, selectSize) {
//     selectSize.innerHTML = '<option value="" disabled selected>Seleccione Talla...</option>';
//     selectSize.disabled = false;

//     listaTallas.forEach(t => {
//         const option = document.createElement("option");
//         option.value = t.id;       // Envía el ID numérico
//         option.textContent = t.size; // Muestra el texto legible (ej. "S", "42")
//         selectSize.appendChild(option);
//     });
// }

// // --- HELPER A: ESTADO INICIAL ---
// function bloquearSelectsPorEspera(selectColor, selectSize) {
//     selectColor.innerHTML = '<option value="" disabled selected>Primero seleccione una prenda...</option>';
//     selectSize.innerHTML = '<option value="" disabled selected>Primero seleccione una prenda...</option>';
//     selectColor.disabled = true;
//     selectSize.disabled = true;
// }

// // --- HELPER B: ANIMACIÓN DE CARGA ---
// function mostrarPantallaDeCarga(selectColor, selectSize) {
//     selectColor.innerHTML = '<option value="" disabled selected>Loading colors...</option>';
//     selectSize.innerHTML = '<option value="" disabled selected>Loading sizes...</option>';
//     selectColor.disabled = true;
//     selectSize.disabled = true;
// }


// Js/main.js
import { initDashboard } from './components/employeeEquipment.js';

document.addEventListener("DOMContentLoaded", () => {
    initDashboard();
});