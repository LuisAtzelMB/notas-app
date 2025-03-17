import { useEffect, useState } from "react";
import { auth } from "../src/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState(null); // Estado para almacenar el usuario autenticado
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    // Escucha cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Usuario detectado:", user); // Depuración
      if (user) {
        setUser(user); // Si el usuario está autenticado, actualiza el estado
      } else {
        setUser(null); // Si no hay usuario, establece el estado en null
      }
      setLoading(false); // Finaliza la carga
    });

    // Limpia la suscripción cuando el componente se desmonta
    return () => {
      console.log("Limpiando suscripción..."); // Depuración
      unsubscribe();
    };
  }, []);

  return { user, loading }; // Devuelve el usuario y el estado de carga
}
