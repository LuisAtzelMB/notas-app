import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import "../app/globals.css";

const errorMessages = {
  "auth/invalid-email": "El correo electrónico no es válido.",
  "auth/user-not-found":
    "No se encontró una cuenta con este correo electrónico.",
  "auth/wrong-password": "La contraseña es incorrecta.",
  "auth/network-request-failed":
    "Error de red. Verifica tu conexión a internet.",
  "auth/too-many-requests": "Demasiados intentos. Intenta de nuevo más tarde.",
  default: "Contraseña o correo incorrectos. Por favor, inténtalo de nuevo.",
};

// Función para obtener el mensaje de error en español
const getErrorMessage = (errorCode) => {
  return errorMessages[errorCode] || errorMessages.default;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para el mensaje de error
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // Redirige al usuario al dashboard
    } catch (error) {
      console.error("Error al iniciar sesión", error.message);
      setError(getErrorMessage(error.code)); // Actualiza el estado de error
    }
  };
  const handleRegisterRedirect = () => {
    router.push("/registrarse"); // Redirige a la página de registro
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 overflow-hidden">
      <div className="w-90 border-2 border-slate-300 p-8 rounded-2xl bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center p-4 text-black">
          Iniciar Sesión
        </h1>
        {error && ( // Muestra el mensaje de error si existe
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 p-4 text-black"
        >
          <input
            className="p-2  rounded focus:outline-none  text-black"
            type="email"
            placeholder="Correo"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="p-2  focus:outline-none text-black "
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="px-4 py-2 border-2 rounded-2xl bg-blue-400 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 active:bg-gray-200"
            type="submit"
          >
            Entrar
          </button>
        </form>
        <div className="flex items-center justify-center">
          <button className="text-black" onClick={handleRegisterRedirect}>
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
}
