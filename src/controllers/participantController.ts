import { isInviteEnabled } from "../utils/util";
import { Collections } from "../const/models.const";
import ParticipantModel from "../models/participant.model";
import { sendParticipantInvitationMail } from "./emailSender";

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
    if (participant && isInviteEnabled(participant.LastEmailSentTime)) {
        await sendParticipantInvitationMail({
            BaseUrl: req.baseUrl,
            ParticipantId: participant._id.toString(),
            AssignedParticipantNames: participant.AssignedToParticipantIds[0].Name,
            ReceiverEmail: participant.Email,
            ReceiverName: participant.Name
        });
        await ParticipantModel.findOneAndUpdate({ _id: participantId }, { LastEmailSentTime: new Date() })
        return res.status(200).json({ message: "Invite sent" })

    }
    return res.status(400).json({ message: "cannot send" })

}