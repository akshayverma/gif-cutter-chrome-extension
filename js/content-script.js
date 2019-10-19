var startTimeBox = document.createElement("input");
startTimeBox.id = "startTime";
startTimeBox.placeholder = "Enter start time";
startTimeBox.style.cssText = "position:relative; width: 100px;border: solid 2px #2F4F4F;height: 26px;padding-left: 10px;";

var deltaBox = document.createElement("input");
deltaBox.id = "delta";
deltaBox.placeholder = "Enter number of seconds < 3";
deltaBox.style.cssText = "position:relative; left: 25px;width: 100px;border: solid 2px #2F4F4F;height: 26px;padding-left: 10px;";

var submitBtn = document.createElement("button");
submitBtn.id = "submitBtn";
submitBtn.innerHTML = "crerate gif";
submitBtn.style.cssText = "position:relative;left: 75px;width: 75px;";

var outputDiv = document.createElement("div");
outputDiv.id = "outputDiv";
outputDiv.style.cssText = "width: 280;height: 280px;";

var setup = function() {
  var parentElement = document.getElementById("info");
  parentElement.appendChild(startTimeBox);
  parentElement.appendChild(deltaBox);
  parentElement.appendChild(submitBtn);
  parentElement.appendChild(outputDiv);
}

window.addEventListener('load', function() {
    setup();
    document.getElementById("submitBtn").addEventListener("click", function(){
      var startTime = startTimeBox.value;
      var deltaTime = deltaBox.value;
      console.log(startTime);
      console.log(deltaTime);

      if (!isValidGIFRequest(startTime, delta)){
        alert('Invalid request');
      }
      createGIF(startTime, deltaTime);
    });
});

var isValidGIFRequest = function(startTime, delta) {
  var video = document.getElementsByTagName("video")[0];
  var videoDuration = video.duration;
  if (startTime < 0 || delta < 0 ||(startTime + delta > videoDuration)) {
    return false;
  }
  return true;
}

/***********Lib functions to get images and create GIF**********************/
function getImageAtTime(secs) {
  var video = document.getElementsByTagName("video")[0];
  var videoDuration = video.duration;

  if (secs > 0 && secs < videoDuration ) {
    video.currentTime = secs;
    var canvas = document.createElement('canvas');
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    var img = new Image();
    img.src = canvas.toDataURL();
    outputDiv.appendChild(img);
    return ctx;
  }
}

var readFrames = function(timeStamps, images) {
  return timeStamps.reduce((p, timeStamp) => {
     return p.then(() => {
       images.push(getImageAtTime(timeStamp));
     });
  }, Promise.resolve());
};

function createGIF(startTime, delta) {
  var deltaInMS = delta * 1000;
  var iter = 0;
  var timeStamps = [];
  var images = [];

  while (iter < deltaInMS) {
    timeStamps.push(startTime + iter/1000);
    iter+=250;
  }

  readFrames(timeStamps, images);

  const encoder = new GIFEncoder(320, 240);
  encoder.start();
  encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
  encoder.setDelay(100);  // frame delay in ms
  encoder.setQuality(10); // image quality. 10 is default.

  // use node-canvas
  const canvas = document.createElement('canvas');
  canvas.height = 320;
  canvas.width = 240;
  const ctx = canvas.getContext('2d');

  for (var i=0; i<images.length; i++) {
    encoder.addFrame(images[i]);
  }

  encoder.finish();

  encoder.download("download.gif");
}
