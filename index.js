// Словарь с переводом
const dictionary = {
  ru: {
    pageTitle: "Безопасный чат",
    header: "Безопасный чат",
    switchLanguageButton: "Переключить язык",
    imageAlt: "Баннер чата",
    messageInputPlaceholder: "Введите сообщение",
    sendButton: "Отправить",
    aboutLink: "О нас",
    helpLink: "Помощь",
    xssLink: "XSS",
  },
  en: {
    pageTitle: "Secure Chat",
    header: "Secure Chat",
    switchLanguageButton: "Switch Language",
    imageAlt: "Chat banner",
    messageInputPlaceholder: "Enter a message",
    sendButton: "Send",
    aboutLink: "About",
    helpLink: "Help",
    xssLink: "XSS",
  },
};

// Состояние страницы
const state = {
  messages: [],
  localization: "ru",
};

const header = document.getElementById("header");
const switchLanguageButton = document.getElementById("switch-language-button");
const image = document.getElementById("image");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const aboutLink = document.getElementById("about-link");
const helpLink = document.getElementById("help-link");
const xssLink = document.getElementById("xss-link");
const chatList = document.getElementById("chat-list");

loadLocalization();
loadMessages();

// Установка локализации из состояния на странице
function setLocalization() {
  const lang = state.localization;
  document.title = dictionary[lang].pageTitle;
  if (header) header.textContent = dictionary[lang].header;
  if (switchLanguageButton) switchLanguageButton.textContent = dictionary[lang].switchLanguageButton;
  if (image) image.alt = dictionary[lang].imageAlt;
  if (messageInput) messageInput.placeholder = dictionary[lang].messageInputPlaceholder;
  if (sendButton) sendButton.textContent = dictionary[lang].sendButton;
  if (aboutLink) aboutLink.textContent = dictionary[lang].aboutLink;
  if (helpLink) helpLink.textContent = dictionary[lang].helpLink;
  if (xssLink) xssLink.textContent = dictionary[lang].xssLink;
}

// Переключение языка при клике накнопку
if (switchLanguageButton) {
  switchLanguageButton.addEventListener("click", () => {
    const newLang = state.localization === "ru" ? "en" : "ru";
    state.localization = newLang;
    localStorage.setItem("localization", state.localization);
    setLocalization();
  });
}

// Добавление сообщения в чат
function addMessage(messageText) {
  const messageElement = document.createElement("li");
  messageElement.classList.add("message", "user-message");
  messageElement.textContent = messageText;
  if (chatList) {
    chatList.append(messageElement);
    chatList.scrollTop = chatList.scrollHeight;
  }
}

// Отправка сообщения (для событий нажатия на кнопку и ввода Enter)
function sendMessage() {
  const messageText = messageInput.value.trim();
  if (messageText === "") return;

  messageInput.value = "";
  state.messages.push(messageText);
  localStorage.setItem("messages", JSON.stringify(state.messages));
  addMessage(messageText);
}

// Отправка сообщений при нажатии на кнопку
if (sendButton) {
  sendButton.addEventListener("click", sendMessage);
}
// Отправка сообщений при вводе Enter
if (messageInput) {
  messageInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
}

// Загрузка сообщений из LocalStorage
function loadMessages() {
  const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
  savedMessages.forEach((messageText) => {
    addMessage(messageText);
  });
}

// Загрузка локализации из LocalStorage
function loadLocalization() {
  state.localization = localStorage.getItem("localization") || 'ru';
  setLocalization();
}