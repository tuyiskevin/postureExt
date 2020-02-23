


const root = document.getElementById("root");
const startBtn = document.getElementById("startBtn");
const counter = document.createElement("div")


// Setting background styles
root.style.backgroundColor = 'black'
root.style.width = `${screen.width * .15}px`

// Setting button styles
startBtn.style.width = "100%"
startBtn.style.height = "100%"
startBtn.style.color = "#72bcd4"
startBtn.style.border = "1px solid #72bcd4"
startBtn.style.fontSize = "40px"

// Setting counter styles
counter.setAttribute("id", "counter");
counter.style.width = "100%"
counter.style.height = "100%"
counter.style.color = "#72bcd4"
counter.style.backgroundColor = "white"
counter.style.border = "1px solid #72bcd4"
counter.style.fontSize = "20px"



// Clear saved data
chrome.storage.sync.clear();

const recordInitPosture = async () => {

  // Intial point
  startBtn.style.display = "none";
  root.appendChild(counter)
  let count = 5
  counter.innerText = `Please sit with good posture for ${count} seconds`

  let initialImage;

  // Countdown
  const countInt = setInterval(async () => {

      if(count == 0){
        stopCountInt();
      } else {
        count--;
        counter.innerText = `Please sit with good posture for ${count} seconds`
      }
      if(count == 2){
        initialImage = await getPicture();
      }
    }, 1000);

    // Initial picture is

  // End Countdown
  const stopCountInt = () => {
    clearInterval(countInt);
    console.log(initialImage)
    chrome.storage.sync.set({initialPic: initialImage}, () => {
      counter.innerText = "All Set! Sit Straight!"
    });
    startRecording();
  }
}


// Add event listeners
startBtn.addEventListener("click", recordInitPosture);

// Use built in funtions like this
  // chrome.storage.sync.get('data', function(data) {
  //
  //  });
