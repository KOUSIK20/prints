import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PaymentPage() {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  
  const location = useLocation();
  const { totalPrice, source } = location.state || {};

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page
    
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('mobileNumber', mobileNumber);
    alert('Payment successful');
  };

  const handlePrint = () => {
    if (source === 'PricingComponent') {
      navigate('/printpage');
    } else {
      navigate('/print');
    }
  };

  return (
    <div className="payment-page">
      <h1>Payment Details</h1>

      <div className="payment-form">
        <form onSubmit={handleSubmit}>
          <div className="form-1">
            <label htmlFor="account-number">Account Number</label>
            <input
              type="text"
              id="account-number"
              name="account-number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-1">
            <label htmlFor="mobile-number">Mobile Number</label>
            <input
              type="text"
              id="mobile-number"
              name="mobile-number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-1">
            <label htmlFor="total-price">Total Price</label>
            <input
              type="text"
              value={totalPrice.toFixed(2)}
              readOnly
            />
          </div>

          <button type="submit" className="pay-button">Pay</button>
        </form>
      </div>

      <button onClick={handlePrint} className="print-button">
        View Payment Details
      </button>
      <button onClick={() => navigate(-1)} className="back-pay">
        Back
      </button>
    </div>
  );
}

export default PaymentPage;
