import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import NavButtonsUser from "../../../components/NavButtonsUser/NavButtonsUser";
import "./UserSpacePage.css";
import locationImg from "../../../assets/location.png";
import dateImg from "../../../assets/date.png";
import Pagination from "../../../components/Pagination/Pagination";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Loader from "../../../components/Loader/Loader";
import { APIStatus, Api } from '../../../api/Api'
import { LoginContext } from '../../../LoginContext';
import { Order, Event } from '../../../types';
import { getTime, getDate } from '../../../utils'
import { CircularProgress } from "@mui/material";

const popupStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface OrderItemProps {
  event: Event | undefined;
}
const OrderItem: React.FC<OrderItemProps> = ({ event }) => {
  return (
    <>
      <div className="modal-event-container">
          <>
            <h3>{event?.title}</h3>
            <img src={event?.image} alt="Event" className="modal-event-img" />
            <div className="modal-event-details">
              <p>Category: {event?.category}</p>
              <p><img src={locationImg} alt="Location" className="modal-event-icon" /> {event?.location}</p>
              <p><img src={dateImg} alt="Date" className="modal-event-icon" /> {event && getDate(event.start_date)} At {event && getTime(event.start_date)}</p>
              <p>Organized by {event?.organizer}</p>
              <p>{event?.description}</p>
            </div>
          </>
        
      </div>
    </>
  );
};

const UserSpacePage: React.FC = () => {
  const [Loading, setLoading] = useState(false);
  const [LoadingModal, setLoadingModal] = useState(false);
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [event, setEvent] = useState<Event>();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [open, setOpen] = React.useState<boolean[]>([]);
  const [errMsg, setErrMsg] = useState('');
  const { username } = React.useContext(LoginContext);

  const itemsPerPage = 5;

  async function getOrders(pageNumber: number) {
    console.log("fetching orders for username:", username);
    setLoading(true);
    const fetched_orders = await Api.getOrdersByUser(username, pageNumber, itemsPerPage);
    setLoading(false);
    if (fetched_orders.status !== APIStatus.Success) {
      console.error("Error fetching orders:", fetched_orders.data);
      setErrMsg("Failed to get orders information, try again later.");
      return;
    }
    console.log("fetched orders:", fetched_orders.data);
    setOrdersList(fetched_orders.data.orders);
    setPageCount(Math.ceil(fetched_orders.data.total / itemsPerPage));
    setOpen(ordersList.map(() => false))
  }
  useEffect(() => {
    if (username) {
      getOrders(page);
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      getOrders(page);
    }
  }, [page]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  async function getChosenEvent(eventId: string) {
    console.log("fetching event", eventId);
    setLoadingModal(true);
    const res = await Api.getEvent({ eventId: eventId })
    setLoadingModal(false);
    const fetched_event = res.data
    if (res.status !== APIStatus.Success) {
      console.error("Error fetching event:", fetched_event);
      handleCloseModal();
      return false;
    }
    console.log("fetched event:", fetched_event);
    setEvent(fetched_event);
  }

  const handleCloseModal = () => {
    setOpen(open.map(() => false));
  }

  const handleOpenModal = (index: number) => {
    setOpen(open.map((value, i) => i === index ? true : value));
    getChosenEvent(ordersList[index].eventID);
  }


  return (
    <>
      <div className="user-page-container" style={{ minHeight: '100vh' }}>
        <NavBar isUser={true} rightComponent={<NavButtonsUser pageName={"userSpace"} />} />
        <h1>User Space - {username}</h1>


        {Loading ? <Loader /> :
        errMsg ? <p className="error-msg">{errMsg}</p> :
          ordersList && ordersList.length !== 0 ? (
            <>
              <h2>Order History</h2>
              <div className="order-history">
                {ordersList.map((order, index) => (
                  <div key={index} className="purchase">
                    <div className="purchase-details">
                      <div className="purchase-event-details">
                        <p><b>Order no. {order._id}</b></p>
                        <p>{order.eventTitle}</p>
                        <p>Starts at {getDate(order.eventStartDate)} At {getTime(order.eventStartDate)}</p>
                        <Button style={{ textTransform: 'none' }} onClick={() => handleOpenModal(index)}>Show Event information</Button>
                      </div>
                    </div>
                    <div className="purchuse-ticket-details">
                      <p>Quantity: {order.quantity}</p>
                      <p>Ticket type: {order.ticketType}</p>
                      <p>Price per ticket: {order.pricePerTicket} $</p>
                      <p>Purchused on {getDate(order.orderDate)} At {getTime(order.orderDate)}</p>
                    </div>

                    <Modal
                      open={open[index]}
                      onClose={handleCloseModal}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={popupStyle}>
                        {LoadingModal ? < CircularProgress /> : <OrderItem event={event} />}
                      </Box>

                    </Modal>

                  </div>
                ))}
              </div>  
            </>) :
            <div className="no-orders">
              <h2>No orders found...</h2>
            </div>
        }
        <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
      </div>
    </>

  );
};

export default UserSpacePage;