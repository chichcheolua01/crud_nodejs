import { create, getAll, remove, update, get } from "../controllers/product";
import express from "express";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.delete("/products/:id", remove);
router.post("/products", create);
router.put("/products/:id", update);

export default router;
