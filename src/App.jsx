import "./assets/tailwind.css";
// import Dashboard from "./pages/Dashboard";
// import { Route, Routes } from "react-router-dom";
// import Orders from "./pages/Orders";
// import Customers from "./pages/Customers";
// import NotFound from "./pages/NotFound";
// import MainLayout from "./layouts/MainLayout";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Forgot from "./pages/auth/Forgot";

import React, { Suspense } from "react";

const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Orders = React.lazy(() => import("./pages/Orders"))
const Customers = React.lazy(() => import("./pages/Customers"))
const NotFound = React.lazy(() => import("./pages/NotFound"))
const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))
const Login = React.lazy(() => import("./pages/auth/Login"))
const Register = React.lazy(() => import("./pages/auth/Register"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))


// Tetap import Route & Routes secara biasa
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";



function App() {
  // Path gambar lokal yang benar sesuai folder public/img/error.png
  const errorImg = "/img/error.png";

  return (
    <Suspense fallback={<Loading />}>
    <Routes>
      <Route element={<MainLayout />}> 
      <Route path="/" element={<Dashboard />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/customers" element={<Customers />} />
      {/* Pakai path lokal /img/error.png agar gambar muncul */}
      <Route
        path="/error-400"
        element={
          <NotFound
            code="400"
            message="Bad Request: Permintaan tidak valid."
            image={errorImg}
          />
        }
      />
      <Route
        path="/error-401"
        element={
          <NotFound
            code="401"
            message="Unauthorized: Akses dibatasi, silakan login."
            image={errorImg}
          />
        }
      />
      <Route
        path="/error-403"
        element={
          <NotFound
            code="403"
            message="Forbidden: Anda tidak memiliki izin akses."
            image={errorImg}
          />
        }
      />

      <Route
        path="*"
        element={
          <NotFound
            code="404"
            message="Opps! Halaman yang anda cari tidak ditemukan."
            image={errorImg}
          />
        }
      />
       </Route>
       <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot" element={<Forgot/>} />
        </Route>
    </Routes>
    </Suspense>
    
  );
}

export default App;
