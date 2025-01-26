import 'module-alias/register';
import app from "./app";
import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();
const DB: string = process.env.DATABASE || "";
const port = process.env.PORT || 3000;
let server;

mongoose.connect(DB, {
    dbName:"EidExchange"
}).then(() => {
    console.log("DB connection successful!");
    server = app.listen(port, () => {
        console.log(`App running on port ${port}...`);
    });
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

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});
