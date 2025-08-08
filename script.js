document.addEventListener("DOMContentLoaded", function () {
  // Mock data for streams
  const mockStreams = [
    {
      id: "1",
      title: "BONK to the MOON 🚀 | Live Trading",
      streamer: "CryptoDegen42",
      viewers: 1242,
      thumbnail:
        "https://static-cdn.jtvnw.net/previews-ttv/live_user_cryptodream-440x248.jpg",
      tag: "#bonk",
      url: "https://www.twitch.tv/cryptodream",
    },
    {
      id: "2",
      title: "Memecoin Madness | $BONK $DOGE $SHIB",
      streamer: "MemelordX",
      viewers: 876,
      thumbnail:
        "https://static-cdn.jtvnw.net/previews-ttv/live_user_altcointv-440x248.jpg",
      tag: "#memecoin",
      url: "https://www.twitch.tv/altcointv",
    },
    {
      id: "3",
      title: "Crypto Technical Analysis Daily",
      streamer: "TA_Whiz",
      viewers: 543,
      thumbnail:
        "https://static-cdn.jtvnw.net/previews-ttv/live_user_coinbureau-440x248.jpg",
      tag: "#crypto",
      url: "https://www.twitch.tv/coinbureau",
    },
    {
      id: "4",
      title: "NFT Degens Unite | Bonk Art Drops",
      streamer: "NFTApe9000",
      viewers: 321,
      thumbnail:
        "https://static-cdn.jtvnw.net/previews-ttv/live_user_nft-440x248.jpg",
      tag: "#degens",
      url: "https://www.twitch.tv/nft",
    },
    {
      id: "5",
      title: "BONK Farming Strategies",
      streamer: "DeFiDaddy",
      viewers: 765,
      thumbnail:
        "https://static-cdn.jtvnw.net/previews-ttv/live_user_defi-440x248.jpg",
      tag: "#bonk",
      url: "https://www.twitch.tv/defi",
    },
    {
      id: "6",
      title: "Crypto News 24/7 | Bonk Updates",
      streamer: "CryptoNewsNow",
      viewers: 1123,
      thumbnail:
        "https://static-cdn.jtvnw.net/previews-ttv/live_user_cryptonews-440x248.jpg",
      tag: "#crypto",
      url: "https://www.twitch.tv/cryptonews",
    },
  ];

  // Mock chat messages
  const mockMessages = [
    {
      user: "@bonkchampion",
      text: "LFG! BONK is pumping today 🚀",
      color: "#FF9E7D",
    },
    {
      user: "@cryptogirl",
      text: "Just joined the stream, what did I miss?",
      color: "#8BD3DD",
    },
    {
      user: "@degenartist",
      text: "Minting my Bonk-inspired NFT soon!",
      color: "#C5A3FF",
    },
    {
      user: "@tradingnoob",
      text: "First time trading memecoins, any tips?",
      color: "#FFD166",
    },
    { user: "@wenmoon", text: "WEN LAMBO? WEN MOON?", color: "#FF6B6B" },
    {
      user: "@hodlgang",
      text: "Diamond hands only here 💎🙌",
      color: "#4ECDC4",
    },
  ];

  // DOM elements
  const streamGrid = document.querySelector(".stream-grid");
  const liveChat = document.querySelector(".live-chat");
  const chatMessages = document.querySelector(".chat-messages");
  const chatInput = document.getElementById("chatMessage");
  const sendMessageBtn = document.getElementById("sendMessage");
  const streamModal = document.querySelector(".stream-modal");
  const streamFrame = document.getElementById("streamFrame");
  const closeModalBtns = document.querySelectorAll(".close-modal");
  const startStreamModal = document.querySelector(".start-stream-modal");
  const startStreamBtn = document.querySelector(".start-stream-btn");
  const streamForm = document.getElementById("streamForm");
  const comingSoonModal = document.querySelector(".coming-soon");
  const closeComingSoonBtn = document.querySelector(".close-coming-soon");

  // Load streams
  function loadStreams() {
    // Clear loading cards
    streamGrid.innerHTML = "";

    mockStreams.forEach((stream) => {
      const streamCard = document.createElement("div");
      streamCard.className = "stream-card";
      streamCard.innerHTML = `
                <div class="stream-thumbnail">
                    <img src="${stream.thumbnail}" alt="${stream.title}">
                </div>
                <div class="stream-info">
                    <div class="streamer-avatar"></div>
                    <div class="stream-details">
                        <div class="stream-title">${stream.title}</div>
                        <div class="stream-tags">
                            <span class="tag" data-tag="${stream.tag}">${
        stream.tag
      }</span>
                        </div>
                        <div class="stream-stats">
                            <span class="viewers">👁️ ${stream.viewers.toLocaleString()} viewers</span>
                        </div>
                    </div>
                </div>
            `;

      streamCard.addEventListener("click", () => openStreamModal(stream));
      streamGrid.appendChild(streamCard);
    });
  }

  // Open stream modal
  function openStreamModal(stream) {
    const modalTitle = document.querySelector(".stream-modal .stream-title");
    const streamerName = document.querySelector(".stream-modal .name");
    const streamerAvatar = document.querySelector(".stream-modal .avatar");
    const viewersCount = document.querySelector(".stream-modal .viewers");
    const tagsContainer = document.querySelector(".stream-modal .tags");

    modalTitle.textContent = stream.title;
    streamerName.textContent = stream.streamer;
    viewersCount.textContent = `👁️ ${stream.viewers.toLocaleString()} viewers`;
    tagsContainer.innerHTML = `<span class="tag" data-tag="${stream.tag}">${stream.tag}</span>`;

    // In a real app, we'd embed the actual stream
    // For demo, we'll just link to the Twitch channel
    streamFrame.src = stream.url;

    streamModal.classList.add("active");
  }

  // Close modal
  function closeModal() {
    streamModal.classList.remove("active");
    startStreamModal.classList.remove("active");
    streamFrame.src = "";
  }

  // Load chat messages
  function loadChatMessages() {
    mockMessages.forEach((msg) => {
      addChatMessage(msg.user, msg.text, msg.color);
    });

    // Simulate new messages coming in
    setInterval(() => {
      const randomUser = `@user${Math.floor(Math.random() * 1000)}`;
      const randomMessages = [
        "BONK is the future!",
        "Just aped in with 5 SOL",
        "WAGMI frens",
        "This is life changing",
        "To the mooooon!",
        "DYOR but BONK is based",
        "GM GM GM",
        "When lambo?",
        "Diamond hands only",
      ];
      const randomMsg =
        randomMessages[Math.floor(Math.random() * randomMessages.length)];
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`;

      addChatMessage(randomUser, randomMsg, randomColor);
    }, 8000);
  }

  // Add chat message
  function addChatMessage(user, text, color) {
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.innerHTML = `
            <span class="user" style="color: ${color}">${user}</span>
            <span class="text">${text}</span>
        `;

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Send message
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      addChatMessage("You", message, "#FF9E7D");
      chatInput.value = "";

      // Simulate reply
      setTimeout(() => {
        const replies = [
          "True that!",
          "Based take",
          "GM ser!",
          "LFG!",
          "This is the way",
          "WAGMI",
          "HODL strong",
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const randomUser = `@crypto${Math.floor(Math.random() * 100)}`;
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
          16
        )}`;

        addChatMessage(randomUser, randomReply, randomColor);
      }, 1000);
    }
  }

  // Open start stream modal
  function openStartStreamModal() {
    startStreamModal.classList.add("active");
  }

  // Handle stream form submission
  function handleStreamForm(e) {
    e.preventDefault();
    const title = document.getElementById("streamTitle").value;

    if (!title) {
      alert("Please enter a stream title");
      return;
    }

    startStreamModal.classList.remove("active");
    comingSoonModal.classList.add("active");
  }

  // Close coming soon modal
  function closeComingSoon() {
    comingSoonModal.classList.remove("active");
  }

  // Event listeners
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  startStreamBtn.addEventListener("click", openStartStreamModal);
  sendMessageBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  streamForm.addEventListener("submit", handleStreamForm);
  closeComingSoonBtn.addEventListener("click", closeComingSoon);

  // Click outside modal to close
  [streamModal, startStreamModal, comingSoonModal].forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        if (modal === streamModal) {
          streamFrame.src = "";
        }
        modal.classList.remove("active");
      }
    });
  });

  // Initialize
  loadStreams();
  loadChatMessages();

  // Show coming soon modal after 3 seconds
  setTimeout(() => {
    comingSoonModal.classList.add("active");
  }, 3000);
});
