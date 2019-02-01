// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAT1_zAx4mfBNOcv0Cx2XCVY-FfcM8XTis",
    authDomain: "train-scheduler-uclaext.firebaseapp.com",
    databaseURL: "https://train-scheduler-uclaext.firebaseio.com",
    projectId: "train-scheduler-uclaext",
    storageBucket: "",
  };

  firebase.initializeApp(config);

  var dataRef = firebase.database();

  var train = "";
  var destination = "";
  var frequency = 0;
  var nextArrival = 0;
  var away = 0;


  $("#addTrain").on("click", function(event) {
    event.preventDefault();
  
    train = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    nextArrival = $("#firstTime-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    
 
    dataRef.ref().push({
      train: train,
      destination: destination,
      frequency: frequency,
      nextArrival: nextArrival,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

  dataRef.ref().on("child_added", function(snapshot) {
    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().train);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().nextArrival);
    // Change the HTML to reflect
    $("#display-trainName").text(snapshot.val().train);
    $("#display-destination").text(snapshot.val().destination);
    $("#display-frequency").text(snapshot.val().frequency);
    $("#display-arrival").text(snapshot.val().nextArrival);
    $("#display-away").text(snapshot.val().away);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
