import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Reusables/Header';
import Footer from '../Reusables/Footer';
import '../utils/Assets/CSS/PaymentPage.css';
import { register } from '../utils/services/authServices';
import visaIcon from '../utils/Assets/Images/visa.png';
import mastercardIcon from '../utils/Assets/Images/mastercard.png';
import amexIcon from '../utils/Assets/Images/amex.png';

const PaymentPage = () => {
  const { state } = useLocation(); // Contains user and subscription data
  const navigate = useNavigate();
  const subscription = state?.subscription;
  const userData=state?.payload;

  console.log(state.payload + "data")

  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    discountCode: '',
  });

  const [discount, setDiscount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const detectCardType = (number) => {
    const patterns = {
      visa: /^4[0-9]{0,15}/,
      mastercard: /^5[1-5][0-9]{0,14}/,
      amex: /^3[47][0-9]{0,13}/,
    };
    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(number)) {
        return type;
      }
    }
    return null;
  };

  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    const cardType = detectCardType(value);
    setFormData((prevState) => ({
      ...prevState,
      cardNumber: value,
      cardType: cardType,
    }));
  };

  const hardcodedDiscountCodes = {
    SAVE20: 20,
    WELCOME10: 10,
    ARTIFY5: 5,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDiscountApply = () => {
    if (hardcodedDiscountCodes[formData.discountCode]) {
      setDiscount(hardcodedDiscountCodes[formData.discountCode]);
      setErrorMessage('');
    } else {
      setDiscount(0);
      setErrorMessage('Invalid discount code');
      setTimeout(() => setErrorMessage(''), 4000);
    }
  };

  const handlePayment = async () => {
    if (!formData.cardName || !formData.cardNumber || !formData.expiry || !formData.cvv) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }
    console.log(userData)
    const payload = {
      
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      subscriptionID: subscription._id,
      subscriptionStartDate: new Date(),
      subscriptionEndDate: (() => {
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);
        return endDate;
      })(),
      profilePicture: userData.profilePicture || '',
      coverPicture: userData.coverPicture || '',
    };

    try {
      const response = await register(payload);
      if (response.success) {
        navigate('/success');
      } else {
        setErrorMessage(response.msg || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
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
        <aside className="payment-left-div">
          <h2 className="payment-heading">Let's Make Payment</h2>
          <form className="payment-form">
            <label>
              Cardholder's Name
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                required
              />
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
                  />
                )}
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  required
                  maxLength="16"
                />
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
                />
              </label>
              <label>
                CVV
                <input
                  type="password"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                  maxLength="3"
                />
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
                />
                <button type="button" onClick={handleDiscountApply}>
                  Apply
                </button>
              </div>
            </label>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="pay-now-button" type="button" onClick={handlePayment}>
              Pay Now
            </button>
          </form>
        </aside>
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
