
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

 const btnRules = document.querySelector(".rules");
  const btnClose = document.querySelector(".close-btn");
  const modalRules = document.querySelector(".modal");
  const choiceButtons = document.querySelectorAll(".choice-btn");
  const gameDiv = document.querySelector(".game");
  const resultsDiv = document.querySelector(".results");
  const resultDivs = document.querySelectorAll(".results__result");
  
  const resultWinner = document.querySelector(".results__winner");
  const resultText = document.querySelector(".results__text");
  
  const playAgainBtn = document.querySelector(".play-again");
  
  const yourscoreNumber = document.querySelector(".your_score__number");
  const pcscoreNumber = document.querySelector(".comp_score__number");
  
  let yourscore = 0;
  let PCscore = 0;
  
  const options = [
    {
      name: "paper",
      beats: "rock",
    },
    {
      name: "scissors",
      beats: "paper",
    },
    {
      name: "rock",
      beats: "scissors",
    },
  ];
  
 
  

  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const choiceName = button.dataset.choice;
      const choice = options.find((choice) => choice.name === choiceName);
      choose(choice);
    });
  });
  
  function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
  }
  
  function aiChoose() {
    const rand = Math.floor(Math.random() * options.length);
    return options[rand];
  }
  
  function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
      setTimeout(() => {
        resultDiv.innerHTML = `
          <div class="choice ${results[idx].name}">
            <img src="assets/${results[idx].name}.png" alt="${results[idx].name}" />
          </div>
        `;
      }, idx * 1000);
    });
  
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
  }
  function displayWinner(results) {
    setTimeout(() => {
      const userWins = isWinner(results);
      const aiWins = isWinner(results.reverse());
  
      if (userWins) {
        resultText.innerText = "you win";
        resultDivs[0].classList.toggle("winner");
        yourScore(1);
        if (!document.getElementById("win-button")) {
          const winButton = document.createElement("button");
          winButton.id = "win-button";
          winButton.innerText = "NEXT";
          winButton.classList.add("win-button");
          winButton.addEventListener("click", () => {
            window.location.href = "game.html";
          });
          resultWinner.appendChild(winButton);
        }
      } else if (aiWins) {
        resultText.innerText = "you lose";
        resultDivs[1].classList.toggle("winner");
        PCScore(1);
      } else {
        resultText.innerText = "tie up";
      }
      resultWinner.classList.toggle("hidden");
      resultsDiv.classList.toggle("show-winner");
  
      
      const winButton = document.getElementById("win-button");
      if (winButton && !userWins) {
        winButton.remove();
      }
    }, 1000);
  }
  
  
  
  
  
  function isWinner(results) {
    return results[0].beats === results[1].name;
  }
  
  function yourScore(point) {
    yourscore += point;
    yourscoreNumber.innerText = yourscore;
  }
  
  function PCScore(point) {
    PCscore += point;
    pcscoreNumber.innerText = PCscore;
  }
  
  // Play Again
  playAgainBtn.addEventListener("click", () => {
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
  
    resultDivs.forEach((resultDiv) => {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("winner");
    });
  
    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  });
  
  // Show/Hide Rules
  btnRules.addEventListener("click", () => {
    modalRules.classList.toggle("show-modal");
  });
  btnClose.addEventListener("click", () => {
    modalRules.classList.toggle("show-modal");
  });


  
  
  