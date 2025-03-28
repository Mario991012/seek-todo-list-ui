
# Proyecto de React

Este es un proyecto de React. Puedes correrlo en tu entorno local utilizando `npm run dev` o usar Docker para levantar el entorno de desarrollo con `docker-compose up --build`.

Para probar el ambiente desplegado pueden visitar [http://seek-todo-list.s3-website-us-east-1.amazonaws.com/login](https://main.d1rl7w9haztia1.amplifyapp.com/login)

usuario: test

contraseña: password123

## Requisitos

- [Node.js](https://nodejs.org/) (se recomienda la versión LTS)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/Mario991012/seek-todo-list-ui.git
cd seek-todo-list-ui
```

### 2. Instalación de dependencias

#### En entorno local:

Para instalar las dependencias del proyecto en tu entorno local, ejecuta el siguiente comando:

```bash
npm install
```

Agregar archivo .env en raiz del codigo con lo siguiente:
```
VITE_API_URL=https://seek-todo-list-backend-production.up.railway.app
```
*Por temas de tiempo y errores de AWS CDK en mi ambiente local, se despliega el servicio backend en este proveedor.

#### Con Docker:

Si prefieres usar Docker para correr la aplicación, no es necesario ejecutar `npm install`, ya que Docker instalará las dependencias por ti.

## Ejecución

### 1. En entorno local

Para correr la aplicación en tu entorno local, utiliza el siguiente comando:

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo en `http://localhost:5173` (o el puerto configurado en tu archivo `package.json`).

### 2. Con Docker

Si prefieres correr la aplicación dentro de un contenedor Docker, sigue estos pasos:

1. Asegúrate de tener Docker y Docker Compose instalados.
2. En el directorio raíz del proyecto, ejecuta:

```bash
docker-compose up --build
```

Este comando compilará y levantará el contenedor con la aplicación React. Una vez que se haya completado, podrás acceder a la aplicación en `http://localhost:80`.

### 3. Detener el entorno de Docker

Si deseas detener el contenedor, puedes usar el siguiente comando:

```bash
docker-compose down
```

## Scripts disponibles

- `npm run dev`: Levanta el servidor de desarrollo en local.
- `docker-compose up --build`: Levanta la aplicación en un contenedor Docker.
- `npm run build`: Genera los archivos de producción para el despliegue.
- `npm run lint`: Ejecuta un linting del código fuente.

## Notas

- Asegúrate de tener configurado correctamente Docker y Docker Compose antes de intentar ejecutar el proyecto con contenedores.
- Si estás trabajando en un entorno de desarrollo local y tienes algún problema con los puertos, puedes cambiar la configuración del puerto en el archivo `package.json` o en el archivo `docker-compose.yml`.
