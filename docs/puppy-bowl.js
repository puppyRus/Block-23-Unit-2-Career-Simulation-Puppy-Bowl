//
const teamsContainer = document.querySelector('#teams-container') 

//sets score to the players
const getScore = () =>{ return Math.floor(Math.random()*10+2)};
//console.log(getScore())

//fetch teams 
const fetchAllTeams = async () =>{
    try {
        const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2302-acc-pt-d/teams");
        const teams = response.json();
        return teams;
    } catch (error) {
        console.error(error)
    }
}

//render all teams
const renderAllTeams = (teams)=>{
    console.log("teams:",teams)
    //
    // const teamsTitle = document.createElement("h2");
    // teamsTitle.innerText = "Teams"
    // teamsContainer.appendChild(teamsTitle);
    const miniGame = document.createElement("div");
    miniGame.setAttribute("id","mini-game")
    teamsContainer.appendChild(miniGame);
    //loop thru each team and get their name, id, players
    teams.forEach( e =>{
        console.log("team name:", e.name);    
        //create html
        const teamPlayers = document.createElement('div');
        teamPlayers.setAttribute("class","team");
        teamPlayers.setAttribute("id", `team-${e.id}`);
        teamPlayers.innerHTML = `
            <h3>Team</h3>
            <h4>${e.name}</h4>
            <ul class="players"></ul>
        `;
        miniGame.appendChild(teamPlayers);
        //render players
        const players = e.players;
        const playerList = teamPlayers.querySelector("ul.players");
        players.forEach(element =>{
            console.log("player name:", element.name);
            const player = document.createElement('li');
            player.innerText = `${element.name} - ${element.status}`;      
            playerList.appendChild(player);      
        });
    })
    const startButton = document.createElement("button");
    startButton.innerText = "Start Bowl"
    startButton.setAttribute("onclick",`play()`);
    teamsContainer.appendChild(startButton);
    startButton.setAttribute("id", "start");
}

//play 
const play = async () =>{
    //fetch teams
    const response = await fetchAllTeams();//fet response
    const teams = response.data.teams;//get teams from data response
    //teams
    const totalScores = []
    teams.forEach(e =>{
        //Create variables
        let team = e.players; //get players from team to play 
        let score = 0;//set score to 0
        let players = [];//keep track of individual points
        console.log("team",team)
        team.forEach(element => {
            if (element.status == "field"){//check which teammates are going to play
                let points = getScore();//invoke function to get score
                console.log(`${element.name} gets ${points}`);
                players.push(points);//add points to each player
                score += points; //keep track of the score
                //console.log("Score:",score);
            }
        });
        console.log("Total score",score);
        console.log(players);
        totalScores.push(score);
        //Case scenarios
        if(score === 60){
            console.log("Perfect score, your Puppies are awesome")
        }else if(score < 60 && score > 25){
            console.log("Good work, overall performance from your puppies");
        }else{
            console.log("Low Performance");
        }
        return score;
    });//changes team
    console.log("Scores",totalScores)
    totalScores[0] > totalScores[1] ? alert(`Team 1 won with ${totalScores[0]} points`) : alert(`Team 2 won with ${totalScores[1]}`); // check who won
}


const init = async ()=>{
    //fetch teams
    const response = await fetchAllTeams();//fet response
    const teams = response.data.teams;//get teams from data response
    //console.log("Teams:", teams);
    
    //render teams
    renderAllTeams(teams);
    
    //play
   
    
}

init();
