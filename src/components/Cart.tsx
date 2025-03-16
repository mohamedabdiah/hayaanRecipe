import React from 'react';

export interface CartItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
}

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, isOpen, onClose, onRemoveItem, onCheckout }) => {
  if (!isOpen) return null;
  
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Dambiilka</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <p>Dambiilkaaga waa ebar.</p>
              <p>Fadlan dooro cuntooyin aad ku dartid.</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <div className="cart-item-details">
                    <span className="cart-item-price">${item.price.toFixed(2)} × {item.quantity}</span>
                    <span className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <button className="remove-item-button" onClick={() => onRemoveItem(item.id)}>
                    Ka saar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Wadarta:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout-button" onClick={onCheckout}>
              Dalbo Hadda
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; 