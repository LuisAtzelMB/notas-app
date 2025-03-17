import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

export function withAuth(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const { user, loading } = useAuth();

    // Si está cargando, muestra un mensaje de carga
    if (loading) {
      return <p>Cargando...</p>;
    }

    // Si no hay usuario autenticado, redirige a la página de inicio de sesión
    if (!user) {
      router.push("/login");
      return null; // Evita renderizar el contenido
    }

    // Si el usuario está autenticado, renderiza el componente protegido
    return <Component {...props} user={user} />;
  };
}
