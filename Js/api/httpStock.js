import { BASE_URL } from '../../Api/apiBase.js';

console.log(BASE_URL);


export async function httpGet(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) throw new Error(`Error GET ${endpoint}: ${response.statusText}`);
    return await response.json();
}


export async function httpPut(endpoint, data) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`Error PUT ${endpoint}: ${response.statusText}`);
    return await response.json();
}