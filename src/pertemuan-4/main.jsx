import { createRoot } from "react-dom/client";
import frameworkData from "./framework.json";
import './tailwind.css';
import FrameworkList from "./FrameworkList";


createRoot(document.getElementById("root"))
    .render(
        <div>
           {/* <TailwindCSS/> */}
           {/* <UserForm/> */}
           <FrameworkList/>
           
        </div>
    )