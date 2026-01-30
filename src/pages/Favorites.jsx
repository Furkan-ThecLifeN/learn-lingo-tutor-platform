import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import TeacherCard from '../components/TeacherCard';

const Favorites = ({ allTeachers }) => {
  const { favorites } = useFavorites();
  
  if (allTeachers === null) {
    return (
      <div className="teachers-page">
        <div className="loader" style={{textAlign: 'center', padding: '100px'}}>
          <h2>Connecting to database...</h2>
        </div>
      </div>
    );
  }

  const favoriteList = allTeachers.filter(t => favorites.includes(String(t.id)));

  return (
    <div className="teachers-page">
      <div className="favorites-header" style={{ padding: '24px 100px' }}>
        <h1 style={{fontSize: '40px', fontWeight: '700'}}>My Favorite Teachers</h1>
      </div>
      
      <div className="teacher-list">
        {favoriteList.length > 0 ? (
          favoriteList.map((t) => (
            <TeacherCard key={t.id} teacher={t} />
          ))
        ) : (
          <div className="no-results" style={{ textAlign: 'center', padding: '100px 0' }}>
            <p style={{fontSize: '20px', color: 'var(--text-light)'}}>
              Your favorites list is currently empty.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;