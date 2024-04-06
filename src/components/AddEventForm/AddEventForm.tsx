import React, { useState } from 'react'
import './AddEventForm.css'
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface AddEventFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onchange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void;

}

const AddEventForm: React.FC<AddEventFormProps> = ({ onSubmit, onchange }) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        setSelectedCategory(e.target.value);
        e.target.name = 'category';
        onchange(e);
    }
    
    const categories = [
        'Charity Event',
        'Concert',
        'Conference',
        'Convention',
        'Exhibition',
        'Festival',
        'Product Launch',
        'Sports Event'
    ];

    return (
        <form className="event-form" id="event-form" onSubmit={onSubmit}>
            <div className="form-row">
                <TextField
                    label="Title"
                    name="title"
                    onChange={onchange}
                    variant="standard"
                    style={{ width: '100%' }}
                    required
                />
            </div>
            <div className="form-row">
                <FormControl variant="standard" style={{ width: '100%' }}>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        value={selectedCategory}
                        onChange={handleSelectChange}
                        required
                    >
                        {categories.map(category => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className="form-row">
                <TextField
                    label="Start Date"
                    name="start_date"
                    type="datetime-local"
                    onChange={onchange}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: '100%' }}
                    required
                />
            </div>
            <div className="form-row">
                <TextField
                    label="End Date"
                    name="end_date"
                    type="datetime-local"
                    onChange={onchange}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: '100%' }}
                    required
                />
            </div>
            <div className="form-row">
                <TextField
                    label="Description"
                    name="description"
                    onChange={onchange}
                    variant="standard"
                    multiline
                    style={{ width: '100%' }}
                    required
                />
            </div>
            <div className="form-row">
                <TextField
                    label="Organizer"
                    name="organizer"
                    onChange={onchange}
                    variant="standard"
                    style={{ width: '100%' }}
                    required
                />
            </div>
            <div className="form-row">
                <TextField
                    label="Location"
                    name="location"
                    onChange={onchange}
                    variant="standard"
                    style={{ width: '100%' }}
                    required
                />
            </div>
            <div className="form-row">
                <TextField
                    label="Image"
                    name="image"
                    type="file"
                    onChange={onchange}
                    variant="standard"
                    style={{ width: '100%' }}
                />
            </div>
        </form>
    )
}

export default AddEventForm
