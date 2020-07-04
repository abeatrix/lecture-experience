/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import Message from './classes/Message.js';
import Chat from './classes/Chat.js';

export default function initializeChat(socket, roomId) {
  const chat = new Chat('message-container');
  const sendContainer = document.getElementById('send-container');
  const messageInput = document.getElementById('message-input');
  const fileInput = document.getElementById('file-input');
  socket.on('send-to-manager', (message) => {
    chat.appendMessage(message, true);
    const messagesDiv = $('div.messages');
    if (!messagesDiv.hasClass('active-chat')) {
      chat.unreadCount += 1;
      $('.new-messages-badge').html(chat.unreadCount);
    }
  });

  $('#toggle-messages').click((e) => {
    e.preventDefault();
    const messagesDiv = $('div.messages');
    messagesDiv.toggleClass('active-chat');
    if (messagesDiv.hasClass('active-chat')) {
      chat.unreadCount = 0;
      $('.new-messages-badge').html(chat.unreadCount);
    }
  });

  sendContainer.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageContent = messageInput.value.trim();
    const newFile = document.getElementById('file-input').files[0];
    if (!(messageContent === '' && typeof newFile === 'undefined')) {
      const message = new Message(messageContent, newFile);
      socket.emit('send-to-guests', roomId, message);
      chat.appendMessage(message, false);
      messageInput.value = '';
      fileInput.value = '';
    }
  });
}