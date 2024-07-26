import React from 'react';

const ItemRow = ({itemData, itemPriceInfo}) => {
  return (
    <tr className="item-info">
      <td>{itemData.name}</td>
      {itemPriceInfo ? (
        <>
          <td>{itemPriceInfo.avgLowPrice | '-'}</td>
          <td>{itemPriceInfo.avgHighPrice | '-'}</td>
        </>
      ) : (
        <>
          <td>-</td>
          <td>-</td>
        </>
      )}
    </tr>
  );
};

export default ItemRow;