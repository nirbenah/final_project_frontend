import React from 'react';
import { useState } from 'react';
import '../TicketsDisplay.css';
import { Ticket } from '../../../types';
interface TicketsDisplayUserProps {
    tickets: Ticket[];
    buyTickets: (ticketType: string, quantity: number, price: number) => void;
}

const TicketsDisplayUser: React.FC<TicketsDisplayUserProps> = ({ tickets, buyTickets }) => {
    const [selectedQuantities, setSelectedQuantities] = useState<number[]>(new Array(tickets.length).fill(0));

    const handleSelectChange = (index: number, value: number) => {
        const newSelectedQuantities = [...selectedQuantities];
        newSelectedQuantities[index] = value;
        setSelectedQuantities(newSelectedQuantities);
    };

    const handleBuyNow = (ticketType: string, quantity: number, price: number) => {
        buyTickets(ticketType, quantity, price);
    };

    return (
        <>
            <div className='ticket-container'>
                <h2 className="headers">Buy Tickets: </h2>
                <div className="ticket-display">
                    {tickets.map((ticket, index) => (
                        <div className={ticket.available === 0 ? 'unavailable-ticket' : 'ticket'} key={index}>
                            <div className="ticket-info">
                                <p><b>{ticket.name} ticket</b></p>
                                <p>Price: {ticket.price}$</p>
                                {ticket.available === 0 ? <p><b>SOLD OUT</b></p>:
                                ticket.available < 10 ? <p style={{ color: "rgba(255, 0, 0, 0.678)" }}><b>{ticket.available} tickets left!</b></p> :
                                <p>{ticket.available} tickets available</p>}
                            </div>
                            {ticket.available === 0 ? null :
                                <>
                                    <p style={{ color: 'grey', fontSize: '13px' }}>Choose amount of tickets:</p>
                                    <div className='ticket-select'>
                                        <select className="drop-menu" defaultValue="0" onChange={(e) => handleSelectChange(index, parseInt(e.target.value))}>
                                            {[...Array(ticket.available + 1).keys()].map((num) => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                        <button className="orange-buttons" onClick={() => handleBuyNow(ticket.name, selectedQuantities[index], ticket.price)}>Buy Now</button>
                                    </div>
                                </>
                            }

                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TicketsDisplayUser;
