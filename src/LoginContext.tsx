import React, { createContext, ReactNode, useState } from 'react';

interface LoginContextType {
    username: string;
    permission: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setPermission: React.Dispatch<React.SetStateAction<string>>;
    nextEvent: string;
    setNextEvent: React.Dispatch<React.SetStateAction<string>>;
}

export const LoginContext = createContext<LoginContextType>({
    username: '',
    permission: '',
    nextEvent: '',
    setUsername: () => { },
    setPermission: () => { },
    setNextEvent: () => { }
});

export const LoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string>('');
    const [permission, setPermission] = useState<string>('');
    const [nextEvent, setNextEvent] = useState<string>('');

    const contextValue: LoginContextType = {
        username,
        permission,
        setUsername,
        setPermission,
        nextEvent,
        setNextEvent
    };

    return <LoginContext.Provider value={contextValue}> {children} </LoginContext.Provider >;
};