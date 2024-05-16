async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true, url: "https://www.netflix.com/*"};
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function sendMessageToActiveTab(message) {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const response = await chrome.tabs.sendMessage(tab.id, message);
  // TODO: Do something with the response.
}

document.addEventListener('DOMContentLoaded', function() {
    const introToggleSwitch = document.getElementById('intro-toggle-switch');
    const recapToggleSwitch = document.getElementById('recap-toggle-switch');
  
    // Load the current state from storage
    chrome.storage.local.get(['autoSkipIntroEnabled', 'autoSkipRecapEnabled'], function(result) {
      introToggleSwitch.checked = result.autoSkipIntroEnabled || false;
      recapToggleSwitch.checked = result.autoSkipRecapEnabled || false;
    });
  
    // Add event listener for the intro toggle switch
    introToggleSwitch.addEventListener('change', function() {
      const isEnabled = introToggleSwitch.checked;
      chrome.storage.local.set({ autoSkipIntroEnabled: isEnabled });

      (async () => {
        const tab = await getCurrentTab();
        if (tab !== undefined) {
          const response = await chrome.tabs.sendMessage(tab.id, { autoSkipIntroEnabled: isEnabled });
          console.log(response);
        }
      })();
    });

    recapToggleSwitch.addEventListener('change', function() {
      const isEnabled = recapToggleSwitch.checked;
      chrome.storage.local.set({ autoSkipRecapEnabled: isEnabled });

      (async () => {
        const tab = await getCurrentTab();
        if (tab !== undefined) {
          const response = await chrome.tabs.sendMessage(tab.id, { autoSkipRecapEnabled: isEnabled });
          console.log(response);
        }
      })();
    });
  });

document.body.style.backgroundColor = chrome.themeColor;
  