import { Router} from "express";

const router = Router();
import * as controller from "../../controllers/client/tour.controller";

router.get("/", controller.index);

export default router