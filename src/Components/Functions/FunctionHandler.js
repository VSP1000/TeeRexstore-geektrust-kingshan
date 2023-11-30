/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable eqeqeq */

export const panelFunction = (valueType, clickFunction) => {
  return (
    <div className="category">
      <input
        type="radio"
        label={valueType.label}
        key={valueType.value}
        value={valueType.value}
        onClick={(e) => clickFunction(e)}
      />
      {valueType.label}
    </div>
  );
};

export const handleSelectFilter = (clickVal,list,filte,setFilter,filterNameBy,setFiltName,setItemList,setfiltItem,value) => {
  let nextfiltr;
  let spliValue;
  let Min_Price;
  let Max_Price;
  let filtCategory;

  if (value === "price") {
    spliValue = clickVal.split("-");
    Max_Price = spliValue[1];
    Min_Price = spliValue[0];
  }

  if (filte.includes(clickVal)) {
    let MIN_Length=0;

    nextfiltr = filte.filter((filters) => filters !== clickVal);
    if (nextfiltr.length) {
      setFilter(nextfiltr);
    } else {
      setFilter([]);
    }

    if (value === "price") {
      filtCategory =
        spliValue.length === 1
          ? filterNameBy.filter((filters) => !(filters.price >= Min_Price))
          : filterNameBy.filter(
              (filters) => !(filters.price >= Min_Price && filters.price <= Max_Price)
            );
    }

    if (value !== "price") {
      if (value === "color") {
        filtCategory = filterNameBy.filter((filters) => filters.color != clickVal);
      }
      if (value === "gender") {
        filtCategory = filterNameBy.filter((filters) => filters.gender != clickVal);
      }
      if (value === "type") {
        filtCategory = filterNameBy.filter((filters) => filters.type != clickVal);
      }
    }

    if (filtCategory.length !== MIN_Length) {
      setFiltName(filtCategory);
      setItemList(filtCategory);
      setfiltItem(filtCategory);
    }

    if (filtCategory.length == MIN_Length && list.length !== MIN_Length) {
      setFiltName(filtCategory);
      setItemList(list);
      setfiltItem(list);
    }
  } else {
    if (value === "price") {
      filtCategory =
        spliValue.length === 1
          ? list.filter((filters) => filters.price >= Min_Price)
          : list.filter(
              (filters) => filters.price >= Min_Price && filters.price <= Max_Price
            );
    }

    if (value !== "price") {
      filtCategory = list.filter(
        (filters) =>
        filters.color == clickVal ||
        filters.gender == clickVal ||
        filters.type == clickVal
      );
    }

    let filtcategoryset = [...filtCategory, ...filterNameBy];

    setFiltName(filtcategoryset); 
    setItemList(filtcategoryset); 
    setfiltItem(filtcategoryset);  
    nextfiltr = [...filte, clickVal];

    setFilter(nextfiltr);
  }
};

export const handleSelectPanel = (
  handlePanelFilt,
  clickVal,
  itemTrack,
  valOne,
  valTwo,
  valThree,
  storeSrchtxt
) => {
  let MIN_Length=0;

  if (valOne.length == MIN_Length && valTwo.length == MIN_Length && valThree.length == MIN_Length) {
    if (storeSrchtxt.length) {
      return handlePanelFilt(clickVal, storeSrchtxt);
    }
    return handlePanelFilt(clickVal, itemTrack);
  }

  if (valOne.length !== MIN_Length && valTwo.length !== MIN_Length && valThree.length !== MIN_Length) {
    if (valOne.length < valTwo.length && valOne.length < valThree.length) {
      return handlePanelFilt(clickVal, valOne);
    }
    if (valTwo.length < valOne.length && valTwo.length < valThree.length) {
      return handlePanelFilt(clickVal, valTwo);
    }
    if (valThree.length < valTwo.length && valThree.length < valOne.length) {
      return handlePanelFilt(clickVal, valThree);
    }

    if (valThree.length == valTwo.length && valThree.length == valOne.length) {
      return handlePanelFilt(clickVal, valThree);
    }
  }

  if (
    (valOne.length !== MIN_Length && valTwo.length !== MIN_Length) ||
    (valTwo.length !== MIN_Length && valThree.length !== MIN_Length) ||
    (valOne.length !== MIN_Length && valThree.length !== MIN_Length)
  ) {
    if (valOne.length && valTwo.length) {
      if (valOne.length < valTwo.length) {
        return handlePanelFilt(clickVal, valOne);
      }

      if (valTwo.length < valOne.length) {
        return handlePanelFilt(clickVal, valTwo);
      }

      if (valTwo.length == valOne.length) {
        return handlePanelFilt(clickVal, valTwo);
      }
    }

    if (valTwo.length && valThree.length) {
      if (valTwo.length < valThree.length) {
        return handlePanelFilt(clickVal, valTwo);
      }
      if (valThree.length < valTwo.length) {
        return handlePanelFilt(clickVal, valThree);
      }
      if (valTwo.length == valThree.length) {
        return handlePanelFilt(clickVal, valThree);
      }
    }

    if (valOne.length && valThree.length) {
      if (valOne.length < valThree.length) {
        return handlePanelFilt(clickVal, valOne);
      }
      if (valThree.length < valOne.length) {
        return handlePanelFilt(clickVal, valThree);
      }
      if (valOne.length == valThree.length) {
        return handlePanelFilt(clickVal, valOne);
      }
    }
  }

  if (valOne.length !== MIN_Length || valTwo.length !== MIN_Length || valThree.length !== MIN_Length) {
    if (valOne.length) {
      return handlePanelFilt(clickVal, valOne);
    }

    if (valTwo.length) {
      return handlePanelFilt(clickVal, valTwo);
    }

    if (valThree.length) {
      return handlePanelFilt(clickVal, valThree);
    }
  }
};

export default { panelFunction, handleSelectPanel, handleSelectFilter };