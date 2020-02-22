chrome.storage.sync.set({data: 'value'}, function() {

});



const getPicture = () => {
  let pictureData;

  // Dont actually return the picture.
  // Just return the necesary Values


  return pictureData;
}


const comparePics = (init, current) => {

  // Checks whether current is bad posture relative to init

  // returns true if good and false if bad
}



const triggerNotif = () => {
  // Notify user of their shitty posture
}



const startRecording = () => {
  // We have the inital picture saved in storage
  initial = chrome.storage.sync.get(["initialPic"]);

    // Every ten seconds
      // getPicture()
      // Compare data w/ initial
      // Store a boolean (good posture == true, bad posture == false)

    // Counter
    const count = 1;
    // populated means we have taken at least 3 photos
    let populated = false;

    // Will record and check pictures every ten seconds
    const recorder = setInterval(() => {
      const thisPicture = getPicture();
      // posture is true if good
      const posture = comparePics(inital, thisPicture);

      // store the posture data for later use
      chrome.storage.sync.set({`posture${count}`: posture}, () => {console.log(posture)});

      // if three pics have been recorded, populate = true
      if (count == 0){
          populated = true
        }

      // if three pics recorded
      if (populated){
        // get the last three postures
        const a = chrome.storage.sync.get([`posture${count}`]);
        const b = chrome.storage.sync.get([`posture${(count + 1)%3}`]);
        const c = chrome.storage.sync.get([`posture${(count + 2)%3}`]);
        // if all postures are bad
        if (!(a || b || c)){
          triggerNotif();
        }
      }
      // Iterate infinitely through 1 => 2 => 0 => 1 => 2 => 0 ...
      count = (count + 1) % 3;
    }, 10000)

    // If three bad postures in a row,
      // Do Notification Functions
}
