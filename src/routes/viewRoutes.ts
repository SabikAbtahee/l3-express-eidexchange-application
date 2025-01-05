import { Router } from "express";
import path from "path";

const router = Router();

router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../", "views", "home.html"));
});

router.get("/event-created/:eventId", (req, res) => {
	res.sendFile(path.join(__dirname, "../", "views", "event-created.html"));
});

router.get("/manage-event/:eventId", (req, res) => {
	res.sendFile(path.join(__dirname, "../", "views", "manage-event.html"));
});

router.get("/participant/:participantId", (req, res) => {
	res.sendFile(path.join(__dirname, "../", "views", "participant.html"));
});

router.get("/wishlist/:eventId", (req, res) => {
	res.sendFile(path.join(__dirname, "../", "views", "wishlist.html"));
});

export default router;
