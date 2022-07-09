import Alpha from "react-color"
import EditableInput from "react-color"
import Hue from 'react-color'
import { useState } from "react";
const MyColorPicker = ({updateShipColor}) => {
  const [color, setColor] = useState({ background: "#333" });

  const handleChangeComplete = (color) => {
    setColor({ background: color.hex });
  };

  const changeColor = () => {
    updateShipColor({color: color.background})
  };

  return (
    <div>
 
  <EditableInput/>
      <button onClick={changeColor}>Change Color!</button>
    </div>
  );
};

export default MyColorPicker;
