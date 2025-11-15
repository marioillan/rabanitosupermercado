import express from "express";
import Producto from "../model/Producto.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       required:
 *         - categoría
 *         - url_img
 *         - precio_euros
 *         - texto_1
 *         - texto_2
 *       properties:
 *         _id:
 *           type: string
 *         categoría:
 *           type: string
 *         url_img:
 *           type: string
 *         precio_euros:
 *           type: number
 *         precio_rebajado:
 *           type: number
 *         texto_1:
 *           type: string
 *         texto_2:
 *           type: string
 */

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */

// GET /api/productos
router.get("/productos", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.json({ message: error });
  }
});

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 */

// GET /api/productos/:id
router.get("/productos/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    res.json(producto);
  } catch (error) {
    res.json({ message: error });
  }
});


/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *       400:
 *         description: Datos inválidos
 */

// POST /api/productos
router.post("/productos", async (req, res) => {
  const producto = new Producto({
    categoría: req.body.categoría,
    url_img: req.body.url_img,
    precio_euros: req.body.precio_euros,
    texto_1: req.body.texto_1,
    texto_2: req.body.texto_2
  });

  try {
    const saved = await producto.save();
    res.json(saved);
  } catch (error) {
    res.json({ message: error });
  }
});


/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 */
// DELETE /api/productos/:id
router.delete("/productos/:id", async (req, res) => {
  try {
    const deleted = await Producto.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.json({ message: error });
  }
});


/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualizar precio de un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               precio_euros:
 *                 type: number
 *               precio_rebajado:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
// PUT /api/productos/:id
router.put("/productos/:id", async (req, res) => {
  try {
    const updated = await Producto.findByIdAndUpdate(
      req.params.id,
      {
        precio_euros: req.body.precio_euros,
        precio_rebajado: req.body.precio_rebajado
      },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.json({ message: error });
  }
});

export default router;
