document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const streamCards = document.querySelectorAll(".stream-card");
  const streamModal = document.querySelector(".stream-modal");
  const streamPlayer = document.getElementById("streamPlayer");
  const modalStreamTitle = document.getElementById("modalStreamTitle");
  const modalViewersCount = document.getElementById("modalViewersCount");
  const closeModalBtn = document.querySelector(".close-modal");

  // Replace with your actual domain
  const parentDomain = window.location.hostname;

  // Stream data (can be expanded)
  const streamsData = {
    burntsummi: {
      title: "Crypto Trading Live",
      viewers: "1,242",
    },
    dvces: {
      title: "Crypto Discussions",
      viewers: "856",
    },
    scharo100x: {
      title: "100x Crypto Picks",
      viewers: "1,543",
    },
    cryptokking: {
      title: "Crypto King Analysis",
      viewers: "2,134",
    },
    all_i_do_is_camp: {
      title: "Crypto Camping",
      viewers: "987",
    },
    masterblastortv: {
      title: "Master Blasto Crypto",
      viewers: "1,765",
    },
    ckattotv: {
      title: "Crypto with Ckatto",
      viewers: "1,321",
    },
    aussiebloominbsvwhale: {
      title: "BSV Whale Watching",
      viewers: "654",
    },
    marc_online_: {
      title: "Marc Online Crypto",
      viewers: "1,089",
    },
  };

  // Set up event listeners for stream cards
  streamCards.forEach((card) => {
    card.addEventListener("click", function () {
      const streamer = this.getAttribute("data-streamer");
      openStream(streamer);
    });
  });

  // Function to open stream in modal
  function openStream(streamer) {
    // Create Twitch iframe
    const iframe = document.createElement("iframe");
    iframe.setAttribute(
      "src",
      `https://player.twitch.tv/?channel=${streamer}&parent=${parentDomain}`
    );
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("scrolling", "no");

    // Clear previous iframe and add new one
    streamPlayer.innerHTML = "";
    streamPlayer.appendChild(iframe);

    // Set stream info
    if (streamsData[streamer]) {
      modalStreamTitle.textContent = streamsData[streamer].title;
      modalViewersCount.textContent = `👁️ ${streamsData[streamer].viewers} viewers`;
    }

    // Show modal
    streamModal.classList.add("active");
  }

  // Close modal
  closeModalBtn.addEventListener("click", function () {
    streamModal.classList.remove("active");
    // Remove iframe when closing
    streamPlayer.innerHTML = "";
  });

  // Close modal when clicking outside
  streamModal.addEventListener("click", function (e) {
    if (e.target === streamModal) {
      streamModal.classList.remove("active");
      streamPlayer.innerHTML = "";
    }
  });

  // Connect wallet button (placeholder functionality)
  document
    .querySelector(".connect-wallet-btn")
    .addEventListener("click", function () {
      alert("Wallet connection functionality would go here");
    });

  // Chat functionality
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatMessageInput");
  const sendMessageBtn = document.getElementById("sendMessageBtn");
  const onlineCount = document.getElementById("onlineCount");

  // Mock user names for auto messages
  const mockUsers = [
    { name: "CryptoLover", color: "#FF9E7D" },
    { name: "BitcoinMaxi", color: "#FFD166" },
    { name: "NFTGuy", color: "#8BD3DD" },
    { name: "DeFiQueen", color: "#C5A3FF" },
    { name: "ToTheMoon", color: "#FF6B6B" },
  ];

  // Mock messages
  const mockMessages = [
    "What do you think about BONK today?",
    "LFG! 🚀",
    "Just bought more, diamond hands!",
    "Anyone watching the Bitcoin chart?",
    "This stream is awesome!",
    "GM everyone!",
    "What's your price prediction?",
    "I'm all in on this one",
  ];

  // Add a message to chat
  function addMessage(
    text,
    isUser = false,
    isSystem = false,
    username = null,
    color = null
  ) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");

    if (isUser) {
      messageDiv.classList.add("user-message");
    } else if (isSystem) {
      messageDiv.classList.add("system-message");
    }

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

  // Generate random auto message
  function generateAutoMessage() {
    const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const message =
      mockMessages[Math.floor(Math.random() * mockMessages.length)];
    addMessage(message, false, false, user.name, user.color);

    // Randomly update online count
    if (Math.random() > 0.7) {
      const change = Math.floor(Math.random() * 10) - 3;
      const current = parseInt(onlineCount.textContent);
      onlineCount.textContent = Math.max(10, current + change);
    }
  }

  // Send user message
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      addMessage(message, true, false, "You");
      chatInput.value = "";

      // Auto reply after delay
      setTimeout(() => {
        if (Math.random() > 0.3) {
          // 70% chance of reply
          generateAutoMessage();
        }
      }, 1000 + Math.random() * 3000);
    }
  }

  // Event listeners for chat
  sendMessageBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // Start auto messages
  addMessage("Welcome to Bonk Chat! Start chatting...", false, true);

  // Initial messages
  setTimeout(() => {
    generateAutoMessage();
  }, 1500);

  // Regular auto messages
  setInterval(() => {
    if (Math.random() > 0.5) {
      // 50% chance every interval
      generateAutoMessage();
    }
  }, 5000);
});
