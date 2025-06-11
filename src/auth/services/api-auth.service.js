import axios from "axios";

const baseUrl = "http://localhost:3000";

const http = axios.create({
    baseURL: baseUrl,
})

export class AuthApiService {
    login(email, password, userType) {
        return http.get('/users', {
            params: {  // Los parámetros que buscamos en la consulta
                email: email,
                password: password,
                userType: userType
            }
        })
            .then(res => {
                if (res.data.length > 0) {
                    return res.data[0];  // Devuelve el primer usuario si la autenticación es exitosa
                    console.log(res.data);
                } else {
                    console.error("Correo o contraseña incorrectos");
                }
            })
            .catch(err => {
                throw new Error(err.message || "Hubo un error al intentar iniciar sesión");
            });
    }
}