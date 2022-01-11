
document.addEventListener("DOMContentLoaded", () => {
    const teamPics = document.getElementById('teamPics')
    const p1Points = document.getElementById("p1points")
    const p1Rbds = document.getElementById("p1rbds")
    const p1Bio = document.getElementById("p1Bio")
    const playerImg = document.getElementById("playerImg")
    const p1Head = document.getElementById("p1Head")
    const teamSearchForm = document.getElementById('teamSearch')

    var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
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
        newPicEl.src = team.logo
        newPicEl.className = "img"
        newPicEl.setAttribute('data-id', team.id)
        newPicEl.addEventListener("click", e => {
            let id = e.target.dataset.id
            renderTeam(id)
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



function renderTeam(id){
    const playerOne = document.getElementById("player1")

    fetch(`http://localhost:3000/teams/${id}/players`)
    .then(resp => resp.json())
    .then(data => {
        data.forEach(player => {
            const playersContainer = document.getElementById('playersContainer')
            const playerName = document.createElement('li')
            const playerCollapse = document.createElement('button')
            const playerDiv = document.createElement('div')
            const playerUl = document.createElement('ul')
            playerUl.id = "playerStats"
            playerDiv.className = "content"
            playerCollapse.type = "button"
            playerCollapse.className = "collapsible"
            playerCollapse.innerHTML = "View Season Averages"
            playerCollapse.setAttribute("data-id", player.id)
            playerName.setAttribute("data-id", player.id)
            playerName.className = "strong"
            console.log(player)
            playerName.innerHTML = `${player.firstName} ${player.lastName}`
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

function renderPlayer(player){
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

