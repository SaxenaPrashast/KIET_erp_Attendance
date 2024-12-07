// Function to scrape attendance data
function scrapeAttendance() {
    const attendanceRows = document.querySelectorAll("#tbodyAtten tr"); // Target the table body rows
    let totalNumerator = 0;
    let totalDenominator = 0;

    attendanceRows.forEach((row) => {
        const attendanceCell = row.querySelectorAll("td")[1]; // Select the cell with attendance (e.g., "27/43")
        if (attendanceCell) {
            const [numerator, denominator] = attendanceCell.innerText.split("/").map(Number); // Split and parse
            if (!isNaN(numerator) && !isNaN(denominator)) {
                totalNumerator += numerator;
                totalDenominator += denominator;
            }
        }
    });

    return { totalNumerator, totalDenominator };
}

// Listener to handle messages from the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getAttendance") {
        const data = scrapeAttendance();
        sendResponse(data); // Send scraped data back to the extension
    }
});
