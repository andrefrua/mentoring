function walkieTalkie() {
  this.channelName = "";
  this.usersList = [];
  this.chat = [];

  this.setChannelName = function (newName) {
    this.channelName = newName;
  }

  this.getChannelName = function() {
    return this.channelName;
  }

  this.addUserToChannel = function (username) {
    this.usersList.push(username);
  }

  this.addMessage = function (newMessage, username) {
    if (newMessage !== "") {
      this.chat.push({ message: newMessage, username: username });
    }
  }

  this.getChat = function (username) {
    // TODO: Layout specifics shouldn't be here
    var formattedChat = "";
    for (let i = 0; i < this.chat.length; i++) {
      formattedChat += "<b>" + this.chat[i].username + ": </b>" + this.chat[i].message + "<br />";
    }
    return formattedChat;
  }

  this.getLatestMessage = function () {
    return this.chat[this.chat.length - 1];
  }
  return this;
};
