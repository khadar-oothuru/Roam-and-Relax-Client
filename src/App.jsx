import React, { useContext } from "react"; // Import useContext
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import { UserProvider } from "./context/UserContext";
import { ApiProvider } from "./context/ApiContext";
import { UserContext } from "./context/UserContext"; // Import UserContext
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import ViewBookings from "./pages/Admin/ViewBookings";
import UserBookings from "./pages/BookNow";
import InvoicePage from "./pages/InvoicePage";
import PackageDetails from "./pages/PackageDetails";
import BookNow from "./pages/BookNow";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Admin from "./pages/Admin/Admin";
import Packages from "./pages/Packages";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AddPackage from "./pages/Admin/AddPackage";
import UpdatePackage from "./pages/Admin/UpdatePackage";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyBookings from "./components/MyBookings";

// PrivateRoute Component for protecting routes
const PrivateRoute = ({ children }) => {
  const { isUserLoggedIn } = useContext(UserContext); // Use useContext to access UserContext

  return isUserLoggedIn ? children : <Navigate to="/" />;
};

function Layout() {
  const location = useLocation();

  // Check if the current route is for admin pages
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        {/* Regular User Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <UserBookings />
            </PrivateRoute>
          }
        />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route
          path="/packages"
          element={
            <PrivateRoute>
              <Packages />
            </PrivateRoute>
          }
        />
        <Route
          path="/packages/:id"
          element={
            <PrivateRoute>
              <PackageDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/mybookings"
          element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          }
        />

        <Route
          path="/packages/:id/booknow"
          element={
            <PrivateRoute>
              <BookNow />
            </PrivateRoute>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="add-package" element={<AddPackage />} />
          <Route path="update-package/:id" element={<UpdatePackage />} />
          {/* Nested Admin Routes */}
          <Route path="dashboard/bookings" element={<ViewBookings />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>

      {/* Conditionally render Footer */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <AdminProvider>
      <UserProvider>
        <ApiProvider>
          <Router>
            <Layout />
          </Router>
        </ApiProvider>
      </UserProvider>
    </AdminProvider>
  );
}

export default App;
