
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import { Grid, InputAdornment, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../../App";
import "./FrontPage.css";
import Header from "../Nav/Nav";
import ProductList from "../Product/CardProduct";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { allColor, allGender, allPrice, allType } from "../Product/ProductList";
import CategoryFunction from "../Functions/CategoryFunction";
import {
  panelFunction,
  handleSelectPanel,
  handleSelectFilter,
} from "../Functions/FunctionHandler";

const HomePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [itemList, setItemList] = useState([]);
  const [useStoreItem, setStoreItem] = useState([]);
  const [searchtxt, setSearchtxt] = useState([]);
  const [filtItemList, setfiltItem] = useState([]);
  const [storeSrchtxt, setstoreSrchText] = useState([]);
  const [isPanelOpen, setisPanelOpen] = useState(false);

  useEffect(() => {
    fetchApiCall();
  }, []);

  const fetchApiCall = async () => {
    try {
      const response = await axios.get(config.endpoint);
      const data = response.data;
      setItemList(data);
      setStoreItem(data);
      return data;
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Check that Backend is running properly", {
          variant: "error",
        });
      }
    }
  };

  const lettercapitalizer = (srchVal) => {
    const strArr = srchVal.split(" ");
    for (let i = 0; i < strArr.length; i++) {
      strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
    }
    return strArr.join(" ");
  };

  const handleSearchtext = (event) => {
    let settext = event.target.value;
    let newWord = lettercapitalizer(settext);
    setSearchtxt(newWord);
  };

  useEffect(() => {
    ItemListfilt(searchtxt);
  }, [searchtxt]);

  const ItemListfilt = (searchtxt) => {
    const filtItem = itemList.filter(
      (filters) =>
        filters.name === searchtxt || 
        filters.color === searchtxt || 
        filters.type === searchtxt
    );
    if (filtItem.length) {
      setfiltItem(filtItem);
      setstoreSrchText(filtItem);
    } else {
      setfiltItem([]);
      setstoreSrchText([]);
    }
  };

  const [filtcol, setFiltcol] = useState([]); 
  const [filtColor, setFiltColor] = useState([]); 

  const handleColorFilt = (clickVal, list) => {
    let value = "color"; 
    handleSelectFilter(
      clickVal,
      list,
      filtcol,
      setFiltcol,
      filtColor,
      setFiltColor,
      setItemList,
      setfiltItem,
      value
    );
  };

  const handleColorChange = (event) => {
    let clickVal = event.target.value;

    handleSelectPanel(
      handleColorFilt,
      clickVal,
      useStoreItem,
      gender,
      price,
      typefil,
      storeSrchtxt
    );
  };

  const [filtgen, setFiltgen] = useState([]); 
  const [gender, setGender] = useState([]); 

  const handlegenfilt = (clickVal, list) => {
    let value = "gender"; 

    handleSelectFilter(
      clickVal,
      list,
      filtgen,
      setFiltgen,
      gender,
      setGender,
      setItemList,
      setfiltItem,
      value
    );
  };

  const handleGenderChange = (event) => {
    let clickVal = event.target.value;

    handleSelectPanel(
      handlegenfilt,
      clickVal,
      useStoreItem,
      filtColor,
      price,
      typefil,
      storeSrchtxt
    );
  };

  const [filtprice, setFiltprice] = useState([]); 
  const [price, setPrice] = useState([]); 

  const handlePricefilt = (clickVal, list) => {
    let value = "price"; 

    handleSelectFilter(
      clickVal,
      list,
      filtprice,
      setFiltprice,
      price,
      setPrice,
      setItemList,
      setfiltItem,
      value
    );
  };

  const handlePriceChange = (event) => {
    let clickVal = event.target.value;

    handleSelectPanel(
      handlePricefilt,
      clickVal,
      useStoreItem,
      filtColor,
      gender,
      typefil,
      storeSrchtxt
    );
  };

  const [filttype, setFiltype] = useState([]); 
  const [typefil, settypefilt] = useState([]); 

  const handletypeFilt = (clickVal, list) => {
    let value = "type"; 

    handleSelectFilter(
      clickVal,
      list,
      filttype,
      setFiltype,
      typefil,
      settypefilt,
      setItemList,
      setfiltItem,
      value
    );
  };

  const handletypeChange = (event) => {
    let clickVal = event.target.value;

    handleSelectPanel(
      handletypeFilt,
      clickVal,
      useStoreItem,
      filtColor,
      price,
      gender,
      storeSrchtxt
    );
  };

  const handleFilterIconClick = () => {
    setisPanelOpen(true);
  };

  return (
    <>
      <Header />

      <Grid item xs={12} className="position">
        <TextField
          placeholder="Search for products..."
          className="search-desktop"
          size="large"
          sx={{ m: 1, width: "82vh" }}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ color: "#606060" }} />
              </InputAdornment>
            ),
          }}
          onChange={(event) => handleSearchtext(event)}
        />
      </Grid>

      <Grid className="mobile-search-Filter">
        <TextField
          placeholder="Search for products..."
          className="search-mobile"
          size="large"
          sx={{ m: 1, width: "100%" }}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ color: "#606060" }} />
              </InputAdornment>
            ),
          }}
          onChange={(event) => handleSearchtext(event)}
        />

        <Button onClick={handleFilterIconClick} className="displayFilter">
          <FilterAltIcon />
        </Button>

        <CategoryFunction
          isOpen={isPanelOpen}
          onClose={() => setisPanelOpen(false)}
          handleColorChange={handleColorChange}
          handleGenderChange={handleGenderChange}
          handlePriceChange={handlePriceChange}
          handletypeChange={handletypeChange}
        />
      </Grid>

      <Grid className="container">
        <Grid item md={3} xs={12} className="category-Panel">
          <div className="sub-container">
            <Grid>
              <h3>Colour</h3>
              {allColor.map((color) => {
                return <>{panelFunction(color, handleColorChange)}</>;
              })}
            </Grid>

            <Grid>
              <h3>Gender</h3>
              {allGender.map((gender) => {
                return <>{panelFunction(gender, handleGenderChange)}</>;
              })}
            </Grid>

            <Grid>
              <h3>Price</h3>
              {allPrice.map((price) => {
                return <>{panelFunction(price, handlePriceChange)}</>;
              })}
            </Grid>

            <Grid>
              <h3>Type</h3>
              {allType.map((withtype) => {
                return <>{panelFunction(withtype, handletypeChange)}</>;
              })}
            </Grid>
          </div>
        </Grid>
        <Grid item md={9} xs={12} className="product-Panel">
          <Grid container spacing={2}>
            {filtItemList.length > 0 ? (
              filtItemList.map((item) => {
                const { id } = item;
                return (
                  <Grid item key={id} xs={12} md={6} lg={4}>
                    <ProductList itemList={item} />
                  </Grid>
                );
              })
            ) : (
              <>
                {itemList.length ? (
                  itemList.map((item) => {
                    const { id } = item;
                    return (
                      <Grid item key={id} xs={12} md={6} lg={4}>
                        <ProductList itemList={item} />
                      </Grid>
                    );
                  })
                ) : (
                  <Box className="loading">
                    <SentimentDissatisfied color="action" />
                    <h4>No products found</h4>
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;