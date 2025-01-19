let participantCounter = 1;

document
	.getElementById("create-event-button")
	.addEventListener("click", function () {
		const element = document.getElementById("create-event-button");
		const participant_element = document.getElementById(
			"add-participant-button"
		);

		event.preventDefault();

		const form = document.querySelector("form");

		if (form.checkValidity()) {
			form.submit();
			element.disabled = true;
			participant_element.disabled = true;
			element.classList.add("disabled");
			element.classList.add("animate-bounce");
			participant_element.classList.add("disabled");
			element.innerText = "Creating Event Please Wait...";
		} else {
			form.reportValidity();
		}
	});

document
	.getElementById("add-participant-button")
	.addEventListener("click", function () {
		const container = document.getElementById("participants-container");
		const newParticipant = document.createElement("div");
		newParticipant.classList.add(
			"participant",
			"flex",
			"flex-row",
			"justify-between",
			"gap-4"
		);
		newParticipant.innerHTML = `
            <div>
                <label for="ParticipantName">Participant Name:</label>
                <input type="text" name="participants[${participantCounter}][name]" required />
            </div>
            <div>
                <label for="ParticipantEmail">Participant Email:</label>
                <input type="email" name="participants[${participantCounter}][email]" required />
            </div>
        `;
		container.appendChild(newParticipant);
		participantCounter++;
	});
