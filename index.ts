import express,{Express} from "express";
import dotenv from "dotenv";
import clientRoutes from "./routes/client/index.route";
import path from "path";
import moment from "moment";

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT);
clientRoutes(app);

app.locals.moment = moment;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname,"public")));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})