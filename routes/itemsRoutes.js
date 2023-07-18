// @express
import express from "express";

// @controllers
import { getMercadoLibreItems } from "../controllers/itemsController.js";

const router = express.Router();

router.get("/", getMercadoLibreItems);

//router.get("/:id", getDetailsProduct);

export default router;
