let autoSkipIntroEnabled = true;
let autoSkipRecapEnabled = true;

// Load initial state from storage
chrome.storage.local.get(['autoSkipIntroEnabled', 'autoSkipRecapEnabled'], function (result) {
    console.log(`initial intro: ${result.autoSkipIntroEnabled} recap: ${result.autoSkipRecapEnabled}`)
    autoSkipIntroEnabled = result.autoSkipIntroEnabled !== undefined ? result.autoSkipIntroEnabled : true;
    autoSkipRecapEnabled = result.autoSkipRecapEnabled !== undefined ? result.autoSkipRecapEnabled : true;
});

// Listen for messages to enable/disable auto-skip
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.autoSkipIntroEnabled !== undefined) {
        autoSkipIntroEnabled = request.autoSkipIntroEnabled;
        console.log(`Skip set to ${request.autoSkipIntroEnabled}`);
    }
    if (request.autoSkipRecapEnabled !== undefined) {
        autoSkipRecapEnabled = request.autoSkipRecapEnabled;
        console.log(`Recap set to ${request.autoSkipRecapEnabled}`);
    }
});

function skipContent() {
    if (autoSkipIntroEnabled) {
        const skipIntroButton = document.querySelector('[data-uia="player-skip-intro"]');
        if (skipIntroButton) {
            console.log('Skip');
            applySlideEffectAndAutoClick(skipIntroButton);
        }
    }
    if (autoSkipRecapEnabled) {
        const skipRecapButton = document.querySelector('[data-uia="player-skip-recap"]');
        if (skipRecapButton) {
            console.log('Skip');
            applySlideEffectAndAutoClick(skipRecapButton);
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
