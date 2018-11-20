/**
 * Walkie Talkie class definition
 */
var WalkieTalkie = class {
  /**
   * Constructor for the WalkieTalkie
   * Here we need to set the channelName, usersList and chat
   */
  constructor() {
    this.channelName = "";
    this.usersList = [];
    this.chat = [];
  }

  setChannelName(newName) {
    this.channelName = newName;
  }

  getChannelName() {
    return this.channelName;
  }

  addUserToChannel(username) {
    if (this.usersList.includes(username)) {
      return "ALREADY_ADDED";
    }
    this.usersList.push(username);
    return "ADDED";
  }

  addMessage(newMessage, username) {
    if (!this.usersList.includes(username)) {
      return "INVALID_USER";
    }
    this.chat.push({ message: newMessage, username: username });
    return "MESSAGE_ADDED";
  }

  getChat() {
    return this.chat;
  }

  getLatestMessage(username) {
    return this.chat[this.chat.length - 1];
  }
};
