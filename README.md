# CV Personal con Docker Compose

## Tecnologías Utilizadas

<div align="center">

<table>
<tr>

<td align="center" width="140" height="140" bgcolor="#61DBFB">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="65"/><br><br>
<b>React</b>
</td>

<td align="center" width="140" height="140" bgcolor="#009639">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" width="65"/><br><br>
<b><font color="white">Nginx</font></b>
</td>

<td align="center" width="140" height="140" bgcolor="#3C873A">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="65"/><br><br>
<b><font color="white">Node.js</font></b>
</td>

<td align="center" width="140" height="140" bgcolor="#444444">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="65"/><br><br>
<b><font color="white">Express</font></b>
</td>

</tr>

<tr>

<td align="center" width="140" height="140" bgcolor="#00758F">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" width="65"/><br><br>
<b><font color="white">MySQL</font></b>
</td>

<td align="center" width="140" height="140" bgcolor="#2496ED">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="65"/><br><br>
<b><font color="white">Docker</font></b>
</td>

<td align="center" width="140" height="140" bgcolor="#24292E">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="65"/><br><br>
<b><font color="white">GitHub</font></b>
</td>

<td align="center" width="140" height="140" bgcolor="#F1502F">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="65"/><br><br>
<b><font color="white">Git</font></b>
</td>

</tr>
</table>

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
