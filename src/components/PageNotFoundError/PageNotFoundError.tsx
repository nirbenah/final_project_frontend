import React from "react";
import { useRouteError } from 'react-router-dom';
import "./PageNotFoundError.css";
import {LoginContext} from "../../LoginContext";
import { useNavigate } from "react-router-dom";

const PageNotFoundError: React.FC = () => {
  // let error = useRouteError() as any;
  const {permission} = React.useContext(LoginContext);
  const navigate = useNavigate();

  const handleGoBackToCatalog = () => {
    if(permission === "U"){
      navigate("/main_user");
    } else{
      navigate("/main_back");
    }
  }
  return (
    <div className="error-state-container" style={{justifyContent:"center",display:"flex",flexDirection:"column",height:"100vh"}}>
      <div className="error-state-content" >
        <h2>Page not found</h2>
        <p>Sorry, the page you are looking for does not exist...</p>
        <button className="blue-buttons" onClick={handleGoBackToCatalog}>Return to catalog</button>
      </div>
    </div>
  );
};

export default PageNotFoundError;
