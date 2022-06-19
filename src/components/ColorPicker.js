import { ChromePicker } from "react-color";
import { useState } from "react";
import { controller } from "../components/Classes/GameController";

const ColorPicker = (props) => {
  const [color, setColor] = useState({ background: "#333" });

  const handleChangeComplete = (color) => {
    setColor({ background: color.hex });
  };

  const changeColor = () => {
    controller.ships[0].color = color.background;
  };

  return (
    <div>
      <ChromePicker
        color={color.background}
        onChangeComplete={handleChangeComplete}
        disableAlpha={true}
      />
      <button onClick={changeColor}>Change Color!</button>
    </div>
  );
};

export default ColorPicker;
