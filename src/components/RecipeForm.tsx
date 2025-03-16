import React, { useState } from 'react';

interface RecipeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (recipeData: RecipeFormData) => void;
}

export interface RecipeFormData {
  title: string;
  image: string;
  description: string;
  prepTime: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
}

const RecipeForm: React.FC<RecipeFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [difficulty, setDifficulty] = useState('Fudud');
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructionInput, setInstructionInput] = useState('');
  const [instructions, setInstructions] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFormError, setShowFormError] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const difficulties = ['Fudud', 'Dhexdhexaad', 'Adag'];

  if (!isOpen) return null;

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddInstruction = () => {
    if (instructionInput.trim()) {
      setInstructions([...instructions, instructionInput.trim()]);
      setInstructionInput('');
    }
  };

  const handleRemoveInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !image || !description || !prepTime || ingredients.length === 0 || instructions.length === 0) {
      setShowFormError(true);
      setTimeout(() => setShowFormError(false), 3000);
      return;
    }
    
    const recipeData: RecipeFormData = {
      title,
      image,
      description,
      prepTime,
      difficulty,
      ingredients,
      instructions
    };
    
    // Show success message
    setShowSuccess(true);
    
    // Reset form after short delay to allow for animation
    setTimeout(() => {
      onSubmit(recipeData);
      
      // Reset form
      setTitle('');
      setImage('');
      setDescription('');
      setPrepTime('');
      setDifficulty('Fudud');
      setIngredients([]);
      setInstructions([]);
      setShowSuccess(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  // Simulate image upload with placeholder images
  const handleImageUpload = () => {
    setUploadingImage(true);
    
    // Simulate a network request
    setTimeout(() => {
      // Array of realistic Somali food image URLs
      const placeholderImages = [
        "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
        "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26",
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
      ];
      
      // Pick a random image from the array
      const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
      setImage(`${randomImage}?q=80&w=1080&auto=format&fit=crop`);
      setUploadingImage(false);
    }, 1500);
  };

  return (
    <div className="recipe-form-overlay">
      <div className="recipe-form-container">
        <div className="recipe-form-header">
          <h2>Ku dar Cunto cusub</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        {showSuccess && (
          <div className="success-message">
            <div className="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <p>Cuntadaada si guul leh ayaa loogu daray!</p>
          </div>
        )}
        
        {showFormError && (
          <div className="error-message">
            <p>Fadlan buuxi dhammaan goobaha loo baahan yahay</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Magaca Cuntada:</label>
            <input 
              type="text" 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              placeholder="Tusaale: Baasto iyo Hilib"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="image">URL-ka Sawirka:</label>
            <div className="input-with-button">
              <input 
                type="url" 
                id="image" 
                value={image} 
                onChange={handleImageUrlChange} 
                required 
                placeholder="https://tusaale.com/sawirka-cuntada.jpg"
              />
              <button 
                type="button" 
                className="add-button" 
                onClick={handleImageUpload}
                disabled={uploadingImage}
              >
                {uploadingImage ? 'Waa la soo gelinyaa...' : 'Sawir Ka Dooro'}
              </button>
            </div>
            {image && (
              <div className="image-preview">
                <img src={image} alt="Sawirka cuntada" />
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Faahfaahinta:</label>
            <textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
              placeholder="Sharaxaad kooban oo ku saabsan cuntada..."
              rows={3}
            ></textarea>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prepTime">Waqtiga Diyaarinta:</label>
              <input 
                type="text" 
                id="prepTime" 
                value={prepTime} 
                onChange={(e) => setPrepTime(e.target.value)} 
                required 
                placeholder="30 daqiiqo"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="difficulty">Heerka Adkaanta:</label>
              <select 
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                required
              >
                {difficulties.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Walxaha Lagu Sameeyo:</label>
            <div className="input-with-button">
              <input 
                type="text" 
                value={ingredientInput} 
                onChange={(e) => setIngredientInput(e.target.value)} 
                placeholder="Gali walax kasta"
                onKeyDown={(e) => handleKeyDown(e, handleAddIngredient)}
              />
              <button 
                type="button" 
                className="add-button" 
                onClick={handleAddIngredient}
              >
                Ku dar
              </button>
            </div>
            
            {ingredients.length > 0 && (
              <ul className="items-list ingredients-list">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <span>{ingredient}</span>
                    <button 
                      type="button" 
                      className="remove-item" 
                      onClick={() => handleRemoveIngredient(index)}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="form-group">
            <label>Talaabooyinka:</label>
            <div className="input-with-button">
              <textarea
                value={instructionInput}
                onChange={(e) => setInstructionInput(e.target.value)}
                placeholder="Gali tallaabo kasta oo loo baahan yahay"
                rows={2}
              ></textarea>
              <button
                type="button"
                className="add-button"
                onClick={handleAddInstruction}
              >
                Ku dar
              </button>
            </div>
            
            {instructions.length > 0 && (
              <ol className="items-list instructions-list">
                {instructions.map((instruction, index) => (
                  <li key={index}>
                    <span>{instruction}</span>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => handleRemoveInstruction(index)}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </div>
          
          <div className="form-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>
              Ka noqo
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={
                !title || 
                !image || 
                !description || 
                !prepTime || 
                ingredients.length === 0 || 
                instructions.length === 0 ||
                showSuccess
              }
            >
              Soo gudbi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm; 