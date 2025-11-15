titulo: "🛒 Rabanito Supermercado"
descripcion: >
  📚 Proyecto universitario desarrollado para la asignatura 
  **Desarrollo de Aplicaciones en Internet (DAI)** de la 
  **Universidad de Granada**.  
  Este proyecto implementa una tienda online completa con catálogo, 
  carrito, búsqueda y documentación API mediante Swagger.

universidad: "🏫 Universidad de Granada"
grado: "💻 Grado en Ingeniería Informática"
asignatura: "🌐 Desarrollo de Aplicaciones en Internet (DAI)"

funcionalidades:
  - "📦 Listado de productos almacenados en MongoDB"
  - "📝 Visualización de información detallada (nombre, categoría, descripción, precios)"
  - "🛒 Carrito de compra con sesiones"
  - "➕ Incremento de cantidad en cada producto del carrito"
  - "🧮 Cálculo automático de totales"
  - "🔍 Búsqueda por texto, categoría o descripción"
  - "📄 API documentada con Swagger"
  - "📐 Arquitectura MVC organizada"
  - "🧩 Uso de middlewares y logger propio"

tecnologias:
  backend:
    - "Node.js 🚀"
    - "Express.js 🧩"
    - "MongoDB 🍃"
    - "Mongoose 🗄️"
    - "Swagger JSDoc 📘"
    - "Express Sessions 🔐"
  frontend:
    - "HTML 🧱"
    - "Nunjucks (templating) 🖨️"
    - "CSS 🎨"
  otros:
    - "Middlewares personalizados ⚙️"
    - "Logger propio 📜"
    - "Rutas modulares 🗂️"

estructura_proyecto: |
  📂 rabanito-supermercado
  ├── models/
  │   └── Producto.js
  ├── routes/
  │   ├── tienda.js
  │   └── api.js
  ├── views/
  │   ├── base.html
  │   ├── portada.html
  │   ├── carrito.html
  │   └── producto.html
  ├── public/
  │   └── styles/
  │       ├── portada.css
  │       └── carrito.css
  ├── swagger/
  │   └── swagger.js
  ├── app.js
  ├── package.json
  └── README.md

modelo_datos:
  categoria: "String"
  url_img: "String"
  precio_euros: "Number"
  precio_rebajado: 
    type: "Number"
    default: 0
  texto_1: "String"
  texto_2: "String"
  emoji: "📊"

busqueda:
  ruta: "/search-results?query=texto"
  campos:
    - "texto_1"
    - "texto_2"
    - "categoría"
  emoji: "🔍"

api_documentacion:
  ruta: "/api-docs"
  descripcion: "📘 Documentación Swagger con rutas, esquemas y ejemplos."

instalacion:
  pasos:
    - "1️⃣ Clonar el repositorio: git clone https://github.com/tuusuario/rabanito-supermercado.git"
    - "2️⃣ Instalar dependencias: npm install"
    - "3️⃣ Crear archivo .env con variables necesarias"
    - "4️⃣ Ejecutar servidor: npm start"
    - "5️⃣ Abrir en navegador: http://localhost:3000/tienda"

env_ejemplo: |
  MONGO_URI=mongodb://localhost:27017/rabanito
  PORT=3000
  SESSION_SECRET=loquequieras

proyecto_academico:
  objetivo: >
    📘 Aplicar conocimientos de desarrollo web full stack:
    Node.js, Express, MongoDB, sesiones, plantillas HTML y Swagger.
  emojis: "🎓👨‍💻"

licencia:
  tipo: "MIT"
  emoji: "📄"

contribuciones:
  pasos:
    - "🍴 Haz un fork"
    - "🌿 Crea una rama"
    - "📬 Envía un Pull Request"
