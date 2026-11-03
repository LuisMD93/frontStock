import { formatNumber , wordAfterTheHyphen }  from '../utils/app.js';
import { getAllDataMan , getAllDataWoman }  from '../UseCases/getAllData.js';
import { updateData } from '../UseCases/updateData.js';



export async function initDashboard() {
    // 1. Selección de elementos del DOM dentro del ámbito del componente
    const tableBody = document.querySelector(".inventory-table tbody");
    const searchInput = document.getElementById("searchInput");
    const cardHombre = document.getElementById("btnDotacionHombre");
    const cardMujer = document.getElementById("btnDotacionMujer");
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editForm');

    if (!tableBody) return;

    // 2. Función para renderizar la tabla
    function renderTable(data) {
        tableBody.innerHTML = "";
        data.forEach(prod => {
            const badgeClass = prod.gender && prod.gender.toLowerCase() === "hombre" ? "male" : "female";
            const stockClass = prod.quantity > 0 ? "in-stock" : "out-of-stock";

            const fila = `
                <tr>
                 <td>#${prod.id}</td>
                 <td><span class="badge ${badgeClass}">${prod.gender || 'N/A'}</span></td>
                 <td><strong>${prod.type}</strong></td>
                 <td>${prod.color}</td>
                 <td>${prod.size}</td>
                 <td><span class="stock-status ${stockClass}">${prod.quantity} unds</span></td>
                 <td><button class="btn-action btn-edit-trigger" data-product='${JSON.stringify(prod)}'>Edit</button></td>
                </tr>
             `;
            tableBody.innerHTML += fila;
        });
        window.scrollTo({ top: 0, behavior: 'auto' });
        attachRowEventListeners();
    }

    function setActiveCard(cardToActivate) {
        if (cardHombre) cardHombre.classList.remove("alert");
        if (cardMujer) cardMujer.classList.remove("alert");
        if (cardToActivate) cardToActivate.classList.add("alert");
    }

    // --- CARGAR HOMBRES ---
    async function handleLoadMen() {
        setActiveCard(cardHombre);
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Cargando inventario de hombres...</td></tr>`;
        try {
            // Nota: Si aún no tienes separado hombres/mujeres, puedes usar getAllData() temporalmente
            const data = await getAllDataMan(); 
            renderTable(data);
        } catch (error) {
            console.error(error);
            tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--error);">Error al cargar los datos del servidor.</td></tr>`;
        }
    }

    // --- CARGAR MUJERES ---
    async function handleLoadWomen() {
        setActiveCard(cardMujer);
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Cargando inventario de mujeres...</td></tr>`;
        try {
            const data = await getAllDataWoman();
            renderTable(data);
        } catch (error) {
            console.error(error);
            tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--error);">Error al cargar los datos.</td></tr>`;
        }
    }

    // Eventos de botones principales (verificando que existan)
    if (cardHombre) cardHombre.addEventListener("click", handleLoadMen);
    if (cardMujer) cardMujer.addEventListener("click", handleLoadWomen);

    // Carga inicial al iniciar el dashboard
    handleLoadMen();

    // --- FILTRO EN TIEMPO REAL ---
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const term = searchInput.value.toLowerCase().trim();
            const rows = tableBody.querySelectorAll("tr");
            rows.forEach(row => {
                const prenda = row.cells[2]?.textContent.toLowerCase() || "";
                const color = row.cells[3]?.textContent.toLowerCase() || "";
                row.style.display = (prenda.includes(term) || color.includes(term)) ? "" : "none";
            });
        });
    }

    // --- MANEJO DEL MODAL Y EDICIÓN ---
    function attachRowEventListeners() {
        const editButtons = document.querySelectorAll(".btn-edit-trigger");
        editButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const prod = JSON.parse(e.currentTarget.getAttribute("data-product"));
                const editId = document.getElementById('editId');
                const editType = document.getElementById('editType');
                const editColor = document.getElementById('editColor');
                const editSize = document.getElementById('editSize');
                const editQuantity = document.getElementById('editQuantity');
                const editQuantityFormat = formatNumber(editQuantity);

                if (editId) editId.value = prod.id;
                if (editType) editType.value = prod.type +" - "+prod.gender;
                if (editColor) editColor.value = prod.color;
                if (editSize) editSize.value = prod.size;
                if (editQuantityFormat) editQuantityFormat.value = prod.quantity;
                
                if (editModal) editModal.style.display = 'flex';
            });
        });
    }

    // Funciones globales auxiliares para el HTML (cerrar modal y guardar)
    window.cerrarModal = function() {
        if (editModal) editModal.style.display = 'none';
    };

    window.guardarEdicion = async function(event) {
        event.preventDefault();
        const id = document.getElementById('editId')?.value;
        const equipmentData = {
            id: id,
            type: document.getElementById('editType')?.value,
            color: document.getElementById('editColor')?.value,
            size: document.getElementById('editSize')?.value,
            quantity: document.getElementById('editQuantity')?.value
        };

        try {
            // Reemplaza con tu caso de uso de actualización real cuando esté listo
            await updateData(id,equipmentData.quantity,wordAfterTheHyphen(equipmentData.type));
            console.log(wordAfterTheHyphen(equipmentData.type));   
            console.log("Guardando cambios para ID:", id, equipmentData);
            window.cerrarModal();
            handleLoadMen(); 
        } catch (error) {
            console.error(error);
            alert('No se pudo actualizar el producto.');
        }
    };
}