# URL Shortener Web Application

## Description

This is a web application that allows users to shorten URLs and manage them efficiently. It provides features such as generating QR codes for shortened URLs, updating existing URLs, and deleting URLs. The application uses Node.js, Express.js, MongoDB, and EJS for server-side operations and dynamic rendering.

## Features

- **Shorten URLs:** Users can shorten long URLs to create more manageable links.
- **QR Code Generation:** Each shortened URL can have a QR code generated for easy sharing and scanning.
- **URL Management:** View, update, and delete existing URLs directly from the application interface.

## Technologies Used

- **Frontend:** HTML, CSS (Tailwind CSS for styling), JavaScript (jQuery for AJAX requests)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **Template Engine:** EJS (Embedded JavaScript)
- **QR Code Generation:** QR Code generator library

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Yimikami/url-shortener
   cd url-shortener
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Change the name of the `.env.example` file to `.env`.
   - Update the `MONGODB_URI` variable with your MongoDB connection string.
   - Update the `BASE_URL` variable with the base URL of your application.
   - Update the `PORT` variable with the port number you want the application to run on.

4. Start the application:

   ```bash
   npm start
   ```

5. Access the application in your web browser at `http://localhost:{PORT}`.

## Usage

- **Shortening a URL:** Enter a URL and optionally specify a custom short URL name. Click on "Short" to shorten.
- **Managing URLs:** View all URLs, update existing URLs with new destinations, and delete URLs that are no longer needed.
- **QR Code Generation:** It automatically generates a QR code for each shortened URL. If it doesn't, you can click on the "Generate QR Code" button to generate one.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or improvements, feel free to submit a pull request.
