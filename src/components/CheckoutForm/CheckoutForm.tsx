import React from 'react';
import { useState } from 'react';
import './CheckoutForm.css';
import TextField from '@mui/material/TextField';

interface CheckoutFormProps {
    handlePayment: (cc: string, holder: string, cvv: number, exp: string) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ handlePayment }) => {
    const [formData, setFormData] = useState({
        name: '',
        cardNumber: '',
        cvv: '',
        month: '',
        year: '',
        expiry: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        cardNumber: '',
        cvv: '',
        month: '',
        year: '',
        expiry: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        validateCheckoutInput(name, value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormValid()) {
            console.log('Form is valid and being submitted:', formData);

        } else {
            alert('Checkout form is not valid');
            return;
        }
        handlePayment(formData.cardNumber, formData.name, parseInt(formData.cvv), `${formData.month}/${formData.year}`);
    };

    const isFormValid = () => {
        const isDateValid = checkExpiryDate();
        return Object.values(errors).every(error => error === '') && isDateValid;
    };

    const validateCheckoutInput = (name: string, value: string) => {
        switch (name) {
            case 'name':
                setErrors({ ...errors, name: /^[A-Za-z\s]+$/.test(value) ? '' : 'Enter a valid name that consists of English letters only' });
                break;
            case 'cardNumber':
                setErrors({
                    ...errors,
                    cardNumber: value.length === 16 && /^\d+$/.test(value) ? '' : 'Enter a valid 16-digit card number'
                });
                break;
            case 'cvv':
                setErrors({
                    ...errors,
                    cvv: value.length === 3 && /^\d+$/.test(value) ? '' : 'Enter a valid 3-digit CVV'
                });
                break;
            case 'month':
                setErrors({
                    ...errors,
                    month: !isNaN(parseInt(value)) && parseInt(value) < 13 ? '' : 'Enter a valid month'
                });
                break;
            case 'year':
                setErrors({
                    ...errors,
                    year: !isNaN(parseInt(value)) ? '' : 'Enter a valid year'
                });
                break;
            default:
                break;
        }
    };

    const checkExpiryDate = () => {
        setErrors({
            ...errors,
            expiry: ''
        });
        const month_num = parseInt(formData.month, 10);
        const year_num = parseInt(`20${formData.year}`, 10);
        let is_expired = false;
        if (!isNaN(month_num) && !isNaN(year_num)) {
            const today = new Date();
            const expiryDate = new Date(year_num, month_num - 1);
            is_expired = expiryDate < today;
        }
        setErrors({
            ...errors,
            expiry: is_expired ? 'The expiration date has passed' : ''
        });
        return !is_expired;
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Allow only numeric characters (0-9) and backspace (8)
        if (!(event.key === 'Backspace' || /[0-9]/.test(event.key))) {
            event.preventDefault();
        }
    };

    return (
        <div className="checkout-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        label="Cardholder Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!errors.name}
                        helperText={errors.name}
                        placeholder='John Doe'
                    />
                </div>
                <div>
                    <TextField
                        label="Credit Card Number"
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        inputProps={{ maxLength: 16 }}
                        required
                        placeholder='1234123412341234'
                        fullWidth
                        error={!!errors.cardNumber}
                        helperText={errors.cardNumber}
                    />
                </div>
                <div>
                    <TextField
                        label="CVV"
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        inputProps={{ maxLength: 3 }}
                        required
                        placeholder='123'
                        fullWidth
                        error={!!errors.cvv}
                        helperText={errors.cvv}
                    />
                </div>
                <div className='expiry-date'>
                    <TextField
                        label="MM"
                        type="text"
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        inputProps={{ maxLength: 2 }}
                        required
                        placeholder='01'
                        fullWidth
                        error={!!errors.month}
                        helperText={errors.month}
                    />
                    <TextField
                        label="YY"
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        inputProps={{ maxLength: 2 }}
                        required
                        placeholder='25'
                        fullWidth
                        error={!!errors.year}
                        helperText={errors.year}
                    />
                </div>
                {errors.expiry && <p style={{ color: 'red' }}>{errors.expiry}</p>}
                <button type="submit" className='orange-buttons'>Buy Now</button>
            </form>
        </div>
    );
};

export default CheckoutForm;
