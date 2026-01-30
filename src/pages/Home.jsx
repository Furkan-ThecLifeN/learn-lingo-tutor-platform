import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-text">
          <h1>Unlock your potential with the best <span>language</span> tutors</h1>
          <p>Embark on an exciting language journey with specialized tutors who have years of experience at their back.</p>
          <button className="start-btn" onClick={() => navigate('/teachers')}>Get started</button>
        </div>
        <div className="hero-image">
          {/* Buraya maketteki görseli veya uygun bir illüstrasyon ekleyebilirsin */}
          <img src="https://via.placeholder.com/400x400" alt="Learning" />
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-item"><strong>32,000 +</strong> Experienced tutors</div>
        <div className="stat-item"><strong>300,000 +</strong> 5-star reviews</div>
        <div className="stat-item"><strong>120 +</strong> Subjects taught</div>
        <div className="stat-item"><strong>200 +</strong> Tutor nationalities</div>
      </div>
    </div>
  );
};

export default Home;