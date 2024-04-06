import React, { EventHandler, createContext, useState, ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import { Event } from './types.ts'
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
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/main_user",
      element: <CatalogPageUser />,
    },
    {
      path: "/event_user/:eventTitle",
      element: <EventPageUser />,
    },
    {
      path: "/event_back/:eventTitle",
      element: <EventPageBack />,
    },
    {
      path: "/create-event",
      element: <CreateEventPage />,
    },
    {
      path: "/user-space",
      element: <UserSpacePage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/main_back",
      element: <CatalogPageBack />,
    },
    {
      path: "/checkout",
      element: <Checkout />
    },
    {
      path: "/success-page",
      element: <SuccessPage />
    },
    {
      path: "/refund",
      element: <RefundPage />,
    },
    {
      path: "*",
      element: <PageNotFoundError />,
    }
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

// Render the application
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);