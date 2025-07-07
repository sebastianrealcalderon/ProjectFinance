import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
    baseURL: baseUrl,
})

export class BonoApiService {

    save(datosEntrada) {
        datosEntrada.userId = this.userId;
        console.log("Guardando datos del bono:", datosEntrada);
        return http.post('/bonos', datosEntrada)
            .then(res => {
                console.log("Respuesta del servidor:", res.data);
                return res.data;
            })
            .catch(err => {
                console.error("Error al guardar:", err);
                throw new Error(err.message || "Hubo un error al guardar los datos del bono");
            });
    }

    getBonosByUserId(userId) {
        return http.get("/bonos")
            .then(response => {
                return response.data.filter(bono => bono.userId === userId);
            })
            .catch(error => {
                console.error("Error al obtener los bonos:", error);
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

    // Crear un nuevo bono
    createBono(bono) {
        return http.post("/bonos", bono)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error("Error al crear el bono:", error);
                throw new Error("No se pudo crear el bono");
            });
    }

    // Actualizar un bono existente
    updateBono(bonoId, bono) {
        return http.put(`/bonos/${bonoId}`, bono)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error("Error al actualizar el bono:", error);
                throw new Error("No se pudo actualizar el bono");
            });
    }

    // Eliminar un bono
    deleteBono(bonoId) {
        return http.delete(`/bonos/${bonoId}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error("Error al eliminar el bono:", error);
                throw new Error("No se pudo eliminar el bono");
            });
    }

}