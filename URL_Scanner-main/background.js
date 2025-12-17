import { checkWithSafeBrowsing } from "./src/safeBrowsingCheck.js";
import { checkUrl } from "./src/checkUrl.js";

// Listener that runs when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
});

// Listener that triggers when a page completes loading
chrome.webNavigation.onCompleted.addListener(async (details) => {
    // Ensure this runs only for the main page (not frames)
    if (details.frameId === 0) {
        const currentUrl = details.url;
        
        // Step 1: Check the URL with Google Safe Browsing
        const sbResult = await checkWithSafeBrowsing(currentUrl);
        
        // If Safe Browsing detects a malicious or suspicious URL, stop further checks and alert the user
        if (sbResult.includes("malicious") || sbResult.includes("suspicious")) {
            showNotification(`⚠️ Google Safe Browsing Warning:\n${sbResult}`, true);
            return;
        }

        // Step 2: If Safe Browsing result is clean, proceed with a local URL check
        const issues = checkUrl(currentUrl);

        // Display results from the local URL check
        if (issues.length > 0) {
            showNotification(`⚠️ Issues detected:\n${issues.join("\n")}`, true);
        } else {
            showNotification("✅ Everything looks good!", false);
        }
    }
}, { url: [{ schemes: ['http', 'https'] }] });

// Function to display a Chrome notification
function showNotification(message, isMalicious) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "/icon.png",
        title: isMalicious ? "Warning: URL Issues" : "URL Check Passed",
        message: message,
        priority: 2
    });
}
