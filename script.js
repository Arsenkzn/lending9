document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const streamCards = document.querySelectorAll(".stream-card");
  const streamModal = document.querySelector(".stream-modal");
  const streamPlayer = document.getElementById("streamPlayer");
  const modalStreamTitle = document.getElementById("modalStreamTitle");
  const modalViewersCount = document.getElementById("modalViewersCount");

  // Replace with your actual domain
  const parentDomain = window.location.hostname;

  // Stream data
  const streamsData = {
    burntsummi: { title: "Crypto Trading Live", viewers: "1,242" },
    dvces: { title: "Crypto Discussions", viewers: "856" },
    scharo100x: { title: "100x Crypto Picks", viewers: "1,543" },
    cryptokking: { title: "Crypto King Analysis", viewers: "2,134" },
    all_i_do_is_camp: { title: "Crypto Camping", viewers: "987" },
    masterblastortv: { title: "Master Blasto Crypto", viewers: "1,765" },
    ckattotv: { title: "Crypto with Ckatto", viewers: "1,321" },
    aussiebloominbsvwhale: { title: "BSV Whale Watching", viewers: "654" },
    marc_online_: { title: "Marc Online Crypto", viewers: "1,089" },
  };

  // Универсальная функция для управления модалками
  function setupModal(modal, openerSelector, closeCallback = null) {
    if (!modal) return;

    // Открытие модалки
    if (openerSelector) {
      document.querySelector(openerSelector)?.addEventListener("click", () => {
        modal.classList.add("active");
      });
    }

    // Закрытие по крестику
    modal.querySelector(".close-modal")?.addEventListener("click", (e) => {
      e.stopPropagation();
      modal.classList.remove("active");
      if (closeCallback) closeCallback();
    });

    // Закрытие по клику вне модалки
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        if (closeCallback) closeCallback();
      }
    });

    // Запрещаем закрытие при клике на содержимое модалки
    modal.querySelector(".modal-content")?.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Инициализация модалки с видео
  setupModal(streamModal, null, () => {
    streamPlayer.innerHTML = ""; // Очищаем iframe при закрытии
  });

  // Обработчики для карточек стримов
  streamCards.forEach((card) => {
    card.addEventListener("click", function () {
      const streamer = this.getAttribute("data-streamer");
      openStream(streamer);
    });
  });

  function openStream(streamer) {
    // Создаем Twitch iframe
    const iframe = document.createElement("iframe");
    iframe.setAttribute(
      "src",
      `https://player.twitch.tv/?channel=${streamer}&parent=${parentDomain}`
    );
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("scrolling", "no");

    // Очищаем и добавляем новый iframe
    streamPlayer.innerHTML = "";
    streamPlayer.appendChild(iframe);

    // Устанавливаем информацию о стриме
    if (streamsData[streamer]) {
      modalStreamTitle.textContent = streamsData[streamer].title;
      modalViewersCount.textContent = `👁️ ${streamsData[streamer].viewers} viewers`;
    }

    // Показываем модалку
    streamModal.classList.add("active");
  }

  // Инициализация модалки настройки стрима
  const streamSetupModal = document.querySelector(".stream-setup-modal");
  const comingSoonModal = document.querySelector(".coming-soon-modal");
  const launchStreamBtn = document.querySelector(".launch-stream-btn");
  const startStreamBtn = document.querySelector(".start-stream-btn");

  setupModal(streamSetupModal, ".start-stream-btn");
  setupModal(comingSoonModal);

  // Обработчик кнопки Launch Stream
  launchStreamBtn?.addEventListener("click", () => {
    streamSetupModal.classList.remove("active");
    setTimeout(() => {
      comingSoonModal.classList.add("active");
    }, 300);
  });

  // Чат функциональность
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatMessageInput");
  const sendMessageBtn = document.getElementById("sendMessageBtn");
  const onlineCount = document.getElementById("onlineCount");

  // Mock данные для чата
  const mockUsers = [
    { name: "CryptoLover", color: "#FF9E7D" },
    { name: "BitcoinMaxi", color: "#FFD166" },
    { name: "NFTGuy", color: "#8BD3DD" },
    { name: "DeFiQueen", color: "#C5A3FF" },
    { name: "ToTheMoon", color: "#FF6B6B" },
    { name: "HODLerPro", color: "#7E57C2" },
    { name: "ShillMaster", color: "#26A69A" },
    { name: "FOMO_Guy", color: "#EF5350" },
    { name: "WhaleWatcher", color: "#42A5F5" },
    { name: "ApeSquad", color: "#FF7043" },
    { name: "BullRunRider", color: "#66BB6A" },
    { name: "BearMarketSurvivor", color: "#5C6BC0" },
    { name: "LamboDreamer", color: "#EC407A" },
    { name: "RektProtector", color: "#D4E157" },
    { name: "GasFeeHater", color: "#FFCA28" },
    { name: "WAGMI_Chad", color: "#AB47BC" },
    { name: "FlippeningWatcher", color: "#26C6DA" },
    { name: "SmartContractDev", color: "#9CCC65" },
    { name: "StakingKing", color: "#FFA726" },
    { name: "AltcoinGambler", color: "#7E57C2" },
    { name: "BitcoinPurist", color: "#78909C" },
    { name: "ShitcoinShiller", color: "#8D6E63" },
    { name: "DAOEnthusiast", color: "#FFEE58" },
    { name: "MetaversePioneer", color: "#80DEEA" },
    { name: "Web3Explorer", color: "#CE93D8" },
  ];

  const mockMessages = [
    "What do you think about BONK today?",
    "LFG! 🚀",
    "Just bought more, diamond hands!",
    "Anyone watching the Bitcoin chart?",
    "This stream is awesome!",
    "GM everyone!",
    "What's your price prediction?",
    "I'm all in on this one",
    "When moon? 🌕",
    "This is the dip to buy!",
    "Paper hands be gone!",
    "Just got liquidated... again",
    "DYOR before investing!",
    "The fundamentals are strong",
    "Technical analysis looks bullish",
    "Market cap is everything",
    "Tokenomics are fire 🔥",
    "Who's staking here?",
    "APY is insane right now",
    "Gas fees killing me today",
    "This project is undervalued",
    "Rug pull incoming?",
    "Dev team is doxxed = safe",
    "Partnership announcement soon!",
    "Exchange listing confirmed!",
    "Whale just dumped 😱",
    "Buy the rumor, sell the news",
    "This is financial advice 😂",
    "My TA says we're going up",
    "MACD looking juicy",
    "RSI is oversold - time to buy",
    "Support level holding strong",
    "Resistance about to break",
    "Bull flag forming!",
    "FUD is temporary, gains are forever",
    "Not selling until $10B market cap",
    "Just aped in my life savings",
    "Tax return just hit - buying more!",
    "My wife's boyfriend approves this trade",
    "Institutional money coming soon",
    "Adoption is growing fast",
    "Mainnet launch next week!",
    "Testnet is live - try it out",
    "Bug bounty program announced",
    "Audit results look clean",
    "Community is growing fast",
    "Discord members doubled today",
    "Twitter spaces later tonight",
    "AMA with CEO tomorrow",
  ];

  function addMessage(
    text,
    isUser = false,
    isSystem = false,
    username = null,
    color = null
  ) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");

    if (isUser) messageDiv.classList.add("user-message");
    else if (isSystem) messageDiv.classList.add("system-message");

    if (username) {
      const usernameDiv = document.createElement("div");
      usernameDiv.classList.add("message-username");
      usernameDiv.textContent = username;
      usernameDiv.style.color = color || "#FF9E7D";
      messageDiv.appendChild(usernameDiv);
    }

    const textDiv = document.createElement("div");
    textDiv.textContent = text;
    messageDiv.appendChild(textDiv);

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function generateAutoMessage() {
    const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const message =
      mockMessages[Math.floor(Math.random() * mockMessages.length)];
    addMessage(message, false, false, user.name, user.color);

    if (Math.random() > 0.7) {
      const change = Math.floor(Math.random() * 10) - 3;
      const current = parseInt(onlineCount.textContent);
      onlineCount.textContent = Math.max(10, current + change);
    }
  }

  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      addMessage(message, true, false, "You");
      chatInput.value = "";

      setTimeout(() => {
        if (Math.random() > 0.3) generateAutoMessage();
      }, 1000 + Math.random() * 1000);
    }
  }

  // Event listeners for chat
  sendMessageBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // Инициализация чата
  addMessage("Welcome to Bonk Chat! Start chatting...", false, true);
  setTimeout(() => generateAutoMessage(), 1500);
  setInterval(() => {
    if (Math.random() > 0.5) generateAutoMessage();
  }, 2000);
});
