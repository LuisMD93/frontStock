// Js/components/dashboardView.js
import { loadMenInventoryUseCase, loadWomenInventoryUseCase, updateProductUseCase } from '../use-cases/inventory/inventoryUseCases.js';

export function initDashboard() {
    
    const tableBody = document.querySelector(".inventory-table tbody");
    const searchInput = document.getElementById("searchInput");
    const cardHombre = document.getElementById("btnDotacionHombre");
    const cardMujer = document.getElementById("btnDotacionMujer");
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editForm'); // Asegúrate de que tu form tenga este ID en el HTML

    if (!tableBody) return;

    // Función para renderizar tabla
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
                 <td><button class="btn-action btn-edit-trigger" data-product='${JSON.stringify(prod)}'>Edit</button></td>
                </tr>
             `;
            tableBody.innerHTML += fila;
        });
        window.scrollTo({ top: 0, behavior: 'auto' });
        attachRowEventListeners();
    }

    function setActiveCard(cardToActivate) {
        cardHombre.classList.remove("alert");
        cardMujer.classList.remove("alert");
        cardToActivate.classList.add("alert");
    }

    // --- CARGAR HOMBRES ---
    async function handleLoadMen() {
        setActiveCard(cardHombre);
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Cargando inventario de hombres...</td></tr>`;
        try {
            const data = await loadMenInventoryUseCase();
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
            const data = await loadWomenInventoryUseCase();
            renderTable(data);
        } catch (error) {
            console.error(error);
            tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--error);">Error al cargar los datos.</td></tr>`;
        }
    }

    // Eventos de botones principales
    cardHombre.addEventListener("click", handleLoadMen);
    cardMujer.addEventListener("click", handleLoadWomen);

    // Carga inicial
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
                document.getElementById('editId').value = prod.id;
                document.getElementById('editType').value = prod.type;
                document.getElementById('editColor').value = prod.color;
                document.getElementById('editSize').value = prod.size;
                document.getElementById('editQuantity').value = prod.quantity;
                editModal.style.display = 'flex';
            });
        });
    }

    // Botón cerrar modal global o listener
    window.cerrarModal = function() {
        editModal.style.display = 'none';
    };

    // Guardar edición
    window.guardarEdicion = async function(event) {
        event.preventDefault();
        const id = document.getElementById('editId').value;
        const productData = {
            id: id,
            type: document.getElementById('editType').value,
            color: document.getElementById('editColor').value,
            size: document.getElementById('editSize').value,
            quantity: document.getElementById('editQuantity').value
        };

        try {
            await updateProductUseCase(id, productData);
            window.cerrarModal();
            handleLoadMen(); // Recarga la tabla activa
        } catch (error) {
            console.error(error);
            alert('No se pudo actualizar el producto.');
        }
    };
}