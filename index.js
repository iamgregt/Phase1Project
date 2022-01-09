document.addEventListener("DOMContentLoaded", () => {
    const playerOne = document.getElementById("player1")

    fetch('https://www.balldontlie.io/api/v1/players/2931')
    .then(resp => resp.json())
    .then(data => {
        let player1FullName = `${data.first_name} ${data.last_name}`
        playerOne.innerHTML = player1FullName

    })
})