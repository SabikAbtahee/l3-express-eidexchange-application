export interface IParticipants{
    _id: string;
    Name: string;
    Email: string;
    EventId: string;
    Wishlist: Array<string>;
    AssignedToParticipantIds: Array<IParticipants>;
    IsEventViewed: boolean;
    IsHost: boolean;
}