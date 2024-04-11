import '../LoginAndSignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from '@mui/material/TextField';
import { AuthApi } from '../../../api/authApi';
import { APIStatus } from '../../../api/Api';
import { CircularProgress } from "@mui/material";

const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const SignUpErrorMessages = {
    required: 'Username and password are required',
    exists: 'Username already exists',
    failed: 'Sign Up failed, please try again'
};

export const SignUp: React.FC = () => {
    const userRef = useRef<HTMLInputElement>(null); // set the focus on the user input when the component loads
    const errRef = useRef<HTMLInputElement>(null); // set the focus on the error
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false); //focus in this input field or not

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    

    useEffect(() => {
        if (userRef.current !== null) {
            userRef.current.focus();
        }
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [username, pwd, matchPwd])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (pwd.length === 0 || username.length === 0) {
            setErrMsg(SignUpErrorMessages.required);
            return;
        }
        setIsLoading(true);
        const res = await AuthApi.signUp({ username: username, password: pwd });
        setIsLoading(false);

        if (res.status === APIStatus.Success) {
            navigate('/login');
            return;
        }
        // failed: 'Sign Up failed, please try again'
        // Internal server error (500)
        if (res.status === APIStatus.ServerError) {
            setErrMsg(SignUpErrorMessages.failed);
            return;
        }
        // exists: 'Username already exists' (400)
        if (res.status === APIStatus.BadRequest) {
            setErrMsg(SignUpErrorMessages.exists);
            return;
        }
    };

    return (
        <div className="sign-page">
            <div className="sign-form-container">
                <h1>Register</h1>
                <form className="sign-form-group" id="signup-form" onSubmit={handleSubmit}>
                    <div className="sign-form-input">
                        <label htmlFor="username">
                            {validName && (<FontAwesomeIcon icon={faCheck} />)}
                            {(() => { if (!validName && username) { return (<FontAwesomeIcon icon={faTimes} />) } })()}
                        </label>
                        <TextField
                            type="text"
                            id="username"
                            label="Username"
                            variant="filled"
                            inputRef={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            error={!validName}
                            helperText={userFocus && username && !validName ? (
                                <>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    3 to 24 characters.<br />
                                    Must begin with a letter.<br />
                                    Letters, numbers, underscores, hyphens allowed.<br />
                                    Maccabi Tel aviv is not allowed as a username <br />
                                    Maccabi_Haifa is a recommended username
                                </>
                            ) : null}
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className="sign-form-input">
                        <label htmlFor="password">
                            {validPwd && (<FontAwesomeIcon icon={faCheck} />)}
                            {(() => { if (!validPwd && pwd) { return (<FontAwesomeIcon icon={faTimes} />) } })()}
                        </label>
                        <TextField
                            type="password"
                            id="password"
                            label="Password"
                            variant="filled"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            error={!validPwd}
                            helperText={pwdFocus && !validPwd ? (
                                <>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    8 to 24 characters.<br />
                                    Must include uppercase and lowercase letters, a number.<br />
                                </>
                            ) : null}
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className="sign-form-input">
                        <label htmlFor="confirm_pwd">
                            {validPwd && validMatch && (<FontAwesomeIcon icon={faCheck} />)}
                            {(() => { if (!validMatch && matchPwd) { return (<FontAwesomeIcon icon={faTimes} />) } })()}
                        </label>
                        <TextField
                            type="password"
                            id="confirm_pwd"
                            label="Confirm Password"
                            variant="filled"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            error={!validMatch}
                            helperText={matchFocus && !validMatch ? (
                                <>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Passwords do not match.
                                </>
                            ) : null}
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            style={{ width: "100%" }}
                        />
                    </div>
                </form>
                {errMsg && <p className='error-msg'>{errMsg}</p>}
                {isLoading ? <CircularProgress /> :<button className="blue-buttons" form='signup-form' disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>}
                {/* {isLoading ? <CircularProgress /> :<button className="blue-buttons" form='signup-form'>Sign Up</button>} */}
                <p className="sign-bottom-message">
                    Already registered?{' '} <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    )
}