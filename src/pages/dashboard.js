import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { withAuth } from "../../components/withAuth";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// Hook para manejar el cierre de sesión por inactividad
const useInactivityLogout = (timeoutDuration = 15 * 60 * 1000) => {
  const router = useRouter();

  useEffect(() => {
    let inactivityTimer;

    const resetTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(logoutUser, timeoutDuration);
    };

    const logoutUser = async () => {
      try {
        await signOut(auth);
        console.log("Sesión cerrada por inactividad");
        router.push("/login"); // Redirige al usuario a la página de login
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };

    // Eventos para detectar actividad
    const events = ["mousemove", "keydown", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Iniciar el temporizador
    resetTimer();

    // Limpiar eventos y temporizador al desmontar el componente
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, [timeoutDuration, router]);
};

function Dashboard({ user }) {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [notas, setNotas] = useState([]);
  const [notaEditando, setNotaEditando] = useState(null);

  // Cerrar sesión después de 15 minutos de inactividad
  useInactivityLogout(15 * 60 * 1000); // 15 minutos en milisegundos

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Sesión cerrada exitosamente");
      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión", error.message);
    }
  };

  // Función para crear una nueva nota
  const crearNota = async (e) => {
    e.preventDefault();

    if (user) {
      try {
        await addDoc(collection(db, "usuarios", user.uid, "notas"), {
          titulo: titulo,
          contenido: contenido,
          fecha: new Date(),
        });
        console.log("Nota creada exitosamente");
        setTitulo("");
        setContenido("");
        cargarNotas(); // Recarga las notas después de crear una nueva
      } catch (error) {
        console.error("Error al crear la nota:", error);
      }
    } else {
      console.error("Usuario no autenticado");
    }
  };

  // Función para cargar las notas del usuario
  const cargarNotas = async () => {
    if (user) {
      try {
        const querySnapshot = await getDocs(
          collection(db, "usuarios", user.uid, "notas")
        );
        const notasData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotas(notasData); // Actualiza el estado con las notas cargadas
      } catch (error) {
        console.error("Error al cargar las notas:", error);
      }
    }
  };

  // Cargar las notas al montar el componente
  useEffect(() => {
    cargarNotas();
  }, [user]);

  // Función para eliminar notas
  const eliminarNota = async (notaId) => {
    if (user) {
      try {
        // Referencia al documento de la nota
        const notaRef = doc(db, "usuarios", user.uid, "notas", notaId);

        // Elimina la nota
        await deleteDoc(notaRef);
        console.log("Nota eliminada exitosamente");

        // Recarga las notas después de eliminar
        cargarNotas();
      } catch (error) {
        console.error("Error al eliminar la nota:", error);
      }
    } else {
      console.error("Usuario no autenticado");
    }
  };

  // Función para editar notas
  const editarNota = async (e) => {
    e.preventDefault();

    if (user && notaEditando) {
      try {
        // Referencia al documento de la nota que se está editando
        const notaRef = doc(db, "usuarios", user.uid, "notas", notaEditando.id);

        // Actualiza la nota
        await updateDoc(notaRef, {
          titulo: titulo,
          contenido: contenido,
        });
        console.log("Nota actualizada exitosamente");

        // Limpia el formulario y recarga las notas
        setTitulo("");
        setContenido("");
        setNotaEditando(null);
        cargarNotas();
      } catch (error) {
        console.error("Error al actualizar la nota:", error);
      }
    } else {
      console.error("Usuario no autenticado o nota no seleccionada");
    }
  };

  return (
    <div className="bg-[#98D2C0] min-h-screen">
      <div className="flex flex-row justify-between p-8 bg-[#205781]  items-center ">
        <p className="text-2xl font-bold font-serif text-white">
          Has iniciado sesión como: {user.email}
        </p>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-[#4F959D] text-white rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>
      <h1 className="text-6xl font-bold text-center p-8">
        Bienvenido al Dashboard
      </h1>
      <div className="flex flex-col justify-center items-center  ">
        <div
          className="bg-[#F6F8D5] p-8 rounded-2xl relative"
          style={{
            clipPath: "polygon(0% -200%, 100% 12%, 100% 100%, 0% 100%)",
          }}
        >
          {/* Pseudo-elemento para el doblez */}
          <div className=" absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-transparent to-[#d1d5a0]  clip-triangle shadow "></div>

          <form
            onSubmit={notaEditando ? editarNota : crearNota}
            className="mt-4 w-full max-w-md "
          >
            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full p-2 mb-2 focus:outline-none border-b border-gray-300"
              required
            />
            <textarea
              placeholder="Contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="w-full p-2 mb-2 border-b border-gray-300 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#4F959D] text-white rounded hover:bg-[#205781] active:bg-[#3B7A7F] transition-colors"
            >
              {notaEditando ? "Actualizar Nota" : "Crear Nota"}
            </button>
            {notaEditando && (
              <button
                type="button"
                onClick={() => {
                  setTitulo("");
                  setContenido("");
                  setNotaEditando(null);
                }}
                className="w-full mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancelar Edición
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Lista de notas */}
      <h2 className="text-xl font-semibold">Tus Notas</h2>
      <div className="mt-6 w-full max-w-full overflow-x-auto">
        <ul className="flex flex-row flex-wrap gap-4 p-4">
          {notas.map((nota) => (
            <li
              key={nota.id}
              className="p-4 bg-[#F6F8D5] rounded shadow w-94 max-h-[300px] overflow-y-auto apple-scrollbar relative"
              style={{
                clipPath: "polygon(0% -110%, 100% 10%, 100% 100%, 0% 100%)",
              }}
            >
              {/* Pseudo-elemento para el doblez */}
              <div
                className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-transparent to-[#d1d5a0]"
                style={{
                  clipPath: "polygon(0% -200%, 100% 12%, 100% 100%, 0% 100%)",
                }}
              ></div>
              <h3 className="text-lg font-bold">{nota.titulo}</h3>
              <p className="text-gray-700 ">{nota.contenido}</p>
              <small className="text-gray-500">
                {new Date(nota.fecha?.toDate()).toLocaleString()}
              </small>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => {
                    setTitulo(nota.titulo); // Prellena el formulario con los datos de la nota
                    setContenido(nota.contenido);
                    setNotaEditando(nota); // Establece la nota que se está editando
                  }}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarNota(nota.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
