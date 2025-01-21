import { Collections } from "../const/models.const";
import mongoose, { Schema } from "mongoose";
import validator from "validator";
import BaseSchema from "./base.model";
import { ValidationMessages } from "../const/validation_messages.const";

const participantSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: [true, ValidationMessages.Participant.Name],
            trim: true
        },
        Email: {
            type: String,
            required: [true, ValidationMessages.Participant.Email],
            trim: true,
            validate: [validator.isEmail, ValidationMessages.Participant.Email]
        },
        EventId: {
            type: String,
            ref: Collections.Events,
            required: [true, ValidationMessages.Participant.EventId],
        },
        Wishlist: {
            type: [String],
            trim: true
        },
        AssignedToParticipantIds: {
            type: [String],
            ref: Collections.Participants,
            required: [true, ValidationMessages.Participant.AssignedToParticipantIds],
        },
        IsEventViewed: {
            type: Boolean,
            default: false
        },
        IsHost: {
            type: Boolean,
            default: false
        },
        LastEmailSentTime: {
            type: Date,
            default: null
        }
    },
    {
        collection: Collections.Participants, versionKey: false, statics: {
            getEventWithParticipants: function (eventId) {
                return this.find({ EventId: eventId }).populate('EventId')
            }
        }
    }
);

participantSchema.add(BaseSchema);

const ParticipantModel = mongoose.model(Collections.Participants, participantSchema);

export default ParticipantModel;
