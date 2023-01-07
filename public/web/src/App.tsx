import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Contexts
import { AuthContextProvider } from "./contexts/AuthContext";
import { AddCarProvider } from "./contexts/AddCarContext";

// Styles
import { ContainerApp } from "./styles/Utils";

// Components
import Footer from "./components/Footer";
import Header from "./components/Header";
import { PrivateUserTrue, PrivateUserFalse, PrivateAdminTrue, PrivateAdminFalse } from "./components/Authenticated/Privates";

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
import ProductsBrand from "./pages/Products/ProductsBrand";
import ProductID from "./pages/Products/ProductID";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Address from "./pages/Purchase/Address";
import Review from "./pages/Purchase/Review";
import Checkout from "./pages/Purchase/Checkout";
import PaymentStatus from "./pages/Purchase/PaymentStatus";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <ContainerApp>
          <AddCarProvider>
            <Header />
            <main >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<PrivateUserFalse children={<Login />} />} />
                <Route path="/register" element={<PrivateUserFalse children={<Register />} />} />
                <Route path="/verifyEmail/:id" element={<PrivateUserFalse children={<ValidateEmail />} />} />
                <Route path="/profile" element={<PrivateUserTrue children={<Profile />} />} />
                <Route path="/products/:brand" element={<ProductsBrand />} />
                <Route path="/products/:brand/:id" element={<ProductID />} />
                <Route path="/products/search" element={<Search />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/purchase/address/:id_pedido" element={<Address />} />
                <Route path="/purchase/review/:id_pedido" element={<Review />} />
                <Route path="/purchase/checkout" element={<Checkout />} />
                <Route path="/order/:id_pedido/complete" element={<PaymentStatus />} />
                <Route path="/admin/login" element={<PrivateAdminFalse children={<LoginAdmin />} />} />
                <Route path="/admin/register" element={<PrivateAdminFalse children={<RegisterAdmin />} />} />
                <Route path="/admin/insertProducts" element={<PrivateAdminTrue children={<InsertProducts />} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </AddCarProvider>
          <Footer />
        </ContainerApp>
      </AuthContextProvider>
    </Router>
  )
}

export default App
