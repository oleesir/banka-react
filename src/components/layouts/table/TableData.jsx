import React from 'react';
import './table.css';

export const TableData = ({ keys, data }) => {
  console.log(data)
  return data.map((item, index) => {
    return (
      <tbody key={item.id}>
        <tr>
          {keys.map((key) => (
            <td key={item[key]}>{item[key]}</td>
          ))}
        </tr>
      </tbody>
   )

  })
}

export default TableData;
