import { ChromePicker } from "react-color";
import { useState } from "react";

const ColorPicker = ({updateShipColor}) => {
  const [color, setColor] = useState({ background: "#333" });

  const handleChangeComplete = (color) => {
    setColor({ background: color.hex });
  };

  const changeColor = () => {
    updateShipColor({color: color.background})
  };

  return (
    <div className="color-picker-container">
      <ChromePicker
        color={color.background}
        onChangeComplete={handleChangeComplete}
        disableAlpha={true}
      />
      <button className="button" onClick={changeColor}>Change Color!</button>
    </div>
  );
};

export default ColorPicker;
