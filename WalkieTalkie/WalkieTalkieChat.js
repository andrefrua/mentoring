// Controls
var btnUser1Walkie1Talk = document.getElementById("btnUser1Walkie1Talk");
var btnUser2Walkie1Talk = document.getElementById("btnUser2Walkie1Talk");
var btnUser3Walkie1Talk = document.getElementById("btnUser3Walkie1Talk");

var btnUser1Walkie1Listen = document.getElementById("btnUser1Walkie1Listen");
var btnUser2Walkie1Listen = document.getElementById("btnUser2Walkie1Listen");
var btnUser3Walkie1Listen = document.getElementById("btnUser3Walkie1Listen");

var btnUser1Walkie2Talk = document.getElementById("btnUser1Walkie2Talk");
var btnUser2Walkie2Talk = document.getElementById("btnUser2Walkie2Talk");
var btnUser3Walkie2Talk = document.getElementById("btnUser3Walkie2Talk");

var btnUser1Walkie2Listen = document.getElementById("btnUser1Walkie2Listen");
var btnUser2Walkie2Listen = document.getElementById("btnUser2Walkie2Listen");
var btnUser3Walkie2Listen = document.getElementById("btnUser3Walkie2Listen");

var inputUser1 = document.getElementById("inputUser1");
var inputUser2 = document.getElementById("inputUser2");
var inputUser3 = document.getElementById("inputUser3");

var preChat1 = document.getElementById("preChat1");
var preChat2 = document.getElementById("preChat2");


// Walkies
var walkie1 = new walkietalkie();
walkie1.createChannel("Channel 1");
var walkie2 = new walkietalkie();
walkie2.createChannel("Channel 2");

// User actions
btnUser1Walkie1Talk.onclick = function () {
  var username = "User 1";
  addMessageAndUpdateChat(walkie1, username, inputUser1, preChat1);
}
btnUser2Walkie1Talk.onclick = function () {
  var username = "User 2";
  addMessageAndUpdateChat(walkie1, username, inputUser2, preChat1);
}
btnUser3Walkie1Talk.onclick = function () {
  var username = "User 3";
  addMessageAndUpdateChat(walkie1, username, inputUser3, preChat1);
}

btnUser1Walkie2Talk.onclick = function () {
  var username = "User 1";
  addMessageAndUpdateChat(walkie2, username, inputUser1, preChat2);
}
btnUser2Walkie2Talk.onclick = function () {
  var username = "User 2";
  addMessageAndUpdateChat(walkie2, username, inputUser2, preChat2);
}
btnUser3Walkie2Talk.onclick = function () {
  var username = "User 3";
  addMessageAndUpdateChat(walkie2, username, inputUser3, preChat2);
}

btnUser1Walkie1Listen.onclick = function () {
  alert(walkie1.getLatestMessage());
}
btnUser2Walkie1Listen.onclick = function () {
  alert(walkie1.getLatestMessage());
}
btnUser3Walkie1Listen.onclick = function () {
  alert(walkie1.getLatestMessage());
}

btnUser1Walkie2Listen.onclick = function () {
  alert(walkie2.getLatestMessage());
}
btnUser2Walkie2Listen.onclick = function () {
  alert(walkie2.getLatestMessage());
}
btnUser3Walkie2Listen.onclick = function () {
  alert(walkie2.getLatestMessage());
}









// Utils
function addMessageAndUpdateChat(walkie, username, inputMessage, chatElementToUpdate) {
  walkie.addUserToChannel(username);
  walkie.addMessage(inputMessage.value, username);
  chatElementToUpdate.innerHTML = walkie.getChat(username);
  inputMessage.value = "";
}


