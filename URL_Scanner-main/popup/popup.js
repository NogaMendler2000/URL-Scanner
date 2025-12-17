import { checkWithVirusTotal } from "../src/virusTotalCheck.js";
import { checkUrl } from "../src/checkUrl.js";

// Event listener for the button click in the popup
// This will trigger the URL scanning process

document.getElementById('checkButton').addEventListener('click', async () => {
    const url = document.getElementById('urlInput').value;
    const resultDiv = document.getElementById('result');
    
    if (url) {
        resultDiv.textContent = 'Checking with VirusTotal...';
        
        // Step 1: Check the URL with VirusTotal API
        const vtResult = await checkWithVirusTotal(url);
        
        // If VirusTotal detects the URL as malicious or suspicious, stop further checks
        if (vtResult.includes("malicious") || vtResult.includes("suspicious")) {
            resultDiv.textContent = `⚠️ VirusTotal Warning: ${vtResult}`;
            return;
        }
        
        resultDiv.textContent = 'Checking with local URL analysis...';
        
        // Step 2: If VirusTotal results are clean, perform local URL analysis
        const issues = checkUrl(url);
        
        // Display the results based on the analysis outcome
        resultDiv.textContent = issues.length > 0 
            ? `⚠️ Issues detected: ${issues.join(', ')}`
            : '✅ The URL appears safe.';
    } else {
        resultDiv.textContent = '❌ Please enter a valid URL.';
    }
});
