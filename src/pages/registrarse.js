import { useState } from "react";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import "../app/globals.css";

const errorMessages = {
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
  "auth/email-already-in-use": "Este correo electrónico ya está en uso.",
  "auth/invalid-email": "El correo electrónico no es válido.",
  "auth/user-not-found":
    "No se encontró una cuenta con este correo electrónico.",
  "auth/wrong-password": "La contraseña es incorrecta.",
  "auth/network-request-failed":
    "Error de red. Verifica tu conexión a internet.",
  "auth/too-many-requests": "Demasiados intentos. Intenta de nuevo más tarde.",
  default: "Ocurrió un error. Por favor, inténtalo de nuevo.",
};

// Función para obtener el mensaje de error en español
const getErrorMessage = (errorCode) => {
  return errorMessages[errorCode] || errorMessages.default;
};

export default function Registrarse() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return; // Detener la ejecución si las contraseñas no coinciden
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario registrado exitosamente");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al registrarse", error.message);
      setError(getErrorMessage(error.code));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 overflow-hidden">
      <div className=" w-90 border-2 border-slate-300 p-8 rounded-2xl bg-white shadow-md text-center">
        <h1 className="text-2xl font-bold p-4 text-black">Registrarse</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleRegister} className="flex flex-col p-4 ">
          <input
            className="p-3 focus:outline-none text-black"
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <input
            className="p-3 focus:outline-none text-black"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <input
            className="p-3 focus:outline-none text-black"
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></input>
          <button
            className=" mt-2 px-4 py-2 border-2 rounded-2xl bg-blue-400 text-white hover:bg-blue-500 focus:outline-none focus:ring-2"
            type="submit"
          >
            {" "}
            Registrarse{" "}
          </button>
        </form>
        <div>
          <button className="text-black" onClick={() => router.push("/login")}>
            ¿Ya tienes una cuenta?
          </button>
        </div>
      </div>
    </div>
  );
}
