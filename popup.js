// Request attendance data from the active tab
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content.js"] // Inject the content script into the active tab
    }, () => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getAttendance" }, (response) => {
            if (response) {
                // Update the popup with the scraped data
                document.getElementById("numerator").textContent = response.totalNumerator;
                document.getElementById("denominator").textContent = response.totalDenominator;
            } else {
                document.body.innerHTML = "<p>Failed to load attendance data.</p>";
            }
        });
    });
});
