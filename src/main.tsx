import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  createBrowserRouter,  RouterProvider  } from "react-router-dom";
import App from './App.tsx'
import './index.css'
import RaydiumSniping from './snipingbot/raydium.tsx';
import AppWalletProvider from './provider/WalletProvider.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "snipingbot/raydium",
        element: <RaydiumSniping />
      }
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
