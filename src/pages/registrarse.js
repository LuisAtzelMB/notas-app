import { useState } from "react";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import "../app/globals.css";

export default function Registrarse() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario registrado exitosamente");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al registrarse", error.message);
      setError("Error al registrarse: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="border-2 border-slate-300 p-8 rounded-2xl bg-white shadow-md text-center">
        <h1 className="text-2xl font-bold p-4">Registrarse</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <form className="flex flex-col p-4">
          <input
            className="p-3"
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <input
            className="p-3"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <button
            className="px-4 py-2 border-2 rounded-2xl bg-blue-400 text-white hover:bg-blue-500 focus:outline-none focus:ring-2"
            type="submit"
          >
            {" "}
            Registrarse{" "}
          </button>
        </form>
        <div>
          <button onClick={() => router.push("/login")}>
            ¿Ya tienes una cuenta?
          </button>
        </div>
      </div>
    </div>
  );
}
