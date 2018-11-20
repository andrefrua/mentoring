var channelsList = [];

const MessageTypes = {
  DEFAULT: "label-default",
  INFO: "label-info",
  WARNING: "label-warning",
  ERROR: "label-danger",
  SUCCESS: "label-success"
}

const Users = {
  USER1: "User 1",
  USER2: "User 2",
  USER3: "User 3"
}

// User actions
btnUser1Talk.onclick = function () {
  addMessageToChannel(Users.USER1, inputUser1);
}
btnUser2Talk.onclick = function () {
  addMessageToChannel(Users.USER2, inputUser2);
}
btnUser3Talk.onclick = function () {
  addMessageToChannel(Users.USER3, inputUser3);
}

btnUser1Listen.onclick = function () {
  getLatestMessage();
}
btnUser2Listen.onclick = function () {
  getLatestMessage();
}
btnUser3Listen.onclick = function () {
  getLatestMessage();
}
btnCreateChannel.onclick = function () {
  createChannel();
}

btnUser1Join.onclick = function () {
  addUserToChannel(Users.USER1);
}
btnUser2Join.onclick = function () {
  addUserToChannel(Users.USER2);
}
btnUser3Join.onclick = function () {
  addUserToChannel(Users.USER3);
}

// UTILS
function createChannel() {
  if (inputChannelName.value !== "") {
    var newChannelName = inputChannelName.value;
    var newWalkieChannel = new WalkieTalkie();
    if (newWalkieChannel) {
      newWalkieChannel.setChannelName(newChannelName);
      channelsList.push(newWalkieChannel);
    }
    // Adds the new channel to the select
    var elOption = document.createElement("option");
    elOption.textContent = newChannelName;
    elOption.value = channelsList.length - 1; // -1 So that the value is the same as the index on the array
    selectAvailableChannels.appendChild(elOption);

    inputChannelName.value = "";
    setInfo(MessageTypes.SUCCESS, "Channel " + newChannelName + " was created.");
  } else {
    setInfo(MessageTypes.WARNING, "You need to give a name to the channel!")
  }
}

function addUserToChannel(username) {
  if (selectAvailableChannels.selectedIndex > -1) {
    var channel = channelsList[parseInt(selectAvailableChannels.value)];
    var userAdded = channel.addUserToChannel(username);
    switch (userAdded) {
      case "ADDED":
        setInfo(MessageTypes.SUCCESS, username + " was added to the channel " + channel.getChannelName() + ".");
        break;
      case "ALREADY_ADDED":
        setInfo(MessageTypes.WARNING, username + " was already in the channel " + channel.getChannelName() + "!");
        break;
      default:
        setInfo(MessageTypes.ERROR, "It was not possible to add " + username + " to the channel " + channel.getChannelName() + "!");
        break;
    }
  } else {
    setInfo(MessageTypes.WARNING, "You need to select a channel in order to talk!");
  }
}

function addMessageToChannel(username, inputMessage) {
  if (selectAvailableChannels.selectedIndex > -1) {
    var channel = channelsList[parseInt(selectAvailableChannels.value)];
    var messageAdded = channel.addMessage(inputMessage.value, username);
    switch (messageAdded) {
      case "MESSAGE_ADDED":
        preChannelChat.innerHTML = formatChat(channel.getChat(username));
        inputMessage.value = "";
        setInfo(MessageTypes.SUCCESS, "Message sent.");
        break;
      case "INVALID_USER":
        setInfo(MessageTypes.WARNING, username + " does not belong to the channel " + channel.getChannelName() + "!");
        break;
      default:
        setInfo(MessageTypes.ERROR, "The message could not be sent");
        break
    }
  } else {
    setInfo(MessageTypes.WARNING, "You need to select a channel in order to talk!");
  }
}

function getLatestMessage() {
  if (selectAvailableChannels.selectedIndex > -1) {
    var channel = channelsList[parseInt(selectAvailableChannels.value)];
    var latestMessage = channel.getLatestMessage();

    if (latestMessage) {
      message = "<b>" + latestMessage.username + ": </b>" + latestMessage.message;
      setInfo(MessageTypes.DEFAULT, message, true);
    } else {
      message = "No messages available"
      setInfo(MessageTypes.INFO, "You need to select a channel in order to talk!");
    }
  } else {
    setInfo(MessageTypes.WARNING, "You need to select a channel to listen to!");
  }
}

function setInfo(type, text, isHtml) {
  spanInfo.className = "label";
  spanInfo.classList.add(type);
  if (isHtml) {
    spanInfo.innerHTML = text;
  } else {
    spanInfo.innerText = text;
  }
}

function formatChat(chat) {
  var formattedChat = "";
  for (let i = 0; i < chat.length; i++) {
    formattedChat += "<b>" + chat[i].username + ": </b>" + chat[i].message + "<br />";
  }
  return formattedChat;
}
