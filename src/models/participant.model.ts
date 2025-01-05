import mongoose from "mongoose";
import { v4 as uuidv4, validate } from "uuid";
import validator from "validator";
const participantSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			default: uuidv4,
			trim: true
		},
		LastUpdateDate: {
			type: Date
		},
		CreateDate: {
			type: Date,
			default: Date.now
		},
		Name: {
			type: String,
			required: [true, "A participant must have a message"],
			trim: true
		},
		Email: {
			type: String,
			required: [true, "A participant must have an email"],
			trim: true,
			validate: [validator.isEmail, "Please provide a valid email"]
		},
		EventId: {
			type: String,
			default: uuidv4,
			required: [true, "A participant must be attached to an event"],
			trim: true
		},
		Wishlist: {
			type: [String],
			trim: true
		},
		AssignedToParticipantIds: {
			type: [String],
			default: uuidv4,
			required: [true, "A participant must be assigned to another participant"],
			trim: true
		},
		IsEventViewed: {
			type: Boolean
		}
	},
	{ collection: "Participants", versionKey: false }
);

participantSchema.pre("save", function (this: any, next: () => void) {
	this.LastUpdateDate = Date.now();
	next();
});

const ParticipantModel = mongoose.model("Participant", participantSchema);

module.exports = ParticipantModel;
