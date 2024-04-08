import React from 'react';
import { Event } from '../../types';
import { getDate } from '../../utils';
import { LoginContext } from '../../LoginContext';

interface NavButtonsUserProps {
    pageName?: string;
}

const NavButtonsUser: React.FC<NavButtonsUserProps> = ({ pageName }) => {
    const { nextEvent } = React.useContext(LoginContext);
    return (
        <>
            {
                nextEvent && nextEvent !== "" ?
                    <div className='nav-buttons' >{nextEvent}</div>:
                    <div className='nav-buttons'>No upcoming events</div>
            }       
        </>
    );
};

export default NavButtonsUser;
