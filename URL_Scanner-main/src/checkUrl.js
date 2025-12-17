// Main function - runs a test on a URL and returns an array of detected issues
export function checkUrl(urlString) {
  try {
    const url = new URL(urlString);
  let issues = [];

  // Step 1: Check if the URL uses an IP address instead of a domain
  if (isIpAddress(url.hostname)) {
    issues.push("The site uses an IP address instead of a domain name");
  }
  
  // Step 2: Check if the URL has too many subdomains (potentially suspicious)
  if (url.hostname.split('.').length > 3) {
    issues.push("The site has too many subdomains");
  }
  
  // Step 3: Check if the URL contains special characters that are often used in phishing attempts
  if (/[#@\$%]/.test(url.href)) {
    issues.push("The site has suspicious characters");
  }
  
  // Step 4: Verify if the URL is excessively long (potentially obfuscating intent)
  if (url.href.length > 300) {
    issues.push("The URL is too long");
  }
  
  // Step 5: Check if the URL belongs to a domain from a known malicious country
  if (isMaliciousCountry(url.hostname)) {
    issues.push("The site is from a potentially malicious country");
  }

  return issues;
  }
  catch (error) {
    return ["Invalid URL"];
  }
}

// Helper function: Determines if the hostname is an IP address instead of a domain name
function isIpAddress(hostname) {
  const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Pattern.test(hostname);
}

// Helper function: Checks if the domain belongs to a country known for malicious activities
function isMaliciousCountry(hostname) {
  const maliciousCountries = ['.eg', '.ps', '.tr', '.iq', '.ir', '.ye', '.lb', '.sy', '.kp']; // Includes North Korea (.kp)
  for (const country of maliciousCountries) {
    if (hostname.endsWith(country)) {
      return true;
    }
  }
  return false;
}
