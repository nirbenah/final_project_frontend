import React, { useState, useEffect } from 'react'
import './CreateEventPage.css'
import NavBar from '../../../components/NavBar/NavBar'
import { Event, Ticket } from '../../../types'
import AddTicket from '../../../components/AddTicket/AddTicket'
import AddEventForm from '../../../components/AddEventForm/AddEventForm'
import NavButtonsBack from '../../../components/NavButtonsBack/NavButtonsBack'
import Loader from '../../../components/Loader/Loader'
import { APIStatus, Api } from '../../../api/Api'
import { LoginContext } from '../../../LoginContext'
import { SelectChangeEvent } from '@mui/material';
import ErrorPopup from '../../../components/ErrorPopUp/ErrorPopUp';

// const dummy_event=  {
//   title: "eventtttt",
//   category: "Festival",
//   organizer: "Adi Toledano",
//   description: "this is a long decsription",
//   start_date: new Date("2023-01-01T15:30") ,
//   end_date: new Date("2023-01-02T15:30"),
//   location: "Habima",
//   tickets: [
//     {
//       name: "General Admission",
//       quantity: 100,
//       price: 30,
//       available: 50
//     }
//   ],
//   image: "https://s.hs-data.com/bilder/teamfotos/640x360/1181.jpg" 
// } as Event;

const clearEvent = {
  title: '',
  category: '',
  organizer: '',
  description: '',
  start_date: new Date(),
  end_date: new Date(),
  location: '',
  tickets: [],
  min_price: 0,
  tickets_available: 0,
  image: ''
} as Event;

const CreateEventPage: React.FC = () => {
  const [event, setEvent] = useState<Event>(clearEvent);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const { username, permission } = React.useContext(LoginContext);


  const handleAddTicket = (ticket: Ticket) => {
    setEvent(prevEvent => ({
      ...prevEvent,
      tickets: [...prevEvent.tickets, ticket]
    }));
  };

  const handleDeleteTicket = (index: number) => {
    setEvent(prevEvent => ({
      ...prevEvent,
      tickets: prevEvent.tickets.filter((_, i) => i !== index)
    }));
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setEvent(prevEvent => ({
      ...prevEvent,
      [name]: value
    }));
  };

  const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await Api.postEvent({event});
    setIsLoading(false); 
    if(res.status === APIStatus.Success) {
      console.log('Event created successfully');
      alert('Event created successfully');
      window.location.reload();
    }
    else {
      console.log('Failed to create event');
      console.log(res.data);
      setErrMsg("Error: " + res.data.error);
    }
  }

  return (
    <>
      {isLoading ? <Loader /> : null}
      <div className="create-new-event-container">
        <NavBar isUser={false} rightComponent={<NavButtonsBack permissionLevel={permission} pageName='addEvent'/>} />
        <h1 className='create-event-header'>Create New Event</h1>
        <div className="event-form-container">
          <AddEventForm onSubmit={handleCreateEvent} onchange={handleInputChange} />
        </div>
        <div className="add-tickets-container">
          <h3 className="headers">Add Tickets:</h3>
          <div className="ticket-display">
            {event.tickets.map((ticket, index) => (
              <div className="ticket" key={index}>
                <p>Ticket Type: {ticket.name}</p>
                <p>Quantity: {ticket.quantity}</p>
                <p>Price: {ticket.price}</p>
                <button className="blue-buttons" onClick={() => handleDeleteTicket(index)}>Delete</button>
              </div>
            ))}
            <AddTicket onSubmit={handleAddTicket} />
          </div>
        </div>
        <button className="orange-buttons" id="submit-button" form="event-form" type="submit">Submit Event</button>
      </div>
      <ErrorPopup open={errMsg !== ''} setErrorMessage={setErrMsg} errorMessage={errMsg} />
    </>

  )
}

export default CreateEventPage
