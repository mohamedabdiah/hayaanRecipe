import React, { useState } from 'react';
import Receipt from './Receipt';

// Recipe prices map
const recipePrices: { [key: number]: number } = {
  1: 12.99,
  2: 14.99,
  3: 9.99,
  4: 11.99,
  5: 13.99,
  6: 10.99,
  7: 15.99,
  8: 8.99,
  9: 12.49,
  10: 11.49
};

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  orderedItem?: { id: number; title: string } | undefined;
  onAddToCart?: (id: number, title: string, quantity: number) => void;
  onOrderSuccess?: (orderDetails: any) => void;
}

type PaymentMethod = 'zaad' | 'edahab' | 'evc' | 'ebirr' | 'mpesa';

const OrderForm: React.FC<OrderFormProps> = ({ isOpen, onClose, orderedItem, onAddToCart, onOrderSuccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('zaad');
  const [mobileMoneyNumber, setMobileMoneyNumber] = useState('');
  
  // Receipt state
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  if (!isOpen || !orderedItem) return null;

  const itemPrice = recipePrices[orderedItem.id] || 9.99;
  const totalPrice = (itemPrice * quantity).toFixed(2);

  const getPaymentMethodName = (method: PaymentMethod): string => {
    switch(method) {
      case 'zaad': return 'ZAAD';
      case 'edahab': return 'eDahab';
      case 'evc': return 'EVC';
      case 'ebirr': return 'eBirr';
      case 'mpesa': return 'M-Pesa';
      default: return 'ZAAD';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add to cart if the function exists
    if (onAddToCart) {
      onAddToCart(orderedItem.id, orderedItem.title, quantity);
    }
    
    // Generate random order number
    const orderNumber = `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    
    // Create order details for receipt
    const newOrderDetails = {
      orderNumber,
      customerName: name,
      customerPhone: phone,
      customerAddress: address,
      items: [{
        id: orderedItem.id,
        title: orderedItem.title,
        quantity: quantity,
        price: itemPrice
      }],
      total: itemPrice * quantity,
      paymentMethod: getPaymentMethodName(paymentMethod),
      date: new Date()
    };
    
    // If we have a success callback, use it instead of showing the receipt here
    if (onOrderSuccess) {
      onOrderSuccess(newOrderDetails);
    } else {
      // Show receipt directly in the component if no callback provided
      setOrderDetails(newOrderDetails);
      setShowReceipt(true);
    }
    
    // Clear form fields
    setName('');
    setPhone('');
    setAddress('');
    setQuantity(1);
    setNotes('');
    setPaymentMethod('zaad');
    setMobileMoneyNumber('');
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    // Now close the order form too
    onClose();
  };

  return (
    <>
      <div className="order-form-overlay">
        <div className="order-form-container">
          <div className="order-form-header">
            <h2>Dalbo: {orderedItem.title}</h2>
            <button className="close-button" onClick={onClose}>&times;</button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Magaca:</label>
              <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Telefoonka:</label>
              <input 
                type="tel" 
                id="phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Cinwaanka:</label>
              <input 
                type="text" 
                id="address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="quantity">Tirada:</label>
              <input 
                type="number" 
                id="quantity" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value))} 
                required 
              />
            </div>
            
            <div className="form-group price-display">
              <label>Qiimaha:</label>
              <span className="price-amount">${totalPrice}</span>
            </div>
            
            <div className="form-group payment-methods">
              <label>Hab Bixinta:</label>
              <div className="payment-options">
                <button 
                  type="button" 
                  className={`payment-option ${paymentMethod === 'zaad' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('zaad')}
                >
                  ZAAD
                </button>
                <button 
                  type="button" 
                  className={`payment-option ${paymentMethod === 'edahab' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('edahab')}
                >
                  eDahab
                </button>
                <button 
                  type="button" 
                  className={`payment-option ${paymentMethod === 'evc' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('evc')}
                >
                  EVC
                </button>
                <button 
                  type="button" 
                  className={`payment-option ${paymentMethod === 'ebirr' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('ebirr')}
                >
                  eBirr
                </button>
                <button 
                  type="button" 
                  className={`payment-option ${paymentMethod === 'mpesa' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('mpesa')}
                >
                  M-Pesa
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="mobileMoneyNumber">Telefoon Lacag Bixinta:</label>
              <input 
                type="tel" 
                id="mobileMoneyNumber" 
                value={mobileMoneyNumber} 
                onChange={(e) => setMobileMoneyNumber(e.target.value)} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="notes">Faahfaahin dheeraad ah (ikhtiyaari):</label>
              <textarea 
                id="notes" 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
            
            <div className="form-buttons">
              <button type="button" className="cancel-button" onClick={onClose}>Jooji</button>
              <button 
                type="submit" 
                className="submit-button"
              >
                Dalbo
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Only show receipt if we're handling it locally */}
      {!onOrderSuccess && showReceipt && (
        <Receipt 
          isOpen={showReceipt} 
          onClose={handleCloseReceipt} 
          orderDetails={orderDetails} 
        />
      )}
    </>
  );
};

export default OrderForm; 