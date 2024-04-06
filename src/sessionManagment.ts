import { AuthApi } from './api/authApi';
import { APIStatus } from './api/Api';
import { Api } from './api/Api';
import { getDate, getTime } from './utils';
import { useNavigate } from 'react-router-dom';

export interface UserInfo {
    username: string;
    permission: string;
}

export const Logout = async () => {
    const navigate = useNavigate();
    navigate('/login');
    return;
};

export const handleGetUserInfo = async (setIsLoading: any, setUsername: any, setNextEvent: any) => {
    setIsLoading(true);
    const authApiRes = await AuthApi.getUserInfo();
    setIsLoading(false);
    if (authApiRes.status === APIStatus.Success) {
        const userInfo = authApiRes.data as UserInfo;
        if (userInfo.permission !== 'U') {
            Logout();
        }
        setUsername(userInfo.username);
        const apiRes = await Api.getNextEvent(userInfo.username);
        if (apiRes.status === APIStatus.Success) {
            const nextEventTitle = apiRes.data.eventTitle;
            const nextEventDate = apiRes.data.eventStartDate;
            if(nextEventTitle !== "" ) {
                const nextEventDescription = "Next event: " + nextEventTitle + " on " + getDate(nextEventDate) + " at " + getTime(nextEventDate);
                setNextEvent(nextEventDescription);
            }
            else{
                setNextEvent("");
            }
        }
    }
    // cookies not found or not valid
    else {
        Logout();
    }
    

};

export const handleGetWorkerInfo = async (setIsLoading: any, setUsername: any, setPermission: any) => {
    setIsLoading(true);
    const res = await AuthApi.getUserInfo();
    setIsLoading(false);
    if (res.status === APIStatus.Success) {
        const userInfo = res.data as UserInfo;
        if (userInfo.permission === 'U') {
            Logout();
        }
        setUsername(userInfo.username);
        setPermission(userInfo.permission);
    }
    // cookies not found or not valid
    else {
        Logout();
    }
};

