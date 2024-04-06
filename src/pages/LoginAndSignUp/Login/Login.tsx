import React, { useRef, useState, useEffect, useContext } from "react";
import "../LoginAndSignUp.css";
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { AuthApi } from '../../../api/authApi';
import { APIStatus } from '../../../api/Api';
import { CircularProgress } from "@mui/material";
import { LoginContext } from '../../../LoginContext';
import { useNavigate } from "react-router-dom";

const LoginErrorMessages = {
    required: 'Username and password are required',
    invalid: 'Invalid username or password',
    failed: 'Login failed, please try again'
};


export const Login: React.FC = () => {
    const userRef = useRef<HTMLInputElement>(null); // set the focus on the user input when the component loads
    const errRef = useRef<HTMLInputElement>(null); // set the focus on the error
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const appContext = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (userRef.current !== null) {
            userRef.current.focus();
        }
    }, [])

    const handleSubmit = async (e: any) => {
        if (password.length === 0 || username.length === 0) {
            setErrMsg(LoginErrorMessages.required);
            return;
        }
        setIsLoading(true);
        const res = await AuthApi.login({ username, password });
        setIsLoading(false);
        if(res.status === APIStatus.Success) {
            if (res.data === "U") {
                navigate('/main_user');
                return;
            }
            if(res.data === "A" || res.data === "W" || res.data === "M") {
                navigate('/main_back');
                return;
            }
        }
        if (res.status === APIStatus.BadRequest) {
            setErrMsg(LoginErrorMessages.required);
            return;
        }
        if (res.status === APIStatus.Unauthorized) {
            setErrMsg(LoginErrorMessages.invalid);
            return;
        }
        if (res.status === APIStatus.ServerError) {
            setErrMsg(LoginErrorMessages.failed);
            return;
        }
    }
    return (
        <div className="sign-page">
            <div className="sign-form-container">
                <h1>Login</h1>
                <div className="sign-form-group">
                    <div className="sign-form-input">
                        <TextField
                            type="text"
                            id="username"
                            label="Username"
                            name="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            variant="filled"
                            required
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className="sign-form-input">
                        <TextField
                            type="password"
                            id="password"
                            label="Password"
                            name="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="filled"
                            required
                            style={{ width: "100%" }}
                        />
                    </div>
                </div>
                {errMsg && <p className='error-msg'>{errMsg}</p>}
                {isLoading ? <CircularProgress /> :<button className="orange-buttons" onClick={handleSubmit}>Login</button>}
                <p className="sign-bottom-message">Don't have a user? <Link to="/signup">Sign up!</Link></p>
            </div>
        </div>
    )
}

