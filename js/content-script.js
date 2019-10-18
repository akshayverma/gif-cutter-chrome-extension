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


var setup = function() {
  var parentElement = document.getElementById("info");
  parentElement.appendChild(startTimeBox);
  parentElement.appendChild(deltaBox);
  parentElement.appendChild(submitBtn);
}

window.addEventListener('load', function() {
    setup();
});
