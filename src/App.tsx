import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import RecipeList, { Recipe } from './components/RecipeList'
import OrderForm from './components/OrderForm'
import RecipeDetail from './components/RecipeDetail'
import Cart, { CartItem } from './components/Cart'
import { recipes as initialRecipes } from './data/recipes'
import Receipt from './components/Receipt'
import RecipeForm, { RecipeFormData } from './components/RecipeForm'

// Define traditional dish IDs
const traditionalDishIds = [7, 8, 9]; // Masago, Soor, Digir
const breakfastDishIds = [4, 10, 11]; // Malawax, Caano Geel, Caano Lo'
const lunchDishIds = [2, 3, 9]; // Baasto, Bariis, Digir
const dinnerDishIds = [3, 6]; // Bariis, Suqaar
const snackDishIds = [1, 5, 7]; // Sambuusa, Cambuulo, Masago
const dairyDishIds = [10, 11, 12, 13]; // Caano Geel, Caano Lo', Subag Geel, Garoor

// Define base prices for recipes
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

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false)
  const [orderedItem, setOrderedItem] = useState<{id: number, title: string} | undefined>(undefined)
  
  // Recipe detail state
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [isRecipeDetailOpen, setIsRecipeDetailOpen] = useState(false)
  
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  // Add state for receipt
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState<any>(null);
  
  // Add state for recipe form
  const [isRecipeFormOpen, setIsRecipeFormOpen] = useState(false);
  
  // Replace the direct import of recipes with a state variable
  const [allRecipes, setAllRecipes] = useState<Recipe[]>(initialRecipes);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  
  // Load saved recipes from localStorage on component mount
  useEffect(() => {
    const savedRecipes = localStorage.getItem('userRecipes');
    if (savedRecipes) {
      try {
        setUserRecipes(JSON.parse(savedRecipes));
      } catch (e) {
        console.error('Failed to parse saved recipes', e);
      }
    }
  }, []);

  // Save user recipes to localStorage whenever they change
  useEffect(() => {
    if (userRecipes.length > 0) {
      localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
    }
  }, [userRecipes]);

  // Combine initial and user recipes
  useEffect(() => {
    setAllRecipes([...initialRecipes, ...userRecipes]);
  }, [userRecipes]);
  
  // Filter recipes based on search term and category
  const filteredRecipes = allRecipes.filter(recipe => {
    // Text search filter
    const matchesSearch = 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Category filter
    let matchesCategory = true
    if (activeCategory !== 'all') {
      if (activeCategory === 'traditional') {
        matchesCategory = traditionalDishIds.includes(recipe.id)
      } else if (activeCategory === 'breakfast') {
        matchesCategory = breakfastDishIds.includes(recipe.id)
      } else if (activeCategory === 'lunch') {
        matchesCategory = lunchDishIds.includes(recipe.id)
      } else if (activeCategory === 'dinner') {
        matchesCategory = dinnerDishIds.includes(recipe.id)
      } else if (activeCategory === 'snacks') {
        matchesCategory = snackDishIds.includes(recipe.id)
      } else if (activeCategory === 'dairy') {
        matchesCategory = dairyDishIds.includes(recipe.id)
      } else if (activeCategory === 'user') {
        // New category for user-submitted recipes
        matchesCategory = recipe.id > 100; // Assuming user recipes will have IDs > 100
      }
    }
    
    return matchesSearch && matchesCategory
  })
  
  // Create a separate filter for user recipes to always show them in their section
  const userRecipesDisplay = allRecipes.filter(recipe => recipe.id > 100);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  const handleOrderRecipe = (id: number, title: string) => {
    setOrderedItem({ id, title })
    setIsOrderFormOpen(true)
  }

  const closeOrderForm = () => {
    setIsOrderFormOpen(false)
  }
  
  // Cart handlers
  const handleCartClick = () => {
    setIsCartOpen(true)
  }
  
  const closeCart = () => {
    setIsCartOpen(false)
  }
  
  const addToCart = (id: number, title: string, quantity: number = 1) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === id)
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Add new item if it doesn't exist
        const price = recipePrices[id] || 9.99 // Default price if not found
        return [...prevItems, { id, title, quantity, price }]
      }
    })
    
    // Close order form and show cart
    closeOrderForm()
    setIsCartOpen(true)
  }
  
  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }
  
  const handleCheckout = () => {
    // Process checkout (in a real app, this would navigate to checkout page)
    alert('Waad ku mahadsantahay dalabkaaga! Waan kula soo xiriiri doonnaa dhawaan.')
    setCartItems([]) // Clear cart
    closeCart()
  }
  
  // Handle form submission that adds to cart
  const handleOrderSubmit = (id: number, title: string, quantity: number) => {
    addToCart(id, title, quantity)
  }

  const handleViewRecipeDetail = (id: number) => {
    const recipe = allRecipes.find(r => r.id === id)
    if (recipe) {
      setSelectedRecipe(recipe)
      setIsRecipeDetailOpen(true)
    }
  }

  const closeRecipeDetail = () => {
    setIsRecipeDetailOpen(false)
  }

  // Function to handle successful order
  const handleOrderSuccess = (orderDetails: any) => {
    setReceiptDetails(orderDetails);
    setShowReceipt(true);
    setIsOrderFormOpen(false); // Close the order form
  };
  
  // Function to close receipt
  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setReceiptDetails(null);
  };

  // Update recipe submission handler to add recipes to the list
  const handleRecipeSubmit = (recipeData: RecipeFormData) => {
    // Create a new recipe object
    const newRecipe: Recipe = {
      // Generate an ID beyond the range of initial recipes
      id: 100 + userRecipes.length + 1,
      title: recipeData.title,
      image: recipeData.image,
      description: recipeData.description,
      prepTime: recipeData.prepTime,
      difficulty: recipeData.difficulty,
      ingredients: recipeData.ingredients,
      instructions: recipeData.instructions
    };
    
    // Add the new recipe to the user recipes
    setUserRecipes(prev => [...prev, newRecipe]);
    
    // Show success message
    alert(`Waad ku mahadsantahay! Cuntadaada "${recipeData.title}" si guul leh ayaa loogu daray websiteka.`);
    setIsRecipeFormOpen(false);
  };

  return (
    <div className="app">
      <Header 
        onSearch={handleSearch} 
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={handleCartClick}
      />
      
      <section className="hero-section">
        {/* Decorative food icons using Unsplash images */}
        <div className="food-icon icon1">
          <img src="https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?q=80&w=687&auto=format&fit=crop" alt="Food icon 1" />
        </div>
        <div className="food-icon icon2">
          <img src="https://images.unsplash.com/photo-1652590602380-1c7aacfe936d?q=80&w=715&auto=format&fit=crop" alt="Food icon 2" />
        </div>
        <div className="food-icon icon3">
          <img src="https://images.unsplash.com/photo-1630914341637-3bad55c51453?q=80&w=715&auto=format&fit=crop" alt="Food icon 3" />
        </div>
        <div className="food-icon icon4">
          <img src="https://images.unsplash.com/photo-1631139461035-1c1a35acce31?q=80&w=1285&auto=format&fit=crop" alt="Food icon 4" />
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">Cuntooyin Fudud oo Qurux Badan</h1>
          <p className="hero-description">
            Ku raaxeyso cuntooyinka caanka ah ee Soomaalida. Waxaan kusoo bandhigaynaa waxay kakoobanyihiin iyo sida loo sameeyo.
          </p>
          <div className="hero-buttons">
            <button 
              className="hero-button"
              onClick={() => {
                const searchInput = document.querySelector('.search-input') as HTMLInputElement;
                if (searchInput) {
                  searchInput.focus();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              Raadi Cuntooyinka
            </button>
          </div>
        </div>
        
        <div className="hero-scroll">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14"></path>
            <path d="M19 12l-7 7-7-7"></path>
          </svg>
      </div>
      </section>
      
      <main className="main-content">
        <div className="categories">
          <button 
            className={`category-button ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            Dhammaan
          </button>
          <button 
            className={`category-button ${activeCategory === 'traditional' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('traditional')}
          >
            Cuntooyin Wadani
          </button>
          <button 
            className={`category-button ${activeCategory === 'breakfast' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('breakfast')}
          >
            Quraac
          </button>
          <button 
            className={`category-button ${activeCategory === 'lunch' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('lunch')}
          >
            Qado
          </button>
          <button 
            className={`category-button ${activeCategory === 'dinner' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('dinner')}
          >
            Casho
          </button>
          <button 
            className={`category-button ${activeCategory === 'snacks' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('snacks')}
          >
            Cuntooyin Fudud
          </button>
          <button 
            className={`category-button ${activeCategory === 'dairy' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('dairy')}
          >
            Caanaha Xoolaha
        </button>
          {userRecipes.length > 0 && (
            <button 
              className={`category-button ${activeCategory === 'user' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('user')}
            >
              Cuntooyinkeyga
            </button>
          )}
        </div>
        
        <div className="container">
          <section className="recipes-section">
            <h2>Cuntooyinka</h2>
            {filteredRecipes.length > 0 ? (
              <RecipeList 
                recipes={filteredRecipes} 
                onOrderRecipe={handleOrderRecipe}
                onViewRecipe={handleViewRecipeDetail}
              />
            ) : (
              <p className="no-results">Ma jiraan natiijooyin la heli karo.</p>
            )}
          </section>
          
          {/* Add a separate section for user-submitted recipes */}
          {userRecipesDisplay.length > 0 && activeCategory !== 'user' && (
            <section className="recipes-section user-recipes-section">
              <h2>Cuntooyinka Aad Soo Gudbisay</h2>
              <RecipeList 
                recipes={userRecipesDisplay} 
                onOrderRecipe={handleOrderRecipe}
                onViewRecipe={handleViewRecipeDetail}
              />
            </section>
          )}
        </div>
      </main>
      
      {/* Order Form Modal */}
      {isOrderFormOpen && orderedItem && (
        <OrderForm 
          isOpen={isOrderFormOpen} 
          onClose={() => setIsOrderFormOpen(false)} 
          orderedItem={orderedItem}
          onAddToCart={addToCart}
          onOrderSuccess={handleOrderSuccess}
        />
      )}
      
      {/* Recipe Detail Modal */}
      <RecipeDetail
        recipe={selectedRecipe}
        isOpen={isRecipeDetailOpen}
        onClose={closeRecipeDetail}
      />
      
      {/* Shopping Cart Modal */}
      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={closeCart}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
      
      {/* Receipt */}
      {showReceipt && receiptDetails && (
        <Receipt 
          isOpen={showReceipt} 
          onClose={handleCloseReceipt} 
          orderDetails={receiptDetails} 
        />
      )}
      
      {/* Recipe Form with success animation */}
      <RecipeForm 
        isOpen={isRecipeFormOpen}
        onClose={() => setIsRecipeFormOpen(false)}
        onSubmit={handleRecipeSubmit}
      />
      
      {/* Add Recipe Button */}
      <button className="add-recipe-button" onClick={() => setIsRecipeFormOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Ku dar Cunto
      </button>
      
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h3>Ka mid noqo qoyskeenna</h3>
            <p>Iska diiwaangeli emailkeenna si aad u hesho cunto cusub oo aan ku shaacinayno.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Emailkaaga" 
                className="newsletter-input" 
                required 
              />
              <button type="submit" className="newsletter-button">Iska Diiwaan geli</button>
            </form>
          </div>
        </div>
      </section>
      
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h4>Hayaan Recipe</h4>
              <ul className="footer-links">
                <li><a href="#">Ku saabsan</a></li>
                <li><a href="#">Nala soo xidhiidh</a></li>
                <li><a href="#">Ka qeybgal</a></li>
                <li><a href="#">Xogaha</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Qaybaha Cuntada</h4>
              <ul className="footer-links">
                <li><a href="#">Quraac</a></li>
                <li><a href="#">Qado</a></li>
                <li><a href="#">Casho</a></li>
                <li><a href="#">Cuntooyin Fudud</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Kooxda</h4>
              <ul className="footer-links">
                <li><a href="#">Kariyayaal</a></li>
                <li><a href="#">Shaqaale</a></li>
                <li><a href="#">Fursadaha Shaqo</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Raac</h4>
              <ul className="footer-links">
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Hayaan Recipe. Xuquuqda Dhammaan Waa La Dhowray.</p>
          </div>
        </div>
      </footer>
      </div>
  )
}

export default App
