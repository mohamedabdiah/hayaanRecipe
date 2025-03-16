import React, { useState } from 'react';
import CartButton from './CartButton';

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, cartItemCount, onCartClick }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <header className="header">
      <div className="header-background">
        <div className="header-decoration header-decoration-1"></div>
        <div className="header-decoration header-decoration-2"></div>
      </div>
      <div className="container">
        <div className="header-content">
          <div className="logo-container">
            <div className="logo">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8H19C20.1046 8 21 8.89543 21 10V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V10C3 8.89543 3.89543 8 5 8H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 5.5C15 3.567 13.433 2 11.5 2C9.567 2 8 3.567 8 5.5V8.5H15V5.5Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 14V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="title-container">
              <h1>Hayaan Recipe</h1>
              <p className="subtitle">Cuntooyin Fudud oo Qurux Badan</p>
            </div>
          </div>
          
          <div className="header-actions">
            <div className={`search-container ${isFocused ? 'focused' : ''}`}>
              <input 
                type="text" 
                placeholder="Raadi cuntooyinka..." 
                className="search-input"
                onChange={handleSearchChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <button className="search-button">
                <span>Raadi cuntooyinka</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
            
            <CartButton itemCount={cartItemCount} onClick={onCartClick} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 