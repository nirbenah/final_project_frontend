import React from 'react';
import './EventDetails.css';
import { Event } from '../../types';
import { getDate, getTime, getDayOfWeek} from '../../utils';
import defaultEventImg from '../../assets/default-event.png';
import locationImg from '../../assets/location.png';
import dateImg from '../../assets/date.png';

interface EventDetailsProps {
  event: Event;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  const [date, setDate] = React.useState<string>('');

  React.useEffect(() => {
    if (event) {
      const startDate = new Date(event.start_date);
      const endDate = new Date(event.end_date);
      const durationMs = Math.abs(endDate.getTime() - startDate.getTime());
      const durationDays = Math.floor(durationMs / (1000 * 60 * 60 * 24));
      if(durationDays >= 1){
        setDate(`${getDate(event.start_date)} - ${getDate(event.end_date)}`);
      }
      else{
        const day = (getDayOfWeek(new Date(event.start_date)));
        setDate(`${day}, ${getDate(event.start_date)}, ${getTime(event.start_date)} - ${getTime(event.end_date)}`);
      }

    }
  }, [event]);


  return (
    <>
      {event &&
        <div className="event-details">
          {/* <h2 className='headers'>{event.title}</h2> */}
          <div className="event-details-top" style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${event.image})`}}>
            <div className="event-image">
            <img
                  src={event.image}
                  alt="Background"
                  onError={(e) => {
                    // If the image fails to load, set the source to the default image
                    (e.target as HTMLImageElement).src = defaultEventImg;
                  }}
                />
              </div>
              <div className="event-type">
              <h3>{event.title}</h3>
                <p><b>{date}</b></p>
                <p><b>At {event.location}</b></p>
                {event.tickets_available === 0 ? 
                <p><b>SOLD OUT</b></p>:
                <p><b>{event.tickets_available} tickets Available, starting from {event.min_price}$ </b></p>}
                <p>{event.description}</p> 
              </div>
            </div>
          </div>
      }
        </>
  );
};

      export default EventDetails;
