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
    console.log("Teams:", teams);
}



//play 
const play = (team) =>{
    //
    let score = 0;//set score to 0
    let players = [];//keep track of individual points
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
    //Case scenarios
    if(score === 60){
        console.log("Perfect score, your Puppies are awesome")
    }else if(score < 60 && score > 25){
        console.log("Good work, overall performance from your puppies");
    }else{
        console.log("Low Performance");
    }
    return score;
}


const init = async ()=>{
    //fetch teams
    const response = await fetchAllTeams();//fet response
    const teams = response.data.teams;//get teams from data response
    //console.log("Teams:", teams);
    
    //set teams
    const team1 = teams[0].players; //add players to teams
    const team2 = teams[1].players; //add players to team
    //console.log("Eqipos:", team1, team2);
    
    //play
    const scoreTeam1 = play(team1);
    const scoreTeam2 = play(team2);
    scoreTeam1 > scoreTeam2 ? console.log("Team 1 won") : console.log("Team 2 won"); // check who won
    
}

init();
