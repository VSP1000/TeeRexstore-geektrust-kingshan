import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React, { useContext } from "react";
import { Button, CardContent, CardActions, CardMedia, Card, Typography, } from "@mui/material";
import "./CardProduct.css";
import Home from "../../Home";

const CardProduct = ({ itemList }) => {
  const { addToCart } = useContext(Home);

  return (
    <>
      <Card className="card" key={itemList.id}>
        <CardMedia component="img" height="240" image={itemList.imageURL} />
        <CardContent>
          <Typography>{itemList.name}</Typography>
          <Typography>Rs.{itemList.price}</Typography>
          <Typography>{itemList.gender}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => addToCart(itemList)}><AddShoppingCartIcon />
</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CardProduct;