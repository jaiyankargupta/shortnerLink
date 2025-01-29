# Link Shortener Website

This project is a simple link shortener website that allows users to shorten URLs and view advertisements before being redirected to their final destination.

## Project Structure

```
link-shortener-website
├── src
│   ├── index.html          # Main HTML file for the link shortener interface
│   ├── styles
│   │   └── style.css       # CSS styles for the website
│   ├── scripts
│   │   └── app.js          # JavaScript code for link shortening and redirection
│   ├── views
│   │   ├── ad.html         # HTML page displaying the advertisement
│   │   └── redirect.html    # HTML page for handling redirection
├── package.json             # npm configuration file
├── server.js                # Main server file for backend logic
└── README.md                # Documentation for the project
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd link-shortener-website
   ```

3. Install the required dependencies:
   ```
   npm install
   ```

4. Start the server:
   ```
   node server.js
   ```

5. Open your browser and go to `http://localhost:3000` to access the link shortener interface.

## Usage

- Enter a URL in the input field and click the "Shorten" button.
- You will be redirected to an advertisement page.
- After a few seconds, you will be redirected to your final destination.

## Contributing

Feel free to submit issues or pull requests for any improvements or features you would like to see in this project.