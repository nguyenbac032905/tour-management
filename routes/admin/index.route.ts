import { Express } from "express";
import categoryRoutes from "./category.route";
import systemConfig from "../../config/systemConfig";
import tourRoutes from "./tour.route";
import uploadRoutes from "./upload.route";
const adminRoutes = (app:Express) => {
    const PATH_ADMIN = `${systemConfig.PATH_ADMIN}`;
    app.use(PATH_ADMIN + "/categories", categoryRoutes);
    app.use(PATH_ADMIN + "/tours", tourRoutes);
    app.use(PATH_ADMIN + "/upload", uploadRoutes);
}
export default adminRoutes;