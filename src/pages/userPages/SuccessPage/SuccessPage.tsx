

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./SuccessPage.css";
import NavBar from '../../../components/NavBar/NavBar';
import NavButtonsUser from '../../../components/NavButtonsUser/NavButtonsUser';

export const SuccessPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const location = useLocation();
  const state = location.state as any;
  const navigate = useNavigate();

  const orderId = state?.orderId;
  const eventTitle = state?.eventTitle;
  const ticketType = state?.ticketType;
  const quantity = state?.quantity;
  const pricePerTicket = state?.pricePerTicket;

  const handleBackToCatalog = () => {
    navigate('/main_user');
  };

  console.log(state);
  if (!state || !orderId || !eventTitle || !ticketType || !quantity || !pricePerTicket) {
    alert('Error');
    handleBackToCatalog();
  }

  return (
    <>
      <NavBar isUser={true} setIsLoading={setIsLoading} rightComponent={<NavButtonsUser pageName={"success"} />} />
      <div className="success-page-container" style={{ minHeight: "100vh" }}>
        <div className="success-message">
          <h2>Congratulations! Enjoy!</h2>
          <br />
          <p><b>Order ID: {orderId}</b></p>
          <br />
          <p>{eventTitle}</p>
          <br />
          <p>{quantity} X {ticketType}</p>
          <br />
          <p>Total Price: ${pricePerTicket.toFixed(2) * quantity}</p>
          <br />
          <div className="go-back-link">
            <button onClick={handleBackToCatalog} className="nav-buttons">Back to Catalog page</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;


