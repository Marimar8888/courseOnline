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

# Proyecto Frontend (Tienda Online venta cursos)

## Introducción

Este es un proyecto de una tienda online de cursos desarrollada con React.js, SCSS y HTML5. La aplicación permite la gestión de cursos a través de un dashboard dedicado para estudiantes, profesores y centros de estudio. La aplicación está conectada a una API desarrollada en Python para manejar la lógica de negocio y las interacciones con la base de datos.

## Tecnologías Utilizadas

## Instalación

## Configuración

## Estructura del Proyecto

### Estructura de Archivos

C:.
├───src
│   │   bootstrap.js
│   │   vendor.js
│   │
│   ├───actions
│   │       index.js
│   │
│   ├───components
│   │   │   app.js
│   │   │
│   │   ├───auth
│   │   │       change-password.js
│   │   │       email-recovery.js
│   │   │       login.js
│   │   │       register.js
│   │   │
│   │   ├───cart-shopping
│   │   │       cart-details.js
│   │   │       cart-paying.js
│   │   │       cart-shopping.js
│   │   │
│   │   ├───centers
│   │   │       center-edit-create-container.js
│   │   │       centers-container.js
│   │   │       centers-table.js
│   │   │
│   │   ├───course
│   │   │       course-container.js
│   │   │       course-details.js
│   │   │       course-form.js
│   │   │       course-item-dashboard.js
│   │   │       course-item-store.js
│   │   │
│   │   ├───dashboard
│   │   │   │   dashboard-bills.js
│   │   │   │   dashboard-center.js
│   │   │   │   dashboard-container.js
│   │   │   │   dashboard-professor.js
│   │   │   │   dashboard-student.js
│   │   │   │
│   │   │   └───pages
│   │   │           centers.js
│   │   │           courses.js
│   │   │           professors.js
│   │   │           students.js
│   │   │
│   │   ├───footer
│   │   │       footer.js
│   │   │
│   │   ├───forms
│   │   │       cart-details-form-fields.js
│   │   │       cart-paying-form-fields.js
│   │   │       cart-shopping-form-fields.js
│   │   │       center-form-fields.js
│   │   │       center-form.fields.js
│   │   │       change-password-form-fields.js
│   │   │       contact-form-fields.js
│   │   │       course-form-fields.js
│   │   │       dahsboard-dates-student-form.js
│   │   │       dashboard-dates-professor-form.js
│   │   │       email-recovery-form-fields.js
│   │   │       login-form-fields.js
│   │   │       professor-form-fields.js
│   │   │       register-form-fields.js
│   │   │       rich-text-editor.js
│   │   │       student-form-fields.js
│   │   │
│   │   ├───helpers
│   │   │       icons.js
│   │   │
│   │   ├───home
│   │   │   │   home-container.js
│   │   │   │
│   │   │   └───carrousel
│   │   │           home-carrousel.js
│   │   │
│   │   ├───modals
│   │   │       course-modal.js
│   │   │       login-modal.js
│   │   │       login-notification.js
│   │   │       register-modal.js
│   │   │
│   │   ├───navigation
│   │   │       navbar-container.js
│   │   │
│   │   ├───pages
│   │   │       contact.js
│   │   │       dashboard.js
│   │   │       home.js
│   │   │       no-match.js
│   │   │       store.js
│   │   │       teach.js
│   │   │
│   │   ├───professors
│   │   │       professor-centers-table.js
│   │   │       professor-create-container.js
│   │   │       professor-edit-container.js
│   │   │
│   │   ├───services
│   │   │       category.js
│   │   │       center.js
│   │   │       contact.js
│   │   │       course.js
│   │   │       enrollment.js
│   │   │       favorites.js
│   │   │       professor.js
│   │   │       student.js
│   │   │       user.js
│   │   │
│   │   ├───store
│   │   │       store-container.js
│   │   │
│   │   ├───student
│   │   │       student-container.js
│   │   │       student-edit-container.js
│   │   │       students-table.js
│   │   │
│   │   └───utils
│   │           constant.js
│   │
│   ├───reducers
│   │       index.js
│   │
│   └───style
│           base.scss
│           button.scss
│           cart-details.scss
│           cart-paying.scss
│           cart-shopping.scss
│           change-password.scss
│           contact.scss
│           course-container.scss
│           course-details.scss
│           course-form.scss
│           course-item-dashboard.scss
│           dashboard-bills.scss
│           dashboard-centers.scss
│           dashboard-content.scss
│           dashboard.scss
│           footer.scss
│           home.scss
│           login.scss
│           main.scss
│           mixins.scss
│           modals.scss
│           navigation.scss
│           react-draft-wysiwyg.scss
│           store.scss
│           student-container.scss
│           student-table.scss
│           table-base.scss
│           teach.scss
│           variables.scss
│
├───static
│   │   favicon.ico
│   │   index.html
│   │
│   └───assets
│       │   
│       │
│       └───images
│           ├───carousel-images
│           │       image1.jpg
│           │       image2.jpg
│           │       image3.jpg
│           │       image4.jpg
│           │       image5.jpg
│           │       image6.jpg
│           │
│           ├───categories
│           │       music.png
│           │       personalcrow.png
│           │       program.png
│           │
│           └───home
│                   community-young-people-happy-together.jpg
│                   happy.jpg
│                   people-collage-design.jpg
│                   portrait-smiling-casual-woman.jpg
│                   retrato-cuerpo-entero-hombre-feliz-confiado.png
│
└───webpack
        common.config.js
        dev.config.js
        postcss.config.js
        prod.config.js

## Uso

- **Usuarios:** Pueden comprar cursos, crear un estudiante, crear un profesor y varios centros de estudios.
- **Estudiantes:** Pueden acceder a su dashboard personal para ver sus cursos, seguir su progreso y obtener certificaciones.
- **Profesores:** Pueden crear y gestionar cursos, subir materiales y revisar el progreso de los estudiantes.
- **Centro de Estudios:** Pueden gestionar a los profesores, revisar los cursos y supervisar el desempeño de los estudiantes.

## Scripts Disponibles

## Despliegue

## Pruebas

## Contribución

## Licencia

## Créditos