// Js/api/productApi.js
import { httpGet, httpPut } from './httpStock.js';

// Función para "Ver todos los datos" (Pide la lista al servidor)
export async function getAllEquimentApi() {
    return await httpGet("all");
}

// Función para "Modificar un archivo/registro" (Envía los cambios al servidor)
export async function updateProductApi(productId, updatedData) {
    return await httpPut(`/products/${productId}`, updatedData);
}