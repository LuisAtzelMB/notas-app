"use client"; // Marca este componente como un Client Component

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Usa next/navigation en lugar de next/router

export default function Home() {
  const router = useRouter();

  // Redirige a /dashboard cuando el componente se monta
  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return null; // No renderiza nada en la página Home
}
