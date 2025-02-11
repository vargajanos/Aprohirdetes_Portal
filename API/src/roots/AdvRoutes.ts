import { Router } from "express";
import * as productController from "../controllers/AdvController";
import { authMiddleware } from "../middlewares/AuthMidleware";
 
const router = Router();

// add new product
router.post("/", productController.addAdvertisement);

// get all product
router.get("/", authMiddleware, productController.getAll);

// get product by id
router.get("/byid/:id", authMiddleware, productController.getAdvertisement);
 
// update product
router.patch("/:id", authMiddleware, productController.updateAdvertisement);
 
// delete product
router.delete("/:id", authMiddleware, productController.deleteAdvertisement);

export default router;