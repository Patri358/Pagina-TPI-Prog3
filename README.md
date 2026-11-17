# NotSteam - Game purchase page

NotSteam is an elegant and simple web interface for browsing and purchasing a catalogue of video games. The platform enables users to discover new titles, view detailed information about each game, add them to a shopping cart, and build a personal library of everything they own.

## Description
This project simulates a digital video game store featuring a curated selection of titles. The storefront presents the available games in a clean, responsive grid, and each game has its own detail view with its synopsis, distributor, age rating, genres, and price. Users can add games to a cart, complete a purchase, and then access their acquired titles from a dedicated library, while administrators can manage the catalogue, genres, and user accounts.

## Screnshots
### Initial page
<img width="1850" height="919" alt="Captura de pantalla 2026-11-16 194957" src="https://github.com/user-attachments/assets/309b7f8e-3e11-4e00-b8fb-1d1212738e33" />

### Cart
<img width="1110" height="928" alt="Captura de pantalla 2026-11-16 193937" src="https://github.com/user-attachments/assets/7e0a2f0b-7781-4873-b344-6ee8e7600cea" />

### Admin mode
<img width="1644" height="886" alt="Captura de pantalla 2026-11-16 194109" src="https://github.com/user-attachments/assets/bec0f7f1-e969-4dd7-8fae-52ae8a0af0a9" />

### Library
<img width="1336" height="813" alt="Captura de pantalla 2026-11-16 193850" src="https://github.com/user-attachments/assets/6f7285b8-9db7-4ae9-9f7f-2c4c793a39d7" />

## Technoligies
### FrontEnd:
 - React: UI Library
 - Vite: Development server and build tool
 - React router DOM: Client side routing
 - Boostrap 5: Styling and icons
 - React Toastify: Notifications
 - Vitest: Unit testing

### BackEnd:
 -  Node JS + Express 5: REST API server
 - Sequelize 6:  ORM
 - SQLite: Database engine
 - JSON Web Token
 - Bcrypt: Password hashing
 - CORS: Cross-origin request
 - Morgan: HTTP request logging

 ## Implemented Features

 - Authentication: registration and login with passwords hashed via bcrypt and sessions handled with JSON Web Tokens (JWT).
- Role-based access control: user, admin, and superAdmin roles with different permissions.
- Store: game catalog displayed in a responsive 3-column grid, with a detail modal and an "Add to cart" action.
- Shopping cart: add and remove games, see the running total, and complete a purchase.
- Library: every purchased game is stored and shown in the user's personal library with a "Play" button.
- Profile: displays the logged-in user's information and their owned games.
- Admin panel: tabbed interface to manage users, genres, and games.
- Protected routes: route guarding on the frontend based on authentication state.
- Persistent session: token and user data stored in localStorage.
- User feedback: success and error notifications via React Toastify.
- Dark theme: Bootstrap dark theme across the interface.

## Prerequisites
- Node.js 18 or newer
- npm (bundled with Node.js)

## Installation and Running
The backend and frontend must run simultaneously in two separate terminals.
1. Backend
cd API
npm install
npm run dev
The API starts at http://localhost:3001. The SQLite database (tp.db) is created automatically on first start through sequelize.sync().
For a production-style run without file watching:
npm start
2. Frontend
From the repository root:
npm install
npm run dev
Vite serves the app at http://localhost:5173 (default). Open that URL in your browser.
The frontend expects the API to be available at http://localhost:3001, so start the backend first.

## Roles

| Action | User | Admin | SuperAdmin |
| :--- | :---: | :---: | :---: |
| Regsiter/Log in | Public | Public | Public |
| Browse store games | Yes | Yes | Yes |
| View genres | Yes | Yes | Yes |
| Manage own cart and purchases | Yes | Yes | Yes |
| View in library | Yes | Yes | Yes |
| Create / Edit / Delete games | No | Yes | Yes |
| Create / Edit / Delete genres | No | Yes | Yes |
| List all users | No | Yes | Yes |
| Change a user's rol | No | No | Yes |
| Delete a user | No | No | Yes |
