function sendMessage() {
    var userInput = document.getElementById("userInput");
    var userMessage = userInput.value.trim();
  
    if (userMessage === "") {
      return;
    }
  
    var chatBox = document.getElementById("chatBox");
  
    // Display user message
    var userDiv = document.createElement("div");
    userDiv.textContent = userMessage;
    userDiv.classList.add("chat-message", "user-message", "text-right");
    chatBox.appendChild(userDiv);
  
    // Clear user input
    userInput.value = "";
  
    // Fetch API to send user message and get bot response
    fetchBotResponse(userMessage)
      .then(response => {
        // Display bot message
        var botMessage = response.message;
        var botDiv = document.createElement("div");
        botDiv.textContent = botMessage;
        botDiv.classList.add("chat-message", "bot-message");
        chatBox.appendChild(botDiv);
  
        // Scroll to bottom of chat box
        chatBox.scrollTop = chatBox.scrollHeight;
      })
      .catch(error => {
        console.error('Error fetching bot response:', error);
      });
  }
  
  function fetchBotResponse(userMessage) {
    // Replace this URL with your backend endpoint or a chatbot API
    var apiUrl = 'https://api.example.com/chatbot';
  
    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  }
  