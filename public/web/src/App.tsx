import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Footer from "./components/Footer";
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Header />
      <main >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
