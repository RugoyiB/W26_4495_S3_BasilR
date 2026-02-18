function initChatbot() {
  console.log("Initializing chatbot...");

  const CHAT_API = "http://localhost:5000/api/chatbot";

  const chatbotBox = document.getElementById("chatbot-box");
  const messages = document.getElementById("chatbot-messages");
  const toggleBtn = document.getElementById("chatbot-toggle");
  const sendBtn = document.getElementById("chatSend");
  const input = document.getElementById("chatInput");
  const closeBtn = document.getElementById("chatbot-close");

  if (!chatbotBox || !messages || !toggleBtn || !sendBtn || !input) {
    console.error("Chatbot elements not found");
    return;
  }

  let greeted = false;

  toggleBtn.onclick = toggleChat;
  closeBtn.onclick = toggleChat;
  sendBtn.onclick = sendChat;

  input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendChat();
  });

  function toggleChat() {
    const isOpen = chatbotBox.style.display === "flex";
    chatbotBox.style.display = isOpen ? "none" : "flex";

    if (!isOpen && !greeted) {
      addMessage(
        "Hello,\nWelcome to Berea Baptist Church.\nHow can I help you?",
        "bot-msg"
      );
      greeted = true;
    }
  }

  async function sendChat() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user-msg");
    input.value = "";

    try {
      const res = await fetch(CHAT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();
      addMessage(data.reply, "bot-msg");
    } catch (err) {
      addMessage("Sorry, the server is unavailable.", "bot-msg");
      console.error(err);
    }
  }

  function addMessage(text, cls) {
    const div = document.createElement("div");
    div.className = cls;
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  console.log("Chatbot initialized successfully");
}
