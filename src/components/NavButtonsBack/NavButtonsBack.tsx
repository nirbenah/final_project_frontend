import React, { useState } from 'react';
import datePng from '../../assets/date.png';
import UpdatePrivilegesDialog from '../UpdatePrivilegesDialog/UpdatePrivilegesDialog';
import { AuthApi } from '../../api/authApi';
import { APIStatus } from '../../api/Api';
import { useNavigate } from 'react-router-dom';

interface NavButtonsBackProps {
    permissionLevel: string;
    handleEditDateClick?: () => void;
    pageName: string;
}

const NavButtonsBack: React.FC<NavButtonsBackProps> = ({ permissionLevel, handleEditDateClick, pageName }) => {
    let buttons: JSX.Element | null = null;
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    const handleCreateEventClick = () => {
        navigate('/create-event');
        console.log("Create event clicked");
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSubmit = async (username: string, permission: string) => {
        if(username == "admin"){
            alert("Cannot update admin permissions");
            return;
        }
        const apiResponse = await AuthApi.updatePermissions(username, permission);
        console.log(apiResponse);
        if (apiResponse.status === APIStatus.Success) {
            alert("Permission updated successfully");
        }
        else {
            if (apiResponse.status === APIStatus.BadRequest) {
                alert("Username does not exist");
            }
            else {
                alert("Server error");
            }
        }
    };

    switch (permissionLevel) {
        case "A":
            console.log("Admin");
            if (handleEditDateClick === undefined) {
                buttons = (
                    <>
                        <button onClick={handleCreateEventClick} className="nav-buttons">Add new event +</button>
                        <button onClick={handleOpenDialog} className="nav-buttons" >Update Privileges</button>
                    </>
                );
            }
            else {
                buttons = (
                    <>
                        <button onClick={handleEditDateClick} className="nav-buttons">Edit dates<img src={datePng} style={{ width: "20px", marginLeft: "5px" }} /></button>
                        <button onClick={handleCreateEventClick} className="nav-buttons">Add new event +</button>
                        <button onClick={handleOpenDialog} className="nav-buttons" >Update Privileges</button>
                    </>
                );
            }
            break;
        case "M":
            if (handleEditDateClick === undefined) {
                buttons = (
                    <>
                        <button onClick={handleCreateEventClick} className="nav-buttons">Add new event +</button>
                    </>
                );
            }
            else {
                buttons = (
                    <>
                        <button onClick={handleEditDateClick} className="nav-buttons">Edit dates<img src={datePng} style={{ width: "20px", marginLeft: "5px" }} /></button>
                        <button onClick={handleCreateEventClick} className="nav-buttons">Add new event +</button>
                    </>
                );
            }
            break;
        case "W":
            buttons = null;
            break;
        default:
            buttons = null;
    }

    return (
        <>
            {buttons}
            <UpdatePrivilegesDialog open={openDialog} onClose={handleCloseDialog} onSubmit={handleSubmit} />
        </>
    );
};

export default NavButtonsBack;
