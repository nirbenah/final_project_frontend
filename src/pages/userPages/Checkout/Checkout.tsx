import React, { useState, useEffect, useRef } from 'react';
import "./Checkout.css";
import NavBar from '../../../components/NavBar/NavBar';
import NavButtonsUser from '../../../components/NavButtonsUser/NavButtonsUser';
import CheckoutTimer from '../../../components/CheckoutTimer/CheckoutTimer';
import CheckoutLeaveDialog from '../../../components/CheckoutLeaveDialog/checkoutLeaveDialog';
import Loader from '../../../components/Loader/Loader';
import CheckoutForm from '../../../components/CheckoutForm/CheckoutForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { APIStatus, Api } from '../../../api/Api';
import { paymentPayload } from '../../../types';

export const Checkout: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(120);
  const timeoutOccurred = useRef(false);
  const navigator = useNavigate();
  const location = useLocation();
  const state = location.state as any;

  const orderId = state?.orderId;
  const eventId = state?.eventId;
  const eventTitle = state?.eventTitle;
  const ticketType = state?.ticketType;
  const quantity = state?.quantity;
  const pricePerTicket = state?.price;

  useEffect(() => {
    if (!state || !orderId || !eventId || !eventTitle || !ticketType || !quantity ) {
      console.log('Missing state data',state);
      alert('Error');
    }
    setSecondsRemaining(localStorage.getItem('timeLeft') ? parseInt(localStorage.getItem('timeLeft') as string) : 120);

  }, []);

  const handleTimeout = () => {
    alert('Timeout - tickets were released back to the catalog.');
  };

  useEffect(() => {
    if (secondsRemaining === 0 && !timeoutOccurred.current) {
      handleTimeout();
      timeoutOccurred.current = true;
    }
  }, [secondsRemaining]);

  const handlePayment = async (cc: string, holder: string, cvv: number, exp: string) => {
    setIsLoading(true);
    const payload = {
      cc: cc,
      holder: holder,
      cvv: cvv,
      exp: exp,
      charge: quantity * pricePerTicket,
    } as paymentPayload;
    const purchaseResponse = await Api.purchase(orderId, payload);
    setIsLoading(false);
    console.log(purchaseResponse);
    if (purchaseResponse.status === APIStatus.Success) {
      alert('Payment successful');
      // Navigate to checkout page with state data
      navigator(
        '/success-page',
        {
          state: {
            orderId: orderId,
            eventTitle: eventTitle,
            ticketType: ticketType,
            quantity: quantity,
            pricePerTicket: pricePerTicket,
          },
          replace: true,
        }
      );
    } else {
      alert('Payment failed, please try again.');
    }
  };

  window.onbeforeunload = () => {
    return true;
  };

  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  // };

  // const handleLeavePage = () => {
  //   navigator(-1);
  // };

  return (
    <>
      <NavBar isUser={true} rightComponent={<NavButtonsUser pageName={"checkout"} />} />
      {isLoading ? <Loader /> :
        <div className="checkout-page-container" style={{ minHeight: "100vh" }}>
          <h1>Checkout</h1>
          <div className="checkout-container">
            <CheckoutForm handlePayment={handlePayment} />
            <div className='order-summery-and-timeout'>
              <div className="order-summary">
                <h3>Order Summary</h3>
                {eventId &&
                  <>
                    <p><b>{quantity} x {eventTitle}</b></p>
                    <p> {ticketType} tickets ({pricePerTicket}$) </p>
                    <p>Total Price: {pricePerTicket * quantity}$</p>
                  </>
                }
              </div>
              <div className='timeout'><CheckoutTimer secondsRemaining={secondsRemaining} setSecondsRemaining={setSecondsRemaining} onTimeout={handleTimeout} /></div>
            </div>
          </div>
        </div>
      }
      {/* <CheckoutLeaveDialog handleCloseDialog={handleCloseDialog} handleLeavePage={handleLeavePage} openDialog={openDialog} /> */}
    </>
  );
};

export default Checkout;
