document.addEventListener('DOMContentLoaded', function() {
    const introToggleSwitch = document.getElementById('intro-toggle-switch');
    const recapToggleSwitch = document.getElementById('recap-toggle-switch');
  
    // Load the current state from storage
    chrome.storage.sync.get(['autoSkipIntroEnabled', 'autoSkipRecapEnabled'], function(result) {
      introToggleSwitch.checked = result.autoSkipIntroEnabled || false;
      recapToggleSwitch.checked = result.autoSkipRecapEnabled || false;
    });
  
    // Add event listener for the intro toggle switch
    introToggleSwitch.addEventListener('change', function() {
      const isEnabled = introToggleSwitch.checked;
      chrome.storage.sync.set({ autoSkipIntroEnabled: isEnabled });
      
      // Send message to content script to enable/disable skipping intro
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { autoSkipIntroEnabled: isEnabled });
      });
    });
  
    // Add event listener for the recap toggle switch
    recapToggleSwitch.addEventListener('change', function() {
      const isEnabled = recapToggleSwitch.checked;
      chrome.storage.sync.set({ autoSkipRecapEnabled: isEnabled });
      
      // Send message to content script to enable/disable skipping recap
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { autoSkipRecapEnabled: isEnabled });
      });
    });
  });

document.body.style.backgroundColor = chrome.themeColor;
  