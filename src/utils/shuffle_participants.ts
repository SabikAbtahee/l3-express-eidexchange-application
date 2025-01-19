function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const assignParticipants = (participants: any[]) => {
    const shuffledParticipants = shuffleArray([...participants]);
    const assignments = new Map();

    for (let i = 0; i < shuffledParticipants.length; i++) {
        const current = shuffledParticipants[i];
        const next = shuffledParticipants[(i + 1) % shuffledParticipants.length];
        assignments.set(current._id, next._id);
    }

    return assignments;
}


