document.addEventListener("DOMContentLoaded", function () {

  // PAGE LOAD ENTRANCE ANIMATIONS

  setTimeout(() => {
    if (document.querySelector(".box")) document.querySelector(".box").classList.add("show");
    if (document.querySelector(".LLBox")) document.querySelector(".LLBox").classList.add("show");
    if (document.querySelector(".LRBox")) document.querySelector(".LRBox").classList.add("show");
  }, 200);


  // CHAT PANEL OPEN / CLOSE 
  const openBtn = document.getElementById('chat');
  const closeBtn = document.getElementById('exit');
  const chatWin = document.getElementById('chatPanel');

  if (openBtn) {
    openBtn.onclick = () => chatWin.classList.add("active");
  }

  if (closeBtn) {
    closeBtn.onclick = () => chatWin.classList.remove("active");
  }

  // CHAT MESSAGES


  const chatMessages = document.querySelector('.chatMessages');
  const sendBtn = document.getElementById('sendButton');
  const chatInput = document.getElementById('chatInput');


  // When send button is clicked
  if (sendBtn) {
    sendBtn.onclick = function() {
        sendMessage(); // Sends user message to chat
    };
  }

  // BOT RESPONSE FUNCTION

  function botReply(userText) {
    const botDiv = document.createElement('div');

    botDiv.classList.add('bot-message', 'message');

    let reply = "I'm here to help! 😊";

    // responses
    if (userText.toLowerCase().includes("stress")) {
      reply = "I'm sorry you're feeling stressed. Try taking a short break or deep breathing 💜";
    } else if (userText.toLowerCase().includes("help")) {
      reply = "You can contact us or explore our coping tools!";
    } else if (userText.toLowerCase().includes("hello")) {
      reply = "Hi there! 👋 How are you feeling today?";
    }

    botDiv.textContent = reply;

    // Add bot message to chat window
    chatMessages.appendChild(botDiv);

    // animation
    setTimeout(() => {
      botDiv.classList.add("show");
    }, 10);

    // show latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // USER MESSAGE FUNCTION
  
  function sendMessage() {
    const text = chatInput.value.trim();

    if (text !== "") {

      const userDiv = document.createElement('div');
      userDiv.classList.add('user-message', 'message');
      userDiv.textContent = text;

      chatMessages.appendChild(userDiv);

      // animation
      setTimeout(() => {
        userDiv.classList.add('show');
      }, 10);

      chatInput.value = "";

      // show latest message
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // bot typing delay
      setTimeout(() => botReply(text), 1000);
    }
  }


  // ENTER KEY / SEND MESSAGE

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Stops default form submission
      sendMessage();
    }
  });

});

// FORM VALIDATION FUNCTION

function validateForm() {
  let errorMessage = '';
  let firstName = document.getElementById('firstName').value.trim();
  let lastName = document.getElementById('lastName').value.trim();
  let email = document.getElementById('email').value.trim();
  let message = document.getElementById('message').value.trim();

  // Required field checks
  if (firstName == '') errorMessage += '<div>First Name is required.</div>';
  if (lastName == '') errorMessage += '<div>Last Name is required.</div>';

  // Email validation pattern
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (email === '') {
    errorMessage += '<div>Email is required.</div>';
  } else if (!emailPattern.test(email)) {
    errorMessage += '<div>Please enter a valid email address.</div>';
  }

  // Message field validation
  if (message == '') errorMessage += '<div>Message is required.</div>';

  // Displays any errors
  if (errorMessage != '') {
    document.getElementById('errorMes').innerHTML = errorMessage;
    return false;
  }

  // Lets user know their form has been submitted
  alert("Form submitted successfully!");
  return true;
}
