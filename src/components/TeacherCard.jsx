import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../context/AuthContext';
import BookLessonModal from './BookLessonModal';

const TeacherCard = ({ teacher }) => {
  const { user } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Favori durumu yerel state yerine merkezi hook'tan kontrol ediliyor
  const isFavorite = favorites.includes(String(teacher.id));

  const handleFavoriteClick = () => {
    if (!user) {
      alert("Please log in to add teachers to your favorites!");
      return;
    }
    toggleFavorite(teacher.id);
  };

  return (
    <div className="teacher-card">
      <div className="card-header">
        <img src={teacher.avatar_url} alt={teacher.name} />
        <div className="info">
          <h3>{teacher.name} {teacher.surname}</h3>
          <p>Languages: {teacher.languages.join(', ')}</p>
          <p>Price: {teacher.price_per_hour}$</p>
        </div>
        <button
          onClick={handleFavoriteClick}
          style={{
            background: isFavorite
              ? 'linear-gradient(135deg, #facc15, #f59e0b)'
              : '#eff0f0',
            border: 'none',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: isFavorite
              ? '0 6px 16px rgba(250, 204, 21, 0.4)'
              : '0 4px 10px rgba(0,0,0,0.08)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Heart
            size={20}
            fill={isFavorite ? '#ffffff' : 'none'}
            stroke={isFavorite ? '#ffffff' : '#f59e0b'}
          />
        </button>
      </div>

      <div className="card-body">
        <p>{teacher.lesson_info}</p>

        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="read-more"
            style={{
              background: 'linear-gradient(90deg, #facc15, #f59e0b)',
              border: 'none',
              borderRadius: '9999px',
              padding: '8px 16px',
              fontWeight: 600,
              cursor: 'pointer',
              color: '#1f2937',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(250, 204, 21, 0.35)';
              e.currentTarget.style.background = 'linear-gradient(90deg, #fde047, #fbbf24)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = 'linear-gradient(90deg, #facc15, #f59e0b)';
            }}
          >
            Read more
          </button>
        ) : (
          <div className="expanded-info">
            <p>{teacher.experience}</p>
            <h4 style={{ margin: '24px 0 16px' }}>Reviews:</h4>
            {teacher.reviews.map((rev, i) => (
              <div key={i} className="review">
                <div style={{ marginBottom: '8px' }}>
                  <strong>{rev.reviewer_name}</strong>
                  <span style={{ color: '#FFC107', marginLeft: '12px' }}>★ {rev.reviewer_rating}</span>
                </div>
                <p style={{ color: 'var(--text-dark)', margin: 0 }}>{rev.comment}</p>
              </div>
            ))}
            <button className="book-btn" onClick={() => setIsModalOpen(true)}>
              Book trial lesson
            </button>
          </div>
        )}
      </div>

      <BookLessonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        teacher={teacher}
      />
    </div>
  );
};

export default TeacherCard;