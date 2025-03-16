import React from 'react';
import RecipeCard from './RecipeCard';

export interface Recipe {
  id: number;
  title: string;
  image: string;
  description: string;
  prepTime: string;
  difficulty: string;
  ingredients?: string[];
  instructions?: string[];
}

interface RecipeListProps {
  recipes: Recipe[];
  onOrderRecipe: (id: number, title: string) => void;
  onViewRecipe: (id: number) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onOrderRecipe, onViewRecipe }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          image={recipe.image}
          description={recipe.description}
          prepTime={recipe.prepTime}
          difficulty={recipe.difficulty}
          onOrder={onOrderRecipe}
          onView={onViewRecipe}
        />
      ))}
    </div>
  );
};

export default RecipeList; 