const button = document.getElementById("next-btn");

button.addEventListener("click", () => {

    const name = document.getElementById("penguin-name").value.trim();

    if(name === ""){
        alert("Please enter a penguin name!");
        return;
    }

    const room =
        document.querySelector('input[name="room"]:checked').value;

    // Save data
    localStorage.setItem("penguinName", name);
    localStorage.setItem("room", room);

    // Open the game
    window.location.href = "game.html";
});