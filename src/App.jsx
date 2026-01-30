import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ref, get } from "firebase/database";
import { db } from "./firebase/config";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Teachers from './pages/Teachers';
import Favorites from './pages/Favorites';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  const [teachers, setTeachers] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const snapshot = await get(ref(db, "/"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const rawTeachers = data.teachers ? data.teachers : data;
          const listWithIds = Object.entries(rawTeachers).map(([key, value]) => ({
            ...value,
            id: String(key),
          }));
          setTeachers(listWithIds);
        } else {
          setTeachers([]);
        }
      } catch (err) {
        setTeachers([]);
      }
    };
    fetchAll();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route 
            path="/favorites" 
            element={
              <PrivateRoute>
                <Favorites allTeachers={teachers} />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;