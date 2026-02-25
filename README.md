# Notes Web App - Node Express Edition

A modern web application for managing notes built with Node.js, Express, and MongoDB. This is a Node.js/Express equivalent of the original Flask application.

## Features

- **Home Page**: Welcome screen with navigation to add notes
- **Add Notes**: Form to submit name and email
- **Success Page**: Confirmation page after successful submission
- **RESTful API**: Endpoint to retrieve all stored notes via `/api`
- **MongoDB Integration**: All data is persisted in MongoDB
- **Responsive Design**: Modern UI with gradient backgrounds and smooth animations

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Templating**: EJS
- **Frontend**: HTML, CSS
- **Package Manager**: npm

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB (running locally or Atlas connection string)

## Installation

1. **Clone or navigate to the project directory:**

```bash
cd DockerAssignment
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:**

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/notes_app
NODE_ENV=development
```

Replace `MONGO_URI` with your MongoDB connection string if using MongoDB Atlas or a remote database.

## Running the Application

### Development Mode (with auto-reload):

```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when files change.

### Production Mode:

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
DockerAssignment/
├── server.js              # Main application file
├── package.json           # Project dependencies and scripts
├── .env                   # Environment variables (create this)
├── .gitignore            # Git ignore rules
├── views/                # EJS template files
│   ├── index.ejs         # Home page
│   ├── form.ejs          # Form page for adding notes
│   └── success.ejs       # Success confirmation page
└── public/               # Static files (CSS, JS, images)
```

## API Endpoints

### GET /
Home page with welcome message and navigation.

### GET /form
Display the form to add a new note.

### POST /submit
Submit a new note (name and email).

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### GET /success
Success confirmation page.

### GET /api
Retrieve all stored notes as JSON.

**Response:**
```json
{
  "message": "Data retrieved successfully",
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-02-24T10:30:00.000Z"
    }
  ]
}
```

## Database Schema

### User Collection

```javascript
{
  name: String (required),
  email: String (required),
  createdAt: Date (default: current date)
}
```

## Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running locally or check your connection string in `.env`
- For MongoDB Atlas, make sure your IP is whitelisted in the network settings

### Port Already in Use

- Change the `PORT` in `.env` to an available port (e.g., 3001, 3002)

### Module Not Found

- Run `npm install` again to ensure all dependencies are installed
- Clear npm cache: `npm cache clean --force`

## Future Enhancements

- Add user authentication and login
- Implement note categories/tags
- Add searching and filtering functionality
- Implement update and delete operations
- Add email notifications
- Deploy to cloud platforms (Heroku, AWS, etc.)

## License

ISC

## Support

For issues or questions, please refer to the original Flask application or consult the Node.js and Express documentation.
