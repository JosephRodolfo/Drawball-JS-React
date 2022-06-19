
import styles from "./styles/styles.scss"
import AuthProvider from "./components/AuthProvider";
import AppRouter from "./routers/AppRouter";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
