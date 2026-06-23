import "./assets/tailwind.css";
import React, { Suspense } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Loading from "./components/Loading";
import { useAuth } from "./contexts/AuthContext";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Order = React.lazy(() => import("./pages/Orders"));
const Customer = React.lazy(() => import("./pages/Customers"));
const Products = React.lazy(() => import("./pages/Products"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const ProductsDetail = React.lazy(() => import("./pages/ProductsDetail.jsx"));
const Components = React.lazy(() => import("./pages/Components"));
const FiturXz = React.lazy(() => import("./pages/FiturXyz"));
const Notes = React.lazy(() => import("./pages/Notes"));

function ProtectedRoute({ allowedRoles }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && (!profile || !allowedRoles.includes(profile.role))) {
    return <Navigate to="/error-403" replace />;
  }

  return <Outlet />;
}

function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Halaman Autentikasi Publik */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>
        </Route>

        {/* Halaman Dashboard / Utama Terproteksi */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            {/* Diakses oleh semua authenticated user */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductsDetail />} />
            <Route path="/components" element={<Components />} />
            <Route path="/fitur-xyz" element={<FiturXz />} />

            {/* Halaman khusus Admin dan Member */}
            <Route element={<ProtectedRoute allowedRoles={["admin", "member"]} />}>
              <Route path="/orders" element={<Order />} />
              <Route path="/Notes" element={<Notes />} />
            </Route>

            {/* Halaman khusus Admin */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/customers" element={<Customer />} />
            </Route>

            {/* Halaman Error 400 (Bad Request) */}
            <Route
              path="/error-400"
              element={
                <NotFound
                  errorCode="400"
                  title="BAD REQUEST"
                  description="Permintaanmu tidak dapat diproses oleh server. Periksa kembali inputanmu!"
                  image="https://illustrations.popsy.co/white/abstract-art-6.svg"
                />
              }
            />

            {/* Halaman Error 401 (Unauthorized) */}
            <Route
              path="/error-401"
              element={
                <NotFound
                  errorCode="401"
                  title="UNAUTHORIZED"
                  description="Maaf, kamu harus login atau memiliki akun untuk mengakses halaman ini."
                  image="https://illustrations.popsy.co/white/abstract-art-6.svg"
                />
              }
            />

            {/* Halaman Error 403 (Forbidden) */}
            <Route
              path="/error-403"
              element={
                <NotFound
                  errorCode="403"
                  title="FORBIDDEN"
                  description="Akses ditolak! Kamu tidak memiliki izin untuk melihat data ini."
                  image="https://illustrations.popsy.co/white/abstract-art-6.svg"
                />
              }
            />

            {/* Fallback (Error 404 - Not Found) jika URL tidak terdaftar */}
            <Route
              path="*"
              element={
                <NotFound
                  errorCode="404"
                  title="NOT FOUND"
                  description="Halaman yang kamu cari tidak ditemukan atau sudah dipindahkan."
                  image="https://illustrations.popsy.co/white/abstract-art-6.svg"
                />
              }
            />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
