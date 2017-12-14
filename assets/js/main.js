//Create a new Client object with your broker's hostname, port and your own clientId
var client = new Messaging.Client("broker.mqttdashboard.com", 8000, "myclientid_" + parseInt(Math.random() * 100, 10));

var messagesDiv = document.getElementById('messages');

var messageArea = document.getElementById('message');

var clearBtn = document.getElementById('clear');

var options = {

  //connection attempt timeout in seconds
  timeout: 0,

  //Gets Called if the connection has successfully been established
  onSuccess: function () {
    messagesDiv.innerHTML = `<p class="bg-primary message">Connected.</p>` + messagesDiv.innerHTML;
  },

  //Gets Called if the connection could not be established
  onFailure: function (message) {
    alert("Connection failed: " + message.errorMessage);
  }

};

//Attempt to connect
client.connect(options);
setTimeout(function() {
  client.subscribe('emir', { qos: 2 });
  messagesDiv.innerHTML = `<p class="bg-primary message">Subscribed.</p>` + messagesDiv.innerHTML;
},2000);

//Gets called whenever you receive a message for your subscriptions
client.onMessageArrived = function (message) {
  //Do something with the push message you received
  // $('#messages').append('<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>');

  messagesDiv.innerHTML = `<p class="bg-primary message">${message.payloadString}</p>` + messagesDiv.innerHTML;
};

var publish = function (payload, topic, qos) {
  //Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
  var message = new Messaging.Message(payload);
  message.destinationName = topic;
  message.qos = qos;
  client.send(message);
};

message.addEventListener("keydown", function (event) {
  if (event.which == 13 || event.keyCode == 13) {
    publish(message.value, 'emir', 2);
  }
});

clearBtn.addEventListener("click", () => messagesDiv.innerHTML = "");