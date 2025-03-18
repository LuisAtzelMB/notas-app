# Notas App - Gestor de Notas en la Nube
¿Tienes dudas de cómo luce la página?
Accede y echa un vistazo en: https://notas-app-fa972.web.app
¡Registrate!

![pagina principal](https://github.com/user-attachments/assets/df269e6c-3a2d-4bbf-82ef-fc54173003bb)


**Notas App** es una aplicación web moderna desarrollada con **Next.js** y **Firebase** que te permite crear, gestionar y almacenar notas en la nube. Este proyecto es ideal para aprender sobre el desarrollo de aplicaciones full-stack, autenticación de usuarios, y almacenamiento en la nube.

## Características Principales

- **Autenticación de usuarios**: Registro e inicio de sesión seguro con Firebase Authentication.
- **Almacenamiento en la nube**: Guarda tus notas en Firebase Firestore.
- **Interfaz intuitiva**: Diseño moderno y fácil de usar.
- **Despliegue en la nube**: La aplicación está desplegada en Firebase Hosting.

## Tecnologías Utilizadas

- **Next.js**: Framework de React para renderizado del lado del servidor (SSR) y generación de sitios estáticos (SSG).
- **Firebase**: Backend como servicio (BaaS) para autenticación, base de datos y almacenamiento.
- **Tailwind CSS**: Framework de CSS para diseñar interfaces de usuario de manera rápida y eficiente.
- **GitHub Actions**: Integración continua y despliegue automático.

## Cómo Configurar el Proyecto

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Requisitos Previos

- Node.js (v16 o superior)
- Cuenta de Firebase

### Pasos para Configurar

1. **Clona el repositorio**:

   git clone https://github.com/LuisAtzelMB/notas-app.git

   cd notas-app
 
    
3. **Instala dependencias**:
    npm install

3.**Configura las variables de entorno:**

   Crea un archivo .env.local en la raíz del proyecto por seguridad.

   Agrega las siguientes variables con los datos de tu proyecto de Firebase:
       

        NEXT_PUBLIC_FIREBASE_API_KEY="Aqui van los datos de tu proyecto en firebase"
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="Aqui van los datos de tu proyecto en firebase"
        NEXT_PUBLIC_FIREBASE_PROJECT_ID="Aqui van los datos de tu proyecto en firebase"
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="Aqui van los datos de tu proyecto en firebase"
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="Aqui van los datos de tu proyecto en firebase"
        NEXT_PUBLIC_FIREBASE_APP_ID="Aqui van los datos de tu proyecto en firebase"
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="Aqui van los datos de tu proyecto en firebase"


4.**Ejecuta el proyecto en modo desarrollo:**
    
    npm run dev
    
5. **Abre tu navegador:**

   Abre tu navegador:

        Visita http://localhost:3000 para ver la aplicación en funcionamiento.

**Despliegue en Firebase Hosting**

Si deseas desplegar la aplicación en Firebase Hosting, sigue estos pasos:

1.**Instala Firebase CLI:**
   
   npm install -g firebase-tools

2.**Inicia sesión en Firebase:**
    

    firebase login

3.**Inicializa Firebase Hosting:**
    

    firebase init hosting

4.**Construye y despliega la aplicación:**
    

    npm run build
    firebase deploy

5.**Accede a tu aplicación:**

        Visita la URL proporcionada por Firebase (por ejemplo, https://notas-app-fa971242.web.app).

**Aprendizaje y Objetivos**

Este proyecto fue desarrollado con el objetivo de aprender y practicar las siguientes habilidades:

    Next.js: Renderizado del lado del servidor (SSR), generación de sitios estáticos (SSG) y enrutamiento dinámico.

    Firebase: Autenticación de usuarios, almacenamiento en Firestore y despliegue en Firebase Hosting.

    Tailwind CSS: Diseño de interfaces modernas y responsivas.

    GitHub Actions: Automatización de despliegues continuos.

**Capturas de Pantalla**

![registrarse](https://github.com/user-attachments/assets/f02cf4e4-79fa-4f29-9779-3857cd12b8be)
![acceder](https://github.com/user-attachments/assets/be798079-798d-4556-912a-39cc5417b489)


**Contribuciones**

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, sigue estos pasos:

    Haz un fork del repositorio.

    Crea una rama con tu feature o corrección (git checkout -b feature/nueva-funcionalidad).

    Haz commit de tus cambios (git commit -m 'Agrega nueva funcionalidad').

    Haz push a la rama (git push origin feature/nueva-funcionalidad).

    Abre un Pull Request.


¡Gracias por visitar este proyecto! Si tienes alguna pregunta o sugerencia, no dudes en contactarme.


---

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
