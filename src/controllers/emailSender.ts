import { getCreateEventEmailTemplate, getParticipantInvitationEmailTemplate, getWishlistUpdatedEmailTemplate } from '../const/eidexchange.const';
import { ISendEmail } from '../interfaces/ISendEmail';
import { ISendEventCreationEmail, ISendParticipantInvitationMail, ISendWishlistUpdatedMail } from '../interfaces/ISendEventCreationEmail';
const { EmailClient } = require("@azure/communication-email");
import dotenv from 'dotenv';


dotenv.config();
const connectionString = process.env.EMAIL_CONNECTION_STRING || "";
const client = new EmailClient(connectionString);

export async function sendEventCreationMail(payload: ISendEventCreationEmail) {
    const emailTemplate = getCreateEventEmailTemplate(`${payload.BaseUrl}/manage-event/${payload.EventId}`);
    return sendEmail({
        BaseUrl: payload.BaseUrl,
        Subject: emailTemplate.subject,
        Template: emailTemplate.template,
        ReceiverEmail: payload.ReceiverEmail,
        ReceiverName: payload.ReceiverName,
    })
}

export async function sendParticipantInvitationMail(payload: ISendParticipantInvitationMail) {
    const emailTemplate = getParticipantInvitationEmailTemplate(`${payload.BaseUrl}/participant/${payload.ParticipantId}`, payload.AssignedParticipantNames[0]);
    return sendEmail({
        BaseUrl: payload.BaseUrl,
        Subject: emailTemplate.subject,
        Template: emailTemplate.template,
        ReceiverEmail: payload.ReceiverEmail,
        ReceiverName: payload.ReceiverName,
    })
}

export async function sendWishlistUpdatedMail(payload: ISendWishlistUpdatedMail) { 
    const emailTemplate = getWishlistUpdatedEmailTemplate(`${payload.BaseUrl}/participant/${payload.ParticipantId}`, payload.AssignedParticipantNames[0]);
    return sendEmail({
        BaseUrl: payload.BaseUrl,
        Subject: emailTemplate.subject,
        Template: emailTemplate.template,
        ReceiverEmail: payload.ReceiverEmail,
        ReceiverName: payload.ReceiverName,
    })

}

async function sendEmail(payload: ISendEmail) {
    const message = {
        senderAddress: process.env.SENDER_ADDRESS,
        content: {
            subject: payload.Subject,
            html: payload.Template,
        },
        recipients: {
            to: [
                {
                    address: payload.ReceiverEmail,
                    displayName: payload.ReceiverName,
                },
            ],
        },
    };

    const poller = await client.beginSend(message);
    return await poller.pollUntilDone();
}
