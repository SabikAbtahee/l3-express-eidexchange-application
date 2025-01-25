1. on route / the main create Event page will render - DONE
2. Anyone must input Date,Location,Amount, Hostname, HostEmail, ParticipantName[], ParticipantEmail[], Message - DONE
3. On clicking CreateEvent it will call create Event function.- DONE
4. This function will ->
    a. Register an event - done
    b. Register the participants - done
    c. Redirect page to event Created - done
    d. Send a verify email to host email - done
    e. It will assign a participant to another randomly. - not done
5. On seeing the mail and clicking on the verify email manage page it will redirect to manage event page
6. On this page the event and all the participants of the event will be fetched
7. It will call GetEvent function and GetParticipants Function
8. This page can call ResendEmail to participant, Add Participant to event, Copy participantInviteLink, updateEvent
9. Link to website - https://eidexchange-gfeqhdgrcbhdeda6.eastus2-01.azurewebsites.net/