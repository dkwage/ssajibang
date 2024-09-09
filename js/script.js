var firebaseConfig = {
  apiKey: "AIzaSyB1Iq_b8lKBi0Z6S-XOI4HtztFJEdL01mY",
  authDomain: "fdc-bcffd.firebaseapp.com",
  databaseURL:
    "https://fdc-bcffd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fdc-bcffd",
  storageBucket: "fdc-bcffd.appspot.com",
  messagingSenderId: "639470773897",
  appId: "1:639470773897:web:a0491eab615c8a1b134858",
  measurementId: "G-PG0GCDHTZ8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize an empty array to hold events
var events = [];

// Function to read event data from Firebase and render the calendar
function readEventDataFromFirebase() {
  var database = firebase.database();
  var ref = database.ref("events");
  ref.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var eventData = childSnapshot.val();
      events.push({
        title: eventData.title,
        start: eventData.start,
        end: eventData.end,
        color: eventData.color,
      });
    });
    // After reading data, render the calendar
    renderCalendar();
  });
}

// Function to delete event data from Firebase based on start date
function deleteEventsByDateFromFirebase(date) {
  return new Promise((resolve, reject) => {
    var database = firebase.database();
    var ref = database.ref("events");
    ref.once(
      "value",
      function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var eventData = childSnapshot.val();
          var eventStartDate = new Date(eventData.start);
          // Check if the event start date matches the provided date
          if (eventStartDate.toDateString() === date.toDateString()) {
            // Remove the event from Firebase
            ref.child(childSnapshot.key).remove();
          }
        });
        resolve(); // Resolve the promise after processing all events
      },
      (error) => {
        reject(error);
      }
    );
  });
}

// Function to render the calendar with the populated events array
function renderCalendar() {
  var calendarEl = $("#calendar")[0];
  var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      left: "prev",
      center: "title",
      right: "next today",
    },
    // Your other calendar configurations here
    events: events, // Use the populated events array
  });
  calendar.render();

  // Event listener for the delete events button
  document
    .getElementById("deleteEventsBtn")
    .addEventListener("click", function () {
      var deleteDateInput = document.getElementById("deleteDateInput").value;
      if (deleteDateInput) {
        var selectedDate = new Date(deleteDateInput); // Convert input value to Date object
        if (confirm(selectedDate.toDateString() + "의 이벤트를 삭제할까요?")) {
          // Call the function to delete events for the specified date from Firebase
          deleteEventsByDateFromFirebase(selectedDate)
            .then(() => {
              // Refresh the page after deletion
              location.reload();
            })
            .catch((error) => {
              console.error("이벤트 삭제 오류", error);
              alert("이벤트를 삭제하던 중 오류가 발생했습니다.");
            });
        }
      } else {
        alert("삭제할 날짜를 선택해주세요.");
      }
    });
}

// Function to write event data to Firebase
function writeEventDataToFirebase(title, start, end, color) {
  return new Promise((resolve, reject) => {
    var database = firebase.database();
    var ref = database.ref("events"); // Replace 'events' with the actual path to your event data
    ref.push(
      {
        title: title,
        end: end,
        start: start,
        color: color,
      },
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
}

$(document).ready(function () {
  readEventDataFromFirebase();

  // Add event listener for the button to add an event
  $("#addEventBtn").click(function (event) {
    var title = $("#eventTitle").val();
    var start = $("#eventStart").val();
    var end = $("#eventEnd").val();
    var color = $("#eventColor").val();

    // Check if the fields are not empty
    if (title && start) {
      // Write data to Firebase and wait for it to complete
      writeEventDataToFirebase(title, start, end, color).then(() => {
        // Clear input fields after writing to Firebase
        $("#eventTitle").val("");
        $("#eventStart").val("");
        $("#eventEnd").val("");
        $("#eventColor").val("");

        // Refresh the page
        location.reload();
      });
    } else {
      // Prevent the default action and show an alert
      event.preventDefault();
      alert("날짜를 제대로 입력해주세요.");
    }
  });
});
