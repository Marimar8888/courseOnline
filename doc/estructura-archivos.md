### Estructura de Archivos

```plaintext
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
│                   logo.png
│                   people-collage-design.jpg
│                   portrait-smiling-casual-woman.jpg
│                   retrato-cuerpo-entero-hombre-feliz-confiado.png
│
└───webpack
        common.config.js
        dev.config.js
        postcss.config.js
        prod.config.js
```