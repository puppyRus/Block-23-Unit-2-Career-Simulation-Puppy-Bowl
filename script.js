const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2302-ACC-PT-WEB-PT-D";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(APIURL + "/players");
    const players = await response.json();
    return players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!(fetchAllPlayers)", err);
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}` + "/players/" + `${playerId}`);
    const player = await response.json();
    return player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

const addNewPlayer = async (playerObj) => {
  try {
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

const removePlayer = async (playerId) => {
  try {
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
  try {
    let playerContainerHTML = "";
    playerList.forEach((player) => {
      playerContainerHTML += `
        <div class="player-card">
          <h2>${player.name}</h2>
          <p>Breed: ${player.breed}</p>
          <p>Status: ${player.status}</p>
          <img src="${player.imageUrl}" alt="${player.name}">
          <button class="details-button" data-id="${player.id}">See Details</button>
          <button class="remove-button" data-id="${player.id}">Remove from Roster</button>
        </div>
      `;
    });
    playerContainer.innerHTML = playerContainerHTML;

    // Add event listeners to buttons
    const detailsButtons = document.querySelectorAll(".details-button");
    detailsButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        const id = event.target.dataset.id;
        const player = await fetchSinglePlayer(id);
        console.log(player);
        // Do something with the player details
      });
    });

    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        const id = event.target.dataset.id;
        await removePlayer(id);
        // Refresh player list
        const players = await fetchAllPlayers();
        renderAllPlayers(players);
      });
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering players!(removeButtons)", err);
  }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    const formHTML = `
      <h2>Add a New Player</h2>
      <form id="new-player-form">
        <label for="name">Name:</label>
        <input type="text" id="name" required autocomplete="on">
        <label for="breed">Breed:</label>
        <input type="text" id="breed" required autocomplete="on">
        <label for="status">Status:</label>
        <input type="text" id="status" required autocomplete="on">
        <label for="imageUrl">Image URL:</label>
        <input type="text" id="imageUrl" required autocomplete="on">
        <button type="submit">Add Player</button>
      </form>
    `;
    newPlayerFormContainer.innerHTML = formHTML;

    const form = newPlayerFormContainer.querySelector("#new-player-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const breed = document.getElementById("breed").value;
      const status = document.getElementById("status").value;
      const imageUrl = document.getElementById("imageUrl").value;
      const newPlayerObj = {
        name,
        breed,
        status,
        imageUrl,
      };
      await addNewPlayer(newPlayerObj);
      // Refresh player list
      const players = await fetchAllPlayers();
      renderAllPlayers(players);
      // Clear form fields
      form.reset();
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

init();
