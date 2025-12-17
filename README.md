# URL Scanner

URL Scanner is a Chrome extension that scans the URL of websites using both the **Google Safe Browsing API** and **VirusTotal**, along with manual testing. It alerts users if there might be a problem with the website. The extension runs automatically for every website the user visits and also allows users to manually check URLs.

---

## Features
- **Automatic Scanning**: Automatically scans URLs for websites you visit and displays notifications about potential risks.
- **Manual URL Check**: Provides an option to check a URL manually through the popup interface.
- **Multiple Security Checks**: Utilizes Google Safe Browsing API, VirusTotal, and custom manual tests for comprehensive checks.

---

## How to Use the Scanner

### Automatic Scanning

After installing the extension (see installation instructions below), it will automatically scan the URL of any website you visit.

1. The extension will first check the URL with the Google Safe Browsing API.
2. If the URL does not pass the Safe Browsing check (i.e., it is flagged as malicious), the extension will display a notification and stop further analysis.
3. If the URL passes the Safe Browsing check, the extension will proceed with additional tests using checkUrl().
4. If checkUrl() detects suspicious patterns, the extension will display a notification highlighting the issues.
5. If the URL is safe, a notification will confirm that everything looks good.

### Manual URL Check

1. Click the extension's icon in the browser toolbar to open the popup window.
2. Paste the URL you want to check into the input field.
3. The extension will first scan the URL using VirusTotal.
4. If VirusTotal detects any issues, the process stops, and the user is informed immediately.
5. If VirusTotal does not flag the URL, the extension proceeds with additional tests using checkUrl().
6. If checkUrl() detects any issues, the extension will display the results; otherwise, it will confirm that the URL is safe.

Note: The VirusTotal check takes a few seconds, so please wait a moment for the result to appear in the popup window.

---

## Project Structure
This project uses **JavaScript**, **HTML**, and **CSS**. Below is a short explanation of the key files:

### Main JavaScript Files
- **`background.js`**: Contains the event listener that activates the tests on every URL of websites the user visits.
- **`checkUrl.js`**: Implements all manual checks for identifying potential issues in URLs.
- **`safeBrowsingCheck.js`**: Handles communication with the Google Safe Browsing API.
- **`virusTotalCheck.js`**: Handles communication with VirusTotal for additional URL scanning.
- **`popup.js`**: Manages the logic for the popup interface.

### Other Files
- **`popup.html`**: The HTML file for the popup interface.
- **`popup.css`**: Styles for the popup interface.

---

## Installation
### Step 1: Add the Extension to Your Browser
### Installing the Extension

1. Go to **chrome://extensions** in your browser.  
2. Click on **Load unpacked**.  
3. Select the extension folder. If it is compressed, extract it before proceeding.  
4. The extension should now appear in the list.  

### Step 2: Adjust Security Settings
### Disabling Google Safe Browsing for Testing

To fully test the extension, you may want to disable Chrome's built-in **Google Safe Browsing** mechanism, which might filter out websites before the extension can analyze them. Follow these steps to disable it:

1. Open **Google Chrome** where the extension is installed.
2. Click on the **three-dot menu** in the top-right corner of the browser.
3. Navigate to the **Privacy and security** section.
4. Select the **Security** tab.
5. Under **Google Safe Browsing services**, choose **No protection**.

> **Warning:** Disabling Safe Browsing exposes you to potential security risks. It is highly recommended to **re-enable this setting** after completing your tests.




---


Thank you for using URL Scanner!
