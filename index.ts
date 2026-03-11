import express,{Express} from "express";
import dotenv from "dotenv";
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import systemConfig from "./config/systemConfig";
import path from "path";
import moment from "moment";

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

clientRoutes(app);
adminRoutes(app);
app.locals.prefixAdmin = systemConfig.PATH_ADMIN;

app.locals.moment = moment;

app.set("views", "./views");
app.set("view engine", "pug");

app.use("/tinymce", express.static(path.join(__dirname, "node_modules", "tinymce")));

app.use(express.static(path.join(__dirname,"public")));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})