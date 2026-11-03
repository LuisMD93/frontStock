import  {updateDataEquimentApi}  from '../api/employeeEquipment.js';


export async function updateData(id ,quantity , gender) {
    try {
         const sendData = {id ,quantity ,gender}
         const response = await updateDataEquimentApi(sendData);
         console.log(response);
         return response;

    } catch (error) {
        console.error("Error al actualizar  informacion de dotacion :", error);
        throw error;
    }
}