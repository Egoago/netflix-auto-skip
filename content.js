let autoSkipIntroEnabled = true;
let autoSkipRecapEnabled = true;

// Load initial state from storage
chrome.storage.sync.get(['autoSkipIntroEnabled', 'autoSkipRecapEnabled'], function(result) {
  autoSkipIntroEnabled = result.autoSkipIntroEnabled !== undefined ? result.autoSkipIntroEnabled : true;
  autoSkipRecapEnabled = result.autoSkipRecapEnabled !== undefined ? result.autoSkipRecapEnabled : true;
});

// Listen for messages to enable/disable auto-skip
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.autoSkipIntroEnabled !== undefined) {
    autoSkipIntroEnabled = request.autoSkipIntroEnabled;
  }
  if (request.autoSkipRecapEnabled !== undefined) {
    autoSkipRecapEnabled = request.autoSkipRecapEnabled;
  }
});

function skipContent() {
  if (autoSkipIntroEnabled) {
    const skipIntroButton = document.querySelector('button[data-uia="player-skip-intro"]');
    if (skipIntroButton) {
      skipIntroButton.click();
      console.log('Skipped Intro');
    }
  }

  if (autoSkipRecapEnabled) {
    const skipRecapButton = document.querySelector('button[data-uia="player-skip-recap"]');
    if (skipRecapButton) {
      skipRecapButton.click();
      console.log('Skipped Recap');
    }
  }
}

// Use MutationObserver to monitor changes in the DOM and check for the "Skip Intro" and "Skip Recap" buttons
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      skipContent();
    }
  });
});

observer.observe(document, { childList: true, subtree: true });

// Additionally, run skipContent periodically in case MutationObserver misses something
setInterval(skipContent, 5000);
