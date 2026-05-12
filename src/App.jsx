import "./assets/tailwind.css";
import React, { useState, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import ProductDetail from "./pages/ProductsDetail.jsx";
// import Dashboard from "./pages/Dashboard";
// import Customer from "./pages/Customer";
// import Order from "./pages/Order";
// import NotFound from "./pages/NotFound";
// import MainLayout from "./layouts/MainLayout";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Forgot from "./pages/auth/Forgot";
// import AuthLayout from "./layouts/AuthLayout";
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

function App() {
  const [count, setCount] = useState(0);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
        <Route element={<MainLayout />}>
          {/* Halaman Standar */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductsDetail />} />
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
        <Route path="/products/:id" element={<ProductDetail />} /> 
      </Routes>
    </Suspense>
  );
}

export default App;
