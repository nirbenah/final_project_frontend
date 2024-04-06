import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './NavBar.css';
import userPic from '../../assets/user.png';
import workerPic from '../../assets/worker.png';
import { Link } from 'react-router-dom';
import { AuthApi, APIStatus } from '../../api/authApi';
import ErrorPopup from '../ErrorPopUp/ErrorPopUp';
import Loader from '../Loader/Loader';
import { handleGetUserInfo, handleGetWorkerInfo } from '../../sessionManagment';
import { LoginContext } from '../../LoginContext';

interface NavBarProps {
  isUser: boolean;
  rightComponent: React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ isUser, rightComponent }) => {
  const userImage = isUser ? userPic : workerPic;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errMsg, setErrMsg] = React.useState<string>('');
  const { username, nextEvent, setUsername, setPermission, setNextEvent } = React.useContext(LoginContext);

  useEffect(() => {
    if (isUser) {
      handleGetUserInfo(setIsLoading, setUsername, setNextEvent);
    }
    else {
      handleGetWorkerInfo(setIsLoading, setUsername, setPermission);
    }
  }, []);

  const onLogout = async () => {
    setIsLoading(true);
    const res = await AuthApi.logout();
    setIsLoading(false);
    if (res.status === APIStatus.Success) {
      window.location.href = '/login';
      return;
    }
    setErrMsg('Failed to logout, please try again');
  }

  return (
    <>
      {isLoading ? <Loader /> : null}
      <nav className="navbar navbar-dark" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <div className="dropdown me-2">
              <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"></button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {isUser && <li><Link className="dropdown-item" to="/main_user">Catalog</Link></li>}
                {!isUser && <li><Link className="dropdown-item" to="/main_back">Catalog</Link></li>}
                {isUser && (<li><Link className="dropdown-item" to="/user-space">User space</Link></li>)}
                {isUser && (<li><Link className="dropdown-item" to="/refund">Request a refund</Link></li>)}
                <li className="dropdown-item" style={{ cursor: "pointer" }} onClick={onLogout}>Logout</li>
              </ul>
            </div>
            <div>
              <img src={userImage} width="30" height="30" className="d-inline-block align-top me-2" alt="Profile Pic" />
              {isUser ? (
                <Link to="/user-space" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <span className="navbar-brand">{username}</span>
                </Link>
              ) : (
                <span className="navbar-brand">{username}</span>
              )}
            </div>
          </div>
          <div className="d-flex">
          {/* { nextEvent !== "" ?
                    <div >Next Event: {nextEvent}</div>:
                    <div >No upcoming events</div>} */}
          </div>
          <div className="d-flex">
            {rightComponent}
          </div>
        </div>
      </nav>
      <ErrorPopup open={errMsg !== ''} setErrorMessage={setErrMsg} errorMessage={errMsg} />
    </>
  );
};

export default NavBar;
