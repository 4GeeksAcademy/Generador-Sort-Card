const suits = ["♠", "♥", "♣", "♦"];
    const values = [2,3,4,5,6,7,8,9,10];
    let currentCards = [];
    let bubbleLog = [];

    function getRandomCard() {
      const value = values[Math.floor(Math.random() * values.length)];
      const suit = suits[Math.floor(Math.random() * suits.length)];
      return { value, suit };
    }

    function drawCards() {
      const count = parseInt(document.getElementById("cardCount").value);
      if (isNaN(count) || count <= 0) {
        alert("Por favor, ingresa una cantidad válida.");
        return;
      }

      currentCards = [];
      bubbleLog = [];
      document.getElementById("logContainer").innerHTML = "";

      for (let i = 0; i < count; i++) {
        currentCards.push(getRandomCard());
      }

      renderCards();
    }
    function renderCards(cards = currentCards) {
      const container = document.getElementById("cardContainer");
      container.innerHTML = "";
      cards.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        if (card.suit === "♥") cardDiv.classList.add("red");
        cardDiv.innerHTML = `${card.value} ${card.suit}`;
        container.appendChild(cardDiv);
        if (card.suit === "♦") cardDiv.classList.add("red");
        cardDiv.innerHTML = `${card.value} ${card.suit}`;
        container.appendChild(cardDiv);
      });
    }

    function sortCards() {
      const sorted = [...currentCards];
      changeLog = [];

      for (let i = 0; i < sorted.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < sorted.length; j++) {
          if (sorted[j].value < sorted[minIndex].value) {
            minIndex = j;
          }
        }

        if (minIndex !== i) {
          [sorted[i], sorted[minIndex]] = [sorted[minIndex], sorted[i]];
          changeLog.push(JSON.parse(JSON.stringify(sorted)));
        }
      }

      currentCards = sorted;
      renderCards();
      renderLog();
    }

    function renderLog() {
      const logContainer = document.getElementById("logContainer");
      logContainer.innerHTML = "";
      changeLog.forEach((step, index) => {
        const logDiv = document.createElement("div");
        logDiv.className = "log-step";
        logDiv.innerHTML = `<strong>Paso ${index + 1}:</strong> ${step.map(card => `${card.value}${card.suit}`).join(" | ")}`;
        logContainer.appendChild(logDiv);
      });
    }