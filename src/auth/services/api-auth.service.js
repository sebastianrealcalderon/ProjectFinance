import axios from "axios";

const baseUrl = "http://localhost:3000";

const http = axios.create({
    baseURL: baseUrl,
})

export class AuthApiService {

    static  register(user){
        console.log("Datos enviados para el registro:", user)
        return http.post('/users', {
                email: user.email,
                password: user.password,
                userType: user.userType
        })
            .then((res) => {
                console.log("Respuesta del servidor:", res.data);
                return res.data;
            })
            .catch((err) => {
                console.error("Error al registrar usuario:", err);
                throw new Error(err.message || "Hubo un error al registrar al usuario");
            });
    }

    login(email, password, userType) {
        return http.get('/users', {
            params: {
                email: email,
                password: password,
                userType: userType
            }
        })
            .then(res => {
                if (res.data.length > 0) {
                    return res.data[0];
                } else {
                    console.error("Correo o contraseña incorrectos");
                }
            })
            .catch(err => {
                throw new Error(err.message || "Hubo un error al intentar iniciar sesión");
            });
    }
}