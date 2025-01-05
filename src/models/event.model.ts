import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const eventSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: uuidv4,
		trim: true
	},
	Message: {
		type: String,
		required: [true, "An event must have a message"],
		trim: true
    },
    LastUpdateDate: {
		type: Date,
    },
    CreateDate: {
		type: Date,
        default: Date.now
	},
	EventDate: {
		type: Date,
		required: [true, "An event must have a date"]
	},
	Location: {
		type: String,
		required: [true, "An event must have a location"],
		trim: true
	},
	Amount: {
		type: String,
        required: [true, "An event must have an amount"],
		trim: true
	}

},{collection:"Events",versionKey:false});

eventSchema.pre("save", function (this: any, next: () => void)
{
    this.LastUpdateDate = Date.now();
    next();
});

const EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;