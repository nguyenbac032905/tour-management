import { Express } from "express";
import categoryRoutes from "./category.route";
import systemConfig from "../../config/systemConfig";
const adminRoutes = (app:Express) => {
    const PATH_ADMIN = `${systemConfig.PATH_ADMIN}`;
    app.use(PATH_ADMIN + "/categories", categoryRoutes);
}
export default adminRoutes;