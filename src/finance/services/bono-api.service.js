import axios from "axios";
import {BonoComplete} from "@/finance/model/bonoComplete.entity.js";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
    baseURL: baseUrl,
})

export class BonoApiService {

    guardarBono(emisorId, bono) {
        const bonoData = bono.toBackendFormat(); // Formatear los datos antes de enviarlos
        console.log("Enviando datos al backend:", bonoData);

        return http
            .post(`/bonos/${emisorId}`, bonoData) // Endpoint para guardar el bono
            .then((response) => {
                console.log("Respuesta del servidor:", response.data);
                const bonoCompleto = new BonoComplete(response.data);
                console.log("Bono completo:", bonoCompleto);
                return bonoCompleto;
            })
            .catch((error) => {
                console.error("Error al guardar el bono:", error);
                if (error.response) {
                    // Muestra los detalles del error si hay una respuesta del backend
                    console.error("Error en la respuesta del servidor:", error.response.data);
                } else {
                    console.error("Error sin respuesta del servidor:", error.message);
                }
                throw new Error("Hubo un error al guardar el bono");
            });
    }

    getBonosByEmisorId(emisorId) {
        console.log(`Obteniendo bonos para el emisor con ID: ${emisorId}`);

        return http.get(`bonos/emisor/${emisorId}`)
            .then(response => {
                console.log("Respuesta del servidor:", response);  // Verifica la respuesta de la API
                if (response.status === 200 && response.data) { // Verifica si la respuesta fue exitosa (200 OK)
                    console.log("Datos recibidos:", response.data);
                    const bonos = response.data.filter(bono => bono.emisorId === emisorId);
                    console.log("Bonos filtrados:", bonos);
                    return bonos;
                } else {
                    console.warn("No se recibieron datos de bonos");
                    return [];  // Retorna una lista vacía si no se reciben datos
                }
            })
            .catch(error => {
                console.error("Error al obtener los bonos:", error);
                if (error.response && error.response.status === 404) {
                    console.log("No se encontraron bonos para este emisor.");
                } else {
                    console.log("Hubo un error en la comunicación con el servidor.");
                }
                throw new Error("No se pudieron obtener los bonos");
            });
    }

    getAllBonos() {
        return http.get("/bonos")
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error("Error al obtener todos los bonos:", error);
                throw new Error("No se pudieron obtener los bonos");
            });
    }
    
    // Obtener un bono por su ID
    getBonoById(bonoId) {
        return http.get(`/bonos/${bonoId}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error("Error al obtener el bono:", error);
                throw new Error("No se pudo obtener el bono");
            });
    }


    // Eliminar un bono
    deleteBono(bonoId) {
        return http.delete(`/bonos/delete/${bonoId}`)
            .then(response => {
                console.log("Bono eliminado correctamente:", response);
                return response.data;  // Devolvemos los datos de la respuesta
            })
            .catch(error => {
                console.error("Error al eliminar el bono:", error);
                throw error;  // Lanzamos el error para que pueda ser manejado en el componente
            });
    }

}