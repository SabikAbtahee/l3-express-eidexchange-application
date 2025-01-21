export const isInviteEnabled= (time) => {
    if (!time) {
        return true;
    }
    const currentTime = new Date().getTime();
    const lastSentTime = new Date(time).getTime();
    const hoursDifference = (currentTime - lastSentTime) / (1000 * 60 * 60);
    return hoursDifference > 24;
}