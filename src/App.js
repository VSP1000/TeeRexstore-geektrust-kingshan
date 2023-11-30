import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import HomePage from "./Components/FrontPage/FrontPage";
import Cart from "./Components/Cart/AddToCart";
import {CartDataProvider} from "./Home";

export const config={ endpoint:`https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`};

function App() {
  return (
    <div>
      <CartDataProvider>
        <SnackbarProvider>
        <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
        </SnackbarProvider>
      </CartDataProvider>
  </div>
      
    ); 
  }
  
  export default App;