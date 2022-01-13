document.addEventListener("DOMContentLoaded", () => {
    const teamPics = document.getElementById('teamPics')
    const p1Points = document.getElementById("p1points")
    const p1Rbds = document.getElementById("p1rbds")
    const p1Bio = document.getElementById("p1Bio")
    const playerImg = document.getElementById("playerImg")
    const p1Head = document.getElementById("p1Head")
    const teamSearchForm = document.getElementById('teamSearch')
    const scoreBoard = document.getElementById('score')
    const playerScroll = document.getElementById('playerScroll')
    const teamVids = document.querySelectorAll('.iframe')
    playerScroll.hidden = true
    teamVids.forEach(vid => {
        vid.hidden = true
    })

    let coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

    fetch(`http://localhost:3000/teams`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        data.forEach(team => {
        const newPicEl = document.createElement('img')
        teamPics.appendChild(newPicEl)
        newPicEl.src = team.myLogo
        newPicEl.className = "img"
        newPicEl.setAttribute('data-id', team.id)
        newPicEl.setAttribute('data-name', team.full_name)
        newPicEl.setAttribute('data-abv', team.abbreviation)
        newPicEl.addEventListener("click", e => {
            let id = e.target.dataset.id
            let teamName = e.target.dataset.name
            let teamAbv = e.target.dataset.abv
            renderTeam(id, teamName, teamAbv)
            teamVids.forEach( vid => {
                vid.hidden = false
            })
            
        })


        })
        // let player1FullName = `${data[0].first_name} ${data[0].last_name}`
        // let teamLogo = data[0].team.logo
        // let playerId = data[0].id
        // playerOne.innerHTML = player1FullName
        // p1Bio.innerHTML = data[0].bio
        // playerImg.src=`${teamLogo}`
        // p1Head.setAttribute("data-id", playerId )

    })

    // fetch('https://www.balldontlie.io/api/v1/season_averages?season=1990&player_ids[]=2931')
    // .then(resp => resp.json())
    // .then(data => {
    //     console.log(data.data[0].pts)
    //     let points = data.data[0].pts
    //     let rbds = data.data[0].reb
    //     p1Points.innerHTML = `Points = ${points}`
    //     p1Rbds.innerHTML = `Rebounds = ${rbds}`
    // })


    // p1Head.addEventListener('click', e =>{
    //     console.log(e)
    //     let playerID = e.target.dataset.id
    //     console.log(playerID)
    //     let newLi = document.getElementById("p1Object")
    //     while (newLi.firstChild){
    //         newLi.removeChild(newLi.firstChild)
    //     }
    //     renderStats2(playerID)
    //     e.preventDefault()
    // })

    teamSearchForm.addEventListener('submit', e => {
        let fname = e.target[0].value
        let lname = e.target[1].value

        fetch(`https://www.balldontlie.io/api/v1/players/?search=${fname}_${lname}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data.data[0])
        })
        e.preventDefault()
    })

})



function renderTeam(id, teamName, teamAbv){
    getgame(teamAbv)
    let searchTerm = encodeURIComponent(teamName)
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCiWLfSweyRNmLpgEHekhoAg&q=${searchTerm}&key=AIzaSyCusVHUTXpJiDroRQXsot5Qjf1GMNtC73o`
    let testUrl = "http://localhost:3000/teams"
    console.log(searchTerm)
    fetch(`${testUrl}`, {
        method: "GET",
        header: {
            "Accept": "application/json"  
     }
    })
    .then(resp => resp.json())
    .then(data => {
        let ytVid2 = document.getElementById('iframe2')
        // let videoId = data.items[0].id.videoId
        // let vidSrc = `https://www.youtube.com/embed/${videoId}`
        let testSrc = "https://www.youtube.com/embed/qEs4T-aErkc"
        ytVid2.src = testSrc
        ytVid2.setAttribute('frameborder', '0')


    })

    fetch(`http://localhost:3000/teams/${id}/players`)
    .then(resp => resp.json())
    .then(data => {

        playerScroll.hidden = false
        const ytPlayer = document.getElementById('iframe1')
        let ytUrl = "https://www.youtube.com/embed/qEs4T-aErkc?autoplay=1"
        ytPlayer.src = ytUrl
        ytPlayer.setAttribute('origin', "http://localhost/")
        ytPlayer.setAttribute('frameborder', '0')
        let playerContainerToRemove = document.getElementById('playersContainer')
        removeAllChildNodes(playerContainerToRemove)
        removeAllChildNodes(playerScroll)

        data.forEach(player => {
            const playerFullName = `${player.firstName} ${player.lastName}`

            const playersContainer = document.getElementById('playersContainer')
            const playerName = document.createElement('li')
            const playerCollapse = document.createElement('button')
            const playerDiv = document.createElement('div')
            const playerUl = document.createElement('ul')
            const playerOption = document.createElement('option')

            playerScroll.appendChild(playerOption)
            playerOption.innerHTML = playerFullName
            playerUl.id = "playerStats"
            playerDiv.className = "content"
            playerCollapse.type = "button"
            playerCollapse.className = "collapsible"
            playerCollapse.innerHTML = "View Season Averages"
            playerCollapse.setAttribute("data-id", player.id)
            playerName.setAttribute("data-id", player.id)
            playerName.className = "strong"
            // console.log(player)
            playerName.innerHTML = playerFullName
            playersContainer.appendChild(playerName)
            playersContainer.appendChild(playerCollapse)
            playersContainer.appendChild(playerDiv)
            playerDiv.appendChild(playerUl)
            
        })
        // let stats = Object.entries(data[0].data[0])
        // console.log(stats)
        // stats.map(stat => {
        //     const newLi = document.createElement('li')
        //     playerOne.appendChild(newLi)
        //     newLi.innerHTML = `${stat[0].replace("_", " ")}:${stat[1]}`
    })
}

function renderStats(player){
    const playerContainer = document.getElementById('playerContainer')
    playerContainer.appendChild('li').innerHTML = `${data.firstName} ${data.lastName}`

    
    console.log("hey")

    fetch(`http://localhost:3000/Players/?id=2931`)
    .then(resp => resp.json())
    .then(data => {

        console.log(data[0].data[0])
        let stats = Object.entries(data[0].data[0])
        console.log(stats)
        stats.map(stat => {
            // let newLi = document.getElementById("p1Object")
            let newLi2 = document.createElement('li')
            // playerOne.remove(newLi)
            console.log(stat)
            playerOne.appendChild(newLi2)
            newLi2.innerHTML = `${stat[0].replace("_", " ")}:${stat[1]}`
        })
    })
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// fetch('http://localhost:3000/Wizards')
// .then(resp => resp.json())
// .then(data => {
//     data.forEach(player => {
//         fetch('http://localhost:3000/teams/30/players', {
//             method: "POST",
//             headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(player)
//         })
//     })
// })

function getgame(teamAbv) {fetch('https://data.nba.net/10s/prod/v1/20220110/scoreboard.json')
.then(resp => resp.json())
.then(data => {
    let scoreBoard = document.getElementById('score')
    console.log(data)
    let game = data.games.find(game => game.hTeam.triCode === teamAbv || game.vTeam.triCode === teamAbv)
    console.log(game)
    if(game){
        let home = parseInt(game.hTeam.score)
        let away = parseInt(game.vTeam.score)
        let homeName = game.hTeam.triCode
        let awayName = game.vTeam.triCode
        checkScore(home, away, homeName, awayName)
    }else{
        scoreBoard.innerHTML = "Did Not Play"
    }

    })
}

function checkScore(home, away, homeName, awayName){
    let scoreBoard = document.getElementById('score')
    if(home > away){
        scoreBoard.innerHTML = `${homeName} won against ${awayName}`

    }
    else{
        scoreBoard.innerHTML = `${homeName} lost to ${awayName}`
    }
}