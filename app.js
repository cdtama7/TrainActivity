// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyDoIthS64T32d6jm6uw-Yn7JMcAXRAYc84",
  authDomain: "bootcamp-72190.firebaseapp.com",
  databaseURL: "https://bootcamp-72190.firebaseio.com",
  projectId: "bootcamp-72190",
  storageBucket: "bootcamp-72190.appspot.com",
  messagingSenderId: "227621307300",
  appId: "1:227621307300:web:438150486edd15dd343731",
  measurementId: "G-6W0M7TBWV1"
};

firebase.initializeApp(config);

var database = firebase.database();
///////

//////
// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var empName = $("#employee-name-input").val().trim();
  var empRole = $("#role-input").val().trim();
  var firstTrain = moment($("#start-input").val().trim(), "hh:mm").format("X");
  console.log(firstTrain);
  var tFrequency = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newEmp = {
    name: empName,
    role: empRole,
    first: firstTrain,
    freq: tFrequency
  };

  // Uploads employee data to the database
  database.ref().push(newEmp);

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  // console.log(childSnapshot.val());

  // Store everything into a variable.
  var empName = childSnapshot.val().name;
  var empRole = childSnapshot.val().role;
  var firstTrain = childSnapshot.val().first;
  var tFrequency = childSnapshot.val().freq;

  // console.log(firstTrain);

  // Employee Info
  console.log(empName);
  console.log(empRole);
  console.log(firstTrain);
  console.log(tFrequency);
  // var tFrequency = 3;

  // // Time is 3:30 AM
  // var firstTime = "03:30";
  var empStartPretty = moment.unix(firstTrain).format("HH:mm");
    // Time is 3:30 AM

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(empStartPretty, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  // var currentTime = moment();
  // console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  // console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  // console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var trainLog = moment(nextTrain).format("HH:mm");
  // Prettify the employee start
  // console.log(empMonths);

  // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(empName),
    $("<td>").text(empRole),
    $("<td>").text(tFrequency),
    $("<td>").text(trainLog),
    $("<td>").text(tMinutesTillTrain),
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
