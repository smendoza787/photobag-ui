import React from 'react';

const Button = ({ text, handleClick, classOverride }) => (
  <div className={ `${classOverride ? classOverride : 'btn' }` } onClick={ handleClick } >
    { text }
  </div>
);

export default Button;