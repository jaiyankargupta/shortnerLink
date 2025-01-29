// This file contains the JavaScript code for the link shortener website.
// It handles the logic for shortening links, redirecting users to the ad page,
// and then to the final destination link.

document
  .getElementById("shorten-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const urlInput = document.getElementById("url-input").value;

    fetch("/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `url=${encodeURIComponent(urlInput)}`,
    })
      .then((response) => response.json())
      .then((data) => {
        const shortUrl = `${window.location.origin}${data.shortUrl}`;
        document.getElementById("shortened-link").classList.remove("hidden");
        document.getElementById("link-output").textContent = shortUrl;
        document.getElementById("link-output").href = shortUrl;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

function generateShortenedUrl(originalUrl) {
  // Simple hash function to simulate URL shortening
  const hash = btoa(originalUrl).substring(0, 8);
  return `https://short.ly/${hash}`;
}

function redirectToAd(shortenedUrl) {
  // Redirect to the ad page with the shortened URL as a query parameter
  window.location.href = `views/ad.html?url=${encodeURIComponent(
    shortenedUrl
  )}`;
}

// Function to handle redirection after displaying the ad
function handleRedirect() {
  const params = new URLSearchParams(window.location.search);
  const destinationUrl = params.get("url");
  if (destinationUrl) {
    setTimeout(() => {
      window.location.href = destinationUrl;
    }, 5000); // Redirect after 5 seconds
  }
}

// Call handleRedirect if on the redirect page
if (window.location.pathname.includes("redirect.html")) {
  handleRedirect();
}
