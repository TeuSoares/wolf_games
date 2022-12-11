import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Contexts
import { AuthContextProvider } from "./contexts/AuthContext";

// Components
import Footer from "./components/Footer";
import Header from "./components/Header";
import { PrivateUserTrue, PrivateUserFalse } from "./components/authenticated/Privates";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ValidateEmail from "./pages/Auth/ValidateEmail";
import NotFound from "./pages/NotFound";
import { ContainerApp } from "./styles/styles";

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
