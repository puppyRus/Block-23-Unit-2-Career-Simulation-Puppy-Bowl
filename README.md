# Puppy-Bowl
## Assignment
Create a mini-game that allows you to create teams of puppies to compete in a Puppy Bowl.
Use the API to access the current players. Then render all the puppies and their team rosters.

## Solution
We created a deck for all the competitors. Each one created by a Class that utilizes the data fetch from the API. We also created a form that allows you to create your own puppy and add it to a team to compete. 

The mini game sets random numbers to each player and the adds all the current contester points.

## Functions
- fetchAllPlayers()
- fetchSinglePlayer()
- addNewPlayer()
- removePlayer()
- renderAllPlayers()
- renderNewPlayerForm()

## Structure

### buttons

## CSS
### Classes
- .card


### ID's
- #all-players-container
- #new-player-form
- puppy-${this.id}


## Card Class
the the module help us create a card and with its createCard() method it, let us create cards with our API collection. 
