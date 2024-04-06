import axios from "axios";
import { APIResponse, APIStatus } from "./Api";

interface Credentials {
    username: string;
    password: string;
}

// const API_GATEWAY_URL = "http://localhost:4000";
const API_GATEWAY_URL = "https://apigatewayandauth.onrender.com";

export const AuthApi = {
    login: async ({ username, password }: Credentials): Promise<APIResponse> => {
        try {
            const res = await axios.post(`${API_GATEWAY_URL}/api/login`, { username, password }, { withCredentials: true });
            return { status: APIStatus.Success, data: res.data };
        } catch (e) {
            return handleError(e);
        }
    },
    signUp: async ({ username, password }: Credentials): Promise<APIResponse> => {
        try {
            await axios.post(`${API_GATEWAY_URL}/api/signup`, { username, password });
            return { status: APIStatus.Success };
        } catch (e) {
            return handleError(e);
        }
    },
    logout: async (): Promise<APIResponse> => {
        try {
            await axios.post(`${API_GATEWAY_URL}/api/logout`, {}, { withCredentials: true });
            return { status: APIStatus.Success };
        } catch (e) {
            return handleError(e);
        }
    },
    getUserInfo: async (): Promise<APIResponse> => {
        try {
            const res = await axios.get(`${API_GATEWAY_URL}/api/getUserInfo`, { withCredentials: true });
            return { status: APIStatus.Success, data: res.data };
        } catch (e) {
            return handleError(e);
        }
    },
    updatePermissions: async (username: string, permission: string): Promise<APIResponse> => {
        try {
            await axios.post(`${API_GATEWAY_URL}/api/updatePermission`, { username, permission }, { withCredentials: true });
            return { status: APIStatus.Success };
        } catch (e) {
            return handleError(e);
        }
    }
};

const handleError = async (e: any): Promise<APIResponse> => {
    if (axios.isAxiosError(e)) {
        const status = e.response?.status;
        console.log(e.response);
        if (status == 400) {
            return { status: APIStatus.BadRequest };
        }
        if (status == 401) {
            return { status: APIStatus.Unauthorized };
        }
        return { status: APIStatus.ServerError };
    }
    return { status: APIStatus.ServerError };
};