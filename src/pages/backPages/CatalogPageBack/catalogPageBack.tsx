import React, { useEffect } from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import NavButtonsBack from '../../../components/NavButtonsBack/NavButtonsBack'
import { CatalogPage } from '../../../components/CatalogPage/CatalogPage'
import { LoginContext } from '../../../LoginContext';
import Loader from '../../../components/Loader/Loader';

export const CatalogPageBack: React.FC = () => {
  const { username, permission, isLoadingUser } = React.useContext(LoginContext);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <NavBar isUser={false}rightComponent={<NavButtonsBack permissionLevel={permission} pageName='catalog' />} />
        {isLoadingUser ? <Loader/> : 
        <CatalogPage isLoading={isLoading} setIsLoading={setIsLoading} isUser={false} />}
      </div>
    </>
  );

};

export default CatalogPageBack;