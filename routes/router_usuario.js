import express from "express";
import jwt from "jsonwebtoken";
import Usuario from "../model/usuario.js";
import logger from "../winston-logging/logger.js";
const router = express.Router();

// Login
router.get('/login', (req, res)=>{
    logger.info("Acceso a formulario de login");
	res.render("login.html")
})
				
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  logger.info(`Intento de login para usuario: ${username}`);

  try {
    const user = await Usuario.findOne({ username });

    if (!user) {
      logger.warn(`Usuario no encontrado: ${username}`);
      return res.render("login.html", { errorLoginUser: "Usuario no encontrado", errorLoginPassword: null, error: null });
    }

    const esValido = await user.compararPassword(password);
    if (!esValido) {
      logger.warn(`Contraseña incorrecta para usuario: ${username}`);
      return res.render("login.html", { errorLoginUser: null, errorLoginPassword: "Contraseña incorrecta", error: null });
    }

    logger.info(`Usuario autenticado: ${username}`);

    const token = jwt.sign(
      { usuario: user.username,  admin: user.admin  },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.IN === "production",
      })
      .redirect("/");

  } catch (err) {
    logger.error("Error en login: " + err);
    res.render("login.html", { errorLoginUser: null, errorLoginPassword: null, error: "Error al iniciar sesión" });
  }
});

// Registro
router.get("/registro", (req, res) => {
  logger.info("Acceso a formulario de registro");
  res.render("registro.html", { error: null });
});

router.post('/registro', async (req, res) => { 
	const { username, password } = req.body;
  logger.info(`Intento de registro para usuario: ${username}`);

	try {
		const existe = await Usuario.findOne({ username });
		if (existe) {
      logger.warn(`Intento de registro con usuario existente: ${username}`);
			return res.render("registro.html", {
				errorUsuario: "El usuario ya existe, elige otro nombre de usuario.",
				error: null
			});
		}

    logger.info(`Usuario registrado: ${username}`);
		const nuevoUsuario = new Usuario({ username, password });
		await nuevoUsuario.save();

		res.redirect("/usuarios/login");
	} catch (err) {
		logger.error("Error al registrar usuario: " + err);
		res.render("registro.html", {
			errorUsuario: null,
			error: "Error al registrar. Inténtalo de nuevo."
		});
	}
});

// Salida
router.get('/logout', (req, res) => {
  logger.info(`Usuario deslogueado`);
	res.clearCookie("access_token").redirect("/");
})

export default router;