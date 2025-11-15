// ./routes/router_tienda.js
import express from "express";
import Producto from "../model/Producto.js";
import logger from "../winston-logging/logger.js";
const router = express.Router();
      
router.get('/', async (req, res)=>{
  try {
    const total = await Producto.countDocuments();

    if (total < 3) {
      const productos = await Producto.find({});
      return res.render('portada.html', { productos });
    }
    const productos = await Producto.aggregate([{ $sample: { size: 3 } }]);
    res.render('portada.html', { productos });
  } catch (err) {
    console.error(err)
    res.status(500).send({error:err.message})
  }
})

router.get("/buscar-productos", async (req, res) => {
  try {
    const search = (req.query.query ?? "").trim();
    let productos = [];

    if (search !== "") {
      logger.info(`Búsqueda de productos con término: ${search}`);
      productos = await Producto.find({ texto_1: { $regex: search, $options: "i" } });
    } else {
      productos = await Producto.find({});
    }

    res.render("buscarProductos.html", { productos, query: search });
  } catch (error) {
    logger.error("Error al cargar los productos: " + error);
    res.status(500).send("Error al cargar los productos");
  }
});

router.post("/al_carrito/:id", async (req, res) => {
  const { id } = req.params;
  logger.info(`Añadiendo producto al carrito: ${id}`);

  try {
    const producto = await Producto.findById(id);
    if (!producto) {
      logger.warn(`Producto no encontrado: ${id}`);
      return res.status(404).send("Producto no encontrado");
    }

    if (!req.session.carrito) {
      req.session.carrito = [];
    }

    const itemExistente = req.session.carrito.find(item => item._id === id);

    if (itemExistente) {
      itemExistente.cantidad += 1;
    } else {
      if (producto.precio_rebajado) {
        req.session.carrito.push({
          _id: producto._id.toString(),
          imagen: producto.url_img,
          texto_1: producto.texto_1,
          precio_euros: producto.precio_rebajado,
          cantidad: 1
        });
      } else {
        req.session.carrito.push({
          _id: producto._id.toString(),
          imagen: producto.url_img,
          texto_1: producto.texto_1,
          precio_euros: producto.precio_euros,
          cantidad: 1
        });
      }
    }

    logger.info("Carrito actual: " + JSON.stringify(req.session.carrito));
    res.status(204).end();

  } catch (err) {
    logger.error("Error al añadir producto al carrito: " + err);
    res.status(500).json({ error: "Error al añadir producto al carrito" });
  }
});

router.get("/aniadir-al-carrito/:id", async (req, res) => {
  const { id } = req.params;
  logger.info(`Añadiendo producto al carrito: ${id}`);
  try {
    const producto = await Producto.findById(id);
    if (!producto) {
      logger.warn(`Producto no encontrado: ${id}`);
      return res.status(404).send("Producto no encontrado");
    }
    if (!req.session.carrito) {
      req.session.carrito = [];
    }
    const itemExistente = req.session.carrito.find(item => item._id === id);
    if (itemExistente) {
      itemExistente.cantidad += 1;
    } else {
      req.session.carrito.push({
        _id: producto._id.toString(),
        imagen: producto.url_img,
        texto_1: producto.texto_1,
        precio_euros: producto.precio_rebajado || producto.precio_euros,
        cantidad: 1
      });
    }
    res.redirect("/carrito");
  } catch (err) {
    logger.error("Error al añadir producto al carrito: " + err);
    res.status(500).send("Error al añadir producto al carrito");
  }
});

router.get("/eliminar-del-carrito/:id", (req, res) => {
  const { id } = req.params;
  logger.info(`Eliminando producto del carrito: ${id}`);
  if (!req.session.carrito) {
    req.session.carrito = [];
  } else {
    req.session.carrito = req.session.carrito.filter(item => item._id !== id);
  }
   res.redirect("/carrito");
});

router.get("/carrito", (req, res) => {
  const carrito = req.session.carrito || [];
  const total_carrito = carrito.reduce((sum, item) => {
    const precio = (item.precio_rebajado && item.precio_rebajado !== 0) 
      ? item.precio_rebajado 
      : item.precio_euros;
    
    return sum + (precio * item.cantidad);
  }, 0).toFixed(2);

  res.render("carrito.html", { carrito, total_carrito });
});

// ADMIN

router.get("/productos/:id/editar", async (req, res) => {
  if (!req.isAdmin) {
    logger.warn("Acceso denegado a edición de producto: no tienes permisos de administrador.");
    return res.status(403).send("Acceso denegado: no tienes permisos de administrador.");
  }

  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      logger.warn(`Producto no encontrado para edición: ${req.params.id}`);
      return res.status(404).send("Producto no encontrado.");
    }

    res.render("editarProducto.html", { producto });
  } catch (error) {
    logger.error("Error al cargar el producto: " + error);
    res.status(500).send("Error al cargar el producto.");
  }
});

router.post("/productos/:id/editar", async (req, res) => {
  if (!req.isAdmin) {
    logger.warn("Acceso denegado a edición de producto: no tienes permisos de administrador.");
    return res.status(403).send("Acceso denegado: no tienes permisos de administrador.");
  }

  const { precio_euros, precio_rebajado } = req.body;

  try {
    await Producto.findByIdAndUpdate(req.params.id, {
      precio_euros,
      precio_rebajado: precio_rebajado || 0,
    });

    res.redirect("/");
  } catch (error) {
    logger.error("Error al actualizar el producto: " + error);
    res.status(500).send("Error al actualizar el producto.");
  }
});



export default router