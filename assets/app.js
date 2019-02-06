// Initialize Firebase
var config = {
  apiKey: "AIzaSyAT1_zAx4mfBNOcv0Cx2XCVY-FfcM8XTis",
  authDomain: "train-scheduler-uclaext.firebaseapp.com",
  databaseURL: "https://train-scheduler-uclaext.firebaseio.com",
  projectId: "train-scheduler-uclaext",
  storageBucket: "",
};

firebase.initializeApp(config);

console.log(firebase);

var dataRef = firebase.database();

var train = "";
var destination = "";
var frequency = 0;
var nextArrival = 0;
var away = 0;


$("#addTrain-input").on("click", function (event) {
  event.preventDefault();

  train = $("#trainName-input").val().trim();
  destination = $("#destination-input").val().trim();
  nextArrival = $("#firstTime-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  console.log("hi");
  dataRef.ref().push({
    train: train,
    destination: destination,
    frequency: frequency,
    nextArrival: nextArrival,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

dataRef.ref().on("child_added", function (snapshot) {
  // Log everything that's coming out of snapshot
  console.log(snapshot.val());
  console.log(snapshot.val().train);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().frequency);
  console.log(snapshot.val().nextArrival);
  // Change the HTML to reflect
  var newTrain = snapshot.val().train;
  var newDestination = snapshot.val().destination;
  var newFrequency = snapshot.val().frequency;
  var nextArrival = snapshot.val().nextArrival;
  var newFrequency = parseInt(newFrequency);

  var nextArrivalConverted = moment(nextArrival, "hh:mm").subtract(1, "years");
  console.log(nextArrivalConverted);

  var currentTime = moment().format("hh:mm");
  console.log("CURRENT TIME: ", moment(currentTime).format("hh:mm"));
  
 
  var diffTime = moment().diff(moment(nextArrivalConverted), "minutes");
  console.log("DIFFERENCE IN TIME: ", diffTime);
  


  var tRemainder = parseInt(diffTime) % newFrequency;
  console.log(tRemainder);

  console.log(parseInt(diffTime), "hi");
  console.log(newFrequency, "bye");
  

  var tMinutesTillTrain = newFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: ", tMinutesTillTrain);
  console.log(typeof tMinutesTillTrain, "type");

  var minsAway = tMinutesTillTrain + diffTime;
  console.log (minsAway, "minsaway");
 
  var nextTrain = moment(currentTime, "hh:mm").add(newFrequency, "minutes").toDate();
  nextTrain = moment(nextTrain).format("hh:mm");
  console.log(nextTrain, "next train");

 // var arrivalUpdated = moment().unix(nextArrival).format("HH:mm");

  var newRow = $("<tr>").append(
    $("<td>").text(newTrain),
    $("<td>").text(newDestination),
    $("<td>").text(newFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),
  );

  // Append the new row to the table
  $("#trainTable > tbody").append(newRow);
  
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
 
});






