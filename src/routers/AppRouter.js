import LoginPage from "../components/LoginPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import NoMatch from "../components/NoMatch";
import ProtectedRoute from "./ProtectedRoute";
import SignupPage from "../components/SignupPage";
import Layout from "../components/Layout";

function AppRouter() {
   

  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/" element={<LoginPage/>} />

        <Route path="/login" element={<LoginPage/>} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }/>
         <Route path="signup" element={<SignupPage/>} />

        <Route path="*" element={<NoMatch />} />
      </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default AppRouter;