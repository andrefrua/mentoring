var channelsList = [];

const messageTypes = {
  DEFAULT: "label-default",
  INFO: "label-info",
  WARNING: "label-warning",
  ERROR: "label-danger",
  SUCCESS: "label-success"
}

// User actions
btnUser1Talk.onclick = function () {
  addMessageToChannel("User 1", inputUser1);
}
btnUser2Talk.onclick = function () {
  addMessageToChannel("User 2", inputUser2);
}
btnUser3Talk.onclick = function () {
  addMessageToChannel("User 3", inputUser3);
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

// UTILS
function createChannel() {
  if (inputChannelName.value !== "") {
    var newChannelName = inputChannelName.value;
    var newWalkieChannel = new walkieTalkie();
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
    setInfo(messageTypes.SUCCESS, "Channel " + newChannelName + " was created.");
  } else {
    setInfo(messageTypes.WARNING, "You need to give a name to the channel!")
  }
}

function addMessageToChannel(username, inputMessage) {
  if (selectAvailableChannels.selectedIndex > -1) {
    var channel = channelsList[parseInt(selectAvailableChannels.value)];
    channel.addMessage(inputMessage.value, username);
    preChannelChat.innerHTML = channel.getChat(username);
    inputMessage.value = "";
    setInfo(messageTypes.SUCCESS, "Message sent.");
  } else {
    setInfo(messageTypes.WARNING, "You need to select a channel in order to talk!");
  }
}

function getLatestMessage() {
  if (selectAvailableChannels.selectedIndex > -1) {
    var channel = channelsList[parseInt(selectAvailableChannels.value)];
    var latestMessage = channel.getLatestMessage();

    if (latestMessage) {
      message = "<b>" + latestMessage.username + ": </b>" + latestMessage.message;
      setInfo(messageTypes.DEFAULT, message, true);
    } else {
      message = "No messages available"
      setInfo(messageTypes.INFO, "You need to select a channel in order to talk!");
    }
  } else {
    setInfo(messageTypes.WARNING, "You need to select a channel to listen to!");
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
