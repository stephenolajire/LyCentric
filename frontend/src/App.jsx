import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Category from "./pages/Category";
import Audience from "./pages/Audience";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import { GlobalProvider } from "./context/GlobalContext";
import ProtectedRoute from "./constant/ProtectedRoute";
import CheckoutPage from "./pages/CheckoutPage";
import Login from "./user/login";
import Signup from "./user/Signup";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="category/:categoryId" element={<Category />} />
            <Route
              path="category/:categoryId/audience/:audienceId"
              element={<Audience />}
            />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/cartpage/" element={<CartPage />} />
            <Route path="/searchpage/" element={<SearchPage />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
             <Route
              path="/editprofile"
              element={
                <ProtectedRoute>
                  <EditProfilePage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
