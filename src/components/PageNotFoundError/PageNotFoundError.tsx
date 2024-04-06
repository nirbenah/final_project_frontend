import React from "react";
import { useRouteError } from 'react-router-dom';
import "./PageNotFoundError.css";

const PageNotFoundError: React.FC = () => {
  let error = useRouteError() as any;
  console.log("inside error state");
  return (
    <div className="error-state-container" style={{justifyContent:"center",display:"flex",flexDirection:"column",height:"100vh"}}>
      <div className="error-state-content" >
        <h2>Page not found</h2>
        <p>Sorry, the page you are looking for does not exist...</p>
      </div>
    </div>
  );
};

export default PageNotFoundError;
