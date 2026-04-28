import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout(){
    return(
          <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6"> 
         <Outlet /> {/* Outlet untuk render halaman sesuai route */}
        </main>
      </div>
    </div>

    );
}
