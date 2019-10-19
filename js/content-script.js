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
      var img = getImageAtTime(startTime);
      outputDiv.appendChild(img);
    });
});

/***********Lib functions to get images and create GIF**********************/
function getImageAtTime(secs) {
  var video = document.getElementsByTagName("video")[0];
  console.log(video);
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
    return img;
  }
}
