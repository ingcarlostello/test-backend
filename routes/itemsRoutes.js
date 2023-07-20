// @express
import express from "express";

// @controllers
import { getMercadoLibreItems, getProductDetails } from "../controllers/itemsController.js";

const router = express.Router();

router.get("/", getMercadoLibreItems);

router.get("/:id", getProductDetails);

export default router;

