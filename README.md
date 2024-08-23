# Tienda Online de Cursos

Este es un proyecto de una tienda online de cursos desarrollada con React.js, SCSS y HTML5. La aplicación permite la gestión de cursos a través de un dashboard dedicado para estudiantes, profesores y centros de estudio. La aplicación está conectada a una API desarrollada en Python para manejar la lógica de negocio y las interacciones con la base de datos.

## Tabla de Contenidos

- [Tienda Online de Cursos](#tienda-online-de-cursos)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Características](#características)
  - [Requisitos](#requisitos)
  - [Instalación](#instalación)
  - [Uso](#uso)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Licencia](#licencia)

## Características

- **Tienda de Cursos**: Los usuarios pueden navegar y comprar cursos.
- **Dashboard de Estudiante**: Acceso a los cursos adquiridos, progreso y calificaciones.
- **Dashboard de Profesor**: Gestión de cursos, materiales y alumnos.
- **Dashboard de Centro de Estudios**: Administración de profesores, cursos y estudiantes.
- **Conexión a API en Python**: Gestión de datos y lógica del negocio a través de una API RESTful.

## Requisitos

- Node.js (>=14.x)
- npm 
- Python (>=3.x)
- pip 
- Git

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/Marimar8888/courseOnline.git
   cd courseOnline
   ```

2. **Instalar dependencias:**

   Si usas npm:

   ```bash
   npm install
   ```

3. **Configuración de la API:**

   Dirígete al directorio de la API y sigue las instrucciones del README correspondiente para configurarla y ejecutarla.

4. **Iniciar la aplicación:**

   ```bash
   npm start
   ```

   La aplicación se ejecutará en `http://localhost:3000`.

## Uso
- **Usuarios:** Pueden comprar cursos, crear un estudiante, crear un profesor y varios centros de estudios.
- **Estudiantes:** Pueden acceder a su dashboard personal para ver sus cursos, seguir su progreso y obtener certificaciones.
- **Profesores:** Pueden crear y gestionar cursos, subir materiales y revisar el progreso de los estudiantes.
- **Centro de Estudios:** Pueden gestionar a los profesores, revisar los cursos y supervisar el desempeño de los estudiantes.

## Estructura del Proyecto

Sin terminar

```plaintext
.
├── src/
│   ├── actions/       
│   │   ├── index.js                  
│   ├── components/         # Componentes reutilizables de React
│   │   ├── app.js    
│   │   ├── pages/            # Páginas de la aplicación
│   ├── style/                # Archivos de estilos en SCSS
│   ├── static/               # Imagenes
│   ├── webpack/  
│   ├── App.js                # Componente principal de la aplicación
│   └── ...
├── .gitignore                # Archivos y carpetas ignorados por Git
├── package.json              # Dependencias y scripts de la aplicación
└── README.md                 # Este archivo
```

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Para más detalles, consulta el archivo [LICENSE](./LICENSE).

