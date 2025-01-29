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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: urlInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        const shortUrl = data.shortUrl; // Use the shortUrl directly from the response
        document.getElementById("shortened-link").classList.remove("hidden");
        document.getElementById("link-output").textContent = shortUrl;
        document.getElementById("link-output").href = shortUrl;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
