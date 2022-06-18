import Canvas from "./components/Canvas";
import ColorPicker from "./components/ColorPicker";
import styles from "./styles/styles.scss"
function App() {
  return (
    <div className="App">
      <header className="App-header">Drawball</header>
      <div className="temp-page">
      <Canvas />
      <ColorPicker />
      </div>
    </div>
  );
}

export default App;
