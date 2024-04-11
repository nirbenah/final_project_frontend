import React from 'react';
import '../TicketsDisplay.css';
import { Ticket } from '../../../types';

interface TicketsDisplayBackProps {
    tickets: Ticket[];
}

const TicketsDisplayBack: React.FC<TicketsDisplayBackProps> = ({ tickets }) => {
    return (
        <>
            <div className='ticket-container'>
                <h2 className="headers">Categories: </h2>
                <div className="ticket-display">
                    {tickets.map((ticket, index) => (
                        <div className="ticket_back" key={index}>
                            <div className="ticket-info">
                                <p><b>{ticket.name} ticket</b></p>
                                <p>Price: {ticket.price}$</p>
                                <p>{ticket.available} out of {ticket.quantity} tickets available</p>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TicketsDisplayBack;
