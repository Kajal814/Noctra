# Noctra – Social Media Feed Application

**Connect. Share. Interact.**

Noctra is a full-stack social media feed application built using the MERN stack. It allows users to create accounts, share posts, interact with other users' content, and manage their profiles through a clean and modern interface.

## 🌐 Live Demo

- **Frontend:** https://noctra-seven.vercel.app
- **Backend:** https://noctra-backend-jd3r.onrender.com
- **API Health Check:** https://noctra-backend-jd3r.onrender.com/api/health

## ✨ Features

- **User Authentication:** Register and log in securely.
- **Create Posts:** Share content with other users.
- **Like & Unlike:** Interact with posts.
- **Comments:** Add and manage comments on posts.
- **User Profile:** View profile information and personal posts.
- **Responsive UI:** Access the application across different screen sizes.
- **Protected Routes:** Restrict authenticated features to logged-in users.
- **Modern Design:** Clean Midnight Ocean theme with a dark interface.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Frontend build tool |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB Atlas | Database |
| Mongoose | Database modelling |
| JWT | Authentication |
| bcrypt | Password hashing |
| Axios | API communication |
| CSS3 | Styling and responsive design |
| Vercel | Frontend deployment |
| Render | Backend deployment |

## 📁 Project Structure

```text
Noctra/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation & Setup

Follow these steps to run Noctra locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Kajal814/Noctra.git
```

```bash
cd Noctra
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder and configure your environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Use the exact environment variable names expected by your backend configuration.

Start the backend:

```bash
npm start
```

### 3. Set Up the Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## 🔐 Environment Variables

Never commit your `.env` files or expose database credentials and secret keys.

| Variable | Description |
|---|---|
| PORT | Backend server port |
| MONGO_URI | MongoDB Atlas connection string |
| JWT_SECRET | Secret used for JWT authentication |
| VITE_API_URL | Frontend API base URL |

## 🚀 Deployment

Noctra is deployed using:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

The frontend communicates with the deployed backend through the `VITE_API_URL` environment variable.

## 📌 Learning Outcomes

Through this project, I gained practical experience in:

- Developing a full-stack MERN application.
- Building RESTful APIs using Node.js and Express.js.
- Implementing authentication and protected routes.
- Integrating React with backend APIs using Axios.
- Managing application state using React Context and Hooks.
- Connecting MongoDB Atlas with a Node.js backend.
- Deploying frontend and backend applications.
- Debugging API integration, authentication, and CORS issues.

## 👩‍💻 Author

**Kajal Yadav**

B.Tech – Information Technology

- GitHub: https://github.com/Kajal814

---

*Noctra – A modern space to connect, share, and interact.*