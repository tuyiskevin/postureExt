console.log("hit")



const videoWidth = 600;
const videoHeight = 500;
const video = document.getElementById('video'),
      canvas = document.getElementById('canvas'),
      output = document.getElementById('output'),
      trigger = document.getElementById('trigger');

async function getVideo() {
  video.width = videoWidth;
  video.height = videoHeight;
  output.width = videoWidth;
  output.height = videoHeight;
  output.style.display = "none";
    const stream = await navigator.mediaDevices.getUserMedia({
        'video' : {
        facingMode: 'user',
        width: videoWidth,
        height: videoHeight
        },
        'audio': false
        });
        video.srcObject = stream;
    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
        resolve(video);
    };
  });
}

const loadVideo = async () => {

  const video = await getVideo();
  video.play();

  return video
}
loadVideo();


// **********************




function distance(p1, p2) {
  return Math.sqrt(Math.pow((p1.x-p2.x),2) + Math.pow((p1.y-p2.y),2));
}

function poseDifferences(good, bad) {

  differences = {noseL: good.noseLeft/bad.noseLeft, noseR: good.noseRight/bad.noseRight,
  rL: good.leftRight/bad.leftRight};

  return differences;
}

function distancesFromPose(pose){
  return {noseLeft: distance(pose.keypoints[0].position,pose.keypoints[5].position),
    noseRight: distance(pose.keypoints[0].position,pose.keypoints[6].position),
    leftRight: distance(pose.keypoints[5].position,pose.keypoints[6].position)};
}

function hasGoodPosture(diff){

  // if nose difference decreases by 10% or should distances increases by 10%
  if(diff.noseL > 1.10 || diff.noseR> 1.10 || diff.rL <0.9){
    return false;
  } else{
    return true;
  }
}


const getPicture = async () => {

  let finalPostureValues;

  const video = document.getElementById('video'),
        canvas = document.getElementById('canvas'),
        output = document.getElementById('output')

        const ratio = video.videoWidth / video.videoHeight;
        const w = video.videoWidth - 100;
        const h = parseInt(w / ratio, 10);
        canvas.width = w;
        canvas.height = h;

  context = canvas.getContext("2d");
  context.fillRect(0, 0, w, h);
  context.drawImage(video, 0, 0, w, h);

  output.src = canvas.toDataURL("image/png")

  let flipHorizontal = false;
  let goodValues;
  let posture = document.getElementById("output"); // this line refers to how i get the image


  const net = await posenet.load()

  const pose = await net.estimateSinglePose(posture, {
      flipHorizontal: true
    });

  const postureValues = await distancesFromPose(pose);


  return postureValues;

}


const comparePics = (init, current) => {

    console.log("Percent Differences");
    return(hasGoodPosture(poseDifferences(init,current)));
  }


const triggerNotif = () => {

  alert("CORRECT YOUR POSTURE!!!")


}



const startRecording = () => {
  // We have the initial picture saved in storage
  let initial;
  chrome.storage.sync.get(["initialPic"], (data0) => { // This entire function is a callback
    initial = data0.initialPic
    // Counter
    let count = 1;
    // populated means we have taken at least 3 photos
    let populated = false;
    // Will record and check pictures every ten seconds
    const recorder = setInterval( async () => {

      const thisPicture = await getPicture();


      // posture is true if good
      const posture = await comparePics(initial, thisPicture);

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
