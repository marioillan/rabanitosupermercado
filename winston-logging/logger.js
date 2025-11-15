import winston from "winston";

const logger = winston.createLogger({
  level: "info",

  transports: [
    new winston.transports.Console(),             // imprime por consola
    new winston.transports.File({ filename: "logs/app.log" }),       // logs normales
    new winston.transports.File({ filename: "logs/error.log", level: "error" }) // solo errores
  ]
});

export default logger;
