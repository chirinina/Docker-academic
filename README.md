# CV Personal con Docker Compose

## Tecnologías utilizadas

- Frontend: ReactJS + Nginx
- Backend: Node.js + Express
- Base de datos: MySQL 8.0
- Orquestación: Docker Compose
- Red Docker: `cv_network`
- Volumen Docker: `mysql_data`

## Arquitectura del proyecto

```text
Usuario / Navegador
        |
        | http://localhost:3000
        v
+----------------------+
| frontend             |
| React + Nginx        |
| Puerto: 3000         |
+----------+-----------+
           |
           | GET http://localhost:4000/cv
           v
+----------------------+
| backend              |
| Node.js + Express    |
| Puerto: 4000         |
+----------+-----------+
           |
           | Conexion MySQL interna
           v
+----------------------+
| database             |
| MySQL 8.0            |
| Puerto contenedor:3306|
+----------+-----------+
           |
           v
 Volumen: mysql_data
```

## Estructura del proyecto

```text
Docker-academic/
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
├── database/
│   └── init.sql
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── public/
│   └── src/
├── docker-compose.yml
└── README.md
```

## Servicios configurados

| Servicio   | Tecnología    |               Puerto | Imagen              |
| ---------- | ------------- | -------------------: | ------------------- |
| `frontend` | React + Nginx |               `3000` | `samchiri/chiri-frontend:v1` |
| `backend`  | Node.js       |               `4000` | `samchiri/chiri-backend:v1`  |
| `database` | MySQL         | `3306` en contenedor | `mysql:8.0`         |

## Base de datos

La base de datos se crea automaticamente al iniciar los contenedores.

Archivo de inicialización:

```text
database/init.sql
```

Este script realiza:

- Creación de la base de datos `cv_db`
- Creación de la tabla `persona`
- Creación de la tabla `formacion`
- Inserción automática de los datos iniciales del CV

Tablas mínimas:

```text
persona(id, nombre, apellido, ciudad, foto)
formacion(id, titulo, institucion, anio, persona_id)
```

## Endpoint del backend

El backend expone el siguiente endpoint:

```http
GET http://localhost:4000/cv
```

Respuesta esperada en formato JSON:

```json
{
  "personal": {
    "id": 1,
    "nombre": "Efrain",
    "apellido": "Chiri Nina",
    "ciudad": "Sucre - Bolivia",
    "foto": "/Foto 4x4.png"
  },
  "formacion": [
    {
      "id": 1,
      "titulo": "Tecnico Superior Sistemas Informaticos",
      "institucion": "Instituto Tecnico CCA Corporacion Cibernetica Americana",
      "anio": "2024",
      "persona_id": 1
    }
  ]
}
```

## Ejecución del proyecto

Clonar el repositorio:

```bash
git clone https://github.com/chirinina/Docker-academic.git
cd Docker-academic
```

Iniciar toda la aplicación:

```bash
docker compose up -d
```

Docker Compose usara las imagenes publicadas en Docker Hub con el usuario `samchiri` y, si se ejecuta desde este repositorio, tambien puede reconstruirlas desde los Dockerfile incluidos.

Verificar contenedores:

```bash
docker compose ps
```

Abrir la aplicación en el navegador:

```text
http://localhost:3000
```

Probar el backend:

```text
http://localhost:4000/cv
```

## Comando principal solicitado

```bash
docker compose up -d
```

Con ese comando se levantan automáticamente:

1. Base de datos MySQL
2. Script SQL de creación e inserción de datos
3. Backend Node.js
4. Frontend React

## Construcción de imágenes

```bash
docker compose build
```

También se puede construir por servicio:

```bash
docker build -t samchiri/chiri-backend:v1 ./backend
docker build -t samchiri/chiri-frontend:v1 ./frontend
```

## Publicación en Docker Hub

Iniciar sesión:

```bash
docker login
```

Construir imágenes con el usuario `samchiri`:

```bash
docker compose build
```

Publicar imágenes:

```bash
docker push samchiri/chiri-backend:v1
docker push samchiri/chiri-frontend:v1
```

Nombres de imágenes en Docker Hub:

```text
samchiri/chiri-backend:v1
samchiri/chiri-frontend:v1
```

## Comandos útiles

Ver logs:

```bash
docker compose logs -f
```

Ver logs del backend:

```bash
docker compose logs -f backend
```

Ver logs de MySQL:

```bash
docker compose logs -f database
```

Detener contenedores:

```bash
docker compose down
```

Detener y eliminar volumen de MySQL:

```bash
docker compose down -v
```

Usar `docker compose down -v` solo cuando se quiera reinicializar la base de datos desde cero.

## Verificación de funcionamiento

Después de ejecutar:

```bash
docker compose up -d
```

Debe cumplirse lo siguiente:

- El contenedor `database` inicia con MySQL 8.0.
- MySQL crea automáticamente la base de datos `cv_db`.
- El archivo `database/init.sql` crea las tablas e inserta registros.
- El contenedor `backend` se conecta a MySQL.
- El endpoint `GET /cv` retorna datos JSON.
- El contenedor `frontend` muestra el CV en `http://localhost:3000`.

## Autor

Efrain Chiri Nina
