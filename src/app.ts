import express from "express";
import eventRouter from "./routes/eventRoutes";
import manageRouter from "./routes/manage";
import viewRouter from "./routes/viewRoutes";
import path from "path";

const expressHbs = require("express-handlebars");


const app = express();

app.engine(
	"hbs",
	expressHbs({
		layoutsDir: "views/layouts/",
		defaultLayout: "main-layout",
		extname: "hbs"
	})
);
app.set("view engine", "hbs");
app.set("views", "views");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
	(req: express.Request, res: express.Response, next: express.NextFunction) => {
		console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
		next();
	}
);

app.use("/api/v1/events", eventRouter);
app.use("/manage", manageRouter);
app.use("/manage/:eventId", manageRouter);
app.use("/created/:eventId", manageRouter);
app.use("/participant/:participantId", manageRouter);
app.use("/", viewRouter);


export default app;
