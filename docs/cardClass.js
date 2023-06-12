//Create a card class that will render our API data
export default class Card{
    constructor(id, puppyName, breed,imgUrl,birth, status, team){//dOb-> Date Of Birth
    this.id = id;//int
    this.puppyName = puppyName; //str
    this.breed = breed; //str
    this.birth = birth; //date
    this.status = status;   //status
    this.imgUrl = imgUrl;   //str
    this.team = team;   //id
    }
}

//create a method that will create our html elements
Card.prototype.createCard = function(){
    try {
        const cardDetails = document.createElement("div");
        cardDetails.setAttribute("class", "card-details");
        cardDetails.setAttribute("id", `puppy-${this.id}`);
        cardDetails.setAttribute("width", "800px");
        cardDetails.innerHTML = `
            <div class="details-sec" id="img">
                <img src=${this.imgUrl} alt="${this.breed} puppy">
            </div>
            <div class="details-sec">
                <h3>Team </h3>
                <ul>
                    <li>Player1<li>
                </ul>
            </div>
            <div class="details-sec">
                <h3>${this.puppyName}</h3>
                <p>${this.breed}</p>
                <p>${this.birth}</p>
            </div>
            <div class="details-sec">
            <button class="remove-button" data-id=${this.id} id=remove-${this.id}"">Close</button>
            </div>

            `
            //acceses the remove butto
        return cardDetails;
    } catch (err) {
      console.error("Uh oh, trouble rendering the new player form!", err);
    }
}





