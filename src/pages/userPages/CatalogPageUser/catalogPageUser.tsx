import React from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import NavButtonsUser from '../../../components/NavButtonsUser/NavButtonsUser';
import { CatalogPage } from '../../../components/CatalogPage/CatalogPage'
import { LoginContext } from '../../../LoginContext';
import Loader from '../../../components/Loader/Loader';


export const CatalogPageUser: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { isLoadingUser } = React.useContext(LoginContext);


  return (
    <>
      <div style={{minHeight:"100vh"}}>
        <NavBar isUser={true}  rightComponent={<NavButtonsUser pageName={"catalog"} />} />
        {isLoadingUser ? <Loader/> : 
        <CatalogPage isLoading={isLoading} setIsLoading={setIsLoading} isUser={true}/>}
      </div>
    </>
  );
};

export default CatalogPageUser;

