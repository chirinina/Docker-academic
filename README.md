# CV Personal con Docker Compose
## Tecnologías utilizadas

<div style="display:flex; flex-wrap:wrap; gap:20px; justify-content:center; align-items:center; margin-top:20px;">

  <div style="width:140px; height:140px; background:#61DBFB; border-radius:20px; display:flex; flex-direction:column; justify-content:center; align-items:center; box-shadow:0 8px 20px rgba(0,0,0,0.2);">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="60"/>
    <p style="margin-top:10px; color:white; font-weight:bold;">React</p>
  </div>

  <div style="width:140px; height:140px; background:#009639; border-radius:20px; display:flex; flex-direction:column; justify-content:center; align-items:center; box-shadow:0 8px 20px rgba(0,0,0,0.2);">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" width="60"/>
    <p style="margin-top:10px; color:white; font-weight:bold;">Nginx</p>
  </div>

  <div style="width:140px; height:140px; background:#3C873A; border-radius:20px; display:flex; flex-direction:column; justify-content:center; align-items:center; box-shadow:0 8px 20px rgba(0,0,0,0.2);">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="60"/>
    <p style="margin-top:10px; color:white; font-weight:bold;">Node.js</p>
  </div>

  <div style="width:140px; height:140px; background:#444444; border-radius:20px; display:flex; flex-direction:column; justify-content:center; align-items:center; box-shadow:0 8px 20px rgba(0,0,0,0.2);">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="60"/>
    <p style="margin-top:10px; color:white; font-weight:bold;">Express</p>
  </div>

  <div style="width:140px; height:140px; background:#00758F; border-radius:20px; display:flex; flex-direction:column; justify-content:center; align-items:center; box-shadow:0 8px 20px rgba(0,0,0,0.2);">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" width="60"/>
    <p style="margin-top:10px; color:white; font-weight:bold;">MySQL</p>
  </div>

  <div style="width:140px; height:140px; background:#2496ED; border-radius:20px; display:flex; flex-direction:column; justify-content:center; align-items:center; box-shadow:0 8px 20px rgba(0,0,0,0.2);">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="60"/>
    <p style="margin-top:10px; color:white; font-weight:bold;">Docker</p>
  </div>

  <div style="width:140px; height:140px; background:#24292E; border-radius:20px; display:flex; flex-direction:column; justify-content:center; align-items:center; box-shadow:0 8px 20px rgba(0,0,0,0.2);">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="60"/>
    <p style="margin-top:10px; color:white; font-weight:bold;">GitHub</p>
  </div>

  <div style="width:140px; height:140px; background:#F1502F; border-radius:20px; display:flex; flex-direction:column; justify-content:center; align-items:center; box-shadow:0 8px 20px rgba(0,0,0,0.2);">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="60"/>
    <p style="margin-top:10px; color:white; font-weight:bold;">Git</p>
  </div>

  <div style="width:140px; height:140px; background:#F7DF1E; border-radius:20px; display:flex; flex-direction:column; justify-content:center; align-items:center; box-shadow:0 8px 20px rgba(0,0,0,0.2);">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="60"/>
    <p style="margin-top:10px; color:black; font-weight:bold;">JavaScript</p>
  </div>

  <div style="width:140px; height:140px; background:#E34F26; border-radius:20px; display:flex; flex-direction:column; justify-content:center; align-items:center; box-shadow:0 8px 20px rgba(0,0,0,0.2);">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="60"/>
    <p style="margin-top:10px; color:white; font-weight:bold;">HTML5</p>
  </div>

  <div style="width:140px; height:140px; background:#1572B6; border-radius:20px; display:flex; flex-direction:column; justify-content:center; align-items:center; box-shadow:0 8px 20px rgba(0,0,0,0.2);">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="60"/>
    <p style="margin-top:10px; color:white; font-weight:bold;">CSS3</p>
  </div>

</div>

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
