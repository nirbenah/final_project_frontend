import React, { useEffect, useState } from 'react';
import './EditDatesPopup.css'; // Import CSS file for styling

interface EditDatesPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (startDate: string, endDate: string) => void;
    initialStartDate: string;
    initialEndDate: string;
}

const EditDatesPopup: React.FC<EditDatesPopupProps> = ({ isOpen, onClose, onUpdate, initialStartDate, initialEndDate }) => {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    
    useEffect(() => {
        setStartDate(initialStartDate);
        setEndDate(initialEndDate);
    }, [initialStartDate, initialEndDate]);

    const handleUpdate = () => {
        if(startDate >= endDate){
            alert("End date must be after start date");
            return;
        }
        else{
            onUpdate(startDate, endDate);
        }
    };

    return (
        <>
        <div className={`popup-overlay ${isOpen ? 'open' : ''}`}></div>
        <div className={`popup ${isOpen ? 'open' : ''}`}>
            <div className="popup-content">
            <button onClick={onClose} className="close-button">✖</button>
                <h2>Edit Dates</h2>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input id="startDate" type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">End Date:</label>
                    <input id="endDate" type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <button onClick={handleUpdate} className="blue-buttons">Update</button>
            </div>
        </div>
        </>
    );
};

export default EditDatesPopup;
