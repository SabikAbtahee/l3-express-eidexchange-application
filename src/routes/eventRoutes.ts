import { Router } from "express";
import { createEvent } from "../controllers/eventController"; // Adjust the path as necessary

const router = Router();

router.route("/").post(createEvent); //.put(updateEvent)

// router.route("/add_participants").post(createEvent);
// router.route("/add_participants").post(createEvent);



export default router;


// Create Event
// Update event, Add participant To Event
// 