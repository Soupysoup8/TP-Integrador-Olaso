/* Contiene el icono de la aplicacion de internet
y aclara que ocurrirá una función con el div
website */

import React from 'react';
import msie2_2 from "../styles/img/msie2-2.png";

function AppIcon({ onClick }) {
  return (
    <div className="apps">
      <div className="website" onClick={onClick}>
        <img src={msie2_2} alt="Internet" />
        <p>Internet</p>
      </div>
    </div>
  );
}

export default AppIcon;