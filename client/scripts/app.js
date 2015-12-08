// YOUR CODE HERE:

// ajax call out
// parse return

// createdAt: "2015-09-01T01:00:42.028Z"
// objectId: "hwhupXO0iX"
// roomname: "4chan"
// text: "trololo"
// updatedAt: "2015-09-01T01:00:42.028Z"
// username: "shawndrost"

var myDataStore = {};

function getMessages() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    method: 'GET',
    data: 'text',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received. Data: ', data);
      // store fetched messages on myDataStore object
      myDataStore.messages = data.results;
      // index is the newest message, ie, last in returned array
      myDataStore.index = data.results.length - 1;
      appendMessages(myDataStore.index);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive messages. Error: ', data);
    }
  });
}

function buildMessage(index) {
  var picture, username, time, text, message;
  picture = '<div class="userpic"></div>';
  username = '<div class="username">' + myDataStore.messages[index].username + '</div>';
  time = '<div class="createdAt">' + myDataStore.messages[index].createdAt + '</div>';
  text = '<div class="text">' + myDataStore.messages[index].text + '</div>';
  message = picture + username + time + text;
  return message;
}

// function that fetches chunks of 25ish messages based on index of current newest message
function appendMessages(index) {
  var counter;
  var message;

  if (index < 24) {
    counter = index + 1;
  }
  else {
    counter = 25;
  }

  while(counter) {
    message = buildMessage(index);
    $('.allMessages').append(message);
    counter--;
    index--;
  }
  myDataStore.index = index;
}

$(document).ready(function() {
  getMessages();
});