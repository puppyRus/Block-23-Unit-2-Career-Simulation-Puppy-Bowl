//import our Card class from our module
import Card from "./cardClass.js";

const playerContainer = document.getElementById("all-players-container");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2302-acc-pt-d";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${APIURL}/players`);
    console.log("response", response);
    const puppies = await response.json();
    console.log("puppies", puppies);
    return puppies.data;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    //fecthing a single player 
    const response = await fetch(`${APIURL}/players/${playerId}`);
    const puppy = response.json
    //logging the puppy id in the console
    console.log("Puppy's Id = ", puppy);
    return puppy;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

const addNewPlayer = async (playerObj) => {

    const newPlayer = {
      name: playerObj.name,
      breed: playerObj.breed,
      status: playerObj.status,
      imageUrl: playerObj.imageUrl,
    };
  
    console.log("New Player: ", newPlayer);
  
    try {
      const response = await fetch(`${APIURL}/players`, {
        method: 'POST',
        headers: {
          'content-type': 'application/JSON', 
        },
        body: JSON.stringify(newPlayer),
        });
        const addedPlayer = response.json();
        console.log("New Player added", addedPlayer);
      } catch (err) {
      console.error("Oops, something went wrong with adding that player!", err);
    }
  }


const removePlayer = async (playerId) => {
  try {
    //seting up a delete method for removing players
    const response = await fetch(`${APIURL}/players/${playerId}`, {
    method:'DELETE',
  });
  const puppy = response.json();
  console.log("Removed puppy #", puppy);
  //updating the api
  fetchAllPlayers();
  //reload the window
  window.location.reload();
} catch (err) {
    }
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
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
    //render all cards
    console.log("players list:",playerList);
    const players = playerList.players;
    console.log("players:", players);

    //we loop thru each player and get their info
    players.forEach(e => {
      console.log("hello", e.name);
      const card = document.createElement("div");
      card.setAttribute("class","flip-card");//set class
      card.setAttribute("id",`card-${e.id}`);//set id
      const flipCard = `
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="${e.imageUrl}" alt="${e.breed} puppy" style="width:300px;height:400px;">
          </div>
          <div class="flip-card-back">
            <h1>${e.name}</h1> 
            <p>${e.breed}</p> 
            <p>${e.status}</p>
            <p>${e.createdAt}</p>
            <button id="details-button">Details</button>
            <button id="delete-button">Delete</button>
          </div>
        </div>
      `
      card.innerHTML = flipCard;
      playerContainer.appendChild(card);
      
      //add event listener to the delete button
      const deleteButton = card.querySelector("#delete-button");
      deleteButton.addEventListener("click", () => handleDeleteButton(e.id));

      //add event listener to the detail button
      const detailButton = card.querySelector("#details-button");
      detailButton.addEventListener("click", () => handleDetailButton(e.id));
    });

  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};

// adding event listener handler when the button is clicked
const handleDeleteButton = async(playerId) => {
  try {
  await removePlayer(playerId);
  console.log("Succesfully removed player ", playerId);
  } catch {
    console.error("Uh oh trouble removing that player!");
  }
};

//adding event listener handler when the button is clicked
const handleDetailButton = async(playerId) => {
  try {
    const playerDetails = await fetchSinglePlayer(playerId);
    console.log("Player details: ", playerDetails);
  } catch {
    console.error("Uh oh trouble displaying details on this player!");
  }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = (newPlayerFormContainer) => {
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
      addNewPlayer(newPlayerObj);
      // // Refresh player list
      // const players = await fetchAllPlayers();   |
      // renderAllPlayers(players);                 |-->
      // Clear form fields                          |
      form.reset();
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

const init = async () => {
    //render title
    const title = document.createElement("h1"); // Create an h1 element
    title.textContent = "Puppy Bowl"; // Set the title text
    document.body.prepend(title); // Prepend the title to the body
 
 //render form
  const newPlayerFormContainer = document.createElement("div"); //create a new element for the form
  newPlayerFormContainer.setAttribute("id", "new-player-form"); //set id
  playerContainer.appendChild(newPlayerFormContainer); //append it to the player container
  renderNewPlayerForm(newPlayerFormContainer); //render form

  //render all players
  const puppies = await fetchAllPlayers(); //fetch all players
  console.log("puppies", puppies.players);
  renderAllPlayers(puppies); //render them
};

init();
