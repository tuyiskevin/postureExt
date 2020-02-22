
const root = document.getElementById("root");
const startBtn = document.getElementById("startBtn");
const counter = document.createElement("div")


root.style.backgroundColor = 'black'
root.style.width = `${screen.width * .15}px`

startBtn.style.width = "100%"
startBtn.style.height = "100%"
startBtn.style.color = "#72bcd4"
startBtn.style.border = "1px solid #72bcd4"
startBtn.style.fontSize = "40px"

counter.setAttribute("id", "counter");
counter.style.width = "100%"
counter.style.height = "100%"
counter.style.color = "#72bcd4"
counter.style.backgroundColor = "white"
counter.style.border = "1px solid #72bcd4"
counter.style.fontSize = "20px"
counter.innerText = "Please sit with good posture for 10 seconds"

const recordInitPosture = () => {
  startBtn.style.display = "none";
  root.appendChild(counter)
  let count = 10
  const countInt = setInterval(() => {
      if(count == 1){
        stopCountInt();
      }
      count--;
      counter.innerText = `Please sit with good posture for ${count} seconds`
    }, 1000);
  const stopCountInt = () => {
    clearInterval(countInt);
    counter.innerText = "All Set! Sit Straight!"
  }
}

startBtn.addEventListener("click", recordInitPosture);

// Use built in funtions like this
  // chrome.storage.sync.get('data', function(data) {
  //
  //  });
