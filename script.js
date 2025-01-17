const API_URL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2412-ftb-et-web-ft/events";

const partyList = document.querySelector(".list-of-parties");

async function populateParties() {
  const response = await fetch(API_URL);
  const partyObject = await response.json();
  console.log(partyObject);
  let partyListInnerHtml = "";
  partyObject.data.forEach(
    (party) =>
      (partyListInnerHtml += `<tr>
        <td rowspan="4" style="text-align: center; vertical-align: middle;">
          <button class='delete-btn' data-id='${party.id}'>Delete Party</button>
        </td>
        <td>Name</td>
        <td>${party.name}</td>
      </tr>
      <tr>
        <td>Description</td>
        <td>${party.description}</td>
      </tr>
      <tr>
        <td>Date</td>
        <td>${party.date}</td>
      </tr>
      <tr>
        <td>Location</td>
        <td>${party.location}</td>
      </tr>`)
  );

  partyList.innerHTML = partyListInnerHtml;

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const partyId = event.target.dataset.id;
      await deleteParty(partyId);
    });
  });
}

async function addParty(party) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(party),
  });

  if (response.ok) {
    console.log("Party added successfully!");
    populateParties();
  } else {
    console.error("Failed to add party.");
  }
}

async function deleteParty(partyId) {
  const response = await fetch(`${API_URL}/${partyId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    console.log("Party deleted successfully!");
    populateParties();
  } else {
    console.error("Failed to delete party.");
  }
}

const form = document.querySelector(".party-sub-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newParty = {
    name: document.getElementById("party-name").value,
    description: document.getElementById("party-description").value,
    date: document.getElementById("party-date").value,
    location: document.getElementById("party-location").value,
    cohortId: 1191,
  };

  await addParty(newParty);

  form.reset();
});

populateParties();
