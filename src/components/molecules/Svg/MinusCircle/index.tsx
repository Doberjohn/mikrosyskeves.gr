import React from "react";
import {ISVG} from "../../../../shared/interfaces";

export const MinusCircleIcon = ({onClick}: ISVG) => {
   return (
      <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
           className="bi bi-dash-circle-fill text-danger" viewBox="0 0 16 16">
         <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
      </svg>
   )
}