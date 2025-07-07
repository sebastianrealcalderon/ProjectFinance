import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
    baseURL: baseUrl,
})

export class AuthApiService {

    static  register(user){
        console.log("Datos enviados para el registro:", user)
        return http.post('/users', {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                role: user.role
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

    login(email, password) {
        return http.post('/users/login-request', {  // Enviar credenciales al backend
            email: email,
            password: password,
        })
            .then((res) => {
                if (res.data) {
                    console.log("Login exitoso", res.data);
                    // Guardar los datos del usuario en localStorage
                    localStorage.setItem("user", JSON.stringify(res.data));
                    return res.data;
                } else {
                    console.error("Correo o contraseña incorrectos");
                    throw new Error("Correo o contraseña incorrectos");
                }
            })
            .catch((err) => {
                console.error("Error al intentar iniciar sesión:", err);
                throw new Error(err.message || "Hubo un error al intentar iniciar sesión");
            });
    }
}