import { withAuth } from "../../components/withAuth"; // Importa el HOC

function Profile() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Perfil de Usuario</h1>
      <p>Este es tu perfil.</p>
    </div>
  );
}

export default withAuth(Profile); // Protege la ruta con el HOC
