import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import BiilingPage from "./pages/BiilingPage";
import Category from "./pages/Category";
import Audience from "./pages/Audience";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import { GlobalProvider } from "./context/GlobalContext";
import ProtectedRoute from "./constant/ProtectedRoute";
import CheckoutPage from "./pages/CheckoutPage";
import Login from "./user/Login";
import Signup from "./user/Signup";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import SearchPage from "./pages/SearchPage";
import VerifyEmail from "./user/password/VerifyEmail";
import ResetPassword from "./user/password/ResetPassword";
import Message from "./user/Message";
import Verified from "./user/Verified";
import ConfirmEmail from "./user/ConfirmEmail";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
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
              path="/payment"
              element={
                <ProtectedRoute>
                  <BiilingPage />
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
          <Route path="/message" element={<Message/>} />
          <Route path="/verified" element={<Verified />} />
          <Route path="/confirm_email/:uid/:token" element={<ConfirmEmail />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/resetpassword/:uid/:token" element={<ResetPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;