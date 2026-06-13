let room = "";

function joinRoom() {
  room = document.getElementById("roomInput").value;

  if (!room) return alert("Enter a room code!");

  document.getElementById("roomBox").style.display = "none";
  document.getElementById("chatApp").style.display = "block";

  loadMessages();
}

function getKey() {
  return "loveconnect_" + room;
}

function loadMessages() {
  let chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";

  let data = JSON.parse(localStorage.getItem(getKey())) || [];

  data.forEach(msg => {
    chatBox.innerHTML += `<div>${msg}</div>`;
  });
}

function saveMessage(msg) {
  let data = JSON.parse(localStorage.getItem(getKey())) || [];
  data.push(msg);
  localStorage.setItem(getKey(), JSON.stringify(data));
  loadMessages();
}

function sendMsg() {
  let input = document.getElementById("msgInput");
  if (!input.value) return;

  saveMessage("💬 " + input.value);
  input.value = "";
}

function sendLink() {
  let input = document.getElementById("linkInput");
  if (!input.value) return;

  saveMessage("🔗 <a href='" + input.value + "' target='_blank'>" + input.value + "</a>");
  input.value = "";
}

function sendFile() {
  let file = document.getElementById("fileInput").files[0];
  if (!file) return;

  let reader = new FileReader();

  reader.onload = function(e) {
    let type = file.type.startsWith("video") ? "🎥 Video" : "📸 Photo";

    let html = `${type}<br><img src="${e.target.result}" style="max-width:200px;">`;
    saveMessage(html);
  };

  reader.readAsDataURL(file);
}