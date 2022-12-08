import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Contexts
import { AuthContextProvider } from "./contexts/AuthContext";

// Components
import Footer from "./components/Footer";
import Header from "./components/Header";
import { PrivateUserTrue, PrivateUserFalse } from "./components/authenticated/Privates";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ValidateEmail from "./pages/ValidateEmail";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Header />
        <main >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<PrivateUserFalse children={<Login />} />} />
            <Route path="/register" element={<PrivateUserFalse children={<Register />} />} />
            <Route path="/verifyEmail" element={<PrivateUserFalse children={<ValidateEmail />} />} />
          </Routes>
        </main>
        <Footer />
      </AuthContextProvider>
    </Router>
  )
}

export default App
