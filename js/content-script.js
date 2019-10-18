function loadScript(scriptName, callback) {
    var script = document.createElement('script');
    script.src = chrome.extension.getURL(scriptName);
    script.addEventListener('load', callback, false);
    (document.head || document.documentElement).appendChild(script);
}
