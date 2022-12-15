import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Contexts
import { AuthContextProvider } from "./contexts/AuthContext";

// Styles
import { ContainerApp } from "./styles/styles";

// Components
import Footer from "./components/Footer";
import Header from "./components/Header";
import { PrivateUserTrue, PrivateUserFalse } from "./components/Authenticated/Privates";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ValidateEmail from "./pages/Auth/ValidateEmail";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import LoginAdmin from "./pages/Admin/Auth/Login";
import RegisterAdmin from "./pages/Admin/Auth/Register";
import InsertProducts from "./pages/Admin/InsertProducts";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <ContainerApp>
          <Header />
          <main >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<PrivateUserFalse children={<Login />} />} />
              <Route path="/register" element={<PrivateUserFalse children={<Register />} />} />
              <Route path="/verifyEmail/:id" element={<PrivateUserFalse children={<ValidateEmail />} />} />
              <Route path="/profile" element={<PrivateUserTrue children={<Profile />} />} />
              <Route path="/admin/login" element={<LoginAdmin />} />
              <Route path="/admin/register" element={<RegisterAdmin />} />
              <Route path="/admin/insertProducts" element={<InsertProducts />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </ContainerApp>
      </AuthContextProvider>
    </Router>
  )
}

export default App
