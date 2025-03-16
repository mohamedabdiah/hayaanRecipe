import React from 'react';

interface RecipeProps {
  id: number;
  title: string;
  image: string;
  description: string;
  prepTime: string;
  difficulty: string;
  onOrder?: (id: number, title: string) => void;
  onView?: (id: number) => void;
}

// Recipe prices based on ID
const recipePrices: Record<number, number> = {
  1: 2.99, // Sambuusa
  2: 8.99, // Baasto
  3: 9.99, // Bariis
  4: 5.99, // Malawax
  5: 6.99, // Cambuulo
  6: 12.99, // Suqaar
  7: 7.99, // Masago
  8: 8.99, // Soor
  9: 7.99, // Digir
  10: 3.99, // Caano Geel
  11: 2.99, // Caano Lo'
  12: 6.99, // Subag Geel
  13: 4.99, // Garoor
};

const RecipeCard: React.FC<RecipeProps> = ({ 
  id,
  title, 
  image, 
  description, 
  prepTime, 
  difficulty,
  onOrder,
  onView
}) => {
  // Determine if this is a user-submitted recipe (ID > 100)
  const isUserRecipe = id > 100;
  
  const handleOrder = () => {
    if (onOrder) {
      onOrder(id, title);
    }
  };

  const handleView = () => {
    if (onView) {
      onView(id);
    }
  };

  const price = recipePrices[id] || 9.99; // Default price if not found
  
  // Truncate description if it's too long
  const truncatedDescription = description.length > 120 
    ? `${description.substring(0, 120)}...` 
    : description;

  return (
    <div className="recipe-card">
      <div className="recipe-image">
        <img src={image} alt={title} />
        <span className="recipe-difficulty">{difficulty}</span>
        {isUserRecipe && <span className="user-recipe-badge">Cunto Cusub</span>}
        <div className="recipe-price">${price.toFixed(2)}</div>
      </div>
      <div className="recipe-content">
        <h3>{title}</h3>
        <p className="recipe-description">{truncatedDescription}</p>
        <div className="recipe-meta">
          <div className="prep-time">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>{prepTime}</span>
          </div>
        </div>
        <div className="recipe-buttons">
          <button className="view-button" onClick={handleView}>
            Faahfaahin Dheeraad
          </button>
          <button className="order-button" onClick={handleOrder}>
            Dalbo
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard; 