document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector(".inventory-table tbody");
    const searchInput = document.getElementById("searchInput");

    // Leer el archivo JSON local
    fetch("Js/Mandata.json")
        .then(response => response.json())
        .then(data => {
            // Limpiar filas estáticas de ejemplo si existen
            tableBody.innerHTML = ""; 

            // Recorrer los datos e insertar las filas de forma dinámica
            data.forEach(prod => {

                 console.log("id: "+prod.id +" "+ prod.prenda +" "+prod.color +" "+ prod.talla+" cantidad "+ prod.cantidad);                
                const badgeClass = prod.genero.toLowerCase() === "hombre" ? "male" : "female";
                const stockClass = prod.cantidad > 0 ? "in-stock" : "out-of-stock";

                const fila = `
                    <tr>
                     <td>#${prod.id}</td>
                     <td><span class="badge ${badgeClass}">${prod.genero}</span></td>
                     <td><strong>${prod.prenda}</strong></td>
                     <td>${prod.color}</td>
                     <td>${prod.talla}</td>
                     <td><span class="stock-status ${stockClass}">${prod.cantidad} unds</span></td>
                     <td><button class="btn-action">Edit</button></td>
                    </tr>
                 `;
                tableBody.innerHTML += fila;
            });

            // === LÓGICA DEL FILTRO (Se ejecuta después de cargar los datos) ===
            if (searchInput) {
                searchInput.addEventListener("input", () => {
                    const term = searchInput.value.toLowerCase().trim();
                    const rows = tableBody.querySelectorAll("tr");

                    rows.forEach(row => {
                        // Capturamos el texto de las celdas: Prenda (columna 2), Color (columna 3), Talla (columna 4)
                        const prenda = row.cells[2]?.textContent.toLowerCase() || "";
                        const color = row.cells[3]?.textContent.toLowerCase() || "";
                        console.log("---" +row.cells[2]?.textContent.toLowerCase());
                        
                        // Si coincide con alguna columna, la muestra; si no, la oculta
                        if (prenda.includes(term) || color.includes(term)) {
                            row.style.display = "";
                        } else {
                            row.style.display = "none";
                        }
                    });
                });
            }
        
        })
        .catch(error => console.error("Error al cargar el inventario:", error));
});

function configurarFiltro(searchInput, tableBody) {
     if (searchInput) {
      searchInput.addEventListener("input", () => {
                    const term = searchInput.value.toLowerCase().trim();
          const rows = tableBody.querySelectorAll("tr");

          rows.forEach(row => {
              // Capturamos el texto de las celdas: Prenda (columna 2), Color (columna 3), Talla (columna 4)
              const prenda = row.cells[2]?.textContent.toLowerCase() || "";
              const color = row.cells[3]?.textContent.toLowerCase() || "";
              console.log("---" +row.cells[2]?.textContent.toLowerCase());
                        
              // Si coincide con alguna columna, la muestra; si no, la oculta
              if (prenda.includes(term) || color.includes(term)) {
                  row.style.display = "";
              } else {
                  row.style.display = "none";
              }
           });
    });
  }
}