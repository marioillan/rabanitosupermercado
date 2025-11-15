# 🛒 Rabanito Supermercado

### 🏫 Universidad de Granada — Ingeniería Informática  
### 🌐 Asignatura: Desarrollo de Aplicaciones en Internet (DAI)

---

## 📸 Vista general del proyecto

> Rabanito Supermercado es una aplicación web que simula una tienda online completa, desarrollada como proyecto académico para la asignatura DAI.

---

## 📚 Índice

- [Descripción](#-descripción)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Características](#-características)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Modelo de datos](#-modelo-de-datos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Documentación API](#-documentación-api)
- [Estado del proyecto](#-estado-del-proyecto)
- [Licencia](#-licencia)
- [Autor](#-autor)

---

## 📝 Descripción

Rabanito Supermercado es una aplicación web construida con **Node.js**, **Express**, **MongoDB** y **Mongoose**, que permite gestionar un catálogo de productos, un carrito de compra con sesiones, un sistema de búsqueda y una API documentada mediante Swagger.

Este proyecto ha sido desarrollado como parte del aprendizaje en:

- 🧩 Arquitectura MVC  
- 🧮 Gestión de sesiones  
- 📘 Documentación REST con Swagger  
- 🗄️ Bases de datos NoSQL  
- 🚀 Desarrollo backend y frontend  

---

## 🧩 Tecnologías utilizadas

### 🔧 Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Swagger JSDoc  
- Express Sessions  

### 🎨 Frontend
- HTML (Nunjucks)  
- CSS  

### 🛠️ Otros
- Middlewares personalizados  
- Logger propio  

---

## ✨ Características

- 📦 Catálogo completo de productos desde MongoDB  
- 📝 Vista detallada de cada producto  
- 🛒 Carrito de compra con sesiones  
- ➕ Incremento de cantidades y cálculo dinámico del total  
- 🔍 Búsqueda por nombre, descripción o categoría  
- 📘 API REST documentada con Swagger  
- 🧩 Arquitectura modular (MVC)  

---

## 📁 Estructura del proyecto

rabanito-supermercado/
│
├── models/
│ └── Producto.js
├── routes/
│ ├── tienda.js
│ └── api.js
├── views/
│ ├── base.html
│ ├── portada.html
│ ├── carrito.html
│ └── producto.html
├── public/
│ └── styles/
│ ├── portada.css
│ └── carrito.css
├── swagger/
│ └── swagger.js
├── app.js
├── package.json
└── README.md

---

## 🧬 Modelo de datos

```js
const productoSchema = new mongoose.Schema({
  categoría: String,
  url_img: String,
  precio_euros: Number,
  precio_rebajado: { type: Number, default: 0 },
  texto_1: String,
  texto_2: String
});

