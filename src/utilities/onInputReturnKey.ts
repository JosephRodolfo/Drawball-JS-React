import React from "react";
import { returnCoordsFromClick } from "./returnDirection";
export const returnKey = (callback: Function, { key }: KeyboardEvent) => {
  callback(key);
};

export const returnClick = (callback: Function, e: React.SyntheticEvent) => {
  const key = returnCoordsFromClick(e);
 const result = callback(key);
 return result;
};
