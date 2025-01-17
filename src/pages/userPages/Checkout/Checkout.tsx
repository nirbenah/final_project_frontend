import React, { useState, useEffect, useRef } from 'react';
import "./Checkout.css";
import NavBar from '../../../components/NavBar/NavBar';
import NavButtonsUser from '../../../components/NavButtonsUser/NavButtonsUser';
import CheckoutTimer from '../../../components/CheckoutTimer/CheckoutTimer';
import Loader from '../../../components/Loader/Loader';
import CheckoutForm from '../../../components/CheckoutForm/CheckoutForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { APIStatus, Api } from '../../../api/Api';
import { paymentPayload } from '../../../types';
import { LoginContext } from '../../../LoginContext';
import { getPositiveTimeDifferenceInSeconds } from '../../../utils';

export const Checkout: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(120);
  const timeoutOccurred = useRef(false);
  const navigator = useNavigate();
  const location = useLocation();
  const state = location.state as any;
  const { isLoadingUser } = React.useContext(LoginContext);

  const orderId = state?.orderId;
  const eventId = state?.eventId;
  const eventTitle = state?.eventTitle;
  const ticketType = state?.ticketType;
  const quantity = state?.quantity;
  const pricePerTicket = state?.price;
  const timeoutDate = state?.timeoutDate;

  useEffect(() => {
    if (!state || !orderId || !eventId || !eventTitle || !ticketType || !quantity || !timeoutDate) {
      alert('Error');
      navigator('/main_user');
    }
    setSecondsRemaining(getPositiveTimeDifferenceInSeconds(new Date(timeoutDate)));
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
      if (purchaseResponse.status === APIStatus.BadRequest) {
        alert('Tickets are no longer available :(');
        navigator('/main_user');
      }
      else if (purchaseResponse.status === APIStatus.ServerError) {
        alert('Payment failed due to server error, please try again later.');
      }
      else {
        alert('Undefined error - Payment failed please try again later.');
      }
    }
  };

  window.onbeforeunload = () => {
    return true;
  };


  return (
    <>
      <div className="checkout-page-container" style={{ minHeight: "100vh" }}>
        <NavBar isUser={true} rightComponent={<NavButtonsUser pageName={"checkout"} />} />
        {isLoading || isLoadingUser ? <Loader /> :
          <>
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
                <div className='timeout'><CheckoutTimer secondsRemaining={secondsRemaining} setSecondsRemaining={setSecondsRemaining} onTimeout={handleTimeout} timeoutDate={new Date(timeoutDate)} /></div>
              </div>
            </div>
          </>
        }
      </div>
    </>
  );
};

export default Checkout;
