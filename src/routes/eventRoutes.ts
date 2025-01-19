import { Router } from "express";
import * as eventController from "../controllers/eventController";

const router = Router();

router.route("/").get(eventController.renderCreateEventPage);

router.route("/create-event").post(eventController.createEvent);

router.route("/manage-event/:eventId").get(eventController.renderManageEvent);

router.route("/initiate-event/:eventId").post(eventController.initiateEvent)

router.route("/get-event/:eventId").get(eventController.getEvent);

router.route("/verify-event/:eventId/:secretId").get(eventController.verifyEvent)


export default router;
