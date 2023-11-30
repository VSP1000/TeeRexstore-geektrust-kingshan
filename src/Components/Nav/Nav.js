/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Grid, Button } from "@mui/material";
import { Box } from "@mui/system";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import Home from "../../Home";

const Header = () => {
  const { items } = useContext(Home);

  const navigate = useNavigate();

  const homePage = () => {
    navigate ("/");
  };

  const cartPage = () => {
    navigate ("/cart");
  };

  return (
    <>
      <header className="homePage-Header">
        <Grid item xs={12}>
          <Box className="navtext" onClick={homePage}>
            <h2>TeeRex Store</h2>
          </Box>
        </Grid>
        
           <Box>
            <Button sx={{ textTransform: "none" }} onClick={cartPage}>
              <ShoppingCartCheckoutIcon />
              <span>{items.length}</span>
            </Button>
          </Box>
        

        
      </header>
    </>
  );
};

export default Header;