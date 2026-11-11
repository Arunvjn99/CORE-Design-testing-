import React from "react";

const TableCell = ({ children, className, onClick, ...rest }) => {
  return (
    <div
      className={`d-flex table-cell ${className}`}
      {...rest}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default TableCell;
