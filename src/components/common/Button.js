import React from 'react';

const Button = ({ text, handleClick, classOverride, styleOverride }) => (
  <div className={ `${classOverride ? classOverride : 'btn' }` } onClick={ handleClick } style={ styleOverride } >
    { text }
  </div>
);

export default Button;