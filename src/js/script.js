document.addEventListener("DOMContentLoaded", function () {
    const btns = document.querySelectorAll(".btn-pick");
    const resetBtn = document.getElementById("reset-game");
    const openModal = document.getElementById("open-modal");
    const closeModal = document.getElementById("close-modal");

    const mainLayer = document.getElementById("main-layer");

    const resultLayer1 = document.getElementById("result-layer-1");
    const resultLayer2 = document.getElementById("result-layer-2");
    const resultLayer = document.getElementById("result-layer");
    const rulesLayer = document.getElementById("rules-layer");
    const preloader = document.getElementById("preloader");

    const scoreElement = document.getElementById("score");
    const winner = document.getElementById("result");
    const userSelect = document.querySelectorAll("#user-select");
    const computerSelect = document.querySelectorAll("#computer-select");
    const userSelectAnim = document.querySelector(".user-select-anim");
    const computerSelectAnim = document.querySelector(".computer-select-anim");

    const choices = ["rock", "paper", "scissors", "spock", "lizard"];
    let score = 0;

    // Imitation of loading
    setTimeout(() => {
        preloader.style.display = "none";
    }, 2000);

    // Event listeners for pick buttons
    btns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const playerChoice = this.getAttribute("data-choice");
            const computerChoice = randomChoice();
            getWinner(playerChoice, computerChoice);
        });
    });

    resetBtn.addEventListener("click", function () {
        mainLayer.style.display = "grid";
        resultLayer.style.display = "none";
    });

    openModal.addEventListener("click", function () {
        rulesLayer.style.display = "flex";
    });

    closeModal.addEventListener("click", function () {
        rulesLayer.style.display = "none";
    });

    // Random choice function
    function randomChoice() {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    // Update score function
    function updateScore(val) {
        score += val;
        scoreElement.innerText = score;
    }

    // Get winner function
    function getWinner(playerChoice, computerChoice) {
        userSelectAnim.classList.remove("result-winner");
        userSelectAnim.classList.remove("result-loser");
        computerSelectAnim.classList.remove("result-winner");
        computerSelectAnim.classList.remove("result-loser");

        updateResult(userSelect, playerChoice);
        updateResult(computerSelect, computerChoice);

        if (playerChoice === computerChoice) {
            winner.innerText = "Draw";
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "rock" && computerChoice === "lizard") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "paper" && computerChoice === "spock") ||
            (playerChoice === "scissors" && computerChoice === "paper") ||
            (playerChoice === "scissors" && computerChoice === "lizard") ||
            (playerChoice === "spock" && computerChoice === "scissors") ||
            (playerChoice === "spock" && computerChoice === "rock") ||
            (playerChoice === "lizard" && computerChoice === "spock") ||
            (playerChoice === "lizard" && computerChoice === "paper")
        ) {
            updateScore(1);
            winner.innerText = "You Win";
            userSelectAnim.classList.add("result-winner");
            computerSelectAnim.classList.add("result-loser");
        } else {
            updateScore(-1);
            winner.innerText = "You Lose";
            computerSelectAnim.classList.add("result-winner");
            userSelectAnim.classList.add("result-loser");
        }

        mainLayer.style.display = "none";

        setTimeout(() => {
            showLayer(resultLayer1);
        }, 100);
        setTimeout(() => {
            hideLayer(resultLayer1);
            showLayer(resultLayer2);
        }, 1000);
        setTimeout(() => {
            hideLayer(resultLayer2);
            showLayer(resultLayer);
        }, 2000);
    }

    // Show/hide layer functions
    function showLayer(layer) {
        layer.style.display = "grid";
    }

    function hideLayer(layer) {
        layer.style.display = "none";
    }

    // Update result layer
    function updateResult(selectionElem, selection) {
        selectionElem.forEach((elem) => {
            elem.classList.remove("btn-paper");
            elem.classList.remove("btn-rock");
            elem.classList.remove("btn-scissors");
            elem.classList.remove("btn-spock");
            elem.classList.remove("btn-lizard");
        });

        selectionElem.forEach((elem) => {
            elem.classList.add(`btn-${selection}`);
            elem.querySelector("img").src = `./images/icon-${selection}.svg`;
            elem.querySelector("img").alt = selection;
        });
    }
});
