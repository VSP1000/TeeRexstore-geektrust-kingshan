import { allColor, allGender, allPrice,  } from "../Product/ProductList";
import { Drawer, List } from "@mui/material";
import { panelFunction } from "./FunctionHandler";

const CategoryFunction = ({
  isOpen,
  onClose,
  handleColorChange,
  handleGenderChange,
  handlePriceChange,
}) => {
  return (
    <>
      <Drawer anchor="right" open={isOpen} onClose={onClose}>
        <List sx={{ width: "150px", padding: "5px" }}>
          <h3>Colour</h3>
          {allColor.map((color) => {
            return <>{panelFunction(color, handleColorChange)}</>;
          })}

          <h3>Gender</h3>
          {allGender.map((gender) => {
            return <>{panelFunction(gender, handleGenderChange)}</>;
          })}

          <h3>Price</h3>
          {allPrice.map((price) => {
            return <>{panelFunction(price, handlePriceChange)}</>;
          })}

        </List>
      </Drawer>
    </>
  );
};

export default CategoryFunction;