# Drive Letter

A full-stack web application that allows users to sign up and log in using Google authentication, create and edit text-based letters, and save them to their Google Drive as Google Docs files.

## Features
- **Google Authentication**: Sign up and log in using Google OAuth.
- **Letter Creation & Editing**: Write and edit letters with a simple text editor.
- **Google Drive Integration**: Save letters as Google Docs files in the user's Google Drive.
- **Letter Management**: View a list of saved letters with links to Google Drive.
- **Secure Authentication**: JWT-based session management.

## Tech Stack
- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: Google OAuth (via Passport.js)
- **Storage**: Google Drive API
- **Version Control**: GitHub

## Prerequisites
- Node.js
- npm 
- MongoDB (local instance or cloud service like MongoDB Atlas)
- Google Cloud Console account for OAuth and Drive API setup
- Postman

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sasaurabh11/Drive-app.git

### 2. Install Dependencies
#### Backend Dependencies
```bash
cd backend
npm install
```

#### Frontend Dependencies
```bash
cd ../client
npm install
```

### 3. Environment Variables
Create `.env` files in both `server/` and `client/` directories.

#### Server Environment Variables (`server/.env`)
```
PORT=
MONGO_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
JWT_SECRET=
CALLBACK_URL=
```

#### Client Environment Variables (`client/.env`)
```
VITE_BACKEND_URL=
```

### 4. Obtain Google Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google Drive API
4. Configure OAuth Consent Screen
5. Create OAuth 2.0 Client IDs
6. Copy Client ID and Client Secret to `server/.env`

## Running Locally

### Start MongoDB
Ensure MongoDB is running locally or use a cloud URI.

### Run Backend
```bash
cd server
npm start
```
Backend runs at `http://localhost:5000`

### Run Frontend
```bash
cd client
npm start
```
Frontend runs at `http://localhost:3000`