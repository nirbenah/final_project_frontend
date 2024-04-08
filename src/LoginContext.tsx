import React, { createContext, ReactNode, useState } from 'react';

interface LoginContextType {
    username: string;
    permission: string;
    nextEvent: string;
    isLoadingUser: boolean;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setPermission: React.Dispatch<React.SetStateAction<string>>;
    setNextEvent: React.Dispatch<React.SetStateAction<string>>;
    setIsLoadingUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginContext = createContext<LoginContextType>({
    username: '',
    permission: '',
    nextEvent: '',
    isLoadingUser: false,
    setUsername: () => { },
    setPermission: () => { },
    setNextEvent: () => { },
    setIsLoadingUser: () => { }
});

export const LoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string>('');
    const [permission, setPermission] = useState<string>('');
    const [nextEvent, setNextEvent] = useState<string>('');
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);

    const contextValue: LoginContextType = {
        username,
        permission,
        nextEvent,
        isLoadingUser,
        setUsername,
        setPermission,
        setNextEvent,
        setIsLoadingUser
    };

    return <LoginContext.Provider value={contextValue}> {children} </LoginContext.Provider >;
};