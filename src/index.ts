import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import logger from "./utils/logger";
import ErrorHandler from "./middleware/error-handler";
import "express-async-errors";
import { connectToRedis } from "./config/redis";
import v1Router from "./routes/index.routes";
require('dotenv'). config();


const app: Express = express();

const port: number|string = process.env.PORT || 3003;

connectToRedis()

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("trust proxy", true);


// Allow all requests from all domains & localhost
app.all("/*", function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
    next();
});

app.get("/", (req: Request, res: Response) =>
    res.status(200).json({ status: "success", message: "News API service up and running", data: null })
);

app.use("/api/v1", v1Router);

app.use((_req:Request, res:Response) => {
    res.status(404).send("Whoops! Route doesn't exist.");
});

app.use(ErrorHandler);
  
app.listen(port , (): void => {
    logger.debug("Connected to Database....");
    logger.debug(`App is live on http://localhost:${port}`);

});

export default app;