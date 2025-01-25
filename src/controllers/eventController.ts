import { randomUUID } from "crypto";
import EventModel from '../models/event.model';
import ParticipantModel from "../models/participant.model";
import { sendEventCreationMail } from "./emailSender";
import { assignParticipants } from "../utils/shuffle_participants";
import { sendInvitationToParticipants } from "../utils/invite_participant";
import { IEvent } from "../interfaces/IEvent";
import { IParticipants } from "../interfaces/IParticipants";
import { isInviteEnabled } from "../utils/util";

export const createEvent = async (req, res, next) => {
    const { Event_Name, EventDate, Location, Amount, HostName, HostEmail, Participants, Message } = req.body;
    const eventId = randomUUID();
    const secretId = randomUUID();

    const newEvent = new EventModel({
        _id: eventId,
        SecretId: secretId,
        Name: Event_Name,
        Message,
        EventDate: new Date(EventDate),
        Location,
        Amount
    });
    await newEvent.save();

    const hostParticipant = new ParticipantModel({
        Name: HostName,
        Email: HostEmail,
        EventId: eventId,
        Wishlist: [],
        IsEventViewed: false,
        IsHost: true
    });
    await hostParticipant.save();

    const participantPromises = Participants.map((participant: any, index: number) => {
        return new ParticipantModel({
            Name: participant.Name,
            Email: participant.Email,
            EventId: eventId,
            Wishlist: [],
            IsEventViewed: false,
            IsHost: false
        }).save();
    });

    await Promise.all(participantPromises);

    res.render('event-created-page', {
        hostName: hostParticipant.Name,
        hostEmail: hostParticipant.Email
    })
    await sendEventCreationMail({
        BaseUrl: req.baseUrl,
        EventId: eventId,
        ReceiverEmail: HostEmail,
        ReceiverName: HostName
    });
};

export const renderCreateEventPage = (req: any, res: any, next: any) => {
    res.render("create-event-page");
};

export const renderEventCreated = (req, res) => {
    res.render('event-created', { eventId: req.params.eventId });
}

export const renderManageEvent = async (req, res) => {
    let event: IEvent | null;
    let participants: Array<IParticipants> | null | any;
    const { eventId } = req.params;

    // get event details
    try {
        event = await EventModel.findById(eventId);
        participants = await ParticipantModel.find({ EventId: eventId }).populate('AssignedToParticipantIds');
        if (!event || !participants) {
            return res.status(404).render("404");
        }
        participants.sort((a, b) => b.IsHost - a.IsHost);
        participants.forEach(res => {
            res.isInviteEnabled = isInviteEnabled(res.LastEmailSentTime) && !res.IsEventViewed;
        })

    }
    catch (err) {
        return res.status(404).render("404");
    }
    // get participants details
    // Add js to add participants
    // Add js to remove participants
    // Edit participants
    // Add button to update party details
    // 

    res.render("manage-event", {
        event: event,
        participants: participants
    });
}

export const getEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        const event = await EventModel.findById(eventId).exec();
        if (!event) {
            res.status(404).json({ message: "Event not found" });
        }
        const participants = await ParticipantModel.find({ EventId: eventId }).exec();
        res.status(200).json({ Event: event, Participants: participants });
    } catch (error) {
        res.status(404).json({ message: "Event or participants not found" });
    }
}

export const verifyEvent = async (req, res) => {
    const { eventId, secretId } = req.params;
    try {
        const event = await EventModel.isEventAvailable(eventId, secretId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        return res.status(200).json({ message: "Event is Valid" });
    } catch (error) {
        return res.status(404).json({ message: "Failed to validate event" });
    }

}

export const initiateEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        const isInitiated = await EventModel.isEventInitiated(eventId);
        if (isInitiated) {
            return renderManageEvent(req, res);
        }
        const participants = await ParticipantModel.find({ EventId: eventId });
        const participantMap = assignParticipants(participants);
        const participantPromises = participants.map((participant: any, index: number) => {
            participant.AssignedToParticipantName = [participants.find(res => res._id == participantMap.get(participant._id))?.Name];
            return ParticipantModel.findOneAndUpdate({ _id: participant._id },
                {
                    AssignedToParticipantIds: [participantMap.get(participant._id)],
                },
                { new: false });
        });

        await Promise.all(participantPromises);
        await sendInvitationToParticipants(participants, req.baseUrl);
        await EventModel.initiateEvent(eventId);
        return renderManageEvent(req, res);
    }
    catch (error) {
        return res.status(404).render("404");
    }

}
