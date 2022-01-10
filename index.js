
document.addEventListener("DOMContentLoaded", () => {
    const playerOne = document.getElementById("player1")
    const p1Points = document.getElementById("p1points")
    const p1Rbds = document.getElementById("p1rbds")
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

    fetch('https://www.balldontlie.io/api/v1/players/2931')
    .then(resp => resp.json())
    .then(data => {
        let player1FullName = `${data.first_name} ${data.last_name}`
        playerOne.innerHTML = player1FullName

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

    renderStats(2931)
})

function renderStats(player){
    const playerOne = document.getElementById("p1Object")
    


    fetch(`https://www.balldontlie.io/api/v1/season_averages?season=1990&player_ids[]=${player}`)
    .then(resp => resp.json())
    .then(data => {

        console.log(data.data[0])
        let stats = Object.values(data.data[0])
        console.log(stats)
        stats.map(stat => {
            const newLi = document.createElement('li')
            playerOne.appendChild(newLi)
            newLi.innerHTML = stat   
        })
    })
}

