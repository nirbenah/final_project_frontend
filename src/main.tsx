import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes,Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import PageNotFoundError from './components/PageNotFoundError/PageNotFoundError.tsx';
import EventPageUser from './pages/userPages/EventPageUser/EventPageUser.tsx'
import EventPageBack from './pages/backPages/EventPageBack/EventPageBack.tsx'
import CreateEventPage from './pages/backPages/CreateEventPage/CreateEventPage.tsx';
import UserSpacePage from './pages/userPages/UserSpacePage/UserSpacePage.tsx'
import { SignUp } from './pages/LoginAndSignUp/SignUp/SignUp.tsx';
import { Login } from './pages/LoginAndSignUp/Login/Login.tsx'
import { CatalogPageUser } from './pages/userPages/CatalogPageUser/catalogPageUser.tsx'
import { CatalogPageBack } from './pages/backPages/CatalogPageBack/catalogPageBack.tsx'
import { Checkout } from './pages/userPages/Checkout/Checkout.tsx'
import { SuccessPage } from './pages/userPages/SuccessPage/SuccessPage.tsx'
import RefundPage from './pages/userPages/RefundPage/RefundPage.tsx';
import { LoginProvider } from './LoginContext.tsx'
import './index.css'


const App: React.FC = () => {
  return (
    <LoginProvider>
      <Router />
    </LoginProvider>
  );
};

const Router: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main_user" element={<CatalogPageUser />} />
        <Route path="/event_user/:eventTitle" element={<EventPageUser />} />
        <Route path="/event_back/:eventTitle" element={<EventPageBack />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/user-space" element={<UserSpacePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main_back" element={<CatalogPageBack />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success-page" element={<SuccessPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="*" element={<PageNotFoundError />} />
      </Routes>
    </HashRouter>
  );
};

// Render the application
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);