import { auth } from "../lib/firebase"; // Asegúrate de que la ruta sea correcta
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { withAuth } from "../../components/withAuth"; // Importa el HOC

function Dashboard({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra la sesión del usuario
      console.log("Sesión cerrada exitosamente");
      router.push("/login"); // Redirige al usuario a la página de inicio de sesión
    } catch (error) {
      console.error("Error al cerrar sesión", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>
      <p>Has iniciado sesión como: {user.email}</p>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default withAuth(Dashboard); // Protege la ruta con el HOC
