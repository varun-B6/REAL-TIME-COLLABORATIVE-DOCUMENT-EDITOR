# REAL-TIME COLLABORATIVE DOCUMENT EDITOR

*COMPANY*: CODETECH IT SOLUTIONS

*NAME*: NEKKALA VARUN

*INTERN ID*: CT1MTDN1041

*DOMAIN*: FULL STACK WEB DEVELOPMENT

*DURATION*: 4 WEEKS

*MENTOR*: NEELA SANTOSH

This project is a web-based real-time collaborative document editor that allows multiple users to simultaneously edit the same document and instantly see each other’s changes. It uses Vue.js for the frontend, Node.js with Express and Socket.IO for the backend, and MongoDB Atlas for data storage.

Frontend
The frontend is built with Vue.js. It features a simple text editor implemented as a <textarea> whose content is bound to a reactive variable. When users type, the changes are sent to the backend in real time using WebSocket via Socket.IO. The editor also listens for updates from other users and updates its content immediately, keeping all users in sync.

Backend
The backend uses Node.js and Express to serve REST API endpoints for creating and retrieving documents. It connects to MongoDB Atlas to store documents persistently. Each document has a unique ID and stores the current text content.

For real-time collaboration, the backend uses Socket.IO to handle WebSocket connections. When users open a document, their socket joins a room identified by the document ID. Changes sent by any user are broadcasted to other users in the same room, ensuring real-time synchronization. The backend also saves the latest document content to the database on receiving save events.

Workflow
On loading, the frontend fetches the document content from the backend.

It connects to the backend via WebSocket and joins the document’s room.

When users type, changes are emitted to the server.

The server broadcasts changes to other connected clients.

All clients update their editors in real time.

The backend saves the updated content to the database.

#OUTPUT

![Image](https://github.com/user-attachments/assets/6da53d04-42c3-4857-9ba7-8fcb813b444f)
