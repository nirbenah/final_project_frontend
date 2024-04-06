import React from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import EventDetails from '../../../components/EventDetails/EventDetails'
import TicketsDisplayUser from '../../../components/TicketsDisplayUser/TicketsDisplayUser'
import Comments from '../../../components/Comments/Comments'
import { Event, Comment } from '../../../types';
import NavButtonsUser from '../../../components/NavButtonsUser/NavButtonsUser'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../../../components/Loader/Loader';
import { Api, APIStatus } from '../../../api/Api';
import { LoginContext } from '../../../LoginContext';
import { useNavigate } from 'react-router-dom';


const EventPageUser: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [event, setEvent] = useState<Event>();
  const [eventId, setEventId] = useState<string>(useParams().eventTitle as string);
  const { username } = React.useContext(LoginContext);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    async function getEvent() {
      setIsLoading(true);
      const fetched_event = await Api.getEvent({ eventId: eventId })
      setIsLoading(false);
      if (fetched_event.status === APIStatus.Success) {
        setEvent(fetched_event.data)
      }
      else {
        console.log("error fetching event", fetched_event.data)
        setErrMsg("Failed to get event information, try again later.");
      }
    }

    if (!event) {
      getEvent()
    }
  }, []);

  const buyTicket = async (ticketType: string, quantity: number, price: number) => {
    if (quantity <= 0) {
      alert("Must purchase at least 1 ticket to proceed to checkout");
      return;
    }
    if (event) {
      setIsLoading(true);
      const order = {
        eventID: eventId,
        eventTitle: event.title,
        eventStartDate: event.start_date,
        username: username,
        ticketType: ticketType,
        quantity: quantity,
        pricePerTicket: price,
        orderDate: new Date(),
      }
      console.log(order);
      const response = await Api.postOrder(order);
      setIsLoading(false);
      if (response.status === APIStatus.Success) {
        // Navigate to checkout page with state data
        navigate(
          '/checkout',
          {
            state: {
              orderId: response.data.orderId,
              eventId: eventId,
              eventTitle: event.title,
              ticketType: ticketType,
              quantity: quantity,
              price: price,
            },
          }
        );
      } else {
        alert(`Failed to proceed to checkout - ${response.data.error}`);
      }
    }
  }

  return (
    <>
      <div className="event-page-container" style={{ minHeight: '100vh' }}>
        <NavBar isUser={true} rightComponent={<NavButtonsUser pageName={"catalog"} />} />
        {isLoading ? <Loader /> : null}
        {errMsg ? <p style={{justifyContent:"center",display:"flex",flexDirection:"column"}} className="error-msg">{errMsg}</p> : null}
        {event &&
          <>
            <EventDetails event={event} />
            <TicketsDisplayUser tickets={event.tickets} buyTickets={buyTicket} />
            {username && eventId && <Comments username={username} eventId={eventId} />}
          </>
        }
        
      </div>
    </>
  )
}

export default EventPageUser
