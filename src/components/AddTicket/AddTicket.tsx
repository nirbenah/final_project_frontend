import React, { useState } from 'react';
import './AddTicket.css';
import { Ticket } from '../../types';
import TextField from '@mui/material/TextField';

interface AddTicketFormProps {
  onSubmit: (ticket: Ticket) => void;
}

const AddTicket: React.FC<AddTicketFormProps> = ({ onSubmit }) => {
  const [ticket, setTicket] = useState<Ticket>({ name: '', quantity: 0, available: 0, price: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // set ticket available to be the same as quantity
    if (name === 'quantity' && typeof value === 'number') {
      setTicket(prevTicket => ({ ...prevTicket, available: value }));
    }
    setTicket(prevTicket => ({ ...prevTicket, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(ticket.quantity === 0 || ticket.price === 0 || ticket.name === '') {
      alert('Ticket is not valid, name, quantity and price bigger then 0 are required.');
      return;
    }
    onSubmit(ticket);
    setTicket({ name: '', quantity: 0, available: 0, price: 0 });
  };

  return (
    <form className="ticket" onSubmit={handleSubmit}>
      <div className="add-ticket-row">
      <TextField
          id="type"
          label="Type"
          variant="standard"
          size="small"
          name="name"
          type="text"
          value={ticket.name}
          onChange={handleChange}
          placeholder="Type"
        />
      </div>
      <div className="add-ticket-row">
        <TextField
          id="quantity"
          label="Quantity"
          variant="standard"
          size="small"
          name="quantity"
          value={ticket.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
        />
      </div>
      <div className="add-ticket-row">
        <TextField
          id="price"
          label="Price ($)"
          variant="standard"
          size="small"
          name="price"
          value={ticket.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
        />
      </div>
      <button className="blue-buttons" type="submit">Add</button>
    </form>
  );
};

export default AddTicket;
