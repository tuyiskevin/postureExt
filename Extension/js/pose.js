    console.log("Hello");
    var flipHorizontal = false;

    var imageElement = document.getElementById('cat');

    posenet.load().then(function(net) {
      const pose = net.estimateSinglePose(imageElement, {
        flipHorizontal: true
      });
      return pose;
    }).then(function(pose){
      console.log(pose);
      console.log("Nose Coordinates: "+ pose[0]);
    })
