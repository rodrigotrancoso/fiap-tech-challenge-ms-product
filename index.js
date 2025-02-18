import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import productRoutes from "./src/routes/product.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/docs/swagger.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.use(express.json());

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health-check", (req, res) => {
  res.send("Health check passed!");
});

sequelize.authenticate().then(() => {
  app.listen(PORT, () => console.log(`### Servidor rodando na porta ${PORT} ###`));
});
