import React, { useState, useEffect } from 'react';
import "./CatalogPage.css";
import { Event } from '../../types';
import { getDate } from '../../utils';
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';
import { APIStatus, Api } from '../../api/Api';
import Loader from '../Loader/Loader';
import defaultEventImg from '../../assets/default-event.png';


export interface CatalogPageProps {
  isUser: boolean;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ isUser, isLoading, setIsLoading }) => {
  const [eventsPerPage, setEventsPerPage] = useState<number>(10);
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [errMsg, setErrMsg] = useState('');

  async function getEvents(pageNumber: number) {
    let fetched_events;
    setIsLoading(true);
    if (isUser) {
      fetched_events = await Api.getAvailableEvents({ page: pageNumber, limit: eventsPerPage });
    }
    else {
      fetched_events = await Api.getAllEvents({ page: pageNumber, limit: eventsPerPage });
    }
    setIsLoading(false);
    if (fetched_events.status === APIStatus.Success) {
      setEventsList(fetched_events.data.events);
      setPageCount(Math.ceil(fetched_events.data.total / eventsPerPage));
      setErrMsg('');
    }
    else {
      setEventsList([]);
      setPageCount(1);
      setErrMsg('Failed to get events, try to refresh the page or try again later.');
    }
  }

  useEffect(() => {
    getEvents(page);
  }, [page, eventsPerPage]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEventsPerPage(parseInt(event.target.value));
    handlePageChange(1);
  };


  return (
    <>
      <div className="catalog-page-container">
        <h1>Event Catalog</h1>
        {isLoading ? <Loader isPartial={true} /> :
          errMsg ? <p className="error-msg">{errMsg}</p> :
            eventsList.length === 0 ? <p>No events to show</p> :
              <>
                <div className="events-per-page">
                  <label htmlFor="eventsPerPage">Events per page:</label>
                  <select id="eventsPerPage" value={eventsPerPage} onChange={handlePerPageChange}>
                    {[5, 10, 15, 20].map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className='catalog-events'>
                  {eventsList.map((event, index) => (
                    <div key={index} className="catalog-event">
                      <Link to={isUser ? `/event_user/${event._id}` : `/event_back/${event._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <img src={event.image} alt="image event" onError={(e) => {
                          // If the image fails to load, set the source to the default image
                          (e.target as HTMLImageElement).src = defaultEventImg;
                        }} />
                        <div className="catalog-event-details">
                          <h2 >{event.title}</h2>
                          <p style={{color:"grey"}}>{event.category} | {getDate(event.start_date)}</p>
                          <div style={{paddingTop:"20px"}}>
                            {event.tickets_available < 10 ?
                            <p style={{color:"rgba(255, 0, 0, 0.678)"}}><strong>Only {event.tickets_available} Tickets available!</strong> </p>:
                            <p><strong>{event.tickets_available} Tickets available</strong></p>}
                            <p><strong>Starting from {event.min_price}$</strong></p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

              </>
        }
        <Pagination
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );

};

export default CatalogPage;
