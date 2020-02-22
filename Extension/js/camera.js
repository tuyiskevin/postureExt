console.log("hit")

const getPicture = () => {
  let pictureData = true;

  // Dont actually return the picture.
  // Just return the necesary Values

  console.log("picture taken")
  return pictureData;
}


const comparePics = (init, current) => {

  // Checks whether current is bad posture relative to init
    console.log("picture compared")

  // returns true if good and false if bad
  return true;
}



const triggerNotif = () => {
  // Notify user of their shitty posture
  console.log("notif triggered")
}



const startRecording = async () => {
  // We have the initial picture saved in storage
  let initial;
  chrome.storage.sync.get(["initialPic"], (data0) => { // This entire function is a callback
    initial = data0.initialPic
    // Counter
    let count = 1;
    // populated means we have taken at least 3 photos
    let populated = false;
    // Will record and check pictures every ten seconds
    const recorder = setInterval(() => {
      const thisPicture = getPicture();
      // posture is true if good
      const posture = comparePics(initial, thisPicture);

      // store the posture data for later use
      const currKey = `posture${count}`;
      console.log(currKey)
      chrome.storage.sync.set({[currKey]: posture});

      // if three pics have been recorded, populate = true
      if (count == 0){
          populated = true
        }

      // if three pics recorded
      if (populated){
        // get the last three postures
        const keyA = `posture0`;
        const keyB = `posture1`;
        const keyC = `posture2`;
        let a;
        let b;
        let c;
        chrome.storage.sync.get(keyA, (data) => {
          a = data[keyA]
          chrome.storage.sync.get(keyB, (data2) => {
            b = data2[keyB]
            chrome.storage.sync.get(keyC, (data3) => {
              c = data3[keyC]

              console.log(a, b, c)
              // if all postures are bad
              if (!a && !b && !c){
                triggerNotif();;
              }

              });
            });
          });
      }
      // Iterate infinitely through 1 => 2 => 0 => 1 => 2 => 0 ...
      count = (count + 1) % 3;
    }, 2000)

  }); // This is form the Assigning Initial

}
