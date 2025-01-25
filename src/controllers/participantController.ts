import { arraysEqualIgnoringOrder, isInviteEnabled } from "../utils/util";
import { Collections } from "../const/models.const";
import ParticipantModel from "../models/participant.model";
import { sendParticipantInvitationMail, sendWishlistUpdatedMail } from "./emailSender";
import EventModel from "../models/event.model";

export const participantMatches = async (req, res, next) => {
    const { eventId } = req.params;
    const participants = await ParticipantModel.find({ EventId: eventId }).populate({ path: "AssignedToParticipantIds", model: Collections.Participants });
    let matches = participants.map(res => {
        const assignee: any = res.AssignedToParticipantIds[0];
        return {
            member: `${res.Name} (${res.Email})`,
            assignee: `${assignee?.Name} (${assignee?.Email})`
        }
    })
    res.render("participant-matches-page", {
        matches: matches,
        eventId: eventId
    })
}

export const participantWishlist = async (req, res, next) => {
    const { eventId } = req.params;
    const participants = await ParticipantModel.find({ EventId: eventId });
    const list = participants.map(res => {
        return {
            name: res.Name,
            wishlist: res.Wishlist
        }
    })
    res.render("participant-wishlist-page", {
        list: list,
        eventId: eventId
    })
}

export const inviteParticipant = async (req, res, next) => {
    const { participantId } = req.params;
    const participant: any = await ParticipantModel.findOne({ _id: participantId }).populate("AssignedToParticipantIds");
    if (participant && isInviteEnabled(participant.LastEmailSentTime) && !participant.IsEventViewed) {
        await sendParticipantInvitationMail({
            BaseUrl: req.baseUrl,
            ParticipantId: participant._id.toString(),
            AssignedParticipantNames: [participant.AssignedToParticipantIds[0].Name],
            ReceiverEmail: participant.Email,
            ReceiverName: participant.Name
        });
        await ParticipantModel.findOneAndUpdate({ _id: participantId }, { LastEmailSentTime: new Date() })
        return res.status(200).json({ message: "Invite sent" })

    }
    return res.status(400).json({ message: "cannot send" })

}

export const participantDetail = async (req, res, next) => {
    const { participantId } = req.params;
    const participant: any = await ParticipantModel.findOne({ _id: participantId }).populate("AssignedToParticipantIds");
    if (!participant) {
        return res.status(404).render("404");
    }
    const event: any = await EventModel.findOne({ _id: participant.EventId });
    if (!event) {
        return res.status(404).render("404");
    }
    const host = await ParticipantModel.findOne({ EventId: event._id, IsHost: true });
    if (!host) {
        return res.status(404).render("404");
    }

    if (!participant.IsEventViewed) {
        await ParticipantModel.findOneAndUpdate({ _id: participantId }, { IsEventViewed: true })
    }
    return res.render("participant-detail", {
        participant: participant,
        event: event,
        host: host
    })

}

export const updateParticipantWishlist = async (req, res, next) => {
    const { participantId } = req.params;
    const participant: any = await ParticipantModel.findOne({ _id: participantId }).populate("AssignedToParticipantIds");
    if (!participant) {
        return res.status(404).render("404");
    }
    const wishlist = req.body.wishlist.filter(res => res !== "");
    if (!arraysEqualIgnoringOrder(participant.Wishlist, wishlist)) {

        await ParticipantModel.findOneAndUpdate({ _id: participantId }, { Wishlist: wishlist }, { new: true });
        const assignedOne = await ParticipantModel.getAssignedParticipantGivenCurrentParticipant(participantId);
        if (assignedOne) {
            await sendWishlistUpdatedMail({
                BaseUrl: req.baseUrl,
                ParticipantId: assignedOne._id.toString(),
                AssignedParticipantNames: [participant.Name],
                ReceiverEmail: assignedOne.Email,
                ReceiverName: assignedOne.Name
            });
        }
    }
    return res.redirect(`/participant/${participantId}`);

}

