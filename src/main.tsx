import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.tsx'
import './index.css'
import AppWalletProvider from './provider/WalletProvider.tsx';
import RaydiumSniping from './pages/snipingbot/raydium.tsx';
import PumpfunSniping from './pages/snipingbot/pumpfun.tsx';
import RaydiumVolume from './pages/volumebot/raydium.tsx';
import RaydiumCopytrading from './pages/copytrading/raydium.tsx';
import Welcome from './pages/readme/index.tsx';
import UserInfo from './pages/user/UserInfo.tsx';
import { SharedProvider } from './context/SharedContext.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Welcome />
      },
      {
        path: "snipingbot/raydium",
        element: <RaydiumSniping />
      },
      {
        path: "snipingbot/pumpfun",
        element: <PumpfunSniping />
      },
      {
        path: "volumebot/raydium",
        element: <RaydiumVolume />
      },
      {
        path: "copytrading/raydium",
        element: <RaydiumCopytrading />
      },
      {
        path: "userinfo",
        element: <UserInfo />
      },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWalletProvider>
        <RouterProvider router={router} />
    </AppWalletProvider>
  </React.StrictMode>
)
