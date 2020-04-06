import React from 'react';
import './table.css';

const TableHeader = ({ headers }) => {


  return (
    <thead>
      <tr>
        {headers.map((header, index) => {
          return (
            <th key={header.key}>{header.value}</th>  
          ) 
        })}
      </tr>
    </thead>
  );
}

export default TableHeader;
