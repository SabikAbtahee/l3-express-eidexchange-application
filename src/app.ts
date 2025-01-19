import express from "express";
import eventRouter from "./routes/eventRoutes";
import participantRouter from "./routes/participantRoutes"
import path from "path";
import bodyParser from "body-parser";
import * as errorController from "./controllers/errorController";


const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
        next();
    }
);
app.use((req, res, next) => {
    const host = req.get('host'); 
    req.baseUrl = `${req.protocol}://${host}`; 
    next();
});
  
app.use(eventRouter);
app.use("/participant", participantRouter);

app.use(errorController.get404);



export default app;
