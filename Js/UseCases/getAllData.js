import  {getAllEquimentApiMan ,getAllEquimentApiWoman}  from '../api/employeeEquipment.js';

export async function getAllDataMan() {
    try {
         const data = await getAllEquimentApiMan();
         return data;
    } catch (error) {
        console.error("Error al obtener el informacion de dotacion masculina:", error);
        throw error;
    }
}


export async function getAllDataWoman() {
    try {
         const data = await getAllEquimentApiWoman();
         console.log(data);
         return data;

    } catch (error) {
        console.error("Error al obtener el informacion de dotacion femenina:", error);
        throw error;
    }
}