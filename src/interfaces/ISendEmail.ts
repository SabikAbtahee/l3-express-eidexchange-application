export interface ISendEmail {
    BaseUrl: string;
    Subject: string;
    Template: string;
    ReceiverEmail: string;
    ReceiverName: string;
}