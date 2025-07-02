# 📝 Blogsy – Full-Stack Blog Publishing Platform

Blogsy is a full-stack blogging platform that allows users to create, edit, publish, and manage blog posts with a rich text editor. Built with React and Appwrite, it features authentication, secure file handling, and a smooth user experience.

## 🚀 Live Demo

👉 [Check it out on Vercel](https://your-vercel-deployment-link.com)

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Redux, CSS  
- **Backend (BaaS):** Appwrite (Authentication, Database, Storage)  
- **Form Handling:** React Hook Form  
- **Text Editor:** TinyMCE  
- **HTML Rendering:** HTML-React-Parser  
- **Deployment:** Vercel  

---

## ✨ Features

- 🔐 **Authentication:** Secure login/signup using Appwrite Auth.  
- 📝 **Rich Text Editor:** Create and format blog content with TinyMCE.  
- 👁️ **HTML Parsing:** Render rich HTML content using html-react-parser.  
- 🧠 **Redux Integration:** Cached state management to avoid repeated API calls.  
- 📌 **Inactive Posts:** Toggle post visibility without deleting them.  
- 🗂️ **Dashboard:** Personalized dashboard showing user's authored posts.  
- 🔄 **CRUD Operations:** Create, Read, Update, and Delete blog posts.  
- ⚙️ **Protected Routes:** Access control based on authentication status.  
- 📱 **Responsive UI:** Optimized for desktop and mobile devices.

---

## 📷 Screenshots

> _Add screenshots here (optional)_  
> Example:  
> ![Blogsy Home](screenshots/home.png)

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/blogsy.git
cd blogsy

2. Install Dependencies
bash
Copy
Edit
npm install

3. Set Up Appwrite Project
Create a project on Appwrite.

Set up Authentication, Database (collection), and Storage (for images).

Add .env file in the root with the following keys:

env
Copy
Edit
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
4. Start Development Server
bash
Copy
Edit
npm run dev
📦 Deployment
This app is deployed on Vercel.

To deploy your own version:

Push your code to GitHub.

Connect your GitHub repo to Vercel.

Add the same environment variables in Vercel dashboard.

🙌 Acknowledgements
Appwrite – Open-source backend as a service

TinyMCE – Rich Text Editor

HTML React Parser

📬 Contact
For any feedback or queries, feel free to connect with me:

💼 LinkedIn

💻 LeetCode

📧 Email: your.email@example.com

⭐️ Give a Star!
If you found this project useful, consider giving it a ⭐️ on GitHub!
