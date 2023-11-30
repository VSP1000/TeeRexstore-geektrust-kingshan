import { createContext, useState } from "react";
import { useSnackbar } from "notistack";

const Home = createContext();

export function CartDataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [itemTrack, setItemTracker] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const addToCart = (itemList) => {

    let MIN_QUANTITY=0;

    let prevItem = items.find((item) => item.id === itemList.id); 
    const quantityInCart = prevItem ? prevItem.quantity : 0; 
    let prevTrack = itemTrack.find((itemtrack) => itemtrack.id === itemList.id); 
    const prevTrackItem = prevTrack ? prevTrack.quantity : 0; 

    if (quantityInCart < prevTrackItem) {
      if (prevItem) {
        setItems(
          items.map((item) =>
            item.id === itemList.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        enqueueSnackbar("Item added to cart", { variant: "success" });
      } else {
        setItems([...items, { ...itemList, quantity: 1 }]);
        setItemTracker([...itemTrack, { ...itemList }]);
      }
    }

    if (quantityInCart === MIN_QUANTITY && prevTrackItem === MIN_QUANTITY) {
      if (prevItem) {
        setItems(
          items.map((item) =>
            item.id === itemList.id && itemList.quantity > MIN_QUANTITY
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );

        enqueueSnackbar(
          "Product is limited quantity, kindly proceed next product",
          { variant: "info" }
        );
      } else {
        if (itemList.quantity !== MIN_QUANTITY) {
          setItems([...items, { ...itemList, quantity: 1 }]);
          setItemTracker([...itemTrack, { ...itemList }]);
        } else {
          setItems([...items, { ...itemList, quantity: 0 }]);
        }
        enqueueSnackbar(" Added Item  in the Cart", { variant: "success" });
      }
    }
    if (
      quantityInCart !== MIN_QUANTITY &&
      prevTrackItem !== MIN_QUANTITY &&
      quantityInCart === prevTrackItem
    ) {
      enqueueSnackbar(
        "Product is limited quantity, kindly proceed next product",
        { variant: "error" }
      );
    }
  };
  const removeCartItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <Home.Provider value={{ items, addToCart, removeCartItem }}>
      {children}
    </Home.Provider>
  );
}

export default Home;