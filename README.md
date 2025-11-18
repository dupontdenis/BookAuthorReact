## BookAuthorReact Project

### 1. Install and Run the API (Backend)

Navigate to the project root and install dependencies:

```bash
npm install
```

Start the API server:

```bash
npm start
```

### 2. Run the React Application (Frontend)

Navigate to the client folder:

```bash
cd client
npm install
npm run dev
```

### 3. Populate the Database

After starting the API server, you can seed the database with a sample book and author:

```bash
node populate.js
```

This will flush both collections and add:

- Book: `expressJs`
- Author: `SuperDupont`

### Useful Tips

- The backend runs on Node.js and exposes REST endpoints for authors and books.
- The frontend is built with React and communicates with the API via HTTP requests.
- Make sure both servers (API and React) are running for full functionality.
- Default ports: API (`localhost:3000`), React (`localhost:5173`).
- You can test API endpoints using the provided `api-requests.http` file.

---

Feel free to contribute or customize the project!
