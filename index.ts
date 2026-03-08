import express,{Express} from "express";
import dotenv from "dotenv";
import clientRoutes from "./routes/client/index.route";

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT);
clientRoutes(app);

app.set("views", "./views");
app.set("view engine", "pug");

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})