import { createRoot } from "react-dom/client";
import frameworkData from "./framework.json";
import './tailwind.css';
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";


createRoot(document.getElementById("root"))
    .render(
        <div>
           {/* <TailwindCSS/> */}
           {/* <UserForm/> */}
           <FrameworkListSearchFilter/>
           
        </div>
    )