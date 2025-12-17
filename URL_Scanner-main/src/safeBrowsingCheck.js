const API_KEY = "AIzaSyCBAYU4fQg8QJ4PaGh4RWeTYLLZxdUqOhM";
const API_URL = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`;

//Function to check if a URL is flagged as malicious by Google Safe Browsing API.

export async function checkWithSafeBrowsing(url) {
    try {
        // Construct the request body according to Google's API specification
        const requestBody = {
            client: {
                clientId: "your-client-id", 
                clientVersion: "1.0" 
            },
            threatInfo: {
                threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"], // Types of threats to check
                platformTypes: ["ANY_PLATFORM"], 
                threatEntryTypes: ["URL"], 
                threatEntries: [{ url }] 
            }
        };

        // Make a POST request to the Google Safe Browsing API
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        
        // If matches are found, return the threat types detected
        if (data.matches && data.matches.length > 0) {
            return `malicious: ${data.matches.map(match => match.threatType).join(", ")}`;
        }
        
        return "clean"; // Return clean if no threats are detected
    } catch (error) {
        return "error"; // Handle API errors
    }
}
