import React from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import NavButtonsBack from '../../../components/NavButtonsBack/NavButtonsBack'
import { CatalogPage } from '../../../components/CatalogPage/CatalogPage'
import { LoginContext } from '../../../LoginContext';
import "./catalogPageBack.css";

export const CatalogPageBack: React.FC = () => {
  const { username, permission } = React.useContext(LoginContext);

  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <NavBar isUser={false} rightComponent={<NavButtonsBack permissionLevel={permission} pageName='catalog' />} />
        <CatalogPage isUser={false} />
      </div>
    </>
  );

};

export default CatalogPageBack;