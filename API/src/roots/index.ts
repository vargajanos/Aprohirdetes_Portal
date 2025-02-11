import { Router } from "express";
import userRoutes from "./UserRoutes";
import advRoutes from "./AdvRoutes";

/* további példák:
import productRoutes from "./product.routes";
import orderRoutes from "./order.routes";
import customerRoutes from "./customer.routes";
*/
 
const router = Router();
 
// regisztráljuk az útvonalakat
router.use("/users", userRoutes);
router.use("/adv", advRoutes)

/* további példák:
router.use("/products", productRoutes);
router.use("/customers", customerRoutes);
*/
 
export default router;