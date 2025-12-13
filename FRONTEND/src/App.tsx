// import { Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import LoginPage from "./page/LoginPagee";
// import DashboardPage from "./page/DashboardPage";
// import AddSweetPage from "./page/AddSweetPage";
// import RegisterPage from "./page/RegisterPage";
// import AdminDashboard from "./page/AdminDashboard";
// import EditSweetPage from "./page/EditSweetPage";

// // const Login = () => <h2>Login Page</h2>;

// // const Register = () => <h2>Register Page</h2>;
// // const Dashboard = () => <h2>Dashboard (Private)</h2>;
// // const Admin = () => <h2>Admin Panel</h2>;

// const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// const AdminRoute = ({ children }: { children: React.ReactNode }) => {
//   const { user } = useAuth();
//   return user?.role === "admin" ? children : <Navigate to="/dashboard" />;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <Routes>
//         <Route path="/" element={<Navigate to="/dashboard" />} />

//         {/* Public */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/add-sweet" element={<AddSweetPage />} />
//         {/* Private */}
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <DashboardPage />
//             </PrivateRoute>
//           }
//         />
//         <Route path="/edit-sweet/:id" element={<EditSweetPage />} />

//         {/* Admin */}
//         <Route
//           path="/admin"
//           element={
//             <PrivateRoute>
//               <AdminRoute>
//                 <AdminDashboard />
//               </AdminRoute>
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </AuthProvider>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import LoginPage from "./page/LoginPagee"; // Check spelling (LoginPage or LoginPagee?)
import DashboardPage from "./page/DashboardPage";
import AddSweetPage from "./page/AddSweetPage";
import RegisterPage from "./page/RegisterPage";
import AdminDashboard from "./page/AdminDashboard";
import EditSweetPage from "./page/EditSweetPage";
import CartPage from "./page/CartPage";

// 1. Private Route (Any logged-in user)
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  // If loading logic exists in AuthContext, handle it here, otherwise just redirect
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// 2. Admin Route (Only Admins)
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user?.role === "admin" ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected User Routes (Dashboard) */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route path="/cart" element={<CartPage />} />
          {/* Protected Admin Routes */}
          {/* All these pages require being logged in AND being an admin */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/add-sweet"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <AddSweetPage />
                </AdminRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-sweet/:id"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <EditSweetPage />
                </AdminRoute>
              </PrivateRoute>
            }
          />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
