import "./assets/tailwind.css";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import NotFound from "./pages/NotFound"; 

function App() {
  // Path gambar lokal yang benar sesuai folder public/img/error.png
  const errorImg = "/img/error.png";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6"> 
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />

            {/* Pakai path lokal /img/error.png agar gambar muncul */}
            <Route 
              path="/error-400" 
              element={<NotFound code="400" message="Bad Request: Permintaan tidak valid." image={errorImg} />} 
            />
            <Route 
              path="/error-401" 
              element={<NotFound code="401" message="Unauthorized: Akses dibatasi, silakan login." image={errorImg} />} 
            />
            <Route 
              path="/error-403" 
              element={<NotFound code="403" message="Forbidden: Anda tidak memiliki izin akses." image={errorImg} />} 
            />

            <Route 
              path="*" 
              element={<NotFound code="404" message="Opps! Halaman yang anda cari tidak ditemukan." image={errorImg} />} 
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
