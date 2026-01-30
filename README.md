# LearnLingo - Language Tutor Platform

LearnLingo is a modern, high-performance web application designed to connect students with professional language tutors. The platform offers a seamless experience for discovering tutors, filtering them based on specific needs, and managing a personalized favorites list.

<img width="1670" height="1012" alt="image" src="https://github.com/user-attachments/assets/222af303-a31c-44eb-ad90-9df84df92e8d" />

## 🚀 Main Technologies

* **React 18** - UI development with functional components and hooks.
* **Firebase 11** - Authentication (Email/Password) and Realtime Database for data persistence.
* **React Router v6** - Client-side routing for seamless page transitions.
* **React Hook Form & Yup** - Robust form management and schema-based validation.
* **Lucide React** - Clean and modern iconography.
* **CSS3 (Custom Variables)** - Modern, responsive, and "Enterprise-Grade" styling.

## 📋 Features & Technical Specifications

This project was built according to strict technical requirements:

### 🔐 Authentication
* Fully integrated **Firebase Auth** system.
* Secure Login and Registration flows using **React Portals** for modals.
* Form validation with **Yup** (all fields mandatory).
* Persistent user sessions (stays logged in on refresh).

### 👩‍🏫 Teachers Gallery
* Data dynamically fetched from **Firebase Realtime Database**.
* **Pagination:** Initial load of 4 cards with a "Load more" function.
* **Filtering:** Advanced filtering by teaching language, student level, and hourly price.
* **Expanded Cards:** "Read more" functionality to see tutor experience and student reviews.

### ❤️ Favorites System
* Exclusive access for authorized users.
* **Persistence:** Favorites are saved in `localStorage`, ensuring data is kept even after page refresh.
* Real-time heart icon updates (color and state).

### 📅 Lesson Booking
* Interactive trial lesson booking form.
* Modal closing triggers: 'X' button, backdrop click, or **Esc** key.

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Furkan-ThecLifeN/learn-lingo-tutor-platform.git

Install dependencies:
npm install

Environment Variables: Create a .env file in the root directory and add your Firebase configuration:

REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_DATABASE_URL=your_database_url

Start the application:
npm start

📐 Architecture

The project follows a clean and modular folder structure:

    src/components: Reusable UI components (Modals, Navbar, TeacherCard).

    src/context: AuthContext for global user state.

    src/hooks: Custom hooks like useFavorites for logic reuse.

    src/pages: Main page components (Home, Teachers, Favorites).

    src/schemas: Validation schemas for forms.

📄 License

This project is open-source and available under the MIT License.
