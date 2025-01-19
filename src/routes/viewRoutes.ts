import { Router } from "express";
import path from "path";

const router = Router();

router.get("/", (req, res) => {
    res.render("home");
});





router.get("/participant/:participantId", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "views", "participant.html"));
});

router.get("/wishlist/:eventId", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "views", "wishlist.html"));
});

router.get("/wishlist/:eventId", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "views", "wishlist.html"));
});

export default router;
