export interface Ticket {
    name: string,
    quantity: number,
    available: number,
    price: number,
}

export interface Event {
    _id?: string,
    title: string,
    category: string,
    description: string,
    organizer: string,
    start_date: Date,
    end_date: Date,
    location: string,
    tickets: Ticket[],
    min_price: number,
    tickets_available: number,
    image?: string,
    commentsNumber?: number,
}

export interface Comment {
    //_id: string
    event_id: string,
    author: string,
    date: Date,
    content: string,
}

export interface Order {
    _id?: string,
    eventID: string,
    eventTitle: string,
    eventStartDate: Date,
    username: string,
    ticketType: string,
    quantity: number,
    pricePerTicket: number,
    orderDate: Date,
    isPaid: boolean,
}

export interface paymentPayload {
    cc: string,
    holder: string,
    cvv: number,
    exp: string,
    charge: number,
}
