import axios from "axios";
import { Event, Ticket, paymentPayload } from "../types"

interface GetCommentsCredentials {
    eventId: string,
    page: number,
    limit: number
}

interface GetEventsCredentials {
    page: number,
    limit: number
}

interface GetEventCredentials {
    eventId: string
}
interface PostCommentCredentials {
    event_id: String,
    author: String,
    date: Date,
    content: String
}
interface PostEventCredentials {
    event: Event
}

interface GetOrdersByUserCredentials {
    userId: string
}

export interface UserInfo {
    username: string;
    permission: string;
}

export interface APIResponse {
    status: APIStatus;
    data?: any;
}

export enum APIStatus {
    Success,
    BadRequest,
    Unauthorized,
    NotFound,
    ServerError
}


const API_GATEWAY_URL = "http://localhost:4000";


export const Api = {

    getComments: async ({ eventId, page, limit }: GetCommentsCredentials): Promise<APIResponse> => {
        try {
            const res = await axios.get(`${API_GATEWAY_URL}/api/comments?event_id=${eventId}&limit=${limit}&page=${page}`, { withCredentials: true });
            return { status: APIStatus.Success, data: res.data };
        } catch (e) {
            return handleError(e);
        }
    },
    getAllEvents: async ({ page, limit }: GetEventsCredentials): Promise<APIResponse> => {
        try {
            const res = await axios.get(`${API_GATEWAY_URL}/api/events?limit=${limit}&page=${page}`, { withCredentials: true });
            return { status: APIStatus.Success, data: res.data };
        } catch (e) {
            return handleError(e);
        }
    },
    getAvailableEvents: async ({ page, limit }: GetEventsCredentials): Promise<APIResponse> => {
        try {
            const res = await axios.get(`${API_GATEWAY_URL}/api/events/available?limit=${limit}&page=${page}`, { withCredentials: true });
            return { status: APIStatus.Success, data: res.data };
        } catch (e) {
            return handleError(e);
        }
    },
    getEvent: async ({ eventId }: GetEventCredentials): Promise<APIResponse> => {
        try {
            const res = await axios.get(`${API_GATEWAY_URL}/api/event/${eventId}`, { withCredentials: true });
            return { status: APIStatus.Success, data: res.data };
        } catch (e) {
            return handleError(e);
        }
    },
    UpdateDates: async (eventId: string, start_date: string, end_date: string): Promise<APIResponse> => {
        try {
            // '/api/event/:id/dates'
            const res = await axios.put(`${API_GATEWAY_URL}/api/event/${eventId}/dates`, { start_date, end_date }, { withCredentials: true });
            return { status: APIStatus.Success, data: res.data };
        } catch (e) {
            return handleError(e);
        }
    },
    postComment: async ({ event_id, author, date, content }: PostCommentCredentials): Promise<APIResponse> => {
        try {
            const res = await axios.post(`${API_GATEWAY_URL}/api/comment`, { event_id, author, date, content }, { withCredentials: true });
            console.log('permission:', res.data);
            return { status: APIStatus.Success, data: res.data };
        } catch (e) {
            return handleError(e);
        }
    },
    postEvent: async ({ event }: PostEventCredentials): Promise<APIResponse> => {
        console.log('event:', event);
        try {
            const res = await axios.post(`${API_GATEWAY_URL}/api/event`, event, { withCredentials: true });
            return { status: APIStatus.Success, data: res.data };
        } catch (e) {
            return handleError(e);
        }
    },
    getOrdersByUser: async (userId: string, page: number, limit: number): Promise<APIResponse> => {
        try {
            const res = await axios.get(`${API_GATEWAY_URL}/api/ordersByUserId?id=${userId}&limit=${limit}&page=${page}`, { withCredentials: true });
            return { status: APIStatus.Success, data: res.data };
        } catch (e) {
            return handleError(e);
        }
    },
    refundOrder: async (orderId: string): Promise<APIResponse> => {
        try {
            const res = await axios.delete(`${API_GATEWAY_URL}/api/order/${orderId}`, { withCredentials: true });
            return { status: APIStatus.Success, data: res.data };
        } catch (e) {
            return handleError(e);
        }
    },
    postOrder: async (order: any): Promise<APIResponse> => {
        try {
            const res = await axios.post(`${API_GATEWAY_URL}/api/order`, order, { withCredentials: true });
            return { status: APIStatus.Success, data: res.data };
        } catch (e) {
            return handleError(e);
        }
    },
    purchase: async (orderID: string, paymentPayload: paymentPayload): Promise<APIResponse> => {
        try {
            const res = await axios.post(`${API_GATEWAY_URL}/api/order/${orderID}/purchase`, paymentPayload, { withCredentials: true });
            return { status: APIStatus.Success, data: res.data };
        } catch (e) {
            return handleError(e);
        }
    },
    getNextEvent: async (username: string): Promise<APIResponse> => {
        try {
            console.log('username:', username);
            const res = await axios.get(`${API_GATEWAY_URL}/api/nextEvent/${username}`, { withCredentials: true });
            return { status: APIStatus.Success, data: res.data };
        } catch (e) {
            return handleError(e);
        }
    },
};

const handleError = async (e: any): Promise<APIResponse> => {
    if (axios.isAxiosError(e)) {
        const status = e.response?.status;
        console.log("errr", e.response?.data);
        if (status == 400) {
            return { status: APIStatus.BadRequest, data: e.response?.data };
        }
        if (status == 401) {
            return { status: APIStatus.Unauthorized, data: e.response?.data };
        }
        if (status == 404) {
            return { status: APIStatus.NotFound, data: e.response?.data };
        }
        return { status: APIStatus.ServerError, data: e.response?.data };
    }
    return { status: APIStatus.ServerError, data: e.message };
};