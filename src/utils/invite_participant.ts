import { sendParticipantInvitationMail } from "../controllers/emailSender";

export const sendInvitationToParticipants = async (participants: any[], baseUrl: string) => {
    participants.forEach(async participant => {
        await sendParticipantInvitationMail({
            BaseUrl: baseUrl,
            ParticipantId: participant._id,
            AssignedParticipantNames: participant.AssignedToParticipantName,
            ReceiverEmail: participant.Email,
            ReceiverName: participant.Name
        });
    })
}
