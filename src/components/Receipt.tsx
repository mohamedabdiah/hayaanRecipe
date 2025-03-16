import React, { useRef } from 'react';

interface ReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    orderNumber: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    items: Array<{
      id: number;
      title: string;
      quantity: number;
      price: number;
    }>;
    total: number;
    paymentMethod: string;
    date: Date;
  } | null;
}

const Receipt: React.FC<ReceiptProps> = ({ isOpen, onClose, orderDetails }) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !orderDetails) return null;

  const { orderNumber, customerName, customerPhone, customerAddress, items, total, paymentMethod, date } = orderDetails;

  const handlePrint = () => {
    const printContent = receiptRef.current?.innerHTML;
    const originalBody = document.body.innerHTML;

    if (printContent) {
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Hayaan Recipe - Rasiidka Dalabka</title>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  color: #333;
                  padding: 20px;
                  max-width: 800px;
                  margin: 0 auto;
                }
                .receipt-container {
                  border: 1px solid #ddd;
                  border-radius: 10px;
                  padding: 20px;
                  background-color: #fff;
                }
                .receipt-header {
                  text-align: center;
                  border-bottom: 2px solid #ff6b6b;
                  padding-bottom: 10px;
                  margin-bottom: 20px;
                }
                .receipt-header h1 {
                  color: #ff6b6b;
                  margin: 0;
                }
                .receipt-details {
                  margin-bottom: 20px;
                }
                .receipt-details-row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 5px;
                }
                .items-table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 20px 0;
                }
                .items-table th {
                  background-color: #f8f8f8;
                  border-bottom: 2px solid #ddd;
                  padding: 10px;
                  text-align: left;
                }
                .items-table td {
                  padding: 10px;
                  border-bottom: 1px solid #ddd;
                }
                .items-total {
                  text-align: right;
                  font-weight: bold;
                  font-size: 1.2em;
                  margin-top: 20px;
                  padding-top: 10px;
                  border-top: 2px solid #ddd;
                }
                .thank-you {
                  text-align: center;
                  margin-top: 30px;
                  font-size: 1.1em;
                  color: #ff6b6b;
                }
                .footer {
                  margin-top: 30px;
                  text-align: center;
                  font-size: 0.8em;
                  color: #888;
                }
              </style>
            </head>
            <body>
              <div class="receipt-container">
                ${printContent}
              </div>
            </body>
          </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        // Wait for content to load before printing
        printWindow.setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('so-SO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="receipt-overlay">
      <div className="receipt-container">
        <div className="receipt-header">
          <h2>Rasiidka Dalabka</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="receipt-content" ref={receiptRef}>
          <div className="receipt-header">
            <h1>Hayaan Recipe</h1>
            <p>Cuntooyin Fudud oo Qurux Badan</p>
          </div>
          
          <div className="receipt-details">
            <div className="receipt-details-row">
              <span>Dalabka Lambarkiisa:</span>
              <span>{orderNumber}</span>
            </div>
            <div className="receipt-details-row">
              <span>Taariikhda:</span>
              <span>{formatDate(date)}</span>
            </div>
          </div>
          
          <div className="receipt-customer">
            <h3>Macmiilka Faahfaahinta</h3>
            <div className="receipt-details-row">
              <span>Magaca:</span>
              <span>{customerName}</span>
            </div>
            <div className="receipt-details-row">
              <span>Telefoonka:</span>
              <span>{customerPhone}</span>
            </div>
            <div className="receipt-details-row">
              <span>Cinwaanka:</span>
              <span>{customerAddress}</span>
            </div>
            <div className="receipt-details-row">
              <span>Hab Bixinta:</span>
              <span>{paymentMethod}</span>
            </div>
          </div>
          
          <div className="receipt-items">
            <h3>Faahfaahinta Dalabka</h3>
            <table className="items-table">
              <thead>
                <tr>
                  <th>Cuntada</th>
                  <th>Tirada</th>
                  <th>Qiimaha</th>
                  <th>Wadarta</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="items-total">
              <div className="receipt-details-row">
                <span>Wadarta Qiimaha:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="thank-you">
            <p>Waad ku mahadsantahay dalabkaaga!</p>
          </div>
          
          <div className="footer">
            <p>Hayaan Recipe - Cuntooyin Fudud oo Qurux Badan</p>
            <p>Waad ku soo booqan kartaa boggayaga www.hayaanrecipe.com</p>
          </div>
        </div>
        
        <div className="receipt-actions">
          <button className="print-button" onClick={handlePrint}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Daabac Rasiidka
          </button>
          <button className="close-receipt-button" onClick={onClose}>
            Xir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt; 