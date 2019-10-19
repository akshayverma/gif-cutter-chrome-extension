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
      var startTime = parseInt(startTimeBox.value);
      var deltaTime = parseInt(deltaBox.value);
      console.log(startTime);
      console.log(deltaTime);

      if (deltaTime > 4) {
        alert("Time range too big!");
      }

      if (!isValidGIFRequest(startTime, delta)){
        alert('Invalid request');
      }
      console.log(new Date());
      createGIF(startTime, deltaTime);
      console.log(new Date());
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
function getImageAtTime(video, secs) {
  var canvas = document.createElement('canvas');
  canvas.height = video.videoHeight;
  canvas.width = video.videoWidth;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  return ctx;
}

function createGIF(startTime, delta) {
  console.log("Create image array");
  console.log(new Date());
  var deltaInMS = delta * 1000;
  var iter = 0;
  var timeStamps = [];
  var images = [];

  var video = document.getElementsByTagName("video")[0];
  var videoDuration = video.duration;

  if (startTime > 0 && startTime < videoDuration ) {
    video.currentTime = startTime;
    var now = end = new Date();
    var lastClick = now;
    var currentTime = startTime;

    while ((end - now) < deltaInMS) {
      if (end - lastClick > 250) {
        images.push(getImageAtTime(video, currentTime));
        currentTime += 0.25;
        lastClick = end;
      }
      end = new Date();
    }
  }

  console.log("Starting encoder");
  console.log(new Date());
  const encoder = new GIFEncoder(64, 48);
  encoder.start();
  encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
  encoder.setDelay(100);  // frame delay in ms
  encoder.setQuality(1); // image quality. 10 is default.

  // use node-canvas
  const canvas = document.createElement('canvas');
  canvas.height = 64;
  canvas.width = 48;
  const ctx = canvas.getContext('2d');

  for (var i=0; i<images.length; i++) {
    encoder.addFrame(images[i]);
  }

  encoder.finish();

  encoder.download("download.gif");
}
