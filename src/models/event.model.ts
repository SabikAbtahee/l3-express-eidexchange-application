import { Collections } from "../const/models.const";
import mongoose, { Schema } from "mongoose";
import BaseSchema from "./base.model";
import { ValidationMessages } from "../const/validation_messages.const";
import { randomUUID } from "crypto";

const eventSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, ValidationMessages.Event.Name],
        trim: true
    },
    Message: {
        type: String,
        required: [true, ValidationMessages.Event.Message],
        trim: true
    },

    EventDate: {
        type: Date,
        required: [true, ValidationMessages.Event.Date],
    },
    Location: {
        type: String,
        required: [true, ValidationMessages.Event.Location],
        trim: true
    },
    Amount: {
        type: String,
        required: [true, ValidationMessages.Event.Amount],
        trim: true
    },
    IsEventInitiated: {
        type: Boolean,
        default: false
    }

}, {
    collection: Collections.Events, versionKey: false, statics: {
        isEventAvailable: function (eventId: string, secretId: string): boolean {
            return !!this.findOne({ _id: eventId, SecretId: secretId })
        },
        isEventInitiated: function (eventId: string): boolean {
            return !!this.findOne({ _id: eventId, IsEventInitiated: true })
        },
        initiateEvent: async function (eventId: string) {
            await this.findOneAndUpdate({ _id: eventId }, { IsEventInitiated: true }, { new: false });
        }
    }
});

eventSchema.add(BaseSchema);

const EventModel = mongoose.model(Collections.Events, eventSchema);

export default EventModel;


// let model = new EventModel({...}) // creates a new model instance
// model.save(); // saves the model to the database
// model.createEvent(); // logs 'GG
// await EventModel.find(); // finds all the events in the database
// await EventModel.find({ Name: 'My Event' }); // finds all the events with the name 'My Event'
// static vs methods -> static is called on the model itself, methods are called on the instance of the model
// instance methods, statics, query, indexes, virtuals
// can make virtual for date formatting
//const { randomUUID } = require('crypto');