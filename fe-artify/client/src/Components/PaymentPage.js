import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Reusables/Header';
import Footer from '../Reusables/Footer';
import '../utils/Assets/CSS/PaymentPage.css';
import visaIcon from '../utils/Assets/Images/visa.png';
import mastercardIcon from '../utils/Assets/Images/mastercard.png';
import amexIcon from '../utils/Assets/Images/amex.png';

const PaymentPage = () => {
  const { state } = useLocation();
  const subscription = state?.subscription;

  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    discountCode: '',
  });

  const [discount, setDiscount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const detectCardType = (number) => {
    const patterns = {
      visa: /^4[0-9]{0,15}/,
      mastercard: /^5[1-5][0-9]{0,14}/,
      amex: /^3[47][0-9]{0,13}/,
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(number)) {
        return type;  // Returns the card type (visa, mastercard, etc.)
      }
    }

    return null; // No match
  };

  const isLuhnValid = (number) => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  // Function to validate expiry date
  const isExpiryValid = (expiry) => {
    const [month, year] = expiry.split('/').map(Number);
    if (!month || !year || month < 1 || month > 12) return false;
    const today = new Date();
    const expiryDate = new Date(`20${year}`, month - 1);
    return expiryDate > today;
  };

  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return;

    const cardType = detectCardType(value);
    setFormData((prevState) => ({
      ...prevState,
      cardNumber: value,
      cardType: cardType,
    }));

    // Real-time validation for card number
    const errors = { ...fieldErrors };
    if (!isLuhnValid(value)) {
      errors.cardNumber = 'Invalid card number.';
    } else {
      delete errors.cardNumber;
    }
    setFieldErrors(errors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update formData
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation for the field being updated
    const errors = { ...fieldErrors };
    if (name === "cardName" && !value.trim()) {
      errors.cardName = "Cardholder's name is required.";
    } else if (name === "expiry" && !isExpiryValid(value)) {
      errors.expiry = "Invalid expiry date. Use MM/YY format.";
    } else if (name === "cvv" && !/^\d{3,4}$/.test(value)) {
      errors.cvv = "Invalid CVV. Must be 3 digits (4 for Amex).";
    } else {
      delete errors[name]; // Remove any errors when input is valid
    }

    setFieldErrors(errors); // Update field-specific errors
  };

  const handleDiscountApply = () => {
    const hardcodedDiscountCodes = {
      SAVE20: 20,
      WELCOME10: 10,
      ARTIFY5: 5,
    };
    if (hardcodedDiscountCodes[formData.discountCode.toUpperCase()]) {
      setDiscount(hardcodedDiscountCodes[formData.discountCode.toUpperCase()]);
      setErrorMessage('');
    } else {
      setDiscount(0);
      setErrorMessage('Invalid discount code');
      setTimeout(() => setErrorMessage(''), 4000);
    }
  };

  const handleFormValidation = () => {
    const errors = {};

    if (!formData.cardName.trim()) errors.cardName = "Cardholder's name is required.";
    if (!formData.cardNumber || !isLuhnValid(formData.cardNumber))
      errors.cardNumber = 'Invalid card number.';
    if (!formData.expiry || !isExpiryValid(formData.expiry))
      errors.expiry = 'Invalid expiry date. Use MM/YY format.';
    if (!formData.cvv || !/^\d{3,4}$/.test(formData.cvv))
      errors.cvv = 'Invalid CVV. Must be 3 digits (4 for Amex).';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayNow = () => {
    if (handleFormValidation()) {
      alert('Payment successful!');
      // Proceed with payment logic here
    }
  };

  const handleClear = () => {
    setFormData({
      cardName: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      discountCode: '',
    });
    setDiscount(0);
    setErrorMessage('');
    setFieldErrors({});
  };

  if (!subscription) {
    return (
      <div>
        <Header />
        <div className="payment-page-container">
          <h1>No Subscription Selected</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const { subscriptionType, subscriptionPrice } = subscription;
  const taxes = (parseFloat(subscriptionPrice) * 0.13).toFixed(2);
  const totalAmount = (parseFloat(subscriptionPrice) - discount + parseFloat(taxes)).toFixed(2);

  return (
    <div className="payment-page-container">
      <Header />
      <div className="payment-page-main">
        {/* Left Section */}
        <aside className="payment-left-div">
          <h2 className="payment-heading">Let's Make Payment</h2>
          <p>
            To start your subscription, input your card details to make payment. 
            You will be redirected to your bank's authorization page.
          </p>
          <form className="payment-form">
            <label>
              Cardholder's Name
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                required
                style={{ backgroundColor: '#65939D' }}
              />
              {fieldErrors.cardName && <p className="error-message">{fieldErrors.cardName}</p>}
            </label>
            <label>
              Card Number
              <div className="card-number-container">
                {formData.cardType && (
                  <img
                    src={
                      formData.cardType === 'visa' ? visaIcon :
                      formData.cardType === 'mastercard' ? mastercardIcon :
                      formData.cardType === 'amex' ? amexIcon :
                      ''
                    }
                    alt={`${formData.cardType} icon`}
                    className="card-icon"
                  />
                )}
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  required
                  maxLength="16"
                  style={{ backgroundColor: '#65939D' }}
                />
                {fieldErrors.cardNumber && <p className="error-message">{fieldErrors.cardNumber}</p>}
              </div>
            </label>
            <div className="expiry-cvv">
              <label>
                Expiry
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                  style={{ backgroundColor: '#65939D' }}
                />
                {fieldErrors.expiry && <p className="error-message">{fieldErrors.expiry}</p>}
              </label>
              <label>
                CVV
                <input
                  type="password"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                  maxLength="4"
                  style={{ backgroundColor: '#65939D' }}
                />
                {fieldErrors.cvv && <p className="error-message">{fieldErrors.cvv}</p>}
              </label>
            </div>
            <label>
              Discount Code
              <div className="discount-container">
                <input
                  type="text"
                  name="discountCode"
                  value={formData.discountCode}
                  onChange={handleInputChange}
                  style={{ backgroundColor: '#65939D' }}
                />
                <button type="button" onClick={handleDiscountApply}>
                  Apply
                </button>
              </div>
            </label>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="button" onClick={handleClear} className="clear-button">
              Clear
            </button>
            <button type="button" onClick={handlePayNow} className="pay-now-button">
              Pay Now
            </button>
          </form>
        </aside>

        {/* Right Section */}
        <div className="payment-right-div">
          <div className="payment-details-box">
            <h3 className="payment-summary-title">You're paying</h3>
            <p className="payment-total">${totalAmount}</p>
            <p className="payment-detail-title">Plan Selected:</p>
            <p className="payment-detail-content">{subscriptionType} (${subscriptionPrice})</p>
            <p className="payment-detail-title">Discounts & Offers:</p>
            <p className="payment-detail-content">${discount}</p>
            <p className="payment-detail-title">Taxes (13%):</p>
            <p className="payment-detail-content">${taxes}</p>
            <hr />
            <p className="payment-detail-title">Total Amount:</p>
            <p className="payment-detail-content">${totalAmount}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
