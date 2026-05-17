# CV Personal con Docker Compose
<p align="left"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="55" height="55" alt="React"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" width="55" height="55" alt="Nginx"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="55" height="55" alt="Node.js"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="55" height="55" alt="Express"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" width="55" height="55" alt="MySQL"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="55" height="55" alt="Docker"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="55" height="55" alt="GitHub"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="55" height="55" alt="Git"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="55" height="55" alt="JavaScript"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="55" height="55" alt="HTML5"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="55" height="55" alt="CSS3"/> </p>


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
Efrain Chiri Nina
