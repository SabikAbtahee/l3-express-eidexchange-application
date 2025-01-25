export const getCreateEventEmailTemplate = function (manageLink: string) {
    return {
        template: ` <div style="text-align: center;">
            <h1 style="margin: 20px 0;">Welcome to Eid Exchange</h1>
            <p style="margin: 20px 0;">We are excited to have you on board. Click the button below to start your event.</p>
            <a href='${manageLink}'
             style="display: inline-block; padding: 10px 20px; color: white; background-color: #db1d1d; text-decoration: none; border-radius: 5px;">Start Event</a>
        </div> `,
        subject: `Eid Exchange`
    }
}


export const getParticipantInvitationEmailTemplate = function (inviteLink: string,assignedPerson:string) {
    return {
        template: ` <div style="text-align: center;">
            <h1 style="margin: 20px 0;">Welcome to Eid Exchange</h1>
            <p style="margin: 20px 0;">You are invited for an Eid Exchange event</p>
            <p style="margin: 20px 0;">Your assigned eidi person is ${assignedPerson}</p>
            <a href='${inviteLink}'
             style="display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Add Wishlist</a>
        </div> `,
        subject: `Eid Exchange`
    }



}



export const getWishlistUpdatedEmailTemplate = function (inviteLink: string,assignedPerson:string) {
    return {
        template: ` <div style="text-align: center;">
            <h1 style="margin: 20px 0;">Welcome to Eid Exchange</h1>
            <p style="margin: 20px 0;">Your assigned eidi person ${assignedPerson} has updated the wishlist</p>
            <p style="margin: 20px 0;">Click the link below to see the wishlist</p>
            <a href='${inviteLink}'
             style="display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Check Wishlist</a>
        </div> `,
        subject: `Eid Exchange`
    }



}