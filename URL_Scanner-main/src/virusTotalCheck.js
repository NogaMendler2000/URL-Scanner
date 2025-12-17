// Function to check a URL with VirusTotal
// It sends the URL to the VirusTotal API and retrieves the scan results
export async function checkWithVirusTotal(url) {
    const apiKey = "3d01f9c15e634dbb34370797c75f4ccc431ea5b1842027538b72c8267b85aa82";
    
    if (!apiKey) {
        return " VirusTotal API Key is missing!";
    }

    const endpoint = "https://www.virustotal.com/api/v3/urls";

    try {
        // Step 1: Submit the URL to VirusTotal for scanning
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "x-apikey": apiKey,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `url=${encodeURIComponent(url)}`
        });

        if (!response.ok) throw new Error(`Failed to send URL to VirusTotal: ${response.status} ${await response.text()}`);

        const result = await response.json();
        const analysisId = result.data.id;

        // Step 2: Retrieve the analysis results
        return await getVirusTotalAnalysis(analysisId, apiKey);
    } catch (error) {
        return "VirusTotal check failed.";
    }
}

// Function to retrieve the VirusTotal analysis results
// It repeatedly checks the analysis status until results are available
async function getVirusTotalAnalysis(analysisId, apiKey) {
    const url = `https://www.virustotal.com/api/v3/analyses/${analysisId}`;

    try {
        let attempts = 0;
        while (attempts < 10) { // Retry up to 10 times
            const response = await fetch(url, {
                method: "GET",
                headers: { "x-apikey": apiKey }
            });

            if (!response.ok) throw new Error(`Failed to retrieve VirusTotal results: ${response.status} ${await response.text()}`);

            const result = await response.json();
            
            // Step 3: If the scan is completed, extract the results
            if (result.data.attributes.status === "completed") {
                const stats = result.data.attributes.stats;
                if (stats.malicious > 0) {
                    return `Detected ${stats.malicious} malicious & ${stats.suspicious} suspicious detections.`;
                }
                return "No threats found.";
            }

            // Wait before retrying to allow the scan to complete
            await new Promise(resolve => setTimeout(resolve, 5000));
            attempts++;
        }
        return "VirusTotal scan is still in progress. Try again later.";
    } catch (error) {
        return "VirusTotal check failed.";
    }
}
