

// Runs at on Installation (initial)
chrome.runtime.onInstalled.addListener(function() {



});


var popupWindow = window.open(
    chrome.extension.getURL("../popup.html"),
    "exampleName",
    "width=400,height=400"
);
