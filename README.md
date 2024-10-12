# Proyecto Frontend (Tienda Online venta cursos)

## Introducción

Este es un proyecto de una tienda online de cursos desarrollada con React.js, SCSS y HTML5. La aplicación permite la gestión de cursos a través de un dashboard dedicado para estudiantes, profesores y centros de estudio. La aplicación está conectada a una API desarrollada en Python para manejar la lógica de negocio y las interacciones con la base de datos.

## Tabla de Contenidos

  - [Tienda Online de Cursos](#tienda-online-de-cursos)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Características](#características)
  - [Tecnologías Utilizadas](#tecnologías-utilizadas)
  - [Requisitos](#requisitos)
  - [Instalación](#instalación)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Funcionalidades por Usuario](#funcionalidades-por-usuario)
  - [Scripts Disponibles](#scripts-disponibles)
  - [Despliegue](#despliegue)
  - [Pruebas](#pruebas)
  - [Licencia](#licencia)
  - [Créditos](#créditos)
  - [Documentación](#documentación)

## Características

- **Tienda de Cursos**: Los usuarios pueden navegar y comprar cursos.
- **Dashboard de Estudiante**: Acceso a los cursos adquiridos, progreso y calificaciones.
- **Dashboard de Profesor**: Gestión de cursos, materiales y alumnos.
- **Dashboard de Centro de Estudios**: Administración de profesores, cursos y estudiantes.
- **Conexión a API en Python**: Gestión de datos y lógica del negocio a través de una API RESTful.

## Tecnologías Utilizadas

### React y su Ecosistema:
- **React**
- **React-DOM**
- **React-Redux**
- **React-Router**
- **Redux**

### Construcción y Configuración de Webpack:
- **Webpack**
- **Webpack CLI**
- **Webpack Dev Server**

### Transformaciones de Babel:
- **Babel Core**
- **Babel Presets**
- **Plugins de Babel**

### Manejo de Estilos y CSS:
- **Node-sass**
- **Sass-loader**
- **Autoprefixer**
- **Style-loader**

### Herramientas de Desarrollo:
- **ESLint**
- **Cross-Env**
- **Clean Webpack Plugin**

### Manejo de Recursos y Archivos:
- **File Loader**
- **HTML Loader**
- **HTML Webpack Plugin**


### Dependencias Relacionadas con la Interfaz:
- **React Modal**: Componente para crear modales en aplicaciones React.
- **React Draft WYSIWYG**: Editor de texto enriquecido para React.
- **Swiper**: Biblioteca para crear carruseles en aplicaciones web.
- **React Image Gallery**: Componente para mostrar galerías de imágenes.
- **React Truncate**: Para truncar texto largo.
- **React Dropzone Component**: Para la carga de archivos mediante arrastrar y soltar.

### Manejo de Datos y Solicitudes HTTP:
- **Axios**: Biblioteca para realizar solicitudes HTTP, utilizada para gestionar la comunicación con el backend de manera asincrónica y reutilizable.
- **AJV**: Herramienta para la validación de JSON Schema.

### Producción y Minificación:
- **UglifyJS Webpack Plugin**

## Requisitos

- Node.js (>=14.x)
- npm 
- Python (>=3.x)
- pip 
- Git

## Instalación

1. **Clonar el repositorio:**

Abre tu terminal y ejecuta los siguientes comandos para clonar el repositorio y navegar al directorio del proyecto:

   ```bash
   git clone https://github.com/Marimar8888/courseOnline.git
   cd courseOnline
   ```

2. **Instalar dependencias:**

Asegúrate de tener Node.js y npm instalados en tu máquina. Luego, ejecuta el siguiente comando para instalar todas las dependencias necesarias:

   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**

Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:

REACT_APP_API_URL=http://localhost:5000  # URL de la API

4. **Configuración de la API:**

   Dirígete al directorio de la API y sigue las instrucciones del README correspondiente para configurarla y ejecutarla.

4. **Iniciar la aplicación:**

Una vez que hayas configurado las variables de entorno y la API, puedes iniciar la aplicación en modo desarrollo:

   ```bash
   npm start
   ```

La aplicación se ejecutará en `http://localhost:3000`.

## Estructura del Proyecto

Este proyecto sigue un enfoque organizado y modular, lo que facilita su comprensión y mantenimiento. A continuación se describen las principales carpetas y su propósito:

- **`services`**: En esta carpeta se centralizan todas las llamadas a la API. Esto permite gestionar la lógica de comunicación con el backend de manera clara y reutilizable, encapsulando la lógica relacionada con las peticiones HTTP. Utilizando **Axios** para realizar las solicitudes, las funciones definidas aquí son asíncronas y pueden manejar respuestas y errores de forma eficiente. Este enfoque no solo facilita la actualización de las interacciones con el servidor sin afectar al resto de la aplicación, sino que también promueve un código más limpio y fácil de mantener. Al tener todas las llamadas a la API en un solo lugar, se puede realizar un seguimiento más sencillo de las interacciones con el servidor y realizar cambios de manera más rápida y segura en caso de que se requiera modificar la lógica de negocio o las rutas de la API.

- **`components`**: Aquí se agrupan los diferentes componentes reutilizables de la aplicación, como el carrito de compras, el dashboard y los formularios de autenticación. Cada funcionalidad específica se maneja dentro de su propio componente, lo que promueve la modularidad y la legibilidad del código, permitiendo realizar actualizaciones sin impactar otras partes del sistema.

- **`forms`**: Esta carpeta alberga los campos relacionados con los formularios de la aplicación. Al tener una sección dedicada a los formularios, se facilita la gestión de su estructura y validación, promoviendo la reutilización de código y mejorando la mantenibilidad.

- **`actions`, `reducers` y `utils`**: Estos directorios manejan la lógica relacionada con la gestión del estado de la aplicación y utilidades generales. Mantener estas responsabilidades separadas asegura un flujo de datos claro y permite que los cambios en el estado se realicen de manera controlada y predecible.

- **`style`**: Los archivos SCSS de estilos se organizan en esta carpeta, lo que asegura un diseño coherente a lo largo de la aplicación. Separar los estilos de la lógica de la aplicación facilita su mantenimiento y mejora la escalabilidad del diseño.

### Buenas prácticas aplicadas

Esta estructura refleja varias buenas prácticas en el desarrollo de software, incluyendo:

1. **Separación de responsabilidades**: Cada parte de la aplicación tiene un propósito claro y bien definido, lo que mejora la organización del código.
  
2. **Modularización**: Los componentes están diseñados para ser reutilizables, lo que minimiza la duplicación de código y facilita el mantenimiento.

3. **Reutilización**: Al centralizar la lógica de los formularios y las llamadas a la API, se fomenta la reutilización de código, mejorando la eficiencia del desarrollo.

4. **Organización de estilos**: Mantener los estilos separados de la lógica asegura una coherencia visual y simplifica la gestión del diseño.

En resumen, esta estructura está diseñada para ofrecer una base sólida que facilita el desarrollo, mantenimiento y escalabilidad de la aplicación.

### Estructura de Archivos

Para una representación detallada de la estructura de archivos, consulta el documento correspondiente en el siguiente enlace:

- [Estructura de archivos](doc/estructura-archivos.md)

## Funcionalidades por Usuario

### Usuarios
Los usuarios tienen la capacidad de:
- **Registro y Autenticación**: Registrarse en la plataforma, iniciar sesión y recuperar su contraseña mediante el envío de un token al correo electrónico asociado.
- **Compra de Cursos**: Pueden adquirir cursos, lo que generará automáticamente el rol de estudiante en su perfil.
- **Gestión de Profesores y Centros de Estudios**: Tienen la posibilidad de crear profesores y múltiples centros de estudios.

### Estudiantes
Los estudiantes pueden:
- **Acceso al Dashboard Personal**: Visualizar su panel personal donde pueden consultar:
  - Cursos iniciados
  - Cursos finalizados
  - Cursos favoritos
- **Facturación**: Revisar y gestionar sus facturas.
- **Datos Personales**: Modificar su información personal según sea necesario.

### Profesores
Los profesores tienen las siguientes capacidades:
- **Creación y Gestión de Cursos**: Pueden crear y administrar cursos, incluyendo la posibilidad de editar contenido y gestionar inscripciones.
- **Gestión de Centros de Estudios**: Tienen la capacidad de crear, editar y gestionar sus propios centros de estudios.

### Centros de Estudios
Los centros de estudios permiten:
- **Relación con centros**: Actualmente, los profesores pueden crear, desactivar y editar los centros de estudios asociados a su cuenta.

## Scripts Disponibles

### Scripts de Desarrollo
- **`npm start`**: Inicia la aplicación en modo desarrollo. La aplicación se ejecutará en `http://localhost:3000` y se recargará automáticamente al realizar cambios en el código.

### Scripts de Construcción
- **`npm run build`**: Compila la aplicación para producción en la carpeta `build`. Este script optimiza la aplicación para mejorar el rendimiento y reduce el tamaño de los archivos.

### Scripts de Pruebas
- **`npm test`**: Inicia el corredor de pruebas en modo interactivo. Permite ejecutar las pruebas de la aplicación y ver los resultados en tiempo real.

### Otros Scripts
- **`npm run lint`**: Ejecuta ESLint para verificar el código en busca de errores de estilo y problemas potenciales. Ayuda a mantener la calidad del código y asegurar buenas prácticas.
- **`npm run format`**: Formatea el código utilizando Prettier para mantener una consistencia en el estilo de codificación.

### Scripts de Configuración
- **`npm run prepare`**: Prepara la aplicación para el despliegue, configurando el entorno y asegurando que todas las dependencias estén actualizadas.

## Despliegue

Este proyecto se puede desplegar en la plataforma **Render** para el frontend y el backend, mientras que la base de datos se alojará en **Nominalia**. A continuación, se describen los pasos para realizar el despliegue.

### Despliegue en Render

1. **Crear una cuenta en Render**:
   - Si aún no tienes una cuenta, regístrate en [Render.com](https://render.com).

2. **Despliegue del Frontend**:
   - En el panel de control de Render, selecciona la opción para crear un nuevo servicio.
   - Selecciona **Web Service** para el frontend.
   - Conecta tu repositorio de GitHub donde está alojado el código del frontend.
   - Configura el entorno de producción:
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Environment**: Elige `Node` o el que corresponda a tu aplicación.
   - Define la variable de entorno `REACT_APP_API_URL` con la URL de tu backend en Render.

3. **Despliegue del Backend**:
   - Crea otro servicio en Render para el backend siguiendo el mismo proceso.
   - Configura el entorno de producción:
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
   - Asegúrate de definir todas las variables de entorno necesarias para tu aplicación.

### Configuración de la Base de Datos en Nominalia

1. **Contratar un servicio de base de datos**:
   - Regístrate en [Nominalia](https://www.nominalia.com) y selecciona un plan que se ajuste a tus necesidades.
  
2. **Crear la base de datos**:
   - Sigue las instrucciones de Nominalia para crear tu base de datos y anotar los detalles de conexión (nombre, usuario, contraseña, URL).

3. **Configurar la conexión en el Backend**:
   - En el backend, define las variables de entorno necesarias para conectarte a la base de datos, utilizando los detalles obtenidos de Nominalia.

### Notas Adicionales

- Asegúrate de probar la aplicación después del despliegue para verificar que tanto el frontend como el backend se comunican correctamente con la base de datos.
- Consulta la documentación de Render y Nominalia para obtener detalles específicos sobre la configuración y opciones avanzadas.

## Pruebas

En esta sección se describen las pruebas realizadas para asegurar el correcto funcionamiento de la aplicación. Esto incluye:

1. **Tipos de Pruebas**:
   - **Pruebas Unitarias**: Se han implementado pruebas unitarias para verificar el correcto funcionamiento de los componentes y funciones individuales.
   - **Pruebas de Integración**: Se realizan pruebas para comprobar la interacción entre diferentes módulos del sistema y garantizar que funcionen correctamente en conjunto.
   - **Pruebas de Usuario**: Se han llevado a cabo pruebas de usuario para validar que la interfaz y la experiencia del usuario cumplen con las expectativas.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Para más detalles, consulta el archivo [LICENSE](./LICENSE).

Claro, aquí tienes ejemplos de cómo puedes estructurar las secciones **Licencia** y **Créditos** en tu archivo `README.md` para tu API:

---

## Licencia

Este proyecto está bajo la licencia **MIT**. Puedes ver el texto completo de la licencia en el archivo [LICENSE](./LICENSE).

### Resumen de la Licencia MIT

La licencia MIT permite a cualquier persona utilizar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias del software, siempre y cuando se incluya la notificación de la licencia y la declaración de copyright en todas las copias o partes sustanciales del software. Esto significa que puedes usar la API en proyectos comerciales y no comerciales, pero debes dar crédito al autor original.

---

## Créditos

- **Autor del proyecto**: [Maria del Mar Alonso](https://tu-sitio-web-o-perfil.github.io) (si deseas incluir un enlace a tu perfil o sitio web).
- **Colaboradores**:
  - [Nombre del colaborador 1](enlace-al-perfil)
  - [Nombre del colaborador 2](enlace-al-perfil)
  
### Recursos utilizados

1. **Recursos y Bibliotecas**:
   - Reconocimiento a las bibliotecas y frameworks utilizados en el proyecto. Por ejemplo:
     - **React**: Para la construcción de la interfaz de usuario.
     - **Axios**: Para manejar las solicitudes HTTP.
     - **Node.js**: Para la creación del servidor backend.
     - **Swiper**: Para la implementación del carrusel en la interfaz.
2. **Imagenes gratuitas**:

   - https://es.pinterest.com/
   - https://www.freepik.es/
   - https://yandex.com/

## Documentación

Para una presentación detallada del proyecto, incluidos diagramas y explicaciones, consulta los siguientes documentos:

- [Diagrama de Arquitectura](docs/ARCHITECTURE_DIAGRAM.png)
- [Diagrama de Flujo del Usuario](docs/USER_FLOW_DIAGRAM.png)


