export const isInviteEnabled = (time) => {
    if (!time) {
        return true;
    }
    const currentTime = new Date().getTime();
    const lastSentTime = new Date(time).getTime();
    const hoursDifference = (currentTime - lastSentTime) / (1000 * 60 * 60);
    return hoursDifference > 24;
}

export const  arraysEqualIgnoringOrder = (arr1: any[], arr2: any[]): boolean => {
    if (arr1.length !== arr2.length) {
        return false;
    }
    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();
    return sortedArr1.every((value, index) => value === sortedArr2[index]);
}