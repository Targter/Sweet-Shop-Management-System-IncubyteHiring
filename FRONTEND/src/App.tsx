import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

const Login = () => <h2>Login Page</h2>;
const Register = () => <h2>Register Page</h2>;
const Dashboard = () => <h2>Dashboard (Private)</h2>;
const Admin = () => <h2>Admin Panel</h2>;

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user?.role === "admin" ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminRoute>
                <Admin />
              </AdminRoute>
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
