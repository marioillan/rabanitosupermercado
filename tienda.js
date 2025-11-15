// tienda.js 
import express   from "express"
import nunjucks  from "nunjucks"
import session from "express-session";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import ApiRouter from "./routes/api_productos.js";
import morgan from "morgan";
import logger from "./winston-logging/logger.js";
import { swaggerUi, swaggerSpec } from "./swagger/swagger.js";

      
import connectDB from "./model/db.js"
await connectDB()

const app = express()

const IN = process.env.IN || 'development'

app.use(session({
	secret: 'my-secret',      // a secret string used to sign the session ID cookie
	resave: false,            // don't save session if unmodified
	saveUninitialized: false  // don't create session until something stored
}))

app.use((req, res, next) => {
  const carrito = req.session.carrito || [];
  const total_unidades = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  const total_carrito = carrito.reduce((sum, item) => {
    const precio = (item.precio_rebajado && item.precio_rebajado !== 0)
      ? item.precio_rebajado
      : item.precio_euros;
    return sum + (precio * item.cantidad);
  }, 0).toFixed(2);

  app.locals.carrito = carrito;
  app.locals.total_unidades = total_unidades;
  app.locals.total_carrito = total_carrito;

  next();
});

nunjucks.configure('views', {       
	autoescape: true,
	noCache:    IN === 'development',
	watch:      IN === 'development', 
	express: app
})

// Para procesar datos de formularios
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.json());

app.use("/api", ApiRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🧩 Middleware global de autenticación
const autenticacion = (req, res, next) => {
  const token = req.cookies.access_token;

  if (token) {
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY);
      // Guardamos el nombre de usuario en el request y en las plantillas
      req.username = data.usuario;
      req.isAdmin = data.admin;
      app.locals.usuario = data.usuario;
      app.locals.admin = data.admin;
    } catch (err) {
      console.warn("Token inválido o expirado:", err.message);
      req.username = null;
      req.isAdmin = false;
      app.locals.usuario = null;
      app.locals.admin = false;
    }
  } else {
    req.username = null;
    req.isAdmin = false;
    app.locals.usuario = null;
    app.locals.admin = false;
  }

  next();
};

app.use(autenticacion);

import TiendaRouter from "./routes/router_tienda.js"
app.use("/", TiendaRouter);

import UsuariosRouter from "./routes/router_usuario.js"
app.use("/usuarios", UsuariosRouter); // para urls que comienzen por /usuarios

app.use(
  morgan("tiny", {
    stream: {
      write: message => logger.info(message.trim())
    }
  })
);

app.set('view engine', 'html')
app.use('/static', express.static('public')) 

app.get("/hola", (req, res) => {
  res.send('Hola desde el servidor');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en  http://localhost:${PORT}`);
})