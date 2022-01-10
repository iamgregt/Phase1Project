
document.addEventListener("DOMContentLoaded", () => {
    const playerOne = document.getElementById("player1")
    const p1Points = document.getElementById("p1points")
    const p1Rbds = document.getElementById("p1rbds")
    const p1Bio = document.getElementById("p1Bio")
    const playerImg = document.getElementById("playerImg")
    const p1Head = document.getElementById("p1Head")

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

    fetch(`http://localhost:3000/Players/?id=237`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data[0].first_name)
        let player1FullName = `${data[0].first_name} ${data[0].last_name}`
        let teamLogo = data[0].team.logo
        let playerId = data[0].id
        playerOne.innerHTML = player1FullName
        p1Bio.innerHTML = data[0].bio
        playerImg.src=`${teamLogo}`
        p1Head.setAttribute("data-id", playerId )

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

    renderStats(237)

    p1Head.addEventListener('click', e =>{
        console.log(e)
        let playerID = e.target.dataset.id
        console.log(playerID)
        let newLi = document.getElementById("p1Object")
        while (newLi.firstChild){
            newLi.removeChild(newLi.firstChild)
        }
        renderStats2(playerID)
        e.preventDefault()
    })
})



function renderStats(player){
    const playerOne = document.getElementById("p1Object")
    
    console.log("hey")

    fetch(`http://localhost:3000/Players/?id=${player}`)
    .then(resp => resp.json())
    .then(data => {

        console.log(data[0].data[0])
        let stats = Object.entries(data[0].data[0])
        console.log(stats)
        stats.map(stat => {
            const newLi = document.createElement('li')
            playerOne.appendChild(newLi)
            newLi.innerHTML = `${stat[0].replace("_", " ")}:${stat[1]}`
        })
    })
}

function renderStats2(player){
    const playerOne = document.getElementById("p1Object")

    
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

