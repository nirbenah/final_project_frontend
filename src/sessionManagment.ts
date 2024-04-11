import { AuthApi } from './api/authApi';
import { APIStatus } from './api/Api';
import { Api } from './api/Api';
import { getDate, getTime } from './utils';

export interface UserInfo {
    username: string;
    permission: string;
}

export enum LOGIN_STATUS {
    permitted,
    notPermitted,
    notLoggedIn
}

export const handleGetUserInfo = async (setIsLoading: any, username:string, setUsername: any, setPermission:any, setNextEvent: any) => {
    setIsLoading(true);
    const authApiRes = await AuthApi.getUserInfo();
    setIsLoading(false);
    if (authApiRes.status === APIStatus.Success) {
        const userInfo = authApiRes.data as UserInfo;
        setUsername(userInfo.username);
        setPermission(userInfo.permission);
        if (userInfo.permission !== 'U') {
            console.log("user info", userInfo);
            return LOGIN_STATUS.notPermitted;
        }
        const apiRes = await Api.getNextEvent(userInfo.username);
        console.log('apiRes:', apiRes, "for user", userInfo.username);
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
        return LOGIN_STATUS.notLoggedIn;
    }
    return LOGIN_STATUS.permitted;
};

export const handleGetWorkerInfo = async (setIsLoading: any, username:string, setUsername: any, setPermission: any, pageName?: string) => {
    setIsLoading(true);
    const res = await AuthApi.getUserInfo();
    setIsLoading(false);
    if (res.status === APIStatus.Success) {
        const userInfo = res.data as UserInfo;
        setUsername(userInfo.username);
        setPermission(userInfo.permission);
        if (userInfo.permission === 'U') {
            console.log("worker does not have sufficient permissions:", userInfo);
            return LOGIN_STATUS.notPermitted;
        }
        if (pageName && pageName === 'create-event' && userInfo.permission !== 'A' && userInfo.permission !== 'M' ) {
            console.log("only admin can create event", userInfo);
            return LOGIN_STATUS.notPermitted;
        }
    }
    // cookies not found or not valid
    else {
        return LOGIN_STATUS.notLoggedIn;
    }
    return LOGIN_STATUS.permitted;
};

