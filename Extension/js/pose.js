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

function getPicture (imageId) {
  var flipHorizontal = false;
  var goodValues;
  var posture = document.getElementById(imageId); // this line refers to how i get the image

  posenet.load().then(function(net) {
    const pose = net.estimateSinglePose(posture, {
      flipHorizontal: true
    });
    return pose;
  }).then(function(pose){
    console.log("Posture");
    console.log(pose);

    postureValues = distancesFromPose(pose);
    return postureValues;
  });
}

function comparePostures (initialPostureValues, currentPostureValues){
    console.log("Percent Differences");
    console.log(poseDifferences(goodValues,currentValues));

    return(isSlouching(poseDifferences(goodPostureValues,badValues)));
  })
}

////////////////////////////////////////////////////////////////////////////////
// used for testing and setup purposes. Now all the relavent code is in function
    // console.log("Hello");
    // var flipHorizontal = false;
    // var goodValues;
    // var badValues;
    // var goodPosture = document.getElementById('postureGood');
    // var badPosture = document.getElementById('postureBad');
    //
    // // doing posture things on the goodPosture image
    // posenet.load().then(function(net) {
    //   const poseG = net.estimateSinglePose(goodPosture, {
    //     flipHorizontal: true
    //   });
    //   return poseG;
    // }).then(function(poseG){
    //   console.log("GoodPosture");
    //   console.log(poseG);
    //
    //   goodValues = distancesFromPose(poseG);
    //   console.log(goodValues);
    // });
    //
    //   //bad posture
    // posenet.load().then(function(net) {
    //   const poseB = net.estimateSinglePose(badPosture, {
    //     flipHorizontal: true
    //   });
    //   return poseB;
    // }).then(function(poseB){
    //   console.log("badPosture");
    //   console.log(poseB);
    //
    //   badValues= distancesFromPose(poseB)
    //   console.log(badValues);
    //
    //   console.log("Percent Differences");
    //   console.log(poseDifferences(goodValues,badValues));
    //
    //   console.log(hasGoodPosture(poseDifferences(goodValues,badValues)))
    // })
