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
        const card = document.createElement("div");
        card.setAttribute("class", "card")
        card.setAttribute("id", `puppy-${this.id}`)
        card.setAttribute("min-height", "400px")
        card.innerHTML = `
            <img src=${this.imgUrl} alt="${this.breed} puppy" height="400px">

        `
        card.addEventListener('click', event =>{
            console.log("Back of Card");
            card.innerHTML = `
            <h2>${this.puppyName}</h2>
            <p>${this.breed}</p>
            <p>${this.birth}</p>
            <button class="remove-button" data-id=${this.id}>Remove</button>
            `
        });
        card.addEventListener('mouseout', event =>{
            console.log("Front of Card");
            card.innerHTML = `
            <img src=${this.imgUrl} alt="${this.breed} puppy" height="400px">

        `
        });
        return card;
    } catch (err) {
      console.error("Uh oh, trouble rendering the new player form!", err);
    }
}


