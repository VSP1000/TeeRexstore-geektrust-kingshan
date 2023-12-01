/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useContext } from "react";
import { IconButton, Stack } from "@mui/material";
import { AddOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";
import Header from "../Nav/Nav";
import Home from "../../Home";
import "./AddToCart.css";
import Divider from "@mui/material/Divider";

export const getTotalCartValue = (items) => {
  if (items.length == 0) {
    return 0;
  }

  let totalValue = 0;
  items.map((item) => {
    totalValue += item.quantity * item.price;
  });
  return totalValue;
};

const ProductListHandler = ({ value, handleAdd, handleDelete }) => {
  return (
    <Stack direction="row" alignItems="center">
      <DeleteIcon size="small" color="primary" onClick={handleDelete} />
      <Box padding="0.5rem">{value}</Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

const Cart = () => {
  const { items, addToCart, removeCartItem } = useContext(Home);
  if (!items.length) {
    return (
      <>
        <Header />
        <Box className="cartBox emptyBox">
          <ShoppingCartOutlined className="cartlogo" />
         
            <h4>Cart is Empty</h4>
          
        </Box>
      </>
    );
  }
  return (
    <>
      <Header />
      <Box className="cartBox emptyBox">
        {items.map((item) => (
          <Box key={item.id} className="itemBox">
            <Box className="image-Box">
              <img
                src={item.imageURL}
                alt={item.name}
                width="100%"
                height="100%"
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="5rem"
              paddingX="1rem"
            >
              <div>{item.name}</div>
              <Box className="Box-content">
                <ProductListHandler
                  handleAdd={() => addToCart(item)}
                  handleDelete={() => removeCartItem(item.id)}
                  value={item.quantity}
                />

                <Box padding="0.5rem" fontWeight="700">
                  {item.price}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}

        <Divider className="lineColor" />
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Total Amount -
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            Rs.{getTotalCartValue(items)}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Cart;