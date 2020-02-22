chrome.storage.sync.set({data: 'value'}, function() {

});



const getPicture = () => {
  let pictureData;

  // Dont actually return the picture.
  // Just return the necesary Values


  return pictureData;
}



const startRecording = () => {
  // We have the inital picture saved in storage
  initial = chrome.storage.sync.get(["initialPic"]);

    // Every ten seconds
      // getPicture()
      // Compare data w/ initial
      // Store a boolean (good posture == true, bad posture == false)

    // If three bad postures in a row,
      // Do Notification Functions 
}
