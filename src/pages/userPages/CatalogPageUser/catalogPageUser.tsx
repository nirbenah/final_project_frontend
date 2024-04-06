import React from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import NavButtonsUser from '../../../components/NavButtonsUser/NavButtonsUser';
import { CatalogPage } from '../../../components/CatalogPage/CatalogPage'
import { LoginContext } from '../../../LoginContext';


export const CatalogPageUser: React.FC = () => {
  const { username } = React.useContext(LoginContext);


  return (
    <>
      <div style={{minHeight:"100vh"}}>
        <NavBar isUser={true} rightComponent={<NavButtonsUser pageName={"catalog"} />} />
        <CatalogPage isUser={true}/>
      </div>
    </>
  );
};

export default CatalogPageUser;

