import React, { useState, useEffect } from 'react';
import { ref, get } from "firebase/database";
import { db } from "../firebase/config";
import TeacherCard from "../components/TeacherCard";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [filters, setFilters] = useState({ language: '', level: '', price: '' });
  const [limitCount, setLimitCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const snapshot = await get(ref(db, "/"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const rawTeachers = data.teachers ? data.teachers : data;
          
          const listWithIds = Object.entries(rawTeachers).map(([key, value]) => ({
            ...value,
            id: String(key)
          }));

          setTeachers(listWithIds);
          setError(null);
        } else {
          setError("Veritabanında öğretmen kaydı bulunamadı.");
        }
      } catch (err) {
        setError("Bağlantı hatası: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    let result = [...teachers];
    if (filters.language) result = result.filter(t => t.languages?.includes(filters.language));
    if (filters.level) result = result.filter(t => t.levels?.includes(filters.level));
    if (filters.price) result = result.filter(t => t.price_per_hour <= parseInt(filters.price));
    setFilteredTeachers(result.slice(0, limitCount));
  }, [filters, teachers, limitCount]);

  if (loading) return <div className="loader">Loading teachers...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="teachers-page">
      <div className="filter-bar">
        <select onChange={(e) => setFilters({...filters, language: e.target.value})}>
          <option value="">Languages</option>
          <option value="English">English</option>
          <option value="German">German</option>
          <option value="French">French</option>
          <option value="Spanish">Spanish</option>
          <option value="Mandarin Chinese">Mandarin Chinese</option>
          <option value="Italian">Italian</option>
          <option value="Vietnamese">Vietnamese</option>
        </select>
        <select onChange={(e) => setFilters({...filters, level: e.target.value})}>
          <option value="">Level of knowledge</option>
          <option value="A1 Beginner">A1 Beginner</option>
          <option value="A2 Elementary">A2 Elementary</option>
          <option value="B1 Intermediate">B1 Intermediate</option>
          <option value="B2 Upper-Intermediate">B2 Upper-Intermediate</option>
          <option value="C1 Advanced">C1 Advanced</option>
          <option value="C2 Proficient">C2 Proficient</option>
        </select>
        <select onChange={(e) => setFilters({...filters, price: e.target.value})}>
          <option value="">Price</option>
          <option value="25">Up to 25$</option>
          <option value="30">Up to 30$</option>
          <option value="35">Up to 35$</option>
          <option value="40">Up to 40$</option>
        </select>
      </div>

      <div className="teacher-list">
        {filteredTeachers.map((t) => <TeacherCard key={t.id} teacher={t} />)}
      </div>

      {filteredTeachers.length < teachers.filter(t => {
          if (filters.language && !t.languages?.includes(filters.language)) return false;
          if (filters.level && !t.levels?.includes(filters.level)) return false;
          if (filters.price && t.price_per_hour > parseInt(filters.price)) return false;
          return true;
      }).length && (
        <div className="load-more-container">
          <button className="start-btn" onClick={() => setLimitCount(prev => prev + 4)}>Load more</button>
        </div>
      )}
    </div>
  );
};

export default Teachers;