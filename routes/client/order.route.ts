import { Router} from "express";

const router: Router = Router();
import * as controller from "../../controllers/client/order.controller";

router.post("/", controller.index);
router.get("/success", controller.success);

export default router;