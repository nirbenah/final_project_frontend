import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../../../components/NavBar/NavBar'
import EventDetails from '../../../components/EventDetails/EventDetails'
import TicketsDisplayBack from '../../../components/TicketsDisplayBack/TicketsDisplayBack'
import { Event, Comment } from '../../../types';
import NavButtonsBack from '../../../components/NavButtonsBack/NavButtonsBack'
import EditDatesPopup from '../../../components/EditDatesPopup/EditDatesPopup'
import {  formatDate } from '../../../utils'
import Loader from '../../../components/Loader/Loader'
import { LoginContext } from '../../../LoginContext'
import { APIStatus, Api } from '../../../api/Api';
import { useNavigate } from 'react-router-dom'

const EventPage: React.FC = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { username, permission } = useContext(LoginContext);
  const [event, setEvent] = useState<Event>();
  const [eventId, setEventId] = useState<string>(useParams().eventTitle as string);
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
        console.log("error fetching event",fetched_event.data)
        setErrMsg("Failed to get event information, try again later.");
      }
    }

    if (!event) {
      getEvent()
    }
  }, []);

  const handleUpdateDates = async (startDate: string, endDate: string) => {
    const fetched_event = await Api.UpdateDates( eventId, startDate, endDate);
    if (fetched_event.status !== APIStatus.Success) {
      alert(fetched_event.data.error)
    }
    else{
      setPopupOpen(false);
      navigate(0);
    }
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      
      <div className="event-page-container" style={{ minHeight: '100vh' }}>
        <NavBar isUser={false} rightComponent={<NavButtonsBack permissionLevel={permission} handleEditDateClick={handleOpenPopup} pageName='event' />} />
        {isLoading ? <Loader /> : null}
        {event &&
          <>
            <EventDetails event={event} />
            <EditDatesPopup isOpen={popupOpen} onClose={handleClosePopup} onUpdate={handleUpdateDates} initialStartDate={formatDate(new Date (event.start_date))} initialEndDate={formatDate(new Date (event.end_date))} />
            <TicketsDisplayBack tickets={event.tickets} />
            <p className="comments-number"><b>** This event has {event.commentsNumber} comments **</b></p>
          </>
        }
        {errMsg ? <p className="error-msg">{errMsg}</p> : null}
      </div>
    </>
  )
}

export default EventPage
