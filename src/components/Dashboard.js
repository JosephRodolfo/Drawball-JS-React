import Canvas from "../components/Canvas";
import ColorPicker from "../components/ColorPicker";
function Dashboard() {


  return (
    <div className="dashboard">
      <div className="temp-page">
      <Canvas />
      <ColorPicker />
      </div>
    </div>
  );
}

export default Dashboard;