import React from 'react';
import { Recipe } from './RecipeList';

interface RecipeDetailProps {
  recipe?: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
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

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, isOpen, onClose }) => {
  if (!isOpen || !recipe) return null;

  const price = recipePrices[recipe.id] || 9.99; // Default price if not found

  return (
    <div className="recipe-detail-overlay">
      <div className="recipe-detail-container">
        <div className="recipe-detail-header">
          <h2>{recipe.title}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="recipe-detail-content">
          <div className="recipe-detail-image">
            <img src={recipe.image} alt={recipe.title} />
            <span className="recipe-difficulty">{recipe.difficulty}</span>
          </div>
          
          <div className="recipe-detail-info">
            <div className="recipe-detail-meta">
              <div className="prep-time">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{recipe.prepTime}</span>
              </div>
              
              <div className="detail-price">
                <span>Qiimaha: </span>
                <span className="price-amount">${price.toFixed(2)}</span>
              </div>
            </div>
            
            <p className="recipe-description">{recipe.description}</p>
            
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div className="recipe-ingredients">
                <h3>Waxyaabaha loo baahan yahay</h3>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      <span className="ingredient-bullet">•</span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {recipe.instructions && recipe.instructions.length > 0 && (
              <div className="recipe-instructions">
                <h3>Sida loo sameeyo</h3>
                <ol>
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail; 