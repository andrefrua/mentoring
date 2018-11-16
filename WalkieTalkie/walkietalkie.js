function walkieTalkie() {
  this.channelName = "";
  this.usersList = [];
  this.chat = [];

  this.setChannelName = function (newName) {
    this.channelName = newName;
  }

  this.getChannelName = function () {
    return this.channelName;
  }

  this.addUserToChannel = function (username) {
    if (this.usersList.includes(username)) {
      return "ALREADY_ADDED";
    }
    this.usersList.push(username);
    return "ADDED";
  }

  this.addMessage = function (newMessage, username) {
    if (!this.usersList.includes(username)) {
      return "INVALID_USER";
    }
    this.chat.push({ message: newMessage, username: username });
    return "MESSAGE_ADDED";
  }

  this.getChat = function () {
    return this.chat;
  }

  this.getLatestMessage = function (username) {
    return this.chat[this.chat.length - 1];
  }
  return this;
};
