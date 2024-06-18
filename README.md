# Comment Service

## Overview
Manages comments on discussions, including creating, updating, deleting, and liking comments.

## Prerequisites
- Node.js
- MongoDB

## Setup

1. Install dependencies:
   ```sh
   npm install
2. Configure environment variables in `.env` file:
   ```sh
   PORT=5002
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_secret_key
   BEARER_TOKEN=your_bearer_token_generated_by_you_after_signing_up_or_logging_in
3. Start the service:
   ```sh
   npm start
## API Endpoints
- POST /comments - Create a new comment
- GET /comments/:id - Get a comment
- PUT /comments/:id - Update a comment
- DELETE /comments/:id - Delete a comment
- POST /comments/:id/like - Like a comment
- GET /comments/discussion/:discussionId - Get comments for a discussion
- POST /comments/:id/reply - Reply to a comment
