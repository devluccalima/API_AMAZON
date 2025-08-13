# Amazon Scraper

This repository contains a web scraping project for Amazon, divided into two main parts: a backend to perform the scraping and a frontend interface to interact with the results.

## Project Structure

 The project is organized as follows:

```
amazon-scraper/
├── backend/ # Contains the scraping logic and the API
└── frontend/ # Contains the user interface
```

## Backend

The backend is responsible for:

- Performing data scraping from Amazon.
- Exposing an API for the frontend to request and receive data.

### Technologies Used

- **Bun**: Fast, all-in-one JavaScript runtime.
- **Express**: Web framework for Node.js (compatible with Bun) to build the API.
- **Puppeteer**: Library for controlling headless browsers (like Chrome) for scraping.
- **JSDOM**: Implementation of web standards for Node.js, useful for manipulating the DOM.
- **Axios**: Promise-based HTTP client for making requests.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.

### How to Run the Backend

1.  Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2.  **Install Dependencies:**

    To install all necessary dependencies for the backend, use the `Bun` package manager:

    ```bash
    bun install
    ```

    This command will read the `package.json` file and download all packages listed under `dependencies` and `devDependencies`.

3.  Start the development server:

    ```bash
    bun run dev
    ```

    The server will be available at `http://localhost:3000` (or the configured port).

## Frontend

The frontend is a web application that consumes the backend API to display scraping results in a user-friendly way.

### Technologies Used

- **Vite**: Frontend build tool that offers a fast development experience.
- **JavaScript**: Main programming language.
- **HTML/CSS**: For the structure and styling of the interface.

### How to Run the Frontend

1.  Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2.  **Install Dependencies:**

    To install all necessary dependencies for the frontend, you can use `Bun`, `npm`, or `yarn`:

    **Using Bun:**
    ```bash
    bun install
    ```

    **Using npm (Node Package Manager):**
    ```bash
    npm install
    ```

    **Using Yarn:**
    ```bash
    yarn install
    ```

    Choose your preferred package manager. All of them will install the dependencies listed in the frontend's `package.json` file.

3.  Start the development server:

    ```bash
    bun run dev # or npm run dev / yarn dev
    ```

    The application will be available at `http://localhost:5173` (or the port configured by Vite).

## Contribution

Contributions are welcome! Feel free to open issues and pull requests.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Author

[devluccalima](https://github.com/devluccalima)


