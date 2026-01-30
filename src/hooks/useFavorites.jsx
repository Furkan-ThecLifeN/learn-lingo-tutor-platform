import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (teacherId) => {
    const idStr = String(teacherId);
    setFavorites(prev => 
      prev.includes(idStr) 
        ? prev.filter(id => id !== idStr) 
        : [...prev, idStr]
    );
  };

  return { favorites, toggleFavorite };
};