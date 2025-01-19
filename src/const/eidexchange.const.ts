export const getCreateEventEmailTemplate = function (manageLink: string) {
    return {
        template: ` <div style="text-align: center;">
            <img src="cid:image.png" alt="Image" style="width: 100%; max-width: 600px;" />
            <h1 style="margin: 20px 0;">Welcome to Our Service</h1>
            <p style="margin: 20px 0;">We are excited to have you on board. Click the button below to get started.</p>
            <a href='${manageLink}'
             style="display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Get Started</a>
        </div> `,
        subject: `Eid Exchange`
    }



}


export const getParticipantInvitationEmailTemplate = function (inviteLink: string,assignedPerson:string) {
    return {
        template: ` <div style="text-align: center;">
            <img src="cid:image.png" alt="Image" style="width: 100%; max-width: 600px;" />
            <h1 style="margin: 20px 0;">Welcome to Our Service</h1>
            <p style="margin: 20px 0;">You are invited for an Eid Exchange event</p>
            <p style="margin: 20px 0;">You are assigned eidi person is ${assignedPerson}</p>
            <a href='${inviteLink}'
             style="display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Get Started</a>
        </div> `,
        subject: `Eid Exchange`
    }



}