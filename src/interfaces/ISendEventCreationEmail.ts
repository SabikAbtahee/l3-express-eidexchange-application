export interface ISendEmailBase {
    BaseUrl: string
    ReceiverEmail: string;
    ReceiverName: string;
}

export interface ISendEventCreationEmail extends ISendEmailBase {
    EventId: string;

}


export interface ISendParticipantInvitationMail extends ISendEmailBase {
    ParticipantId: string;
    AssignedParticipantNames: string[];

}

export interface ISendWishlistUpdatedMail extends ISendParticipantInvitationMail {
}