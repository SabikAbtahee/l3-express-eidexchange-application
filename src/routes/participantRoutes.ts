import { Router } from "express";
import * as participantController from "../controllers/participantController";

const router = Router();


router.route("/participants-matches/:eventId").get(participantController.participantMatches);
router.route("/participants-wishlist/:eventId").get(participantController.participantWishlist);
router.route("/invite-participant/:participantId").post(participantController.inviteParticipant);
router.route("/participant/:participantId").get(participantController.participantDetail);
router.route("/update-wishlist/:participantId").post(participantController.updateParticipantWishlist);



// router.route("/add_wishlist").post(createEvent);
// router.route("/send_message").post(createEvent);




export default router;


// Post Add Wishlist 
// Get participant
// Get all Wishlist
// Post Send Email message to participant
// Resend Event Email to participant