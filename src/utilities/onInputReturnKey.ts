import React from "react";
import { returnCoordsFromClick, returnCoordsFromTouch } from "./returnDirection";
export const returnKey = (callback: Function, { key }: KeyboardEvent) => {
  callback(key);
};

export const returnClick = (callback: Function, e: React.SyntheticEvent) => {

  if(e.type ==='touchstart'){
    const key = returnCoordsFromTouch(e);
    callback(key);
    return;

  }
  const key = returnCoordsFromClick(e);
  callback(key);
};
