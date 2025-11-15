import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    myapi: "3.0.0",
    info: {
      title: "API de Productos - Rabanito Supermercado",
      version: "1.0.0",
      description: "Documentación de la API REST de productos utilizando Swagger",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Servidor local",
      },
    ],
    components: {
      schemas: {},
    },
  },

  apis: ["./routes/api_productos.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
