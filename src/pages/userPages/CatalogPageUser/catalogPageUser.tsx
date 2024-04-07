import React from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import NavButtonsUser from '../../../components/NavButtonsUser/NavButtonsUser';
import { CatalogPage } from '../../../components/CatalogPage/CatalogPage'
import { LoginContext } from '../../../LoginContext';
import Loader from '../../../components/Loader/Loader';


export const CatalogPageUser: React.FC = () => {
  const { username } = React.useContext(LoginContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingUser, setIsLoadingUser] = React.useState(false);

  return (
    <>
      <div style={{minHeight:"100vh"}}>
        <NavBar isUser={true} setIsLoading={setIsLoadingUser} rightComponent={<NavButtonsUser pageName={"catalog"} />} />
        {isLoadingUser ? <Loader/> : 
        <CatalogPage isLoading={isLoading} setIsLoading={setIsLoading} isUser={true}/>}
      </div>
    </>
  );
};

export default CatalogPageUser;

