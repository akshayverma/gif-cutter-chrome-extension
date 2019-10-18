// Initialize background page
chrome.runtime.getBackgroundPage(function(backgroundPage) {
  console = backgroundPage.console;
});

let popup = setInterval(function(){
    console.log("Extension loaded");
  }, 50);
