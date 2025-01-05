1. on route / the main create Event page will render
2. Anyone must input Date,Location,Amount, Hostname, HostEmail, ParticipantName[], ParticipantEmail[], Message
3. On clicking CreateEvent it will call create Event function. 
4. This function will ->
    a. Register an event
    b. Register the participants
    c. Redirect page to event Created
    d. Send a verify email to host email
    e. It will assign a participant to another randomly.
5. On seeing the mail and clicking on the verify email manage page it will redirect to manage event page
6. On this page the event and all the participants of the event will be fetched
7. It will call GetEvent function and GetParticipants Function
8. This page can call ResendEmail to participant, Add Participant to event, Copy participantInviteLink, updateEvent