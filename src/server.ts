import dotenv from 'dotenv';
import app from "./app";
import mongoose from "mongoose";

process.on("uncaughtException", (err) => {
	console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
	console.log(err.name, err.message);
	process.exit(1);
});

dotenv.config({ path: "./config.env" });
const DB: string = process.env.DATABASE || "";

mongoose.connect(DB, {}).then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err: unknown) => {
	console.log("UNHANDLED REJECTION! 💥 Shutting down...");
	if (err instanceof Error) {
		console.log(err.name, err.message);
	}
	server.close(() => {
		process.exit(1);
	});
});
