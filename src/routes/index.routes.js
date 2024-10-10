import { Router } from "express";

import suspeitosRoutes from "./suspeitos.routes.js";

const routes = Router();

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Tá funcionando top !!!" });
});

routes.use("/suspeitos", suspeitosRoutes);

export default routes;