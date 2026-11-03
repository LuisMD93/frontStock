// Js/api/productApi.js
import { httpGet, httpPut } from './httpStock.js';

// Función para "Ver todos los datos" (Pide la lista al servidor)
export async function getAllEquimentApiMan() {
    return await httpGet("man");
}

export async function getAllEquimentApiWoman() {
    return await httpGet("woman");
}


// Función para "Modificar un archivo/registro" (Envía los cambios al servidor)
export async function updateDataEquimentApi(updatedData) {
    return await httpPut("update", updatedData);
}