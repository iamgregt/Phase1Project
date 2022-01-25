document.addEventListener("DOMContentLoaded", () => {
    const teamPics = document.getElementById('teamPics')
    const teamSearchForm = document.getElementById('teamSearch')
    const resultTable = document.getElementById('resultTable')

    resultTable.hidden = true


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
        newPicEl.addEventListener("click", e => {
            let id = e.target.dataset.id
            renderTeam(id)
        })


        })


    })


    teamSearchForm.addEventListener('submit', e => {
        let fname = e.target[0].value
        let lname = e.target[1].value
        const playerResult = document.getElementById('playerResult')
        const team = document.getElementById('Team')
        const position = document.getElementById('Position')
        const height = document.getElementById('Height')
        

        fetch(`https://www.balldontlie.io/api/v1/players/?search=${fname}_${lname}`)
        .then(resp => resp.json())
        .then(data => {
            resultTable.hidden = false
            console.log(data.data[0])
            playerResult.innerHTML = `${data.data[0].first_name} ${data.data[0].last_name}`
            team.innerHTML = data.data[0].team.abbreviation
            position.innerHTML = data.data[0].position
            height.innerHTML = `${data.data[0].height_feet}'${data.data[0].height_inches}`
        })
        e.preventDefault()
    })

})



function renderTeam(id){
    let playerContainerToRemove = document.getElementById('playersContainer')
    removeAllChildNodes(playerContainerToRemove)

    fetch(`http://localhost:3000/teams/${id}/players`)
    .then(resp => resp.json())
    .then(data => {
        
        data.forEach(player => {
            const playersContainer = document.getElementById('playersContainer')
            const playerName = document.createElement('li')
            const playerDiv = document.createElement('div')
            const playerUl = document.createElement('ul')
            playerUl.id = "playerStats"
            playerDiv.className = "content"
            playerName.setAttribute("data-id", player.id)
            playerName.className = "strong"
            console.log(player)
            playerName.innerHTML = `${player.firstName} ${player.lastName}`
            playersContainer.appendChild(playerName)
            playersContainer.appendChild(playerDiv)
            playerDiv.appendChild(playerUl)
            
        })
    })
}


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}