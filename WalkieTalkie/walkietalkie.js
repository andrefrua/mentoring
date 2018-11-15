


//** WALKIE */

var walkietalkie = function () {
  channelName = "";
  usersList = [];
  chat = [];

  createChannel = function createChannel(newName) {
    channelName = newName;
  }

  addUserToChannel = function addUserToChannel(username) {
    usersList.push(username);
  }

  addMessage = function addMessage(newMessage, username) {
    chat.push({ message: newMessage, username: username });
  }

  getChat = function getChat(username) {
    return formatChat();
  }

  getLatestMessage = function getLatestMessage() {
    var latestChatItem = chat[chat.length - 1];

    return latestChatItem.username + " said: " + latestChatItem.message;
  }

  // Utilities
  formatChat = function formatChat() {
    var formattedChat = "";
    for (let i = 0; i < chat.length; i++) {
      formattedChat += "<b>" + chat[i].username + ": </b>" + chat[i].message + "<br />";
    }
    return formattedChat;
  }

  return {
    createChannel: createChannel,
    addUserToChannel: addUserToChannel,
    addMessage: addMessage,
    getChat: getChat,
    getLatestMessage: getLatestMessage
  }
};
